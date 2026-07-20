import axios from "axios";
import { setupAuthInterceptor } from "./auth.interceptor";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

setupAuthInterceptor(api);

export default api;