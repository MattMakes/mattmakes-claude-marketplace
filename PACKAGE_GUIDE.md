# Package Creation Guide

This guide will help you create and publish packages for the Claude Code Marketplace.

## Package Types

### 1. Commands

Executable scripts that users can run from the command line.

**Use cases:**
- Custom git workflows
- Build automation scripts
- Development utilities
- Code generation tools

**Example:**
```json
{
  "name": "my-command",
  "version": "1.0.0",
  "description": "My custom command",
  "type": "command",
  "author": "Your Name",
  "files": {
    "commands/my-command.sh": "#!/bin/bash\necho 'Hello from my command!'"
  }
}
```

### 2. Skills

Reusable code templates, snippets, and boilerplate.

**Use cases:**
- API endpoint templates
- Component boilerplate
- Common algorithms
- Design patterns

**Example:**
```json
{
  "name": "react-component-skill",
  "version": "1.0.0",
  "description": "React component template",
  "type": "skill",
  "author": "Your Name",
  "files": {
    "skills/react-component.jsx": "import React from 'react';\n\nfunction MyComponent() {\n  return <div>Component</div>;\n}\n\nexport default MyComponent;"
  }
}
```

### 3. Agents

AI agent configurations with custom prompts and settings.

**Use cases:**
- Code review agents
- Documentation generators
- Test case generators
- Refactoring assistants

**Example:**
```json
{
  "name": "my-agent",
  "version": "1.0.0",
  "description": "My AI agent",
  "type": "agent",
  "metadata": {
    "model": "claude-3-sonnet",
    "temperature": 0.3
  },
  "author": "Your Name",
  "files": {
    "agents/my-agent.json": "{\n  \"name\": \"my-agent\",\n  \"system_prompt\": \"You are a helpful assistant.\"\n}"
  }
}
```

### 4. Hooks

Git hooks and lifecycle integrations.

**Use cases:**
- Pre-commit linting
- Pre-push testing
- Commit message validation
- Automated changelog updates

**Example:**
```json
{
  "name": "pre-push-test",
  "version": "1.0.0",
  "description": "Runs tests before push",
  "type": "hook",
  "author": "Your Name",
  "files": {
    "hooks/pre-push": "#!/bin/bash\nnpm test"
  }
}
```

### 5. Config

Configuration files and settings.

**Use cases:**
- Editor settings
- Linter configurations
- Environment templates
- Build configurations

**Example:**
```json
{
  "name": "eslint-config",
  "version": "1.0.0",
  "description": "ESLint configuration",
  "type": "config",
  "author": "Your Name",
  "files": {
    "config/.eslintrc.json": "{\n  \"extends\": \"eslint:recommended\"\n}"
  }
}
```

## Package Manifest Schema

### Required Fields

- `name` (string): Unique package identifier (lowercase, hyphens allowed)
- `version` (string): Semantic version (e.g., "1.0.0")
- `description` (string): Brief package description
- `type` (string): One of: command, skill, agent, hook, config
- `author` (string): Package author name
- `files` (object): Key-value pairs of file paths and content

### Optional Fields

- `tags` (array): Search tags for discoverability
- `license` (string): License type (e.g., "MIT")
- `repository` (string): Repository URL
- `metadata` (object): Type-specific metadata

## Best Practices

### Naming

- Use lowercase with hyphens: `git-commit-wizard`
- Be descriptive but concise
- Include package type in name if helpful

### Descriptions

- Keep under 100 characters
- Clearly state the package purpose
- Mention key features

### Tags

- Include 3-5 relevant tags
- Use technology names: `python`, `javascript`, `git`
- Use categories: `testing`, `linting`, `automation`
- Use common search terms

### File Content

- Include usage comments at the top
- Follow language conventions
- Keep files focused and modular
- Include error handling
- Add helpful examples

### Versioning

Follow semantic versioning:
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes

## Testing Your Package

Before submitting:

1. **Validate structure:**
   ```bash
   node -e "console.log(JSON.parse(require('fs').readFileSync('registry/registry.json')))"
   ```

2. **Test installation:**
   ```bash
   claude-marketplace install your-package-name
   ```

3. **Verify files:**
   ```bash
   ls -la ~/.claude-marketplace/
   ```

4. **Test functionality:**
   - Run commands
   - Use skills/templates
   - Verify configurations

5. **Test uninstallation:**
   ```bash
   claude-marketplace uninstall your-package-name
   ```

## Submission Process

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/mattmakes-claude-marketplace.git
   ```

2. **Add your package to registry**
   - Edit `registry/registry.json`
   - Add your package to the `packages` array
   - Validate JSON syntax

3. **Test locally**
   ```bash
   claude-marketplace list
   claude-marketplace install your-package-name
   ```

4. **Commit and push**
   ```bash
   git add registry/registry.json
   git commit -m "Add your-package-name package"
   git push origin main
   ```

5. **Create pull request**
   - Go to GitHub repository
   - Click "New Pull Request"
   - Describe your package
   - Submit for review

## Package Review Criteria

Your package will be reviewed for:

- ✅ Valid JSON structure
- ✅ Complete required fields
- ✅ Clear description
- ✅ Proper file content
- ✅ Security considerations
- ✅ No malicious code
- ✅ Useful functionality
- ✅ Quality documentation

## Examples

See the `examples/` directory for complete package examples:
- Command example
- Skill example
- Agent example
- Hook example
- Config example

## Need Help?

- Check existing packages for reference
- Review the schema documentation
- Open an issue for questions
- Join the community discussions

Happy packaging! 🚀
