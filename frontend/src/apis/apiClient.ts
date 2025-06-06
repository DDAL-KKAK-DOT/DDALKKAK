import axios, { AxiosRequestConfig } from "axios";

const defaultConfig: AxiosRequestConfig = {
  baseURL: "http://18.220.15.239:8000",
  headers: { Accept: "application/json" },
};

export function createCustomAxios(config?: AxiosRequestConfig) {
  return axios.create({
    ...defaultConfig,
    ...config,
    headers: {
      ...defaultConfig.headers,
      ...(config?.headers || {}),
    },
  });
}
