import axios from 'axios';

export const axiosinstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:3000" : "/",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});