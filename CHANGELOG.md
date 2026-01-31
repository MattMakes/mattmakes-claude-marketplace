# Changelog

All notable changes to the Claude Code Marketplace will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-31

### Added

#### Core Features
- **Marketplace System**: Complete package management system for Claude Code
- **Package Registry**: Centralized registry with support for 5 package types
- **CLI Tool**: Command-line interface for managing packages
- **Package Types**:
  - Commands: Executable CLI scripts
  - Skills: Reusable code templates
  - Agents: AI agent configurations
  - Hooks: Git hooks and lifecycle integrations
  - Config: Configuration files and settings

#### CLI Commands
- `list` - List all packages or filter by type
- `search` - Search packages by name, description, or tags
- `install` - Install packages to local directory
- `uninstall` - Remove installed packages
- `installed` - View currently installed packages
- `info` - Show detailed package information
- `help` - Display usage information

#### Initial Packages
- **git-commit-wizard** (command) - Interactive commit message wizard
- **python-fastapi-skill** (skill) - FastAPI CRUD operations template
- **code-review-agent** (agent) - AI code review configuration
- **pre-commit-linter** (hook) - Pre-commit linting hook
- **vscode-settings** (config) - VSCode optimized settings

#### API
- `Marketplace` class for programmatic access
- `validateManifest()` function for package validation
- `createManifestTemplate()` for generating package templates
- `PACKAGE_TYPES` constants

#### Documentation
- README with comprehensive usage instructions
- PACKAGE_GUIDE for creating new packages
- API documentation with examples
- CONTRIBUTING guide for contributors
- Example package templates

#### Testing
- Schema validation tests
- Marketplace operation tests
- Full integration test suite
- 15 passing unit tests

#### Development
- ES module support
- Node.js 18+ compatibility
- MIT License
- .gitignore configuration

### Features Details

#### Package Management
- Install packages to `~/.claude-marketplace`
- Automatic directory structure creation
- File permission management (executable for commands/hooks)
- Installed package tracking
- Version management

#### Search & Discovery
- Search by name, description, and tags
- Filter by package type
- Color-coded output for different package types
- Detailed package information view

#### Validation
- Semantic version validation
- Required field checking
- Package type validation
- Manifest structure validation

## [Unreleased]

### Planned Features
- Remote registry support
- Package dependencies
- Package ratings and reviews
- Update notifications
- Bulk install/uninstall
- Package templates generator
- Web interface
- Community contributions

---

## Version History

- **1.0.0** (2026-01-31) - Initial release with core functionality
