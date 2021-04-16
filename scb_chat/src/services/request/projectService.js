import api from "../api";
import {TOKEN} from "functions/Utils";

export const projectService = {
    getProjectList({params}) {
        const requestOptions = {
            method: 'GET',
            headers: api.getHeader(TOKEN)
        };
        const url = api.getUrl(api.LIST_PROJECT, params);
        console.log({url})
        return api.handleRequest(url, requestOptions);
    },
    createNewProject(data){
        const requestOptions = {
            method: 'POST',
            headers: api.getHeader(TOKEN),
            body: data,
        };
        const url = api.getUrl(api.CREATE_PROJECT);
        console.log({url})
        return api.handleRequest(url, requestOptions);
    },
}; 
