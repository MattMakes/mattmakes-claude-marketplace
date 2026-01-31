import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateManifest } from './schema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Marketplace class for managing package installation
 */
export class Marketplace {
  constructor(options = {}) {
    this.registryPath = options.registryPath || path.join(__dirname, '../registry/registry.json');
    this.installDir = options.installDir || path.join(process.env.HOME || process.env.USERPROFILE, '.claude-marketplace');
    this.registry = null;
  }

  /**
   * Load the registry from file
   */
  loadRegistry() {
    try {
      const data = fs.readFileSync(this.registryPath, 'utf8');
      this.registry = JSON.parse(data);
      return this.registry;
    } catch (error) {
      throw new Error(`Failed to load registry: ${error.message}`);
    }
  }

  /**
   * List all available packages
   * @param {Object} filters - Optional filters (type, tags)
   */
  list(filters = {}) {
    if (!this.registry) {
      this.loadRegistry();
    }

    let packages = this.registry.packages;

    if (filters.type) {
      packages = packages.filter(pkg => pkg.type === filters.type);
    }

    if (filters.tags && filters.tags.length > 0) {
      packages = packages.filter(pkg => 
        pkg.tags && pkg.tags.some(tag => filters.tags.includes(tag))
      );
    }

    return packages;
  }

  /**
   * Search packages by name or description
   * @param {string} query - Search query
   */
  search(query) {
    if (!this.registry) {
      this.loadRegistry();
    }

    const lowerQuery = query.toLowerCase();
    return this.registry.packages.filter(pkg => 
      pkg.name.toLowerCase().includes(lowerQuery) ||
      pkg.description.toLowerCase().includes(lowerQuery) ||
      (pkg.tags && pkg.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
    );
  }

  /**
   * Get a specific package by name
   * @param {string} name - Package name
   */
  getPackage(name) {
    if (!this.registry) {
      this.loadRegistry();
    }

    return this.registry.packages.find(pkg => pkg.name === name);
  }

  /**
   * Install a package
   * @param {string} name - Package name to install
   */
  install(name) {
    const pkg = this.getPackage(name);
    
    if (!pkg) {
      throw new Error(`Package "${name}" not found in registry`);
    }

    // Validate package manifest
    const validation = validateManifest(pkg);
    if (!validation.valid) {
      throw new Error(`Invalid package manifest:\n${validation.errors.join('\n')}`);
    }

    // Create install directory if it doesn't exist
    if (!fs.existsSync(this.installDir)) {
      fs.mkdirSync(this.installDir, { recursive: true });
    }

    // Install each file
    const installedFiles = [];
    for (const [filePath, content] of Object.entries(pkg.files)) {
      const fullPath = path.join(this.installDir, filePath);
      const dir = path.dirname(fullPath);

      // Create directory structure
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Write file
      fs.writeFileSync(fullPath, content, 'utf8');
      
      // Make executable if it's a command or hook
      if (pkg.type === 'command' || pkg.type === 'hook') {
        fs.chmodSync(fullPath, 0o755);
      }

      installedFiles.push(fullPath);
    }

    // Update installed packages manifest
    this.updateInstalledManifest(pkg);

    return {
      package: pkg,
      installedFiles
    };
  }

  /**
   * Update the installed packages manifest
   * @param {Object} pkg - Package that was installed
   */
  updateInstalledManifest(pkg) {
    const manifestPath = path.join(this.installDir, 'installed.json');
    let installed = { packages: [] };

    if (fs.existsSync(manifestPath)) {
      installed = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    }

    // Remove old version if exists
    installed.packages = installed.packages.filter(p => p.name !== pkg.name);
    
    // Add new version
    installed.packages.push({
      name: pkg.name,
      version: pkg.version,
      type: pkg.type,
      installedAt: new Date().toISOString()
    });

    fs.writeFileSync(manifestPath, JSON.stringify(installed, null, 2), 'utf8');
  }

  /**
   * Get list of installed packages
   */
  getInstalled() {
    const manifestPath = path.join(this.installDir, 'installed.json');
    
    if (!fs.existsSync(manifestPath)) {
      return [];
    }

    const installed = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    return installed.packages || [];
  }

  /**
   * Uninstall a package
   * @param {string} name - Package name to uninstall
   */
  uninstall(name) {
    const pkg = this.getPackage(name);
    
    if (!pkg) {
      throw new Error(`Package "${name}" not found in registry`);
    }

    const removedFiles = [];
    for (const filePath of Object.keys(pkg.files)) {
      const fullPath = path.join(this.installDir, filePath);
      
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
        removedFiles.push(fullPath);
      }
    }

    // Update installed packages manifest
    const manifestPath = path.join(this.installDir, 'installed.json');
    if (fs.existsSync(manifestPath)) {
      const installed = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      installed.packages = installed.packages.filter(p => p.name !== name);
      fs.writeFileSync(manifestPath, JSON.stringify(installed, null, 2), 'utf8');
    }

    return { removedFiles };
  }
}

export default Marketplace;
