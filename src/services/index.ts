import axios from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    requiresAuth?: boolean;
  }
}

const httpClient = axios.create({
  baseURL: "http://localhost:9089/",
  headers: {
    deviceType: "Web",
  },
  timeout: 30000,
});

httpClient.interceptors.request.use(
  (config) => {
    // ✅ Only proceed if requiresAuth is true
    if (config.requiresAuth) {
      const token = localStorage.getItem("token");

      // ✅ Add Authorization header only if token exists
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      } else {
        console.warn("⚠️ No token found in localStorage. Request may be unauthorized.");
      }
    }

    // ✅ Handle FormData (if uploading files)
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default httpClient;
