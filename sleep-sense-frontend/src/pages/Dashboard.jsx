import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";

import { getSleepHistory } from "../services/api";
import { useAuth } from "../context/AuthContext";


function Dashboard() {
  const [history, setHistory] = useState([]);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading || !user) return;

    const fetchHistory = async () => {
      try {
        const data = await getSleepHistory();
        setHistory(data);
      } catch (error) {
        console.error("Failed to load history", error);
      }
    };

    fetchHistory();
  }, [user, loading]);

  const latest = history[0];

  const avgScore =
    history.reduce((sum, h) => sum + h.sleep_score, 0) /
    (history.length || 1);

  const scoreTrend = [...history].reverse().map((h) => ({
    date: h.date,
    score: h.sleep_score,
  }));

  const sleepHours = scoreTrend.map((h) => ({
    date: h.date,
    hours: Math.min(9, Math.max(6, h.score / 10)),
  }));

  const qualityCount = { Good: 0, Average: 0, Poor: 0 };
  history.forEach((h) => qualityCount[h.sleep_quality]++);

  const pieData = [
    { label: "Good", value: qualityCount.Good, color: "#22C55E" },
    { label: "Average", value: qualityCount.Average, color: "#F59E0B" },
    { label: "Poor", value: qualityCount.Poor, color: "#EF4444" },
  ];

  return (
    <Box sx={{ py: 8, px: 2 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        <Typography variant="h1" mb={1}>
          Sleep Dashboard
        </Typography>
        <Typography color="text.secondary" mb={5}>
          Track your sleep patterns and progress over time
        </Typography>

        {/* SUMMARY */}
        <Grid container spacing={3} mb={5}>
          <Grid size={4}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography color="text.secondary">Latest Score</Typography>
              <Typography variant="h2">{latest?.sleep_score ?? "-"}</Typography>
            </Paper>
          </Grid>

          <Grid size={4}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography color="text.secondary">Average Score</Typography>
              <Typography variant="h2">{Math.round(avgScore)}</Typography>
            </Paper>
          </Grid>

          <Grid size={4}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography color="text.secondary">Latest Quality</Typography>
              <Chip
                label={latest?.sleep_quality ?? "-"}
                color={
                  latest?.sleep_quality === "Good"
                    ? "success"
                    : latest?.sleep_quality === "Average"
                    ? "warning"
                    : "error"
                }
              />
            </Paper>
          </Grid>
        </Grid>

        {/* CHARTS */}
                {/* ================= ROW 2 : LINE + BAR ================= */}
        <Grid container spacing={4} mb={5}>
          <Grid size={6}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography mb={2} sx={{ fontWeight: "bold" }}>
                Sleep Score Trend
              </Typography>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={scoreTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#5B5AF7"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid size={6}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography mb={2} sx={{ fontWeight: "bold" }}>
                Sleep Hours per Day
              </Typography>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={sleepHours}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Bar
                    dataKey="hours"
                    fill="#22C55E"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* ================= ROW 3 : PIE + HISTORY ================= */}
        <Grid container spacing={4}>
          <Grid size={6}>
            <Paper sx={{ p: 3, borderRadius: 3, height: "100%" }}>
              <Typography mb={2} sx={{ fontWeight: "bold" }}>
                Sleep Quality Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    outerRadius={95}
                    label={({ label, percent }) =>
                      `${label}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid size={6}>
            <Paper sx={{ p: 3, borderRadius: 3, height: "100%" }}>
              <Typography mb={2} sx={{ fontWeight: "bold" }}>
                Recent Sleep Entries
              </Typography>

              {history.slice(0, 5).map((h) => (
                <Box
                  key={h.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    mb: 1,
                    borderRadius: 2,
                    backgroundColor: "background.default",
                  }}
                >
                  <Typography>{h.date}</Typography>
                  <Typography>{h.sleep_score}</Typography>
                  <Chip
                    label={h.sleep_quality}
                    color={
                      h.sleep_quality === "Good"
                        ? "success"
                        : h.sleep_quality === "Average"
                        ? "warning"
                        : "error"
                    }
                  />
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Dashboard;
