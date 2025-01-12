## Repository files navigation

- [README](https://github.com/AltafEmpaxis/VersionManagement/blob/main/README.md)
- [MIT license](https://github.com/AltafEmpaxis/VersionManagement/blob/main/LICENSE)
- [Release Logs](https://github.com/AltafEmpaxis/VersionManagement/blob/main/RELEASELOGS.md)

# Version Management System

A robust version management system for tracking software releases across different environments.

[![GitHub Repository](https://img.shields.io/badge/GitHub-ReleaseLogs-blue.svg)](https://github.com/AltafEmpaxis/VersionManagement)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/AltafEmpaxis/VersionManagement/blob/main/LICENSE)
[![Release Logs](https://img.shields.io/badge/Release-Logs-blue.svg)](https://github.com/AltafEmpaxis/VersionManagement/blob/main/RELEASELOGS.md)
[![Deployment](https://img.shields.io/badge/deployment-Vercel-black.svg)](https://version-management.vercel.app)

## 📋 Table of Contents

- [Features](#-features)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Version Management](#-version-management)
- [Environment Management](#-environment-management)
- [Release Process](#-release-process)
- [Commands Reference](#-commands-reference)
- [Examples](#-examples)
- [Troubleshooting](#-troubleshooting)

## ✨ Features

- Environment-specific version tracking
- Automated version increments
- Release history logging
- Version display component

## 🚀 Getting Started

1. **Installation**

   ```bash
   # Clone the repository
   git clone <repository-url>
   cd your-project-name

   # Install dependencies
   npm install
   npm run dev
   ```

2. **Initial Setup**

   ```bash
   # Initialize version system
   npm run clear:versions

   # Start development
   npm run start:dev
   ```

## 📁 Project Structure

```
project-root/
├── src/
│   ├── versionData.json     # Version tracking data
│   └── ...
├── scripts/
│   └── manageVersion.js     # Version management script
├── RELEASELOGS.md          # Automated release logs
└── package.json            # NPM scripts and dependencies
```

## 📝 Version Management

### Version Format

```
MAJOR.MINOR.PATCH[-ENVIRONMENT]

Examples:
1.0.0-dev    # Development version
1.1.0-qa     # QA version
2.0.0-uat    # UAT version
1.0.1        # Production version
```

### Version Types

- **Major (x.0.0)**: Breaking changes
- **Minor (0.x.0)**: New features (backwards compatible)
- **Patch (0.0.x)**: Bug fixes
- **Hotfix**: Emergency production fixes

## 🌐 Environment Management

### Development (DEV)

```bash
# Start development server
npm run start:dev

# Update version
npm run version:dev patch "Added login feature"
npm run version:dev minor "New feature set"
npm run version:dev major "Breaking API changes"

# Build for development
npm run build:dev
```

### Quality Assurance (QA)

```bash
# Start QA server
npm run start:qa

# Update QA version
npm run version:qa patch "Fixed login bugs"
npm run version:qa minor "Feature validation"

# Build for QA
npm run build:qa
```

### User Acceptance Testing (UAT)

```bash
# Start UAT server
npm run start:uat

# Update UAT version (requires message)
npm run version:uat patch "Client feedback fixes"
npm run version:uat minor "New features for review"

# Build for UAT
npm run build:uat
```

### Production (PROD)

```bash
# Start production server
npm run start:prod

# Release commands (requires message)
npm run release:patch "Bug fixes"
npm run release:minor "New features"
npm run release:major "Breaking changes"
npm run release:hotfix "Emergency fix"

npm run version:prod major "Bug fix"

# Build for production
npm run build:prod
```

## 🔄 Release Process

1. **Development Phase**

   ```bash
   # Start development
   npm run start:dev

   # Make changes and update version
   npm run version:dev minor "New feature"

   # Build and verify
   npm run build:dev
   ```

2. **QA Phase**

   ```bash
   # Update QA version
   npm run version:qa minor "Feature testing"

   # Build for QA
   npm run build:qa
   ```

3. **UAT Phase**

   ```bash
   # Update UAT version
   npm run version:uat minor "Client review"

   # Build for UAT
   npm run build:uat
   ```

4. **Production Release**

   ```bash
   # Release to production
   npm run release:minor "New feature release"

   # Build for production
   npm run build:prod
   ```

## 💻 Commands Reference

### Version Commands

```bash
# Check versions
npm run version:dev          # Show DEV version
npm run version:qa           # Show QA version
npm run version:uat          # Show UAT version
npm run version:prod         # Show PROD version

# Update versions
npm run version:dev [type] "message"  # Update DEV
npm run version:qa [type] "message"   # Update QA
npm run version:uat [type] "message"  # Update UAT
npm run release:[type] "message"      # Update PROD
```

### Build Commands

```bash
npm run build:dev           # Build DEV
npm run build:qa            # Build QA
npm run build:uat           # Build UAT
npm run build:prod          # Build PROD
```

### Preview Commands

```bash
npm run preview:dev         # Preview DEV build
npm run preview:qa          # Preview QA build
npm run preview:uat         # Preview UAT build
npm run preview:prod        # Preview PROD build
```

### Utility Commands

```bash
npm run lint               # Run ESLint
npm run lint:fix           # Fix ESLint issues
npm run prettier           # Format code
npm run clear:versions     # Reset version system
```

## 💡 Examples

### Feature Development Workflow

```bash
# Start new feature
npm run version:dev minor "User authentication"
# Version: 1.1.0-dev

# Fix issues
npm run version:dev patch "Login validation fix"
# Version: 1.1.1-dev

# Move to QA
npm run version:qa minor "Auth ready for testing"
# Version: 1.1.0-qa

# UAT Testing
npm run version:uat minor "Auth for client review"
# Version: 1.1.0-uat

# Production Release
npm run release:minor "User authentication feature"
# Version: 1.1.0
```

### Hotfix Workflow

```bash
# Emergency production fix
npm run release:hotfix "Critical security fix"
# Version: 1.1.1

# Sync environments
npm run version:dev patch "Security fix sync"
npm run version:qa patch "Security fix sync"
npm run version:uat patch "Security fix sync"
```

## 🔧 Troubleshooting

### Common Issues

1. **Version Not Updating**

   - Check current version: `npm run version:[env]`
   - Verify environment name
   - Ensure message is provided for UAT/PROD

2. **Build Errors**

   - Run `npm run clear:versions` to reset
   - Check environment configuration
   - Verify build dependencies

3. **Release Issues**
   - Ensure proper version type (major/minor/patch)
   - Check required message for production
   - Verify git configuration for tags

### Version Reset

If you need to reset the version system:

```bash
npm run clear:versions

# Output:
✅ Version System Reset Complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Version Data: Reset to 0.0.0
• Release Logs: Reinitialized
• Timestamp: [current-time]
```

## 📝 Release Logs

View our detailed release history in our [Release Logs](https://github.com/AltafEmpaxis/VersionManagement/blob/main/RELEASELOGS.md) file.

[![Release Logs](https://img.shields.io/badge/Release-Logs-blue.svg)](https://github.com/AltafEmpaxis/VersionManagement/blob/main/RELEASELOGS.md)

The release logs include:

- Version updates across all environments
- Detailed changelog entries
- Release timestamps and authors
- System-wide updates

### Latest Release

```bash
Version: 0.0.0
Released: 2024-02-14
Type: system
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/AltafEmpaxis/VersionManagement/blob/main/LICENSE) file for details.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/AltafEmpaxis/VersionManagement/blob/main/LICENSE)

## 🔗 Links

- [GitHub Repository](https://github.com/AltafEmpaxis/VersionManagement)
- [Documentation](https://github.com/AltafEmpaxis/VersionManagement/blob/main/README.md)
- [Release Logs](https://github.com/AltafEmpaxis/VersionManagement/blob/main/RELEASELOGS.md)
- [License](https://github.com/AltafEmpaxis/VersionManagement/blob/main/LICENSE)
- [Report Issues](https://github.com/AltafEmpaxis/VersionManagement/issues)
