import axiosClient from '../apiAxios';

export async function getAllAccounts(filter: string) {
    return axiosClient
        .get(`account/getAll/${filter}`)
        .then((response: any) => {
            if (typeof response.data !== 'undefined' && response.data.success === true) {
                return response.data;
            }
            return response;
        })
        .catch((err: any) => console.log(err));
}
export async function getAllAccountsByUnitId(unitId: number) {
    return axiosClient
        .get(`account/getAllByUnitId/${unitId}`)
        .then((response: any) => {
            if (typeof response.data !== 'undefined' && response.data.success === true) {
                return response.data;
            }
            return response;
        })
        .catch((err: any) => console.log(err));
}
export async function getAccountById(data: any) {
    return axiosClient
        .get(`account/getById/${data}`)
        .then((response: any) => {
            if (typeof response.data !== 'undefined' && response.data.success === true) {
                return response.data;
            }
            return response;
        })
        .catch((err: any) => console.log(err));
}

export async function createEditAccount(data: any) {
    return axiosClient
        .post(`account/createEdit`, data)
        .then((response: any) => {
            if (typeof response.data !== 'undefined' && response.data.success === true) {
                return response.data;
            }
            return response;
        })
        .catch((err: any) => console.log(err));
}