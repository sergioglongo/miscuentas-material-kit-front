import axiosClient from '../apiAxios';

export async function createAccountsPayMethodsForUnit(data: any) {
    return axiosClient
        .post(`params/createAccountsPayMethodsForUnit/`, data)
        .then((response: any) => {
            console.log("response", response);

            if (typeof response.data !== 'undefined' && response.data.success === true) {
                return response.data;
            }
            return { success: false, error: response };
        })
        .catch((error: any) => ({ success: false, error }));
}
export async function createAreasCategoriesForUnit(data: any) {
    return axiosClient
        .post(`params/createAreasCategoriesForUnit/`, data)
        .then((response: any) => {
            console.log("response", response);

            if (typeof response.data !== 'undefined' && response.data.success === true) {
                return response.data;
            }
            return { success: false, error: response };
        })
        .catch((error: any) => ({ success: false, error }));
}