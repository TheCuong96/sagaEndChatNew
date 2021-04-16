import api from '../api';
import { TOKEN } from 'functions/Utils';

export const accountService = {
    login,
    getStaffProfile,
    updateStaffProfile,
    uploadImageFile,
}

function login(username, password, onNext) {
    const token = btoa(username + ":" + password);
    const body = { username, password }

    const requestOptions = {
        method: 'POST',
        headers: api.getHeader(token, api.CONTENT_TYPE, 'Basic'),
        body: body
    };

    const url = api.getUrl(api.LOGIN)
    return api.handleRequest(url, requestOptions)
        .then(data => {
            if (data) {
                // store user details and basic auth credentials in local storage
                localStorage.setItem('user', JSON.stringify(data['detail']));
                if (onNext) { onNext() }
                window.location.reload()
            }
            return data;
        });
}

function getStaffProfile() {
    const requestOptions = {
        method: 'GET',
        headers: api.getHeader(TOKEN)
    };
    const params = {};
    const url = api.getUrl(api.STAFF_PROFILE, params);
    return api.handleRequest(url, requestOptions)
        .then(data => {
            if (data) {
                // store user details and basic auth credentials in local storage
                localStorage.setItem('user', JSON.stringify(data['detail']));
            }
            return data;
        });
}

function updateStaffProfile(params) {
    const requestOptions = {
        method: 'POST',
        headers: api.getHeader(TOKEN),
        body: params,
    };
    // const params = {};
    const url = api.getUrl(api.STAFF_PROFILE_UPDATE);
    return api.handleRequest(url, requestOptions)
        .then(data => {
            if (data) {
                // store user details and basic auth credentials in local storage
                localStorage.setItem('user', JSON.stringify(data['detail']));
                window.location.reload()
            }
            return data;
        });
}

async function uploadImageFile(params) {
    return await api.postWithFormData(params, TOKEN, api.STAFF_AVATAR);
}