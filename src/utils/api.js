import axios from "axios";

export const api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_BACKEND_URL
});
