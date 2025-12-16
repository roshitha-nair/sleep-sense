import { createTheme } from "@mui/material/styles";

const commonTypography = {
  fontFamily: "Inter, Arial, sans-serif",
  h1: {
    fontSize: "2rem",
    fontWeight: 600,
  },
  h2: {
    fontSize: "1.5rem",
    fontWeight: 600,
  },
  body1: {
    fontSize: "1rem",
  },
};

/* 🌞 Light Theme */
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4F46E5", // Indigo
    },
    success: {
      main: "#22C55E",
    },
    warning: {
      main: "#F59E0B",
    },
    error: {
      main: "#EF4444",
    },
    background: {
      default: "#F9FAFB",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#111827",
      secondary: "#6B7280",
    },
  },
  typography: commonTypography,
});

/* 🌙 Dark Theme */
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#818CF8", // lighter indigo for dark bg
    },
    success: {
      main: "#22C55E",
    },
    warning: {
      main: "#FBBF24",
    },
    error: {
      main: "#F87171",
    },
    background: {
      default: "#0F172A",
      paper: "#020617",
    },
    text: {
      primary: "#E5E7EB",
      secondary: "#9CA3AF",
    },
  },
  typography: commonTypography,
});
