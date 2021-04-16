import api from '../api';
import { TOKEN } from 'functions/Utils';

export const monitoringService = {
    getListMonitoring({params}) {
        const requestOptions = {
            method: 'GET',
            headers: api.getHeader(TOKEN)
        };
        const url = api.getUrl(api.LIST_MONITORING, params);
        return api.handleRequest(url, requestOptions);
    },
};

export const historyMonitorService = {
    getListHistoryMonitor({params}) {
        const requestOptions = {
            method: 'GET',
            headers: api.getHeader(TOKEN)
        };
        const url = api.getUrl(api.LIST_HISTORY_MONITOR, params);
        console.log({url})
        return api.handleRequest(url, requestOptions);
    },
};

export const actionMonitorService = {
    actionMonitor(data) {
        const requestOptions = {
            method: "POST",
            headers: api.getHeader(TOKEN),
            body: data,
        };

        const url = api.getUrl(api.ACTION_MONITOR);
        return api.handleRequest(url, requestOptions);
    },
};