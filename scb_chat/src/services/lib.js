import { getLocalStorage } from 'functions/Utils.js';
import { ToUTF8, FromUTF8 } from './utf.js'
var pako = require('pako');

const CONTENT_TYPE = 'application/json; charset=utf-8';
const CONTENT_MULITPART = 'multipart/form-data';
const MNV_ENCODE = 0;
const API_KEY = "QZIRjFXqYH7PWecW";
const MNV_LANGUAGE = getLocalStorage('language');

function Encode(data) {
    var text = JSON.stringify(data);
    var buff = new TextEncoder("utf-8").encode(text);
    var compressed = pako.deflate(buff);
    return compressed;
}

function Decode(base64Data) {
    var decompressed = pako.inflate(base64Data);
    // var code = String.fromCharCode.apply(null, decompressed)
    var code = handleCodePoints(decompressed)
    var text = decodeURIComponent(escape(code))
    var data = JSON.parse(text);
    return data;
}

function handleCodePoints(array) {
    var CHUNK_SIZE = 0x8000; // arbitrary number here, not too small, not too big
    var index = 0;
    var length = array.length;
    var result = '';
    var slice;
    while (index < length) {
        slice = array.slice(index, Math.min(index + CHUNK_SIZE, length)); // `Math.min` is not really necessary here I think
        result += String.fromCharCode.apply(null, slice);
        index += CHUNK_SIZE;
    }
    return result;
}

function getUrl(url, data = {}) {
    var strUrl = url;
    var first = true;
    for (var key in data) {
        if (data[key] != null && data[key] != undefined && data[key] !== '') {
            strUrl = strUrl + (first ? '?' : '&') + (key + '=' + data[key]);
            first = false;
        }
    }
    return strUrl;
}


function getHeader(token, content_type = CONTENT_TYPE, auth_type = 'Bearer') {
    let headers;
    if (token) {
        headers = {
            'Authorization': auth_type + ' ' + token,
            'MNV-LANGUAGE': MNV_LANGUAGE,
        }
    } else {
        headers = {
            'MNV-LANGUAGE': MNV_LANGUAGE,
        }
    }
    headers['apikey'] = API_KEY;
    if (MNV_ENCODE == 0) {
        headers['MNV-encode'] = MNV_ENCODE;
    }
    // console.log('headers request: ',headers);
    headers['Content-Type'] = content_type;

    return headers;
}


function authHeader() {
    // return authorization header with basic auth credentials
    let user = getLocalStorage('language');
    if (user && user.authdata) {
        return { 'Authorization': 'Basic ' + user.authdata };
    } else {
        return {};
    }
}

function handleRequest(url, options) {
    options['url'] = url;
    if (options.hasOwnProperty("body")) {
        if (MNV_ENCODE != 0) {
            options['body'] = Encode(options['body']);
        }
        else {
            options['body'] = JSON.stringify(options['body'])
        }
    }

    if (MNV_ENCODE != 0) {
        return fetch(url, options).then(handleResponseBuffer);
    }
    return fetch(url, options).then(handleResponseText);
}

function handleRequestBinary(url, options) {
    options['url'] = url;

    if (MNV_ENCODE != 0) {
        return fetch(url, options).then(handleResponseBuffer);
    }
    return fetch(url, options).then(handleResponseText);
}

function handleResponseBuffer(response) {
    if (!response.ok) {
        var content = response.status + ' ' + response.statusText;
        return Promise.reject(content);
    }
    return response.arrayBuffer().then(buffer => {
        // return handleData(response, Decode(buffer));
        return Decode(buffer)
    });
}

function handleResponseText(response) {
    if (!response.ok) {
        var content = response.status + ' ' + response.statusText;

        // response error and open new window
        var w = window.open('about:blank');
        w.document.open();
        w.document.write(content);
        w.document.close();

        return Promise.reject(content);
    }
    return response.json().then(data => {
        // nếu token INVALID_TOKEN thì yêu cầu login lại
        if (data && data.success === false && data.code === "INVALID_TOKEN") {
            window.localStorage.clear();
            window.location.replace('/login')
        } else {
            return data
        }

    });
}

/**
 * update or create using form-data
 * @object {*} data: data from params
 * @string {*} token 
 */
function postWithFormData(data, token, url, onProgress, index_request) {

    return new Promise(function (resolve, reject) {

        let request = new XMLHttpRequest();
        request.open("POST", url);
        onProgress && request.upload.addEventListener("progress", onProgress);
        if (MNV_ENCODE == 0) {
            request.setRequestHeader('MNV-ENCODE', MNV_ENCODE)
        }
        request.setRequestHeader('Authorization', 'Bearer ' + token);
        if (MNV_ENCODE != 0) {
            request.responseType = "arraybuffer"
        }
        const dataKeys = Object.keys(data);
        const formData = new FormData();
        for (let i in dataKeys) {
            let valueItem = data[dataKeys[i]]
            Array.isArray(valueItem)
                ? formData.append(dataKeys[i], JSON.stringify(valueItem))
                : formData.append(dataKeys[i], valueItem);
        }
        request.send(formData);
        request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE) {
                try {
                    if (MNV_ENCODE != 0) {
                        let response = Decode(request.response)
                        if (index_request) {
                            response.index_request = index_request
                        }
                        return resolve(response)
                    } else {
                        let response = JSON.parse(request.responseText)
                        if (index_request != null) {
                            response.index_request = index_request
                        }
                        return resolve(response)
                    }
                }
                catch (e) {
                    return resolve(e.message);
                }
            }
        }
    });
}

export {
    getHeader,
    getUrl,
    authHeader,
    handleRequest,
    handleRequestBinary,
    postWithFormData,
    // postWithFormDataTest,

    CONTENT_TYPE
}
