import React from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  styled,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Link,
} from "@mui/material";
import {
  Assessment,
  Build,
  CheckCircle,
  Schedule,
  Person,
  ExpandMore,
  Info,
} from "@mui/icons-material";
import versionData from "./versionData.json";
import VersionBadge from "./components/VersionBadge";

// Styled Components
const VersionCard = styled(Paper)(({ theme, environment }) => ({
  padding: theme.spacing(3),
  height: "100%",
  backgroundColor:
    environment === "prod"
      ? "rgba(0, 200, 83, 0.1)"
      : environment === "uat"
      ? "rgba(255, 152, 0, 0.1)"
      : environment === "qa"
      ? "rgba(33, 150, 243, 0.1)"
      : "rgba(156, 39, 176, 0.1)",
  border: "1px solid",
  borderColor:
    environment === "prod"
      ? "rgba(0, 200, 83, 0.3)"
      : environment === "uat"
      ? "rgba(255, 152, 0, 0.3)"
      : environment === "qa"
      ? "rgba(33, 150, 243, 0.3)"
      : "rgba(156, 39, 176, 0.3)",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-4px)",
  },
}));

const VersionChip = styled(Chip)(({ theme, environment }) => ({
  backgroundColor:
    environment === "prod"
      ? "rgba(0, 200, 83, 0.2)"
      : environment === "uat"
      ? "rgba(255, 152, 0, 0.2)"
      : environment === "qa"
      ? "rgba(33, 150, 243, 0.2)"
      : "rgba(156, 39, 176, 0.2)",
  color:
    environment === "prod"
      ? "#00c853"
      : environment === "uat"
      ? "#ff9800"
      : environment === "qa"
      ? "#2196f3"
      : "#9c27b0",
  fontWeight: "bold",
}));

function VersionGuide() {
  return (
    <Box mb={4}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Box display="flex" alignItems="center">
            <Info sx={{ mr: 1 }} color="primary" />
            <Typography variant="h6">Version Management Guide</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.50" }}>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  Version Format
                </Typography>
                <Typography variant="body2" paragraph>
                  MAJOR.MINOR.PATCH[-ENVIRONMENT]
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography component="span">MAJOR (x.0.0)</Typography>
                      }
                      secondary={
                        <Typography component="span" variant="body2">
                          Breaking changes
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography component="span">MINOR (0.x.0)</Typography>
                      }
                      secondary={
                        <Typography component="span" variant="body2">
                          New features (backwards compatible)
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography component="span">PATCH (0.0.x)</Typography>
                      }
                      secondary={
                        <Typography component="span" variant="body2">
                          Bug fixes and minor updates
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography component="span">
                          HOTFIX (0.0.0.1)
                        </Typography>
                      }
                      secondary={
                        <Typography component="span" variant="body2">
                          Emergency fixes for production
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.50" }}>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  Environment Workflow
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography component="span">
                          Development (DEV)
                        </Typography>
                      }
                      secondary={
                        <Box component="span">
                          <code>npm run version:dev [type] [message]</code>
                          <br />
                          Initial development and feature work
                        </Box>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography component="span">
                          Quality Assurance (QA)
                        </Typography>
                      }
                      secondary={
                        <Box component="span">
                          <code>npm run version:qa [type] [message]</code>
                          <br />
                          Testing and validation
                        </Box>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography component="span">
                          User Acceptance (UAT)
                        </Typography>
                      }
                      secondary={
                        <Box component="span">
                          <code>npm run version:uat [type] [message]</code>
                          <br />
                          Client testing and verification
                        </Box>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography component="span">
                          Production (PROD)
                        </Typography>
                      }
                      secondary={
                        <Box component="span">
                          <code>npm run release:[type] [message]</code>
                          <br />
                          Live environment
                        </Box>
                      }
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Quick Commands:
                </Typography>
                <code>
                  npm run deploy:dev # Deploy to DEV
                  <br />
                  npm run deploy:qa # Deploy to QA
                  <br />
                  npm run deploy:uat # Deploy to UAT
                  <br />
                  npm run deploy:prod # Deploy to Production
                </code>
              </Alert>
              <Alert severity="success" sx={{ mt: 2 }}>
                <Typography>
                  For detailed documentation, configuration options, and best
                  practices, please check our{" "}
                  <Link
                    href="https://github.com/yourusername/your-repo/blob/main/README.md"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    README.md
                  </Link>{" "}
                  file.
                </Typography>
              </Alert>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

function VersionInfo({ environment }) {
  const envData = versionData.environments[environment];

  return (
    <VersionCard environment={environment} elevation={3}>
      <Box display="flex" alignItems="center" mb={2}>
        <Assessment sx={{ mr: 1 }} />
        <Typography variant="h6" component="h3">
          {environment.toUpperCase()} Environment
        </Typography>
      </Box>

      <Box mb={3}>
        <VersionChip
          environment={environment}
          label={`Version: ${envData.version}`}
          icon={<Build />}
        />
      </Box>

      <Box mb={2}>
        <Box display="flex" alignItems="center" mb={1}>
          <Schedule sx={{ mr: 1, fontSize: "small" }} />
          <Typography variant="body2" color="text.secondary">
            Last Updated: {envData.lastUpdated || "Not deployed yet"}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Person sx={{ mr: 1, fontSize: "small" }} />
          <Typography variant="body2" color="text.secondary">
            Deployed By: {envData.deployedBy || "N/A"}
          </Typography>
        </Box>
      </Box>

      <Typography variant="subtitle2" gutterBottom>
        Recent Changes
      </Typography>
      <List dense sx={{ mt: 1 }}>
        {envData.changelog.slice(0, 5).map((log, index) => (
          <ListItem
            key={index}
            divider={index < envData.changelog.length - 1}
            sx={{ px: 0 }}
          >
            <ListItemText
              primary={
                <Box display="flex" alignItems="center" component="span">
                  <CheckCircle sx={{ mr: 1, fontSize: "small" }} />
                  <Typography variant="body2" component="span">
                    {log.version}
                  </Typography>
                </Box>
              }
              secondary={
                <Box component="span" sx={{ mt: 0.5 }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    component="span"
                    display="block"
                  >
                    {new Date(log.date).toLocaleDateString()}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component="span"
                  >
                    {log.message}
                  </Typography>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    </VersionCard>
  );
}

function App() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb={4}
        position="relative"
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          sx={{ mb: 0 }}
        >
          Version Management
        </Typography>
        <Box sx={{ position: "absolute", right: 0 }}>
          <VersionBadge />
        </Box>
      </Box>

      <VersionGuide />

      <Grid container spacing={3}>
        {["dev", "qa", "uat", "prod"].map((env) => (
          <Grid item xs={12} sm={6} md={3} key={env}>
            <VersionInfo environment={env} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
