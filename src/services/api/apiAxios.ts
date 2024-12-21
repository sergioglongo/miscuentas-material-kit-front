import axios from 'axios';

const baseURL = 'http://localhost:5010/api/';

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