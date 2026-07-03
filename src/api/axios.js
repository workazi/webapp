import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL

export const axiosInstance = axios.create(
    {
        baseURL: baseUrl,
        timeout: 15,
    }
)