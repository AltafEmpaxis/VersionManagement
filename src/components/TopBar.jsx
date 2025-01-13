import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  IconButton,
  Tooltip,
  Stack,
} from "@mui/material";
import {
  GitHub as GitHubIcon,
  MenuBook as DocsIcon,
  History as HistoryIcon,
} from "@mui/icons-material";
import VersionBadge from "./VersionBadge";

function TopBar() {
  return (
    <AppBar
      position="sticky"
      color="default"
      //   elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
        mb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ minHeight: 64 }}>
          {/* Left side - Logo & Title */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              component="img"
              src="/vite.svg"
              alt="Logo"
              sx={{
                height: 32,
                width: 32,
                display: "block",
              }}
            />
            <Typography
              variant="h6"
              component="h1"
              sx={{
                fontWeight: 600,
                color: "text.primary",
                letterSpacing: "-0.5px",
              }}
            >
              Version Management
            </Typography>
          </Stack>

          {/* Right side - Actions */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ ml: "auto" }}
          >
            <VersionBadge />

            <Box
              sx={{
                height: 24,
                mx: 2,
                borderLeft: 1,
                borderColor: "divider",
              }}
            />

            <Tooltip title="Documentation" arrow>
              <IconButton
                color="primary"
                size="small"
                href="https://github.com/AltafEmpaxis/VersionManagement/blob/main/README.md"
                target="_blank"
                sx={{
                  "&:hover": {
                    bgcolor: "primary.lighter",
                  },
                }}
              >
                <DocsIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Release History" arrow>
              <IconButton
                color="primary"
                size="small"
                href="https://github.com/AltafEmpaxis/VersionManagement/blob/main/RELEASELOGS.md"
                target="_blank"
                sx={{
                  "&:hover": {
                    bgcolor: "primary.lighter",
                  },
                }}
              >
                <HistoryIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="GitHub Repository" arrow>
              <IconButton
                color="primary"
                size="small"
                href="https://github.com/AltafEmpaxis/VersionManagement"
                target="_blank"
                sx={{
                  "&:hover": {
                    bgcolor: "primary.lighter",
                  },
                }}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TopBar;
