import axios from "axios";

const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const defaultBaseUrl = import.meta.env.DEV ? "" : "https://coding-dashboard-backend-4sqp.onrender.com";

const api = axios.create({
  baseURL: configuredBaseUrl || defaultBaseUrl,
});

export async function fetchActivity(username = "aakash") {
  const response = await api.get(`/api/dashboard/${username}`);
  return response.data;
}

export async function refreshActivity(username = "aakash") {
  const response = await api.post(`/api/dashboard/${username}/refresh`);
  return response.data;
}
