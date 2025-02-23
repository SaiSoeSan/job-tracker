import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.REACT_APP_API_BASE_URL || "http://localhost:8080",
});

export default axiosInstance;
