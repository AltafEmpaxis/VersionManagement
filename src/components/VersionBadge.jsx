import { useState, useEffect, useCallback, memo } from "react";
import { Tooltip, Paper, Typography, Box, Chip, styled } from "@mui/material";
import { Info } from "@mui/icons-material";
import versionData from "../versionData.json";
import {
  getEnvironmentStyles,
  getActiveEnvironmentInfo,
  getRecentChangelog,
  getVersionHistory,
  UPDATE_INTERVAL,
  CHANGELOG_LIMIT,
  HISTORY_LIMIT,
  formatDateTime,
} from "../utils/versionUtils";

const TooltipContent = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: 280,
  backgroundColor: theme.palette.background.paper,
  "& .MuiTypography-caption": {
    lineHeight: 1.4,
  },
}));

const StyledChip = styled(Chip)(({ theme, environment }) => ({
  ...getEnvironmentStyles(environment, theme),
}));

// Memoized version info component
const VersionInfo = memo(
  ({
    version,
    environment,
    lastUpdated,
    deployedBy,
    changelog,
    versionHistory,
  }) => (
    <>
      <VersionHeader
        version={version}
        environment={environment}
        lastUpdated={lastUpdated}
        deployedBy={deployedBy}
      />
      <ChangelogSection changes={changelog} />
      <HistorySection history={versionHistory} />
    </>
  )
);

// Header section with timestamp
const VersionHeader = memo(
  ({ version, environment, lastUpdated, deployedBy }) => (
    <Box mb={1}>
      <Typography variant="subtitle2" gutterBottom>
        {environment.toUpperCase()}: v{version}
      </Typography>
      <Typography
        variant="caption"
        display="block"
        color="text.secondary"
        sx={{ fontSize: "0.75rem" }}
      >
        Updated: {formatDateTime(lastUpdated)}
      </Typography>
      <Typography variant="caption" display="block" color="text.secondary">
        By: {deployedBy}
      </Typography>
    </Box>
  )
);

// Changelog section with timestamps
const ChangelogSection = memo(
  ({ changes }) =>
    changes?.length > 0 && (
      <Box mb={1}>
        <Typography variant="caption" color="textSecondary" display="block">
          Recent Changes:
        </Typography>
        {changes.map((log, index) => (
          <Box key={index} sx={{ mt: 0.5 }}>
            <Typography variant="caption" display="block">
              {log.message}
            </Typography>
            <Typography
              variant="caption"
              display="block"
              color="text.secondary"
              sx={{ fontSize: "0.7rem" }}
            >
              {log.timestamp} by {log.deployedBy}
            </Typography>
          </Box>
        ))}
      </Box>
    )
);

// History section with timestamps
const HistorySection = memo(
  ({ history }) =>
    history?.length > 0 && (
      <Box>
        <Typography variant="caption" color="textSecondary" display="block">
          Version History:
        </Typography>
        {history.map((entry, index) => (
          <Box key={index} sx={{ mt: 0.5 }}>
            <Typography variant="caption" display="block" color="primary">
              v{entry.version} ({entry.environment})
            </Typography>
            <Typography
              variant="caption"
              display="block"
              color="text.secondary"
              sx={{ fontSize: "0.7rem" }}
            >
              {entry.timestamp} by {entry.updatedBy}
            </Typography>
          </Box>
        ))}
      </Box>
    )
);

function VersionBadge() {
  const [versionInfo, setVersionInfo] = useState(null);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const loadVersionInfo = useCallback(() => {
    const activeEnvInfo = getActiveEnvironmentInfo(versionData);
    if (activeEnvInfo) {
      setVersionInfo(activeEnvInfo);
    }
  }, []);

  useEffect(() => {
    loadVersionInfo();
    const updateInterval = setInterval(loadVersionInfo, UPDATE_INTERVAL);
    return () => clearInterval(updateInterval);
  }, [loadVersionInfo]);

  if (!versionInfo) return null;

  const {
    currentVersion,
    currentEnv,
    lastUpdated,
    deployedBy,
    changelog,
    previousVersions,
  } = versionInfo;

  return (
    <Tooltip
      open={isTooltipOpen}
      onClose={() => setIsTooltipOpen(false)}
      onOpen={() => setIsTooltipOpen(true)}
      title={
        <TooltipContent>
          <VersionInfo
            version={currentVersion}
            environment={currentEnv}
            lastUpdated={lastUpdated}
            deployedBy={deployedBy}
            changelog={getRecentChangelog(changelog, CHANGELOG_LIMIT)}
            versionHistory={getVersionHistory(previousVersions, HISTORY_LIMIT)}
          />
        </TooltipContent>
      }
    >
      <StyledChip
        environment={currentEnv}
        icon={<Info />}
        label={`v${currentVersion} (${currentEnv.toUpperCase()})`}
        onClick={() => setIsTooltipOpen(!isTooltipOpen)}
        size="medium"
      />
    </Tooltip>
  );
}

export default memo(VersionBadge);
