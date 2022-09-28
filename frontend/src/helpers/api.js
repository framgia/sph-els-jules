import axios from "axios";

const { REACT_APP_BACKEND_URL } = process.env;

const api = axios.create({
  baseURL: REACT_APP_BACKEND_URL,
  timeout: 1000,
});

export default api;
