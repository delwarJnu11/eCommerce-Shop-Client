import axios from "axios";

export const api = axios.create({
  baseURL: "https://shopee-backend.vercel.app/api",
});
