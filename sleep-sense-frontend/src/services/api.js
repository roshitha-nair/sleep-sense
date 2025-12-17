import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

export const analyzeSleep = async (payload) => {
  const response = await axios.post(`${API_BASE}/predict`, payload);
  return response.data;
};
