import { axiosInstance } from "./axios";

export async function getSkillOptions(){
  try{
    const res = await axiosInstance.get('/app_options/skills/')

    return {
      success: true,
      status: res.status,
      data: res.data,
    }
  } catch(err){
    return {
      success: false,
      status: err.response?.status || 500,
      data: err.response?.data || { message: err.message }
    }
  }
}

export async function getPackages(userId, isEmployee){
  try{
    const res = await axiosInstance.get(`/payment/packages/${userId}/`, {
      params: { is_employee: isEmployee }
    })

    return {
      success: true,
      status: res.status,
      data: res.data,
    }
  } catch(err){
    return {
      success: false,
      status: err.response?.status || 500,
      data: err.response?.data || { message: err.message }
    }
  }
}

export async function getLocations(){
  try{
    const res = await axiosInstance.get('/app_options/location/')

    return {
      success: true,
      status: res.status,
      data: res.data,
    }
  } catch(err){
    return {
      success: false,
      status: err.response?.status || 500,
      data: err.response?.data || { message: err.message }
    }
  }
}
