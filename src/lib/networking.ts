import axios from 'axios'

export const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_BACKEND_OVERCRAFT_URL,
})
