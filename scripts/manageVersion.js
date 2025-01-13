/* global process */
import { readFileSync, writeFileSync, appendFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class VersionManager {
  constructor() {
    this.versionFilePath = join(__dirname, "../src/versionData.json");
    this.releaseLogsPath = join(__dirname, "../RELEASELOGS.md");
    this.versionData = this.loadVersionData();
    this.environmentConfigs = {
      dev: {
        suffix: "-dev",
        requiresMessage: false,
        autoIncrement: true,
      },
      qa: {
        suffix: "-qa",
        requiresMessage: false,
        autoIncrement: true,
      },
      uat: {
        suffix: "-uat",
        requiresMessage: true,
        autoIncrement: true,
      },
      prod: {
        suffix: "",
        requiresMessage: true,
        autoIncrement: false,
      },
    };
  }

  loadVersionData() {
    try {
      return JSON.parse(readFileSync(this.versionFilePath, "utf8"));
    } catch (error) {
      console.error("Error loading version data:", error);
      return this.getDefaultConfig();
    }
  }

  getDefaultConfig() {
    return {
      app: {
        currentVersion: "1.0.0",
        lastUpdated: new Date().toISOString(),
        updatedBy: "System",
        activeEnvironment: "dev",
        previousVersions: [],
      },
      environments: {
        dev: {
          version: "1.0.0-dev",
          lastUpdated: new Date().toISOString(),
          deployedBy: "System",
          changelog: [],
        },
        qa: {
          version: "1.0.0-qa",
          lastUpdated: new Date().toISOString(),
          deployedBy: "System",
          changelog: [],
        },
        uat: {
          version: "1.0.0-uat",
          lastUpdated: new Date().toISOString(),
          deployedBy: "System",
          changelog: [],
        },
        prod: {
          version: "1.0.0",
          lastUpdated: new Date().toISOString(),
          deployedBy: "System",
          changelog: [],
        },
      },
      config: {
        releaseTypes: ["major", "minor", "patch", "hotfix"],
        branchPrefix: {
          feature: "feature/",
          bugfix: "bugfix/",
          hotfix: "hotfix/",
          release: "release/",
        },
      },
    };
  }

  saveVersionData() {
    try {
      writeFileSync(
        this.versionFilePath,
        JSON.stringify(this.versionData, null, 2),
        "utf8"
      );
    } catch (error) {
      console.error("Error saving version data:", error);
      process.exit(1);
    }
  }

  validateEnvironment(environment) {
    const validEnvironments = ["dev", "qa", "uat", "prod"];
    if (!validEnvironments.includes(environment)) {
      throw new Error(
        `Invalid environment. Use one of: ${validEnvironments.join(", ")}`
      );
    }
  }

  validateReleaseType(type) {
    const validTypes = ["major", "minor", "patch", "hotfix"];
    if (!validTypes.includes(type)) {
      throw new Error(
        `Invalid release type. Use one of: ${validTypes.join(", ")}`
      );
    }
  }

  parseVersion(version) {
    const [base, env] = version.split("-");
    const [major, minor, patch] = base.split(".").map(Number);
    return {
      major: major || 0,
      minor: minor || 0,
      patch: patch || 0,
      env: env || "",
    };
  }

  incrementVersion(version, type) {
    const { major, minor, patch, env } = this.parseVersion(version);
    const suffix = env ? `-${env}` : "";

    switch (type) {
      case "major":
        return `${major + 1}.0.0${suffix}`;
      case "minor":
        return `${major}.${minor + 1}.0${suffix}`;
      case "patch":
        return `${major}.${minor}.${patch + 1}${suffix}`;
      case "hotfix":
        return `${major}.${minor}.${patch + 1}${suffix}`;
      default:
        throw new Error("Invalid release type");
    }
  }

  appendReleaseLog(environment, type, version, message, user) {
    const now = new Date();
    const timestamp = now.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const releaseLog = `
## ${version} (${environment.toUpperCase()})

**Released:** ${timestamp}
**Type:** ${type}
**Author:** ${user}

### Changes

- ${message || `${type} version update`}

---
`;

    try {
      appendFileSync(this.releaseLogsPath, releaseLog, "utf8");
    } catch (error) {
      console.error("Error updating release logs:", error);
    }
  }

  updateVersion(environment, type, message) {
    this.validateEnvironment(environment);

    const envConfig = this.environmentConfigs[environment];

    if (envConfig.requiresMessage && !message) {
      throw new Error(
        `Message is required for ${environment} environment updates`
      );
    }

    if (!type && envConfig.autoIncrement) {
      type = "patch"; // Default to patch for auto-increment environments
    }

    if (type) {
      this.validateReleaseType(type);
    }

    const env = this.versionData.environments[environment];
    const currentVersion = env.version;
    const newVersion = type
      ? this.incrementVersion(currentVersion, type)
      : currentVersion;
    const timestamp = new Date().toISOString();
    const user = process.env.USER || process.env.USERNAME || "System";

    env.version = newVersion;
    env.lastUpdated = timestamp;
    env.deployedBy = user;

    // Update app-level activeEnvironment for any environment update
    this.versionData.app.activeEnvironment = environment;

    if (type || message) {
      const changelogEntry = {
        version: newVersion,
        type: type || "update",
        date: timestamp,
        message: message || `${type || "Version"} update`,
        deployedBy: user,
      };

      env.changelog = [changelogEntry, ...(env.changelog || [])].slice(0, 10);

      // Append to release logs only for significant updates
      if (type || environment === "prod") {
        this.appendReleaseLog(
          environment,
          type || "update",
          newVersion,
          message,
          user
        );
      }
    }

    // Update additional app-level information for production releases
    if (environment === "prod") {
      this.versionData.app.currentVersion = newVersion;
      this.versionData.app.lastUpdated = timestamp;
      this.versionData.app.updatedBy = user;

      const historyEntry = {
        version: currentVersion,
        date: timestamp,
        environment,
        updatedBy: user,
      };

      this.versionData.app.previousVersions = [
        historyEntry,
        ...(this.versionData.app.previousVersions || []),
      ].slice(0, 10);
    }

    this.saveVersionData();
    return newVersion;
  }

  clearVersionData() {
    // Default configuration for fresh start
    const defaultConfig = {
      app: {
        currentVersion: "0.0.0",
        lastUpdated: new Date().toISOString(),
        updatedBy: "System",
        activeEnvironment: "dev",
        previousVersions: [],
      },
      environments: {
        dev: {
          version: "0.0.0-dev",
          lastUpdated: new Date().toISOString(),
          deployedBy: "System",
          changelog: [],
        },
        qa: {
          version: "0.0.0-qa",
          lastUpdated: new Date().toISOString(),
          deployedBy: "System",
          changelog: [],
        },
        uat: {
          version: "0.0.0-uat",
          lastUpdated: new Date().toISOString(),
          deployedBy: "System",
          changelog: [],
        },
        prod: {
          version: "0.0.0",
          lastUpdated: new Date().toISOString(),
          deployedBy: "System",
          changelog: [],
        },
      },
      config: {
        releaseTypes: ["major", "minor", "patch", "hotfix"],
        branchPrefix: {
          feature: "feature/",
          bugfix: "bugfix/",
          hotfix: "hotfix/",
          release: "release/",
        },
      },
    };

    // Reset version data
    this.versionData = defaultConfig;
    this.saveVersionData();

    // Create new release logs file
    const initialReleaseLog = `# Release Logs

This file automatically tracks all version updates across environments.

## Version Management Guidelines

### Release Types
- **Major (x.0.0)**: Breaking changes
- **Minor (0.x.0)**: New features (backwards compatible)
- **Patch (0.0.x)**: Bug fixes and minor updates
- **Hotfix**: Emergency fixes for production

### Environments
- **DEV**: Development environment
- **QA**: Quality Assurance
- **UAT**: User Acceptance Testing
- **PROD**: Production

### Version Format
\`\`\`
MAJOR.MINOR.PATCH[-ENVIRONMENT]
Example: 1.0.0-dev, 2.1.0-qa, 3.0.0
\`\`\`

---

## 0.0.0 (System Reset)

**Released:** ${new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })}
**Type:** system
**Author:** System

### Changes
- Version system reset
- All environments initialized to 0.0.0
- Release logs cleared

---
`;

    try {
      writeFileSync(this.releaseLogsPath, initialReleaseLog, "utf8");
      return {
        success: true,
        message: "Version system successfully reset",
        details: {
          versionData: "Reset to 0.0.0",
          releaseLogs: "Cleared and reinitialized",
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      throw new Error(`Failed to reset version system: ${error.message}`);
    }
  }

  getVersionInfo(environment) {
    this.validateEnvironment(environment);
    return this.versionData.environments[environment];
  }
}

// Enhanced CLI handling
function main() {
  const manager = new VersionManager();
  const [command, releaseType, ...messageParts] = process.argv.slice(2);
  const message = messageParts.join(" ");

  try {
    if (command === "clear") {
      const resetResult = manager.clearVersionData();
      console.log(`
✅ Version System Reset Complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Version Data: ${resetResult.details.versionData}
• Release Logs: ${resetResult.details.releaseLogs}
• Timestamp: ${new Date().toLocaleString()}

All environments have been reset to their initial state.
Use 'npm run version:dev' to start development with new versions.
`);
      return;
    }

    if (!command) {
      console.log(`
Usage:
  Version update: node manageVersion.js <environment> [type] [message]
  Clear versions: node manageVersion.js clear

Environments: dev, qa, uat, prod
Types: major, minor, patch, hotfix (optional for dev/qa)
Message: Required for UAT and PROD environments
      `);
      process.exit(1);
    }

    const newVersion = manager.updateVersion(command, releaseType, message);
    console.log(`✅ Successfully updated ${command} to version ${newVersion}`);

    if (command === "prod") {
      console.log(`
🚨 Production Release Checklist:
1. Create git tag: git tag -a v${newVersion} -m 'Release ${newVersion}'
2. Push the tag: git push origin v${newVersion}
3. Verify deployment status
4. Update release documentation
      `);
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

main();
