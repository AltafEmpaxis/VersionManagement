import {
  Box,
  Container,
  Typography,
  Link,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import { GitHub as GitHubIcon } from "@mui/icons-material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        mt: "auto",
        borderTop: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Version Management System. Developed by{" "}
            <Link
              href="https://altaf-portfolio.netlify.app/"
              target="_blank"
              color="primary"
              sx={{ fontWeight: 500 }}
            >
              Altaf Empaxis
            </Link>
          </Typography>

          <Stack direction="row" spacing={1}>
            <Tooltip title="GitHub Profile" arrow>
              <IconButton
                size="small"
                color="primary"
                href="https://github.com/AltafEmpaxis"
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
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
