import axios from 'axios';

const isDevelopment = import.meta.env.MODE === 'development';
const baseURL = isDevelopment 
    ? import.meta.env.VITE_URL_BACKEND_DEV
    : import.meta.env.VITE_URL_BACKEND_PROD;

const axiosClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.request.use((config: any) =>
    config
);

export default axiosClient;