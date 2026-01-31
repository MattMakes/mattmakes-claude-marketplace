/**
 * Package Schema Definition for Claude Marketplace
 * 
 * This defines the structure for all marketplace packages
 */

/**
 * @typedef {Object} PackageManifest
 * @property {string} name - Unique package name
 * @property {string} version - Semantic version (e.g., "1.0.0")
 * @property {string} description - Brief package description
 * @property {'command'|'skill'|'agent'|'hook'|'config'} type - Package type
 * @property {string[]} [tags] - Optional search tags
 * @property {Object} [metadata] - Type-specific metadata
 * @property {string} author - Package author
 * @property {string} [license] - License type
 * @property {string} [repository] - Repository URL
 * @property {Object} files - Files to install
 */

export const PACKAGE_TYPES = {
  COMMAND: 'command',
  SKILL: 'skill',
  AGENT: 'agent',
  HOOK: 'hook',
  CONFIG: 'config'
};

/**
 * Validate package manifest structure
 * @param {Object} manifest - Package manifest to validate
 * @returns {{valid: boolean, errors: string[]}}
 */
export function validateManifest(manifest) {
  const errors = [];

  if (!manifest.name || typeof manifest.name !== 'string') {
    errors.push('Package name is required and must be a string');
  }

  if (!manifest.version || !/^\d+\.\d+\.\d+$/.test(manifest.version)) {
    errors.push('Version must be in semver format (e.g., 1.0.0)');
  }

  if (!manifest.description || typeof manifest.description !== 'string') {
    errors.push('Description is required and must be a string');
  }

  if (!manifest.type || !Object.values(PACKAGE_TYPES).includes(manifest.type)) {
    errors.push(`Type must be one of: ${Object.values(PACKAGE_TYPES).join(', ')}`);
  }

  if (!manifest.author || typeof manifest.author !== 'string') {
    errors.push('Author is required and must be a string');
  }

  if (!manifest.files || typeof manifest.files !== 'object') {
    errors.push('Files object is required');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Create a new package manifest template
 * @param {string} type - Package type
 * @returns {PackageManifest}
 */
export function createManifestTemplate(type) {
  return {
    name: 'my-package',
    version: '1.0.0',
    description: 'Description of the package',
    type: type,
    tags: [],
    metadata: {},
    author: 'Author Name',
    license: 'MIT',
    repository: '',
    files: {}
  };
}
