import axios from 'axios';

export const axiosinstance = axios.create({
    baseURL: import.meta.env.MODE === "development" 
        ? "http://localhost:3000" 
        : import.meta.env.VITE_BACKEND_URL || "https://your-backend-app.onrender.com",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});