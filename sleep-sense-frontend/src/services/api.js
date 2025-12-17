import axios from "axios";

const API_BASE = "https://sleep-sense-backend.onrender.com";

export const analyzeSleep = async (payload) => {
  const response = await axios.post(`${API_BASE}/predict`, payload);
  return response.data;
};
