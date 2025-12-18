import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import { lightTheme, darkTheme } from "./theme";
import { AuthProvider } from "./context/AuthContext";

function Root() {
  const [mode, setMode] = useState("light");

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <AuthProvider>
        <App toggleTheme={toggleTheme} mode={mode} />
      </AuthProvider>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
