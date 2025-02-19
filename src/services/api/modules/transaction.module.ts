import axiosClient from '../apiAxios';

export async function getAllTransactions(filter: string) {
    return axiosClient
        .get(`transaction/getAll/${filter}`)
        .then((response: any) => {
            if (typeof response.data !== 'undefined' && response.data.success === true) {
                return response.data;
            }
            return response;
        })
        .catch((err: any) => console.log(err));
}
export async function getAllTransactionsBody(data: any) {
    return axiosClient
        .post(`transaction/getAllBody`, data)
        .then((response: any) => {
            if (typeof response.data !== 'undefined' && response.data.success === true) {
                return response.data;
            }
            return response;
        })
        .catch((err: any) => console.log(err));
}
export async function getAllTransactionsByUnitId(unitId: number, type: string) {
    return axiosClient
        .get(`transaction/getAllByUnitId/${unitId}/${type}`)
        .then((response: any) => {
            if (typeof response.data !== 'undefined' && response.data.success === true) {
                return response.data;
            }
            return response;
        })
        .catch((err: any) => console.log(err));
}
export async function getAllTransactionsByUnitAndAccount(data: any) {
    return axiosClient
        .post(`transaction/getAllByUnitAndAccount`, data)
        .then((response: any) => {
            if (typeof response.data !== 'undefined' && response.data.success === true) {
                return response.data;
            }
            return response;
        })
        .catch((err: any) => console.log(err));
}
export async function getTransactionById(data: any) {
    return axiosClient
        .get(`transaction/getById/${data}`)
        .then((response: any) => {
            if (typeof response.data !== 'undefined' && response.data.success === true) {
                return response.data;
            }
            return response;
        })
        .catch((err: any) => console.log(err));
}

export async function createEditTransaction(data: any) {
    return axiosClient
        .post(`transaction/createEdit`, data)
        .then((response: any) => {
            if (typeof response.data !== 'undefined' && response.data.success === true) {
                return response.data;
            }
            return response;
        })
        .catch((err: any) => console.log(err));
}
export async function deleteTransaction(id: any) {
    return axiosClient
        .delete(`transaction/deleteById/${id}`)
        .then((response: any) => {
            console.log("response desde endpoint delete", response);

            if (typeof response.data !== 'undefined' && response.data.success === true) {
                return response.data;
            }
            return response;
        })
        .catch((err: any) => {
            // console.log("error va por catch", err)
            if (err?.response?.data) {
                return err?.response?.data
            }
            return err;
        });
}