import { message } from "antd";
import axios from "axios";

const { REACT_APP_BACKEND_URL } = process.env;

const instance = axios.create({
  baseURL: REACT_APP_BACKEND_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(null, (err) => {
  message.error("An unexpected error occurred");
});

export default instance;
