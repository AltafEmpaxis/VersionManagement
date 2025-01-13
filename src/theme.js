import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2196f3",
      lighter: "rgba(33, 150, 243, 0.08)",
    },
    secondary: {
      main: "#9c27b0",
    },
  },
  typography: {
    h3: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "&.environment-prod": {
            backgroundColor: "#4caf50",
            color: "#fff",
          },
          "&.environment-uat": {
            backgroundColor: "#ff9800",
            color: "#fff",
          },
          "&.environment-qa": {
            backgroundColor: "#2196f3",
            color: "#fff",
          },
          "&.environment-dev": {
            backgroundColor: "#9c27b0",
            color: "#fff",
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "rgba(33, 33, 33, 0.9)",
          color: "#fff",
          fontSize: "0.75rem",
          padding: "6px 12px",
          borderRadius: 6,
          maxWidth: 300,
        },
        arrow: {
          color: "rgba(33, 33, 33, 0.9)",
        },
      },
    },
  },
});

export default theme;
