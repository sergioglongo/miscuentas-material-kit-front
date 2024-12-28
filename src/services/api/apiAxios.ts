import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development' ? `${import.meta.env.VITE_URL_BACKEND_DEV}/api` : `${import.meta.env.VITE_URL_BACKEND_PROD}/api`;

const axiosClient = axios.create({
    baseURL,
    // auth: {
    //   username: 'b95ad989ccd44827b7f7e6a31112344d',
    //   password: '6f8c47035191479a8ace6648fff24cb5'
    // },
    headers: {
        'Content-Type': 'application/json',
    },

});

axiosClient.interceptors.request.use((config: any) =>
    config
);

export default axiosClient;