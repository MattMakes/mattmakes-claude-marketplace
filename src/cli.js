#!/usr/bin/env node

import { Marketplace } from './marketplace.js';
import { PACKAGE_TYPES } from './schema.js';

const args = process.argv.slice(2);
const command = args[0];

const marketplace = new Marketplace();

/**
 * Display help information
 */
function showHelp() {
  console.log(`
Claude Marketplace CLI

Usage:
  claude-marketplace <command> [options]

Commands:
  list [type]           List all packages (optionally filter by type)
  search <query>        Search packages by name, description, or tags
  install <name>        Install a package
  uninstall <name>      Uninstall a package
  installed             Show installed packages
  info <name>           Show detailed information about a package
  help                  Show this help message

Package Types:
  - command: Executable CLI commands
  - skill: Reusable code templates and snippets
  - agent: AI agent configurations
  - hook: Git hooks and lifecycle integrations
  - config: Configuration files and settings

Examples:
  claude-marketplace list
  claude-marketplace list command
  claude-marketplace search git
  claude-marketplace install git-commit-wizard
  claude-marketplace info code-review-agent
  claude-marketplace installed
  claude-marketplace uninstall git-commit-wizard
`);
}

/**
 * Format package for display
 */
function formatPackage(pkg, detailed = false) {
  const typeColors = {
    command: '\x1b[32m',   // Green
    skill: '\x1b[34m',     // Blue
    agent: '\x1b[35m',     // Magenta
    hook: '\x1b[33m',      // Yellow
    config: '\x1b[36m'     // Cyan
  };
  
  const reset = '\x1b[0m';
  const bold = '\x1b[1m';
  const color = typeColors[pkg.type] || '';

  if (detailed) {
    console.log(`${bold}${pkg.name}${reset} v${pkg.version}`);
    console.log(`Type: ${color}${pkg.type}${reset}`);
    console.log(`Description: ${pkg.description}`);
    console.log(`Author: ${pkg.author}`);
    if (pkg.license) console.log(`License: ${pkg.license}`);
    if (pkg.tags && pkg.tags.length > 0) {
      console.log(`Tags: ${pkg.tags.join(', ')}`);
    }
    if (pkg.repository) console.log(`Repository: ${pkg.repository}`);
    if (pkg.metadata && Object.keys(pkg.metadata).length > 0) {
      console.log(`Metadata:`, JSON.stringify(pkg.metadata, null, 2));
    }
    console.log(`Files:`);
    for (const file of Object.keys(pkg.files)) {
      console.log(`  - ${file}`);
    }
  } else {
    console.log(`  ${bold}${pkg.name}${reset} (${color}${pkg.type}${reset}) - ${pkg.description}`);
  }
}

/**
 * Main command handler
 */
async function main() {
  try {
    if (!command || command === 'help') {
      showHelp();
      return;
    }

    switch (command) {
      case 'list': {
        const type = args[1];
        if (type && !Object.values(PACKAGE_TYPES).includes(type)) {
          console.error(`Invalid package type: ${type}`);
          console.error(`Valid types: ${Object.values(PACKAGE_TYPES).join(', ')}`);
          process.exit(1);
        }
        
        const packages = marketplace.list(type ? { type } : {});
        console.log(`\nAvailable packages${type ? ` (${type})` : ''}:\n`);
        packages.forEach(pkg => formatPackage(pkg));
        console.log(`\nTotal: ${packages.length} package(s)\n`);
        break;
      }

      case 'search': {
        const query = args[1];
        if (!query) {
          console.error('Please provide a search query');
          process.exit(1);
        }
        
        const packages = marketplace.search(query);
        console.log(`\nSearch results for "${query}":\n`);
        packages.forEach(pkg => formatPackage(pkg));
        console.log(`\nFound: ${packages.length} package(s)\n`);
        break;
      }

      case 'install': {
        const name = args[1];
        if (!name) {
          console.error('Please provide a package name to install');
          process.exit(1);
        }
        
        console.log(`Installing package: ${name}...`);
        const result = marketplace.install(name);
        console.log(`\n✓ Successfully installed ${result.package.name} v${result.package.version}`);
        console.log(`\nInstalled files:`);
        result.installedFiles.forEach(file => console.log(`  - ${file}`));
        console.log(`\nInstallation directory: ${marketplace.installDir}`);
        break;
      }

      case 'uninstall': {
        const name = args[1];
        if (!name) {
          console.error('Please provide a package name to uninstall');
          process.exit(1);
        }
        
        console.log(`Uninstalling package: ${name}...`);
        const result = marketplace.uninstall(name);
        console.log(`\n✓ Successfully uninstalled ${name}`);
        if (result.removedFiles.length > 0) {
          console.log(`\nRemoved files:`);
          result.removedFiles.forEach(file => console.log(`  - ${file}`));
        }
        break;
      }

      case 'installed': {
        const installed = marketplace.getInstalled();
        if (installed.length === 0) {
          console.log('\nNo packages installed yet.\n');
        } else {
          console.log(`\nInstalled packages:\n`);
          installed.forEach(pkg => {
            console.log(`  ${pkg.name} v${pkg.version} (${pkg.type}) - installed ${new Date(pkg.installedAt).toLocaleDateString()}`);
          });
          console.log(`\nTotal: ${installed.length} package(s)`);
          console.log(`Installation directory: ${marketplace.installDir}\n`);
        }
        break;
      }

      case 'info': {
        const name = args[1];
        if (!name) {
          console.error('Please provide a package name');
          process.exit(1);
        }
        
        const pkg = marketplace.getPackage(name);
        if (!pkg) {
          console.error(`Package "${name}" not found`);
          process.exit(1);
        }
        
        console.log('\n');
        formatPackage(pkg, true);
        console.log('\n');
        break;
      }

      default:
        console.error(`Unknown command: ${command}`);
        console.log('Run "claude-marketplace help" for usage information');
        process.exit(1);
    }
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}\n`);
    process.exit(1);
  }
}

main();
