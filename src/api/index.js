import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_DEV_URL;
export const api = axios.create({
  baseURL: apiBaseUrl,
});
api.interceptors.request.use(
  (config) => {
    // Log all cookies to see what is available
    console.log("All cookies:", document.cookie);

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    console.log("interceptors", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
