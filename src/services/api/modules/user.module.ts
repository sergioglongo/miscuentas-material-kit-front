import axiosClient from '../apiAxios';

export async function getAllUsers() {
    return axiosClient
        .get(`users/getAll`)
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