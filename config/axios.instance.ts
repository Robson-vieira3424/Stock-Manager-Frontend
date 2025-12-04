import axios from "axios";

export const ApiInstanceAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})