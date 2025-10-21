import axios from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    requiresAuth?: boolean;
  }
}

const httpClient = axios.create({
  baseURL: "https://hc-il-api-dev.ideyalabs.com/",
  headers: {
    deviceType: "Web",
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

httpClient.interceptors.request.use(
  (config) => {
    if (!config.requiresAuth) {
      return config;
    }

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_token="))
      ?.split("=")[1];

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default httpClient;
