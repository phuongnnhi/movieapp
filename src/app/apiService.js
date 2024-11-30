import axios from "axios";
import { BASE_URL, API_KEY } from "./config";

//create custom axios instance
const apiService = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY, // Automatically include the API key in all requests
  },
});

// Request Interceptor
apiService.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    return request;
  },
  (error) => {
    console.error("Request Error", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
apiService.interceptors.response.use(
  (response) => {
    console.log("Response Received", response);
    return response;
  },
  (error) => {
    console.error("Response Error", error);
    alert("Something went wrong with the API.");
    return Promise.reject(error);
  }
);

export default apiService;