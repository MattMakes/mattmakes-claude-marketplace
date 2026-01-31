# Contributing to Claude Code Marketplace

Thank you for your interest in contributing to the Claude Code Marketplace! This document provides guidelines for contributing packages and code improvements.

## Ways to Contribute

1. **Add new packages** - Share your commands, skills, agents, hooks, or configs
2. **Improve existing packages** - Update and enhance current packages
3. **Fix bugs** - Report and fix issues
4. **Improve documentation** - Help make the docs clearer
5. **Add features** - Suggest and implement new marketplace features

## Adding a New Package

### Step 1: Create Your Package

Follow the [Package Creation Guide](PACKAGE_GUIDE.md) to create your package manifest.

**Quick checklist:**
- [ ] Package name is unique and descriptive
- [ ] Version follows semantic versioning (e.g., "1.0.0")
- [ ] Description is clear and concise
- [ ] Type is correct (command/skill/agent/hook/config)
- [ ] Tags are relevant and helpful
- [ ] Files contain working code
- [ ] Author and license fields are filled

### Step 2: Test Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MattMakes/mattmakes-claude-marketplace.git
   cd mattmakes-claude-marketplace
   ```

2. **Add your package to `registry/registry.json`:**
   ```json
   {
     "version": "1.0.0",
     "packages": [
       ...existing packages...,
       {
         "name": "your-package-name",
         "version": "1.0.0",
         "description": "Your package description",
         "type": "command",
         "tags": ["tag1", "tag2"],
         "author": "Your Name",
         "license": "MIT",
         "files": {
           "path/to/file": "file content"
         }
       }
     ]
   }
   ```

3. **Validate JSON syntax:**
   ```bash
   node -e "console.log(JSON.parse(require('fs').readFileSync('registry/registry.json')))"
   ```

4. **Test installation:**
   ```bash
   node src/cli.js list
   node src/cli.js info your-package-name
   node src/cli.js install your-package-name
   ```

5. **Verify functionality:**
   - For commands: Run the command and verify it works
   - For skills: Copy the code and verify it compiles/runs
   - For agents: Check the configuration is valid
   - For hooks: Test the hook behavior
   - For configs: Verify the configuration is correct

6. **Test uninstallation:**
   ```bash
   node src/cli.js uninstall your-package-name
   ```

### Step 3: Submit a Pull Request

1. **Fork the repository** on GitHub

2. **Create a feature branch:**
   ```bash
   git checkout -b add-your-package-name
   ```

3. **Commit your changes:**
   ```bash
   git add registry/registry.json
   git commit -m "Add your-package-name package"
   ```

4. **Push to your fork:**
   ```bash
   git push origin add-your-package-name
   ```

5. **Create a Pull Request** with:
   - Clear title: "Add [package-name] package"
   - Description of what the package does
   - Type of package
   - Any special installation or usage notes

## Package Review Process

Your package will be reviewed for:

1. **Functionality** - Does it work as described?
2. **Security** - Is the code safe to run?
3. **Quality** - Is the code well-written?
4. **Documentation** - Are usage instructions clear?
5. **Naming** - Is the name descriptive and unique?
6. **Licensing** - Is the license compatible?

## Code Contributions

### Setting Up Development Environment

```bash
git clone https://github.com/MattMakes/mattmakes-claude-marketplace.git
cd mattmakes-claude-marketplace
npm install
```

### Running Tests

```bash
npm test
```

### Code Style

- Use modern JavaScript (ES modules)
- Follow existing code formatting
- Add JSDoc comments for functions
- Keep functions focused and small
- Handle errors gracefully

### Adding Features

1. **Open an issue first** to discuss the feature
2. **Write tests** for new functionality
3. **Update documentation** (README, API.md, etc.)
4. **Keep changes focused** - one feature per PR
5. **Test thoroughly** before submitting

## Package Guidelines

### Security

- ❌ **Never** include passwords, API keys, or secrets
- ❌ **Never** include malicious code
- ❌ **Never** include code that accesses sensitive data
- ✅ **Do** validate inputs
- ✅ **Do** handle errors properly
- ✅ **Do** follow security best practices

### Quality

- ✅ Write clear, readable code
- ✅ Include helpful comments
- ✅ Use proper error handling
- ✅ Test edge cases
- ✅ Follow language conventions
- ✅ Keep dependencies minimal

### Documentation

- ✅ Include usage examples in comments
- ✅ Document parameters and return values
- ✅ Explain complex logic
- ✅ Provide clear error messages
- ✅ Add helpful descriptions

## Versioning

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
- **MINOR** (1.0.0 → 1.1.0): New features (backward compatible)
- **PATCH** (1.0.0 → 1.0.1): Bug fixes

## Updating Existing Packages

1. **Increment version** appropriately
2. **Test the update** thoroughly
3. **Document changes** in the PR description
4. **Note breaking changes** if any

## Reporting Issues

When reporting issues:

1. **Check existing issues** first
2. **Use a clear title** describing the problem
3. **Provide details:**
   - Package name and version
   - Node.js version
   - Operating system
   - Steps to reproduce
   - Expected vs actual behavior
4. **Include error messages** if any

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Give constructive feedback
- Focus on the code, not the person
- Assume good intentions

## Questions?

- 📖 Check the [README](README.md)
- 📚 Read the [Package Guide](PACKAGE_GUIDE.md)
- 🔍 Browse [API Documentation](API.md)
- 💬 Open a discussion on GitHub
- 🐛 Report issues on the issue tracker

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to the Claude Code Marketplace! 🚀
