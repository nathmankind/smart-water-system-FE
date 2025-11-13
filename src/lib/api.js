import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

export const apiClient = axios.create({
  baseURL: "http://localhost:3001",
});

export const queryClient = new QueryClient();
