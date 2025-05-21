import axios, { AxiosRequestConfig } from "axios";

const isDevelopment = process.env.NODE_ENV === "development";

const getBaseURL = () => {
  if (isDevelopment) {
    return process.env.NEXT_PUBLIC_DEV_API_URL;
  }
  return process.env.NEXT_PUBLIC_PROD_API_URL;
};

const defaultConfig: AxiosRequestConfig = {
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const createApi = (config?: AxiosRequestConfig) => {
  return axios.create({
    ...defaultConfig,
    ...config,
  });
};

// 기본 API 인스턴스
export const API = createApi();

// 긴 시간이 필요한 요청을 위한 인스턴스 (예: AI 작업)
export const LongTimeoutAPI = createApi({
  timeout: 480000, // 8분
});

// 파일 업로드용 인스턴스
export const UploadAPI = createApi({
  timeout: 60000,
  headers: {
    ...defaultConfig.headers,
    "Content-Type": "multipart/form-data",
  },
});
