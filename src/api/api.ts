import axios from "axios"

const BASE_URL = process.env.BASE_URL || "http://localhost:8000"

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 60000,
})
