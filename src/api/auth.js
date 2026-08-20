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

export async function oneOffPayment(data){
  try{
    const res = await axiosInstance.post('/payment/initiate', data)

    return {
      success: true,
      status: res.status,
      data: res.data,
    }
  } catch(err){
    return {
      success:false,
      status: err.response?.status || 500,
      data: err.response?.data || { message: err.message }
    }
  }
  
}

export async function verifyPayment(transactionId){
  try{
    const res = await axiosInstance.post(`/payment/status/${transactionId}/`)

    return {
      success: true,
      status: res.status,
      data: res.data,
    }
  } catch(err){
    return {
      success:false,
      status: err.response?.status || 500,
      data: err.response?.data || { message: err.message }
    }
  }
  
}

export async function updateProfile(userId, data){
  try{
    const res = await axiosInstance.post(`/account/education/${userId}/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    return {
      success: true,
      status: res.status,
      data: res.data,
    }
  } catch(err){
    return {
      success:false,
      status: err.response?.status || 500,
      data: err.response?.data || { message: err.message }
    }
  }
  
}

export async function updateSkill(userId, data){
  try{
    const res = await axiosInstance.post(`/account/skill/${userId}/`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    return {
      success: true,
      status: res.status,
      data: res.data,
    }
  } catch(err){
    return {
      success:false,
      status: err.response?.status || 500,
      data: err.response?.data || { message: err.message }
    }
  }
  
}

export async function updateAccount(userId, data){
  try{
    const res = await axiosInstance.post(`/account/${userId}/`, data)

    return {
      success: true,
      status: res.status,
      data: res.data,
    }
  } catch(err){
    return {
      success:false,
      status: err.response?.status || 500,
      data: err.response?.data || { message: err.message }
    }
  }
  
}

export async function getJobPreferences() {
  try {
    const res = await axiosInstance.get('/auth/preferences/')

    return {
      success: true,
      status: res.status,
      data: res.data,
    }
  } catch (err) {
    return {
      success: false,
      status: err.response?.status || 500,
      data: err.response?.data || { message: err.message },
    }
  }
}

export async function updateJobPreferences(data) {
  try {
    const res = await axiosInstance.patch('/auth/preferences/', data)

    return {
      success: true,
      status: res.status,
      data: res.data,
    }
  } catch (err) {
    return {
      success: false,
      status: err.response?.status || 500,
      data: err.response?.data || { message: err.message },
    }
  }
}