import axios from "axios";

const url = "/api/"; // http://localhost:4000/ for local development
const httpProvider = axios.create({ baseURL: url });

httpProvider.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    return config;
  },
  (error) => Promise.reject(error)
);

export default httpProvider;
