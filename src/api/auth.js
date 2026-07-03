import { axiosInstance } from "./axios";

export function accountCreation({data}){
    axiosInstance.post('/auth/signup/',data)
    .then(
        function (res){
            console.log(res.data)
            return res.data
        }
    )
    .catch(
        function (error){
            console.log(error.response.data)
            return error.response.data
        }
    )
}