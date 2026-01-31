# Claude Code Marketplace

A minimal marketplace for installing and managing Claude Code commands, skills, agents, hooks, and configurations.

## Quick Start

```bash
# Clone and setup
git clone https://github.com/MattMakes/mattmakes-claude-marketplace.git
cd mattmakes-claude-marketplace
npm install
npm link  # Make CLI globally available

# Use the marketplace
claude-marketplace list                    # Browse packages
claude-marketplace search git              # Search packages
claude-marketplace install git-commit-wizard  # Install a package
claude-marketplace installed               # View installed packages
```

## Package Types

- **command** - Executable CLI scripts (e.g., git-commit-wizard)
- **skill** - Code templates and snippets (e.g., FastAPI CRUD template)
- **agent** - AI agent configurations (e.g., code-review-agent)
- **hook** - Git hooks and integrations (e.g., pre-commit-linter)
- **config** - Configuration files (e.g., VSCode settings)

## CLI Commands

| Command | Description |
|---------|-------------|
| `list [type]` | List all packages or filter by type |
| `search <query>` | Search packages by name, description, or tags |
| `info <name>` | Show detailed package information |
| `install <name>` | Install a package to `~/.claude-marketplace` |
| `uninstall <name>` | Remove an installed package |
| `installed` | Show all installed packages |
| `help` | Display help information |

## Creating Packages

### Package Structure

Add your package to `registry/registry.json`:

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "description": "Brief description",
  "type": "command",
  "tags": ["tag1", "tag2"],
  "author": "Your Name",
  "license": "MIT",
  "files": {
    "commands/my-script.sh": "#!/bin/bash\necho 'Hello World'"
  }
}
```

### Required Fields

- `name` - Unique package identifier
- `version` - Semantic version (e.g., "1.0.0")
- `description` - Brief package description
- `type` - One of: command, skill, agent, hook, config
- `author` - Your name
- `files` - Object with file paths as keys and content as values

### Optional Fields

- `tags` - Array of search tags
- `license` - License type (default: MIT)
- `repository` - Repository URL
- `metadata` - Type-specific metadata

## Programmatic API

```javascript
import { Marketplace } from 'claude-marketplace';

const marketplace = new Marketplace();

// List and search
const packages = marketplace.list({ type: 'command' });
const results = marketplace.search('python');

// Install and manage
marketplace.install('git-commit-wizard');
const installed = marketplace.getInstalled();
marketplace.uninstall('git-commit-wizard');
```

## Testing

```bash
npm test  # Run all tests (15 tests)
```

## Contributing

1. Fork the repository
2. Add your package to `registry/registry.json`
3. Test: `claude-marketplace install your-package`
4. Submit a pull request

## License

MIT - See [LICENSE](LICENSE) file

## Repository

https://github.com/MattMakes/mattmakes-claude-marketplace