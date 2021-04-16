import api from '../api';
import { TOKEN } from 'functions/Utils';

export const chatbotService = {
    getListPoll({params}) {
        const requestOptions = {
            method: 'GET',
            headers: api.getHeader(TOKEN)
        };
        const url = api.getUrl(api.POLL_LIST, params);
        return api.handleRequest(url, requestOptions);
    },

    getListQuestion({params}) {
        const requestOptions = {
            method: 'GET',
            headers: api.getHeader(TOKEN)
        };
        const url = api.getUrl(api.LIST_QUESTION, params);
        return api.handleRequest(url, requestOptions);
    },

    async createPoll(data) {
        // const requestOptions = {
        //     method: 'POST',
        //     headers: api.getHeader(TOKEN),
        //     body: params,
        // };
        // const params = {};
        return await api.postWithFormData(data, TOKEN, api.CREATE_POLL);
    },

    addQuestion(data) {
        const requestOptions = {
            method: 'POST',
            headers: api.getHeader(TOKEN),
            body: data,
        };
        const url = api.getUrl(api.ADD_QUESTION);
        console.log(url)
        return api.handleRequest(url, requestOptions)
    }
};

