import axiosClient from '../apiAxios';

export async function getAllCategories() {
    return axiosClient
        .get(`category/getAll`)
        .then((response: any) => {
            if (typeof response.data !== 'undefined' && response.data.success === true) {
                return response.data;
            }
            return response;
        })
        .catch((err: any) => console.log(err));
}
export async function getAllCategoriesBody(data:any) {
    return axiosClient
        .post(`category/getAllBody`, data)
        .then((response: any) => {
            if (typeof response.data !== 'undefined' && response.data.success === true) {
                return response.data;
            }
            return response;
        })
        .catch((err: any) => console.log(err));
}
export async function getCategoriesByAreaId(areaId:number) {
    return axiosClient
        .get(`category/getCategoriesByAreaId/${areaId}`)
        .then((response: any) => {
            if (typeof response.data !== 'undefined' && response.data.success === true) {
                return response.data;
            }
            return response;
        })
        .catch((err: any) => console.log(err));
}
export async function getCategoryById(data: any) {
    return axiosClient
        .get(`category/getById/${data}`)
        .then((response: any) => {
            if (typeof response.data !== 'undefined' && response.data.success === true) {
                return response.data;
            }
            return response;
        })
        .catch((err: any) => console.log(err));
}

export async function createEditCategory(data: any) {
    return axiosClient
        .post(`category/createEdit`, data)
        .then((response: any) => {
            if (typeof response.data !== 'undefined' && response.data.success === true) {
                return response.data;
            }
            return response;
        })
        .catch((err: any) => console.log(err));
}