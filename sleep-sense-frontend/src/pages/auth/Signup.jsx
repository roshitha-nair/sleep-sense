import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
} from "@mui/material";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import AppButton from "../../components/common/AppButton";
import logo from "../../assets/logo.png";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      await updateProfile(auth.currentUser, {
        displayName: form.name,
    });
      navigate("/home");
    } catch (err) {
      setError(err.message);
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
            width: 540,
            p: 6,
            borderRadius: 4,
            boxShadow: "0px 20px 50px rgba(0,0,0,0.08)",
          }}
        >
          <Typography variant="h1" mb={1}>
            Create Account
          </Typography>

          <Typography color="text.secondary" mb={4}>
            Start your journey to better sleep
          </Typography>

          {error && (
            <Typography color="error" mb={3} fontSize="0.9rem">
              {error}
            </Typography>
          )}

          <Box component="form" onSubmit={handleSignup}>
            {/* NAME */}
            <Typography mb={1} fontWeight={500} align="left">
              Name
            </Typography>
            <TextField
              fullWidth
              placeholder="Your name"
              name="name"
              value={form.name}
              onChange={handleChange}
              sx={{ mb: 3, 
                "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                },}}
            />

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
              sx={{ mb: 3, 
                "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                },}}
            />

            {/* PASSWORD */}
            <Typography mb={1} fontWeight={500} align="left">
              Password
            </Typography>
            <TextField
              fullWidth
              type="password"
              placeholder="Create a password"
              name="password"
              value={form.password}
              onChange={handleChange}
              sx={{ mb: 3, 
                "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                },}}
            />

            {/* CONFIRM PASSWORD */}
            <Typography mb={1} fontWeight={500} align="left">
              Confirm Password
            </Typography>
            <TextField
              fullWidth
              type="password"
              placeholder="Confirm your password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              sx={{ mb: 3, 
                "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                },}}
            />

            {/* BUTTON */}
            <AppButton fullWidth size="large" type="submit" mt={2}>
              Create Account
            </AppButton>
          </Box>

          {/* LOGIN */}
          <Typography
            mt={4}
            fontSize="0.95rem"
            color="text.secondary"
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#4F46E5",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Login
            </Link>
          </Typography>
        </Paper>

        {/* BACK LINK */}
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

export default Signup;
