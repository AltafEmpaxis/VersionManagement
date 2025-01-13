import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Link,
  Grid,
} from "@mui/material";
import { Info, ExpandMore } from "@mui/icons-material";

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
                      primary={<Typography component="span">HOTFIX</Typography>}
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
                  npm run version:dev [type] [message] # Update DEV version
                  <br />
                  npm run version:qa [type] [message] # Update QA version
                  <br />
                  npm run version:uat [type] [message] # Update UAT version
                  <br />
                  npm run release:[type] [message] # Update PROD version
                </code>
              </Alert>
              <Alert severity="success" sx={{ mt: 2 }}>
                <Typography>
                  For detailed documentation and best practices, check our{" "}
                  <Link
                    href="https://github.com/AltafEmpaxis/VersionManagement/blob/main/README.md"
                    target="_blank"
                  >
                    README
                  </Link>{" "}
                  or view the{" "}
                  <Link
                    href="https://github.com/AltafEmpaxis/VersionManagement/blob/main/RELEASELOGS.md"
                    target="_blank"
                  >
                    Release History
                  </Link>
                </Typography>
              </Alert>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default VersionGuide;
