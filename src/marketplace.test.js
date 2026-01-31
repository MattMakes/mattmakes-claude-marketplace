import { test } from 'node:test';
import assert from 'node:assert';
import { Marketplace } from '../src/marketplace.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('Marketplace - loadRegistry', () => {
  const marketplace = new Marketplace();
  const registry = marketplace.loadRegistry();
  
  assert.ok(registry);
  assert.ok(Array.isArray(registry.packages));
  assert.ok(registry.packages.length > 0);
});

test('Marketplace - list all packages', () => {
  const marketplace = new Marketplace();
  const packages = marketplace.list();
  
  assert.ok(Array.isArray(packages));
  assert.ok(packages.length > 0);
});

test('Marketplace - list packages by type', () => {
  const marketplace = new Marketplace();
  const commands = marketplace.list({ type: 'command' });
  
  assert.ok(Array.isArray(commands));
  commands.forEach(pkg => {
    assert.strictEqual(pkg.type, 'command');
  });
});

test('Marketplace - search packages', () => {
  const marketplace = new Marketplace();
  const results = marketplace.search('git');
  
  assert.ok(Array.isArray(results));
  assert.ok(results.length > 0);
  
  results.forEach(pkg => {
    const matchesName = pkg.name.toLowerCase().includes('git');
    const matchesDescription = pkg.description.toLowerCase().includes('git');
    const matchesTags = pkg.tags && pkg.tags.some(tag => tag.toLowerCase().includes('git'));
    
    assert.ok(matchesName || matchesDescription || matchesTags);
  });
});

test('Marketplace - getPackage', () => {
  const marketplace = new Marketplace();
  const pkg = marketplace.getPackage('git-commit-wizard');
  
  assert.ok(pkg);
  assert.strictEqual(pkg.name, 'git-commit-wizard');
  assert.strictEqual(pkg.type, 'command');
});

test('Marketplace - getPackage returns null for non-existent package', () => {
  const marketplace = new Marketplace();
  const pkg = marketplace.getPackage('non-existent-package');
  
  assert.strictEqual(pkg, undefined);
});

test('Marketplace - install creates directory structure', () => {
  const testInstallDir = path.join(__dirname, '../tmp/test-install');
  const marketplace = new Marketplace({ installDir: testInstallDir });
  
  // Clean up if exists
  if (fs.existsSync(testInstallDir)) {
    fs.rmSync(testInstallDir, { recursive: true });
  }
  
  try {
    const result = marketplace.install('git-commit-wizard');
    
    assert.ok(result.package);
    assert.strictEqual(result.package.name, 'git-commit-wizard');
    assert.ok(Array.isArray(result.installedFiles));
    assert.ok(result.installedFiles.length > 0);
    
    // Verify files were created
    result.installedFiles.forEach(file => {
      assert.ok(fs.existsSync(file), `File should exist: ${file}`);
    });
    
    // Verify installed manifest was updated
    const manifestPath = path.join(testInstallDir, 'installed.json');
    assert.ok(fs.existsSync(manifestPath));
    
    const installed = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    assert.ok(installed.packages.some(p => p.name === 'git-commit-wizard'));
  } finally {
    // Clean up
    if (fs.existsSync(testInstallDir)) {
      fs.rmSync(testInstallDir, { recursive: true });
    }
  }
});

test('Marketplace - getInstalled', () => {
  const testInstallDir = path.join(__dirname, '../tmp/test-installed');
  const marketplace = new Marketplace({ installDir: testInstallDir });
  
  // Clean up if exists
  if (fs.existsSync(testInstallDir)) {
    fs.rmSync(testInstallDir, { recursive: true });
  }
  
  try {
    // Initially should be empty
    let installed = marketplace.getInstalled();
    assert.strictEqual(installed.length, 0);
    
    // Install a package
    marketplace.install('git-commit-wizard');
    
    // Should now have one package
    installed = marketplace.getInstalled();
    assert.strictEqual(installed.length, 1);
    assert.strictEqual(installed[0].name, 'git-commit-wizard');
    assert.ok(installed[0].installedAt);
  } finally {
    // Clean up
    if (fs.existsSync(testInstallDir)) {
      fs.rmSync(testInstallDir, { recursive: true });
    }
  }
});

test('Marketplace - uninstall', () => {
  const testInstallDir = path.join(__dirname, '../tmp/test-uninstall');
  const marketplace = new Marketplace({ installDir: testInstallDir });
  
  // Clean up if exists
  if (fs.existsSync(testInstallDir)) {
    fs.rmSync(testInstallDir, { recursive: true });
  }
  
  try {
    // Install a package
    const installResult = marketplace.install('git-commit-wizard');
    assert.ok(installResult.installedFiles.length > 0);
    
    // Verify it's installed
    let installed = marketplace.getInstalled();
    assert.strictEqual(installed.length, 1);
    
    // Uninstall
    const uninstallResult = marketplace.uninstall('git-commit-wizard');
    assert.ok(uninstallResult.removedFiles.length > 0);
    
    // Verify files were removed
    uninstallResult.removedFiles.forEach(file => {
      assert.ok(!fs.existsSync(file), `File should be removed: ${file}`);
    });
    
    // Verify it's no longer in installed manifest
    installed = marketplace.getInstalled();
    assert.strictEqual(installed.length, 0);
  } finally {
    // Clean up
    if (fs.existsSync(testInstallDir)) {
      fs.rmSync(testInstallDir, { recursive: true });
    }
  }
});
