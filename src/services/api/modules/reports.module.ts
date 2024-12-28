import axiosClient from "../apiAxios";

export async function reportAreasResumeByUnitId(data: any) {
    return axiosClient
        .post(`reports/reportAreasResumeByUnitId/`, data)
        .then((response: any) => {
            if (typeof response.data !== 'undefined' && response.data.success === true) {
                return response.data;
            }
            return response;
        })
        .catch((err: any) => console.log(err));
}

export async function reportAccountsResumeByUnitId(data: any) {
    return axiosClient
        .post(`reports/reportAccountsResumeByUnitId/`, data)
        .then((response: any) => {
            if (typeof response.data !== 'undefined' && response.data.success === true) {
                return response.data;
            }
            return response;
        })
        .catch((err: any) => console.log(err));
}