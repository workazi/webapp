import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL

export const axiosInstance = axios.create(
    {
        baseURL: baseUrl,
        timeout: 15000,
    }
)

axiosInstance.interceptors.request.use(
    function(config){
        return config;
    },

    function (error){

        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    function(config){
        return config
    },
    function (error){
        return Promise.reject(error)
    }
)