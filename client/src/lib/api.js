import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 15000,
});

// Turns any failure into a readable message
export const errorMessage = (err, fallback = "Something went wrong. Please try again.") => {
  if (err?.response?.data?.message) return err.response.data.message;
  if (err?.code === "ECONNABORTED" || err?.message === "Network Error") {
    return "Could not reach the server. Please check your connection and try again.";
  }
  return fallback;
};

export default api;