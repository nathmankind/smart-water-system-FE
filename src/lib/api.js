import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

export const apiClient = axios.create({
  baseURL: "http://localhost:3001",
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("user_token");
  console.log("Token from localStorage:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Authorization header set:", config.headers.Authorization);
  }
  return config;
});

export const queryClient = new QueryClient();
