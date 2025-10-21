import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://ai-blog-backend-omega.vercel.app/api"
})