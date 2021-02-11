import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;
console.log(process.env);
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
