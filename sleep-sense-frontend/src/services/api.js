import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const analyzeSleep = async (payload) => {
  const response = await axios.post(`${API_BASE}/predict`, payload);
  return response.data;
};
