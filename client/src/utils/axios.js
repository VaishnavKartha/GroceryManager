import axios from 'axios'

export const axiosInstance=axios.create({
    baseURL:"http://localhost:5174/api",
    withCredentials:true
})