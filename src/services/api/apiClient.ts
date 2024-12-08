import axios from 'axios';
import { IUser } from 'src/config/types/types';

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
// Users
export async function getAllUsers() {
    return axiosClient
        .get(`users/getall`)
        .then((response: any) => {
            if (typeof response.data !== 'undefined' && response.data.success === true) {
                return response.data;
            }
            return response;
        })
        .catch((err: any) => console.log(err));
}

export async function signIn(data: any) {
    return axiosClient
        .post(`users/signin`, data)
        .then(response => response?.data)
        .catch(err => err?.response?.data);
}

export async function signUp(data: any) {
    return axiosClient
        .post(`users/signup`, data)
        .then(response => response?.data)
        .catch(err => err?.response?.data);
}

export async function createEditUser(data: any) {
    return axiosClient
        .post(`users/createEdit`, data)
        .then((response: any) => {
            if (typeof response.data !== 'undefined' && response.data.success === true) {
                return response.data;
            }
            return response;
        })
        .catch((err: any) => console.log(err));
}
// Units
export async function createEditUnit(data: any) {
    return axiosClient
        .post(`unit/createEdit`, data)
        .then((response: any) => {
            if (typeof response.data !== 'undefined' && response.data.success === true) {
                return response.data;
            }
            return response;
        })
        .catch((err: any) => console.log(err));
}

export async function getUnitsById(data: any) {
    return axiosClient
        .get(`unit/getUnitById/${data}`)
        .then((response: any) => {
            if (typeof response.data !== 'undefined' && response.data.success === true) {
                return response.data;
            }
            return response;
        })
        .catch((err: any) => console.log(err));
}

export async function getUnitsByUserId(data: any) {
    return axiosClient
        .get(`unit/getUnitsByUserId/${data}`)
        .then((response: any) => {
            if (typeof response.data !== 'undefined' && response.data.success === true) {
                return response.data;
            }
            return response;
        })
        .catch((err: any) => console.log(err));
}