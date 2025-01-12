/**
 * Version management constants
 */

export const ENVIRONMENTS = {
  DEV: "dev",
  QA: "qa",
  UAT: "uat",
  PROD: "prod",
};

export const RELEASE_TYPES = {
  MAJOR: "major",
  MINOR: "minor",
  PATCH: "patch",
  HOTFIX: "hotfix",
};

export const ENV_COLORS = {
  [ENVIRONMENTS.PROD]: {
    base: "#00c853",
    rgb: "0, 200, 83",
    background: "rgba(0, 200, 83, 0.1)",
    color: "#00c853",
  },
  [ENVIRONMENTS.UAT]: {
    base: "#ff9800",
    rgb: "255, 152, 0",
    background: "rgba(255, 152, 0, 0.1)",
    color: "#ff9800",
  },
  [ENVIRONMENTS.QA]: {
    base: "#2196f3",
    rgb: "33, 150, 243",
    background: "rgba(33, 150, 243, 0.1)",
    color: "#2196f3",
  },
  [ENVIRONMENTS.DEV]: {
    base: "#9c27b0",
    rgb: "156, 39, 176",
    background: "rgba(156, 39, 176, 0.1)",
    color: "#9c27b0",
  },
};

export const UPDATE_INTERVAL = 1000; // 1 second
export const CHANGELOG_LIMIT = 2;
export const HISTORY_LIMIT = 2;

/**
 * Format date with fallback
 */
export const formatDate = (isoTimestamp) =>
  isoTimestamp ? new Date(isoTimestamp).toLocaleDateString() : "Not available";

/**
 * Format date with time
 */
export const formatDateTime = (isoTimestamp) => {
  if (!isoTimestamp) return "Not available";
  const date = new Date(isoTimestamp);
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

/**
 * Get environment styling
 */
export const getEnvironmentStyles = (environment, theme) => {
  const colors = ENV_COLORS[environment] || ENV_COLORS[ENVIRONMENTS.DEV];

  return {
    backgroundColor: colors.base,
    color: theme.palette.common.white,
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: colors.base,
      opacity: 0.9,
    },
    "& .MuiChip-icon": {
      color: "inherit",
    },
  };
};

/**
 * Get environment theme color mapping
 */
const getEnvThemeColor = (env) => {
  const mapping = {
    [ENVIRONMENTS.PROD]: "success",
    [ENVIRONMENTS.UAT]: "warning",
    [ENVIRONMENTS.QA]: "info",
    [ENVIRONMENTS.DEV]: "secondary",
  };
  return mapping[env] || mapping[ENVIRONMENTS.DEV];
};

/**
 * Get version info with defaults
 */
export const getVersionInfo = (data = {}) => ({
  version: data.version || "0.0.0",
  lastUpdated: data.lastUpdated || "",
  deployedBy: data.deployedBy || "N/A",
  changelog: data.changelog || [],
});

/**
 * Get active environment data
 */
export const getActiveEnvironmentInfo = (versionData) => {
  try {
    const activeEnv = versionData.app.activeEnvironment || ENVIRONMENTS.DEV;
    const envData = versionData.environments[activeEnv];

    if (!envData) {
      throw new Error(`Environment data not found: ${activeEnv}`);
    }

    return {
      currentVersion: envData.version,
      currentEnv: activeEnv,
      ...getVersionInfo(envData),
      previousVersions: versionData.app.previousVersions || [],
    };
  } catch (error) {
    console.error("Error getting active environment:", error);
    return null;
  }
};

/**
 * Process changelog entries
 */
export const getRecentChangelog = (changelog = [], limit) =>
  changelog.slice(0, limit).map((entry) => ({
    version: entry.version,
    timestamp: formatDateTime(entry.date),
    message: entry.message,
    deployedBy: entry.deployedBy,
  }));

/**
 * Process version history
 */
export const getVersionHistory = (versions = [], limit) =>
  versions.slice(0, limit).map((entry) => ({
    version: entry.version,
    timestamp: formatDateTime(entry.date),
    environment: entry.environment.toUpperCase(),
    updatedBy: entry.updatedBy,
  }));
