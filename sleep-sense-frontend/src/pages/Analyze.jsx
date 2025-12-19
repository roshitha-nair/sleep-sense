import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Slider,
  Switch,
  Paper,
} from "@mui/material";

import AppButton from "../components/common/AppButton";
import { analyzeSleep } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



function Analyze({ toggleTheme, mode }) {
  const { user, loading } = useAuth();
  const [form, setForm] = useState({
    bedtime: "",
    wakeTime: "",
    screenTime: "",
    caffeineCups: "",
    lastCaffeine: "",
    stress: 3,
    activity: "",
    nap: false,
    napDuration: "",
  });

  const navigate = useNavigate();

  const isFormValid =
    form.bedtime &&
    form.wakeTime &&
    form.screenTime > 0 &&
    form.caffeineCups >= 0 &&
    form.activity >= 0 &&
    (!form.nap || (form.nap && form.napDuration > 0));

  if (loading) return null;
  if (!user) return null;

  const handleSubmit = async () => {
    try {
      const payload = {
        bedtime: form.bedtime,
        wakeTime: form.wakeTime,
        screenTime: Number(form.screenTime),
        caffeineCups: Number(form.caffeineCups),
        lastCaffeine: form.lastCaffeine || null,
        stress: form.stress,
        activity: Number(form.activity),
        nap: form.nap,
        napDuration: form.nap ? Number(form.napDuration) : 0,
      };
      // ✅ ACTUAL BACKEND CALL
      const result = await analyzeSleep(payload);

      // ✅ Navigate to Results page with backend data
      navigate("/result", {
        state: {
          result,
          input: payload,
        },
      });
    } catch (error) {
      console.error("Error calling backend:", error);
    }
  };




  return (
    <>
    

      <Box sx={{ py: 8, px: 2 }}>
        {/* Title */}
        <Typography variant="h1" textAlign="center" mb={1}>
          Analyze Your Sleep
        </Typography>
        <Typography textAlign="center" color="text.secondary" mb={5}>
          Fill in your sleep details to get personalized insights and recommendations
        </Typography>

        {/* Card */}
        <Paper
          sx={{
            maxWidth: 700,
            mx: "auto",
            p: 5,
            borderRadius: 4,
            boxShadow: "0px 20px 50px rgba(0,0,0,0.08)",
          }}
        >

          {/* ROW 1 */}
          <Grid container spacing={3} mb={3}>
            <Grid item xs={12} md={6}>
              <Typography mb={1}>Bedtime</Typography>
              <TextField
                    type="time"
                    fullWidth
                    value={form.bedtime}
                    onChange={(e) =>
                    setForm({ ...form, bedtime: e.target.value })
                }/>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography mb={1}>Wake-up Time</Typography>
              <TextField
                type="time"
                fullWidth
                value={form.wakeTime}
                onChange={(e) =>
                    setForm({ ...form, wakeTime: e.target.value })
                }/>
            </Grid>
          </Grid>

          {/* ROW 2 */}
          <Box mb={3}>
            <Typography mb={1}>Screen Time Before Bed (minutes)</Typography>
            <TextField 
                fullWidth 
                placeholder="30" 
                type="number"
                value={form.screenTime}
                onChange={(e) =>
                    setForm({ ...form, screenTime: e.target.value })
                } 
            />
          </Box>

          {/* ROW 3 */}
          <Grid container spacing={3} mb={3}>
            <Grid item xs={12} md={6}>
              <Typography mb={1}>Caffeine Cups</Typography>
              <TextField 
                fullWidth 
                placeholder="1" 
                type="number"
                value={form.caffeineCups}
                onChange={(e) =>
                    setForm({ ...form, caffeineCups: e.target.value })
                } />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography mb={1}>Last Caffeine Time</Typography>
              <TextField
                type="time"
                fullWidth
                value={form.lastCaffeine}
                onChange={(e) =>
                    setForm({ ...form, lastCaffeine: e.target.value })
                }/>

            </Grid>
          </Grid>

          {/* ROW 4 */}
          <Box mb={3}>
            <Typography mb={1}>Stress Level: {form.stress}</Typography>
            <Slider
              value={form.stress}
              min={1}
              max={5}
              step={1}
              onChange={(_, v) => setForm({ ...form, stress: v })}
            />
            <Box display="flex" justifyContent="space-between">
              <Typography variant="caption">Low</Typography>
              <Typography variant="caption">Moderate</Typography>
              <Typography variant="caption">High</Typography>
            </Box>
          </Box>

          {/* ROW 5 */}
          <Box mb={3}>
            <Typography mb={1}>Physical Activity (minutes)</Typography>
            <TextField 
                fullWidth 
                placeholder="30" 
                type="number"
                value={form.activity}
                onChange={(e) =>
                    setForm({ ...form, activity: e.target.value })
                } 
            />
          </Box>

          {/* ROW 6 */}
          <Box
            mb={3}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>Did you nap today?</Typography>
            <Switch
              checked={form.nap}
              onChange={(e) =>
                setForm({ ...form, nap: e.target.checked })
              }
            />
          </Box>

          {/* ROW 7 – conditional */}
          {form.nap && (
            <Box mb={4}>
              <Typography mb={1}>Nap Duration (minutes)</Typography>
              <TextField 
                fullWidth 
                placeholder="0" 
                type="number"
                value={form.napDuration}
                onChange={(e) =>
                    setForm({ ...form, napDuration: e.target.value })
                } 
                />
            </Box>
          )}

          {/* BUTTON */}
          <AppButton fullWidth size="large" disabled={!isFormValid} onClick={handleSubmit}>
            Analyze Sleep
          </AppButton>
        </Paper>
      </Box>
    </>
  );
}

export default Analyze;
