import { axiosInstance } from "./axios";

export async function supportRequest (data){
    try{
        const res = await axiosInstance.post('/support/', data)
        return {
            success: true,
            status: res.status,
            data: res.data
        }
    } catch(err){
        return {
            success: false,
            status: err.response?.status || 500,
            data: err.response?.data || { message: err.message }
        };
    }
}