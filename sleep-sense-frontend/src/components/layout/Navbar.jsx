import { Box, Typography, Stack, IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import logo from "../../assets/logo.png";
import LogoutButton from "../common/LogoutButton";
import { useAuth } from "../../context/AuthContext";

function Navbar({ toggleTheme, mode }) {
  const { user, loading } = useAuth();

  // 🔒 Hide navbar if not authenticated
  if (loading || !user) return null;

  return (
    <Box
      sx={{
        px: 6,
        py: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Logo */}
      <Stack direction="row" spacing={1} alignItems="center">
        <img src={logo} alt="Sleep Sense Logo" width={40} height={40} />
        <Typography fontWeight={600}>
          <span style={{ color: "#b3dbe2ff" }}>Sleep </span>
          <span style={{ color: "#6b8eaa" }}>Sense</span>
        </Typography>
      </Stack>

      {/* Navigation */}
      <Stack direction="row" spacing={4} alignItems="center">
        {[
          { label: "Home", path: "/home" },
          { label: "Analyze", path: "/analyze" },
          { label: "Dashboard", path: "/dashboard" },
        ].map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={{ textDecoration: "none" }}
          >
            {({ isActive }) => (
              <Box
                sx={{
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "primary.main" : "text.primary",
                  position: "relative",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    color: "#4F46E5",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    bottom: -6,
                    width: isActive ? "100%" : "0%",
                    height: 2,
                    backgroundColor: "#4F46E5",
                    transition: "width 0.2s ease",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                {item.label}
              </Box>
            )}
          </NavLink>
        ))}

        {/* Dark Mode */}
        <IconButton onClick={toggleTheme}>
          {mode === "light" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        {/* Logout */}
        <LogoutButton />
      </Stack>
    </Box>
  );
}

export default Navbar;
