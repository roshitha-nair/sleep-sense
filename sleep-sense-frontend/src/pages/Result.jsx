import { Box, Typography, Paper, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import AppButton from "../components/common/AppButton";
import { useEffect, useState } from "react";

function Result({ toggleTheme, mode }) {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.result) {
    navigate("/analyze");
    return null;
  }

  const { sleep_score, sleep_quality, tips } = state.result;

  /* ---------- Save to History ---------- */
  const handleSave = () => {
    const history = JSON.parse(localStorage.getItem("sleepHistory")) || [];

    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      sleep_score,
      sleep_quality,
      input: state.input,
    };

    localStorage.setItem(
      "sleepHistory",
      JSON.stringify([newEntry, ...history])
    );

    navigate("/dashboard");
  };

  /* ---------- Animated Score ---------- */
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = sleep_score;
    const duration = 1200;
    const increment = Math.ceil(end / (duration / 16));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setAnimatedScore(end);
        clearInterval(timer);
      } else {
        setAnimatedScore(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [sleep_score]);

  const qualityStyles = {
    Good: { bg: "#E8F9EE", color: "#16A34A" },
    Average: { bg: "#FEF3C7", color: "#D97706" },
    Poor: { bg: "#FEE2E2", color: "#DC2626" },
  };

  return (
    <>

      <Box sx={{ py: 8, px: 2 }}>
        <Typography variant="h1" textAlign="center" mb={1}>
          Your Sleep Analysis
        </Typography>

        <Typography textAlign="center" color="text.secondary" mb={6}>
          Based on your sleep habits
        </Typography>

        <Paper
          sx={{
            maxWidth: 700,
            mx: "auto",
            p: 5,
            borderRadius: 4,
            boxShadow: "0px 20px 50px rgba(0,0,0,0.08)",
          }}
        >
          {/* SCORE */}
          <Box textAlign="center" mb={6}>
            <Typography variant="h2" mb={3}>
              Sleep Score
            </Typography>

            {/* Circular Score */}
            <Box
              sx={{
                width: 160,
                height: 160,
                mx: "auto",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #6D5DF6, #5A4CF0)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0px 12px 30px rgba(109,93,246,0.35)",
                mb: 3,
              }}
            >
              <Typography fontSize="3.5rem" fontWeight={700} color="#fff">
                {animatedScore}
              </Typography>
            </Box>

            {/* Quality Pill */}
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                px: 3,
                py: 1,
                borderRadius: "999px",
                backgroundColor: qualityStyles[sleep_quality].bg,
                color: qualityStyles[sleep_quality].color,
                fontWeight: 600,
                mb: 2,
              }}
            >
              ✓ {sleep_quality}
            </Box>

            <Typography color="text.secondary">
              Keep maintaining healthy sleep habits 🌙
            </Typography>
          </Box>

          {/* TIPS */}
          <Box mb={6}>
            <Paper sx={{ p: 4, borderRadius: 4 }}>
              <Box display="flex" alignItems="center" gap={1} mb={3}>
                <Typography fontSize="1.5rem">💡</Typography>
                <Typography variant="h2">Personalized Sleep Tips</Typography>
              </Box>

              {tips && tips.length > 0 ? (
                <Stack spacing={2}>
                  {tips.map((tip, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: "flex",
                        gap: 2,
                        p: 2,
                        borderRadius: 3,
                        backgroundColor: "#F8FAFC",
                      }}
                    >
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          backgroundColor: "#5B5AF7",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                        }}
                      >
                        {idx + 1}
                      </Box>
                      <Typography>{tip}</Typography>
                    </Box>
                  ))}
                </Stack>
              ) : (
                <Typography color="text.secondary">
                  No specific tips for today.
                </Typography>
              )}
            </Paper>
          </Box>

          {/* ACTION BUTTONS */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <AppButton fullWidth onClick={handleSave}>
              Save to History
            </AppButton>

            <AppButton
              fullWidth
              variant="outlined"
              onClick={() => navigate("/analyze")}
            >
              Analyze Another Day
            </AppButton>
          </Stack>
        </Paper>
      </Box>
    </>
  );
}

export default Result;
