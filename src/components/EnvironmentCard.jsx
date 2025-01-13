import PropTypes from "prop-types";
import {
  Typography,
  Paper,
  Box,
  Chip,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import { Assessment, Build, Update, Person } from "@mui/icons-material";
import versionData from "../versionData.json";

const environmentStyles = {
  prod: {
    bg: "rgba(0, 200, 83, 0.1)",
    border: "rgba(0, 200, 83, 0.3)",
  },
  uat: {
    bg: "rgba(255, 152, 0, 0.1)",
    border: "rgba(255, 152, 0, 0.3)",
  },
  qa: {
    bg: "rgba(33, 150, 243, 0.1)",
    border: "rgba(33, 150, 243, 0.3)",
  },
  dev: {
    bg: "rgba(156, 39, 176, 0.1)",
    border: "rgba(156, 39, 176, 0.3)",
  },
};

function EnvironmentCard({ environment }) {
  const envStyles = environmentStyles[environment] || environmentStyles.dev;
  const data = versionData.environments[environment];

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        height: "100%",
        bgcolor: envStyles.bg,
        border: "1px solid",
        borderColor: envStyles.border,
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      {/* Environment Header */}
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{ fontSize: "1.1rem", fontWeight: "bold", mb: 1 }}
        >
          {environment.toUpperCase()} Environment
        </Typography>
        <Typography
          variant="subtitle1"
          color="primary"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          Version: {data.version}
        </Typography>
        <Box display="flex" alignItems="center" gap={1} mb={0.5}>
          <Update fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            Last Updated: {new Date(data.lastUpdated).toLocaleString()}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Person fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            Deployed By: {data.deployedBy}
          </Typography>
        </Box>
      </Box>

      {/* Recent Changes */}
      {data.changelog?.length > 0 && (
        <Box>
          <Divider sx={{ my: 2 }} />
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Recent Changes
          </Typography>
          <List dense sx={{ mt: 1 }}>
            {data.changelog.slice(0, 5).map((log, index) => (
              <ListItem
                key={index}
                sx={{
                  px: 1,
                  py: 1,
                  borderLeft: "2px solid",
                  borderColor: "primary.light",
                  mb: 1,
                  display: "block",
                }}
              >
                <Box display="flex" alignItems="center" gap={0.5} mb={0.5}>
                  <Typography variant="body2" sx={{ fontWeight: "medium" }}>
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
                  color="text.secondary"
                  component="div"
                  sx={{ fontSize: "0.7rem" }}
                >
                  Version {log.version} • {new Date(log.date).toLocaleString()}{" "}
                  • {log.deployedBy}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Quick Actions */}
      <Box sx={{ mt: 2 }}>
        <Divider sx={{ my: 2 }} />
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Quick Actions
        </Typography>
        <Box display="flex" gap={1} flexWrap="wrap">
          <Chip
            label={`Update ${environment}`}
            size="small"
            icon={<Build fontSize="small" />}
            onClick={() => {}}
            sx={{ fontSize: "0.75rem" }}
          />
          <Chip
            label="View Logs"
            size="small"
            icon={<Assessment fontSize="small" />}
            onClick={() => {}}
            sx={{ fontSize: "0.75rem" }}
          />
        </Box>
      </Box>
    </Paper>
  );
}

EnvironmentCard.propTypes = {
  environment: PropTypes.oneOf(["dev", "qa", "uat", "prod"]).isRequired,
};

export default EnvironmentCard;
