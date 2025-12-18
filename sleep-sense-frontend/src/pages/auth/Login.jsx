import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AppButton from "../../components/common/AppButton";
import logo from "../../assets/logo.png";

function Login() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // 🔒 If already logged in → Home
  if (user) {
    return <Navigate to="/home" replace />;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      navigate("/home");
    } catch (err) {
        if (err.code === "auth/user-not-found") {
            setError("No account found with this email");
        } else if (err.code === "auth/wrong-password") {
            setError("Incorrect password");
        } else {
            setError("Login failed. Try again.");
        }
    }
    };

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
            mt:10
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
            width: 520,
            p: 6,
            borderRadius: 4,
            boxShadow: "0px 20px 50px rgba(0,0,0,0.08)",
          }}
        >
          <Typography variant="h1" mb={1}>
            Welcome Back
          </Typography>

          <Typography color="text.secondary" mb={4}>
            Log in to continue to Sleep Sense
          </Typography>

          {error && (
            <Typography color="error" mb={3} fontSize="0.9rem">
              {error}
            </Typography>
          )}

          <Box component="form" onSubmit={handleLogin}>
            {/* EMAIL */}
            <Typography mb={1} fontWeight={500} align="left">
              Email
            </Typography>
            <TextField
              fullWidth
              placeholder="your.email@example.com"
              name="email"
              value={form.email}
              onChange={handleChange}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                },
              }}
            />

            {/* PASSWORD */}
            <Typography mb={1} fontWeight={500} align="left">
              Password
            </Typography>
            <TextField
              fullWidth
              type="password"
              placeholder="Enter your password"
              name="password"
              value={form.password}
              onChange={handleChange}
              sx={{
                mb: 4,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                },
              }}
            />

            {/* BUTTON */}
            <AppButton fullWidth size="large" type="submit">
              Login
            </AppButton>
          </Box>

          {/* SIGN UP */}
          <Typography
            mt={4}
            fontSize="0.95rem"
            color="text.secondary"
          >
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              style={{
                color: "#4F46E5",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Sign up
            </Link>
          </Typography>
        </Paper>

        {/* BACK */}
        <Typography mt={4} mb={4} fontSize="1rem">
          <Link
            to="/"
            style={{
              color: "#6B7280",
              textDecoration: "none",
            }}
          >
            ← Back to welcome
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;
