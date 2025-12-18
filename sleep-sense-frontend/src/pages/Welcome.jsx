import { Box, Typography, Paper, tableBodyClasses } from "@mui/material";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import AppButton from "../components/common/AppButton";
import logo from "../assets/logo.png";

function Welcome() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // 🔒 If user already logged in → Home
  if (user) {
    return <Navigate to="/home" replace />;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        {/* LOGO */}
        <Box
          sx={{
            width: 100,
            height: 100,
            mx: "auto",
            mb: 4,
            borderRadius: 4,
            backgroundColor: "background.paper",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 12px 30px rgba(0,0,0,0.12)",
          }}
        >
          <img
            src={logo}
            alt="Sleep Sense Logo"
            style={{ width: 85, height: 85 }}
          />
        </Box>

        {/* CARD */}
        <Paper
          sx={{
            maxWidth: 640,
            p: 6,
            borderRadius: 4,
            boxShadow: "0px 20px 50px rgba(0,0,0,0.08)",
          }}
        >
          <Typography variant="h1" mb={2.5}>
             
            <span style={{ color: "#6b8eaa" }}>Welcome </span>
            <span style={{ color: "#6b8eaa" }}>to</span> 
            <span style={{ color: "#6b8eaa" }}> Sleep </span>
            <span style={{ color: "#6b8eaa" }}>Sense</span>
          </Typography>

          <Typography color="text.secondary" mb={3} fontWeight={800}>
            Your personal AI-powered sleep quality companion
          </Typography>

          <Typography
            color="text.secondary"
            maxWidth={480}
            mx="auto"
            mb={5}
          >
            Analyze your sleep habits, track your progress, and receive
            personalized insights to improve your rest.
          </Typography>

          {/* CTA */}
          <AppButton
            size="large"
            onClick={() => navigate("/signup")}
          >
            Get Started
          </AppButton>

          {/* LOGIN */}
          <Typography mt={3} fontSize="0.95rem" color="text.secondary">
            Already have an account?{" "}
            <Box
              component="span"
              sx={{
                color: "primary.main",
                fontWeight: 500,
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() => navigate("/login")}
            >
              Log in
            </Box>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}

export default Welcome;
