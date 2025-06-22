import axios, { AxiosRequestConfig } from "axios";

const defaultConfig: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
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
