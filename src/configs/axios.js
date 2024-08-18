import axios from 'axios';

export const API_HEADER_DEFAULT = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Language: "pt",
};

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1/',
  timeout: 10000,
  headers: API_HEADER_DEFAULT
});

export const apiUpdateAccessToken = (access_token) => {

  // Set the access_token to the axios instance
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
};

axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
