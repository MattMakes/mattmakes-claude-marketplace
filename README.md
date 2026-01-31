# Claude Code Marketplace

A marketplace for installing and managing Claude Code commands, skills, agents, hooks, and other configurations.

## Overview

The Claude Code Marketplace provides a centralized registry for discovering and installing reusable components that enhance your Claude development experience. Whether you need a handy git command, a FastAPI template, an AI agent configuration, or custom git hooks, the marketplace has you covered.

## Package Types

- **Commands**: Executable CLI commands and scripts
- **Skills**: Reusable code templates and snippets
- **Agents**: AI agent configurations with custom prompts and settings
- **Hooks**: Git hooks and lifecycle integrations
- **Config**: Configuration files and settings

## Installation

Clone the repository and install:

```bash
git clone https://github.com/MattMakes/mattmakes-claude-marketplace.git
cd mattmakes-claude-marketplace
npm install
```

Make the CLI globally accessible:

```bash
npm link
```

Or run directly:

```bash
node src/cli.js <command>
```

## Usage

### List All Packages

```bash
claude-marketplace list
```

### List Packages by Type

```bash
claude-marketplace list command
claude-marketplace list skill
claude-marketplace list agent
```

### Search Packages

```bash
claude-marketplace search git
claude-marketplace search python
```

### Get Package Info

```bash
claude-marketplace info git-commit-wizard
```

### Install a Package

```bash
claude-marketplace install git-commit-wizard
```

Packages are installed to `~/.claude-marketplace/` by default.

### View Installed Packages

```bash
claude-marketplace installed
```

### Uninstall a Package

```bash
claude-marketplace uninstall git-commit-wizard
```

## Available Packages

### Commands

- **git-commit-wizard**: Interactive git commit message wizard with conventional commits support

### Skills

- **python-fastapi-skill**: FastAPI REST endpoint skill with CRUD operations template

### Agents

- **code-review-agent**: AI agent configuration for automated code reviews

### Hooks

- **pre-commit-linter**: Pre-commit hook that runs linters and formatters

### Config

- **vscode-settings**: VSCode settings optimized for Claude development

## Creating Your Own Packages

### Package Manifest Structure

Each package requires a manifest with the following structure:

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "description": "Package description",
  "type": "command|skill|agent|hook|config",
  "tags": ["tag1", "tag2"],
  "author": "Your Name",
  "license": "MIT",
  "files": {
    "path/to/file": "file content here"
  }
}
```

### Adding to Registry

1. Create your package manifest following the schema
2. Add it to `registry/registry.json` in the `packages` array
3. Test installation: `claude-marketplace install your-package-name`
4. Submit a pull request

### Package Guidelines

- Use clear, descriptive names
- Include comprehensive descriptions
- Add relevant tags for discoverability
- Test your package before submitting
- Follow community coding standards
- Include usage instructions in file comments

## Development

### Run Tests

```bash
npm test
```

### Project Structure

```
.
├── src/
│   ├── cli.js           # CLI interface
│   ├── marketplace.js   # Core marketplace logic
│   ├── schema.js        # Package schema and validation
│   └── index.js         # Main exports
├── registry/
│   └── registry.json    # Package registry
├── packages/            # Package source files (optional)
├── examples/            # Example packages
└── README.md
```

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Add your package or improvement
4. Test thoroughly
5. Submit a pull request

## License

MIT

## Author

MattMakes

## Support

For issues, questions, or contributions, please visit:
https://github.com/MattMakes/mattmakes-claude-marketplace