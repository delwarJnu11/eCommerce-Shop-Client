import axios from "axios";

export const api = axios.create({
  baseURL: "https://shopee-backend.vercel.app/api",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
