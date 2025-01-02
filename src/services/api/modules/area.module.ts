import axiosClient from '../apiAxios';

export async function getAllAreas(filter: string) {
    return axiosClient
        .get(`area/getAll/${filter}`)
        .then((response: any) => {
            if (typeof response.data !== 'undefined' && response.data.success === true) {
                return response.data;
            }
            return response;
        })
        .catch((err: any) => console.log(err));
}
export async function getAllAreasByUnitId(unitId:number, type:string) {
    return axiosClient
    .get(`area/getAllByUnitId/${unitId}${type ? `/${type}` : ''}`)
        .then((response: any) => {
            if (typeof response.data !== 'undefined' && response.data.success === true) {
                return response.data;
            }
            return response;
        })
        .catch((err: any) => console.log(err));
}
export async function getAreaById(data: any) {
    return axiosClient
        .get(`area/getById/${data}`)
        .then((response: any) => {
            if (typeof response.data !== 'undefined' && response.data.success === true) {
                return response.data;
            }
            return response;
        })
        .catch((err: any) => console.log(err));
}

export async function createEditArea(data: any) {
    return axiosClient
        .post(`area/createEdit`, data)
        .then((response: any) => {
            if (typeof response.data !== 'undefined' && response.data.success === true) {
                return response.data;
            }
            return response;
        })
        .catch((err: any) => console.log(err));
}