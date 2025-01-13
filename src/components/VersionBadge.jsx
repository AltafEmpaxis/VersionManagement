import { Tooltip, Paper, Typography, Box, Chip, Divider } from "@mui/material";
import { Info, Update, Person, History } from "@mui/icons-material";
import versionData from "../versionData.json";

// Constants
const CHANGELOG_LIMIT = 5;
const HISTORY_LIMIT = 3;

function VersionBadge() {
  const activeEnv = versionData.app.activeEnvironment;
  const envInfo = versionData.environments[activeEnv];

  if (!envInfo) return null;

  const info = {
    version: envInfo.version,
    env: activeEnv,
    updated: new Date(envInfo.lastUpdated).toLocaleString(),
    by: envInfo.deployedBy,
    logs: envInfo.changelog?.slice(0, CHANGELOG_LIMIT) || [],
    history: versionData.app.previousVersions?.slice(0, HISTORY_LIMIT) || [],
  };

  return (
    <Tooltip
      arrow
      title={
        <Paper
          elevation={3}
          sx={{
            p: 2,
            bgcolor: "background.paper",
            boxShadow: (theme) => theme.shadows[3],
            "& .MuiTypography-caption": { lineHeight: 1.4 },
            "& .MuiDivider-root": { my: 1.5 },
          }}
        >
          {/* Current Version Info */}
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontSize: "1.1rem",
                fontWeight: "bold",
                color: "text.primary",
              }}
            >
              {info.env.toUpperCase()} Environment
            </Typography>
            <Typography
              variant="subtitle1"
              color="primary"
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              Version: {info.version}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mb={0.5}>
              <Update fontSize="small" color="action" />
              <Typography variant="caption" color="text.secondary">
                Updated: {info.updated}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Person fontSize="small" color="action" />
              <Typography variant="caption" color="text.secondary">
                By: {info.by}
              </Typography>
            </Box>
          </Box>

          {/* Recent Changes */}
          {info.logs.length > 0 && (
            <>
              <Divider />
              <Box>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "text.primary" }}
                >
                  Recent Changes
                </Typography>
                {info.logs.map((log, i) => (
                  <Box
                    key={i}
                    sx={{
                      mt: 1,
                      pl: 1,
                      borderLeft: "2px solid",
                      borderColor: "primary.light",
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={0.5} mb={0.5}>
                      <Typography
                        variant="caption"
                        sx={{ fontWeight: "medium", color: "text.primary" }}
                      >
                        {log.message}
                      </Typography>
                      <Chip
                        label={log.type || "update"}
                        size="small"
                        variant="outlined"
                        sx={{
                          height: "16px",
                          fontSize: "0.6rem",
                          "& .MuiChip-label": { px: 1 },
                        }}
                      />
                    </Box>
                    <Typography
                      variant="caption"
                      display="block"
                      color="text.secondary"
                      sx={{ fontSize: "0.7rem" }}
                    >
                      Version {log.version} •{" "}
                      {new Date(log.date).toLocaleString()} • {log.deployedBy}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </>
          )}

          {/* Version History */}
          {info.history.length > 0 && (
            <>
              <Divider />
              <Box>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    color: "text.primary",
                  }}
                >
                  <History fontSize="small" />
                  Version History
                </Typography>
                {info.history.map((entry, i) => (
                  <Box key={i} sx={{ mt: 1, pl: 1 }}>
                    <Typography
                      variant="caption"
                      color="primary"
                      sx={{ fontWeight: "medium" }}
                    >
                      v{entry.version} ({entry.environment})
                    </Typography>
                    <Typography
                      variant="caption"
                      display="block"
                      color="text.secondary"
                      sx={{ fontSize: "0.7rem" }}
                    >
                      {new Date(entry.date).toLocaleString()} •{" "}
                      {entry.updatedBy}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </>
          )}
        </Paper>
      }
    >
      <Chip
        className={`environment-${info.env}`}
        icon={<Info />}
        label={`v${info.version} (${info.env.toUpperCase()})`}
        size="medium"
      />
    </Tooltip>
  );
}

export default VersionBadge;
