import axios from "axios";

export const api = axios.create({
  baseURL: "https://e-commerce-shop-backend.vercel.app/api",
  withCredentials: true,
});
