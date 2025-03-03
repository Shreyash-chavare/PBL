import axios from 'axios';

export const axiosinstance=axios.create({
    baseURL:import.meta.env.MODE==="development"? "http://localhost:3000/":"/auth",
    withCredentials:true
})