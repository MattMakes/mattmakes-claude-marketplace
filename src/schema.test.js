import { test } from 'node:test';
import assert from 'node:assert';
import { validateManifest, createManifestTemplate, PACKAGE_TYPES } from '../src/schema.js';

test('validateManifest - valid manifest', () => {
  const manifest = {
    name: 'test-package',
    version: '1.0.0',
    description: 'Test package',
    type: 'command',
    author: 'Test Author',
    files: {
      'test.sh': 'echo test'
    }
  };

  const result = validateManifest(manifest);
  assert.strictEqual(result.valid, true);
  assert.strictEqual(result.errors.length, 0);
});

test('validateManifest - missing name', () => {
  const manifest = {
    version: '1.0.0',
    description: 'Test package',
    type: 'command',
    author: 'Test Author',
    files: {}
  };

  const result = validateManifest(manifest);
  assert.strictEqual(result.valid, false);
  assert.ok(result.errors.some(e => e.includes('name')));
});

test('validateManifest - invalid version format', () => {
  const manifest = {
    name: 'test-package',
    version: '1.0',
    description: 'Test package',
    type: 'command',
    author: 'Test Author',
    files: {}
  };

  const result = validateManifest(manifest);
  assert.strictEqual(result.valid, false);
  assert.ok(result.errors.some(e => e.includes('semver')));
});

test('validateManifest - invalid type', () => {
  const manifest = {
    name: 'test-package',
    version: '1.0.0',
    description: 'Test package',
    type: 'invalid-type',
    author: 'Test Author',
    files: {}
  };

  const result = validateManifest(manifest);
  assert.strictEqual(result.valid, false);
  assert.ok(result.errors.some(e => e.includes('Type')));
});

test('createManifestTemplate - creates valid template', () => {
  const template = createManifestTemplate(PACKAGE_TYPES.COMMAND);
  
  assert.strictEqual(template.type, PACKAGE_TYPES.COMMAND);
  assert.ok(template.name);
  assert.ok(template.version);
  assert.ok(template.description);
  assert.ok(template.author);
  
  const result = validateManifest(template);
  assert.strictEqual(result.valid, true);
});

test('PACKAGE_TYPES - contains all expected types', () => {
  assert.strictEqual(PACKAGE_TYPES.COMMAND, 'command');
  assert.strictEqual(PACKAGE_TYPES.SKILL, 'skill');
  assert.strictEqual(PACKAGE_TYPES.AGENT, 'agent');
  assert.strictEqual(PACKAGE_TYPES.HOOK, 'hook');
  assert.strictEqual(PACKAGE_TYPES.CONFIG, 'config');
});
