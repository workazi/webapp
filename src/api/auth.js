import { axiosInstance } from "./axios";


export async function accountCreation(data) {
  try {
  
    const res = await axiosInstance.post("/auth/signup/", data);
    
    return {
      success: true,
      status: res.status,
      data: res.data
    };
  } catch (error) {
    return {
      success: false,
      status: error.response?.status || 500,
      data: error.response?.data || { message: error.message }
    };
  }
}