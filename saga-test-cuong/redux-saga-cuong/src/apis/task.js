import axiosService from '../comoms/axiosService';
import axiosSerrvice from '../comoms/axiosService';
import API_ENDPOINT from '../constants';
const url = '/task';

export const getList = () => {
    return axiosService.get(`${API_ENDPOINT}${url}`);
}