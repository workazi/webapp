import axios from "axios";
import { getAccessToken } from "../context/AuthContext";

const baseUrl = import.meta.env.VITE_BACKEND_URL

export const axiosInstance = axios.create(
    {
        baseURL: baseUrl,
        timeout: 15000,
    }
)

axiosInstance.interceptors.request.use(
    function(config){
        const token = getAccessToken();
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },

    function (error){

        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    function(config){
        return config
    },
    function (error){
        return Promise.reject(error)
    }
)