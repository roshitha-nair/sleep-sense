import { Box, Typography, Stack, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import AppButton from "../components/common/AppButton";
import FeatureCard from "../components/home/FeatureCard";
import PsychologyIcon from "@mui/icons-material/Psychology";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import BarChartIcon from "@mui/icons-material/BarChart";
import logo from "../assets/logo.png";


function Home({ toggleTheme, mode }) {
  return (
    <>
      <Navbar toggleTheme={toggleTheme} mode={mode} />

      {/* Hero Section */}
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Box
            sx={{
                width: 96,
                height: 96,
                mx: "auto",
                mb: 3,
                borderRadius: 5,
                backgroundColor: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0px 12px 30px rgba(0,0,0,0.12)",
            }}
        >
            <img
                src={logo}
                alt="Sleep Sense Logo"
                style={{
                    width: 90,
                    height: 90,
                    objectFit: "contain",
                }}
            />
        </Box>



        <Typography variant="h1" mb={2} >
            <span style={{ color: "#b3dbe2ff" }}>Sleep </span>
            <span style={{ color: "#6b8eaa" }}>Sense</span>
        </Typography>

        <Typography fontSize="1.1rem" mb={2}>
          Understand and improve your sleep using AI
        </Typography>

        <Typography
          color="text.secondary"
          maxWidth={500}
          mx="auto"
          mb={4}
        >
          Track your sleep patterns, analyze sleep quality, and get personalized
          recommendations to improve your rest.
        </Typography>

        <Stack direction="row" spacing={6} justifyContent="center">
          <Link to="/analyze">
            <AppButton >Analyze My Sleep</AppButton>
          </Link>

          <Link to="/dashboard">
            <AppButton variant="outlined">View Dashboard</AppButton>
          </Link>
        </Stack>
      </Box>

      {/* Features Section */}
      <Box sx={{ maxWidth: 1100, mx: "auto", mt: 10, mb: 10, px: 4 }}>
        <Grid 
            container
            spacing={4}
            wrap="nowrap"
            // sx={{
            //     overflowX: "auto",
            // }}
        >
            <Grid item xs={12} md={4}>
                <FeatureCard
                    icon={<PsychologyIcon sx={{ color: "#4F46E5" }} />}
                    bg="#EEF2FF"
                    title="AI-Powered Analysis"
                    description="Get intelligent insights based on your sleep patterns and habits."
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <FeatureCard
                    icon={<TrendingUpIcon sx={{ color: "#22C55E" }} />}
                    bg="#ECFDF5"
                    title="Track Progress"
                    description="Monitor your sleep quality over time with detailed charts."
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <FeatureCard
                    icon={<BarChartIcon sx={{ color: "#F59E0B" }} />}
                    bg="#FFFBEB"
                    title="Personalized Tips"
                    description="Receive custom recommendations to improve your sleep."
                />
            </Grid>
        </Grid>
    </Box>
    </>
  );
}

export default Home;
