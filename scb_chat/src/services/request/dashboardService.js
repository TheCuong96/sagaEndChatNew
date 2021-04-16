import api from "../api";
import {TOKEN} from "functions/Utils";

export const dashboardService = {
    getDashboardInfo({params}) {
        const requestOptions = {
            method: 'GET',
            headers: api.getHeader(TOKEN)
        };
        const url = api.getUrl(api.DASHBOARD_CUSTOMER, params);
        console.log({dash:url})
        return api.handleRequest(url, requestOptions);
    },
};