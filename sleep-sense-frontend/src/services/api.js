import axios from "axios";
import { auth } from "../firebase";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

// 🔐 Axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Attach Firebase ID token
api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;

    console.log("Current user:", user);

    if (user) {
      const token = await user.getIdToken();
      console.log("Firebase token:", token);
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("No authenticated user found");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ================================
// 📌 API CALLS
// ================================

export const analyzeSleep = async (payload) => {
  const response = await api.post("/predict", payload);
  return response.data;
};

export const getSleepHistory = async () => {
  const response = await api.get("/history");
  return response.data;
};
export const deleteSleepRecord = async (recordId) => {
  const response = await api.delete(`/history/${recordId}`);
  return response.data;
};
export const getSleepHistoryByRange = async (range = "all") => {
  const response = await api.get(`/history?range=${range}`);
  return response.data;
};


