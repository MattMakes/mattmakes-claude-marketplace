# API Documentation

## Marketplace Class

The core class for interacting with the marketplace programmatically.

### Constructor

```javascript
import { Marketplace } from 'claude-marketplace';

const marketplace = new Marketplace(options);
```

**Options:**
- `registryPath` (string): Path to registry.json file (optional)
- `installDir` (string): Installation directory (default: `~/.claude-marketplace`)

### Methods

#### loadRegistry()

Load the package registry from file.

```javascript
const registry = marketplace.loadRegistry();
```

**Returns:** Registry object with packages array

---

#### list(filters)

List available packages with optional filters.

```javascript
// List all packages
const allPackages = marketplace.list();

// Filter by type
const commands = marketplace.list({ type: 'command' });

// Filter by tags
const gitPackages = marketplace.list({ tags: ['git'] });
```

**Parameters:**
- `filters` (object): Optional filters
  - `type` (string): Package type filter
  - `tags` (array): Tag filters

**Returns:** Array of package objects

---

#### search(query)

Search packages by name, description, or tags.

```javascript
const results = marketplace.search('python');
```

**Parameters:**
- `query` (string): Search term

**Returns:** Array of matching package objects

---

#### getPackage(name)

Get a specific package by name.

```javascript
const pkg = marketplace.getPackage('git-commit-wizard');
```

**Parameters:**
- `name` (string): Package name

**Returns:** Package object or undefined

---

#### install(name)

Install a package.

```javascript
const result = marketplace.install('git-commit-wizard');
console.log(result.package);
console.log(result.installedFiles);
```

**Parameters:**
- `name` (string): Package name

**Returns:** Object with:
- `package`: Installed package object
- `installedFiles`: Array of installed file paths

**Throws:** Error if package not found or installation fails

---

#### getInstalled()

Get list of installed packages.

```javascript
const installed = marketplace.getInstalled();
```

**Returns:** Array of installed package metadata objects

---

#### uninstall(name)

Uninstall a package.

```javascript
const result = marketplace.uninstall('git-commit-wizard');
console.log(result.removedFiles);
```

**Parameters:**
- `name` (string): Package name

**Returns:** Object with:
- `removedFiles`: Array of removed file paths

**Throws:** Error if package not found

---

## Schema Functions

### validateManifest(manifest)

Validate a package manifest structure.

```javascript
import { validateManifest } from 'claude-marketplace';

const validation = validateManifest(manifest);
if (!validation.valid) {
  console.error(validation.errors);
}
```

**Parameters:**
- `manifest` (object): Package manifest to validate

**Returns:** Object with:
- `valid` (boolean): Whether manifest is valid
- `errors` (array): Array of error messages

---

### createManifestTemplate(type)

Create a new package manifest template.

```javascript
import { createManifestTemplate, PACKAGE_TYPES } from 'claude-marketplace';

const template = createManifestTemplate(PACKAGE_TYPES.COMMAND);
```

**Parameters:**
- `type` (string): Package type (use PACKAGE_TYPES constants)

**Returns:** Package manifest template object

---

## Constants

### PACKAGE_TYPES

Available package types.

```javascript
import { PACKAGE_TYPES } from 'claude-marketplace';

PACKAGE_TYPES.COMMAND  // 'command'
PACKAGE_TYPES.SKILL    // 'skill'
PACKAGE_TYPES.AGENT    // 'agent'
PACKAGE_TYPES.HOOK     // 'hook'
PACKAGE_TYPES.CONFIG   // 'config'
```

---

## Package Manifest Schema

```javascript
{
  // Required fields
  "name": "string",           // Unique package name
  "version": "string",        // Semantic version (e.g., "1.0.0")
  "description": "string",    // Brief description
  "type": "string",           // One of: command, skill, agent, hook, config
  "author": "string",         // Author name
  "files": {                  // Files to install (path: content)
    "path/to/file": "content"
  },
  
  // Optional fields
  "tags": ["string"],         // Search tags
  "license": "string",        // License type (e.g., "MIT")
  "repository": "string",     // Repository URL
  "metadata": {}              // Type-specific metadata
}
```

---

## Usage Examples

### Programmatic Installation

```javascript
import { Marketplace } from 'claude-marketplace';

const marketplace = new Marketplace();

// Search for packages
const pythonPackages = marketplace.search('python');
console.log(`Found ${pythonPackages.length} Python packages`);

// Install a package
try {
  const result = marketplace.install('python-fastapi-skill');
  console.log(`Installed ${result.package.name}`);
  console.log('Files:', result.installedFiles);
} catch (error) {
  console.error(`Installation failed: ${error.message}`);
}

// List installed packages
const installed = marketplace.getInstalled();
console.log(`You have ${installed.length} packages installed`);
```

### Custom Registry

```javascript
import { Marketplace } from 'claude-marketplace';
import path from 'path';

const marketplace = new Marketplace({
  registryPath: path.join(__dirname, 'custom-registry.json'),
  installDir: path.join(__dirname, 'custom-install')
});

const packages = marketplace.list();
```

### Validation

```javascript
import { validateManifest, PACKAGE_TYPES } from 'claude-marketplace';

const myPackage = {
  name: 'my-package',
  version: '1.0.0',
  description: 'My custom package',
  type: PACKAGE_TYPES.SKILL,
  author: 'Your Name',
  files: {
    'skills/my-skill.js': 'console.log("Hello");'
  }
};

const validation = validateManifest(myPackage);
if (validation.valid) {
  console.log('Package manifest is valid!');
} else {
  console.error('Validation errors:');
  validation.errors.forEach(err => console.error(`  - ${err}`));
}
```

---

## Error Handling

All methods may throw errors for various reasons:

```javascript
try {
  marketplace.install('non-existent-package');
} catch (error) {
  if (error.message.includes('not found')) {
    console.error('Package does not exist in registry');
  } else if (error.message.includes('Invalid package manifest')) {
    console.error('Package manifest validation failed');
  } else {
    console.error('Installation failed:', error.message);
  }
}
```

Common error scenarios:
- Package not found in registry
- Invalid package manifest
- File system permission errors
- Invalid package type
- Missing required fields
