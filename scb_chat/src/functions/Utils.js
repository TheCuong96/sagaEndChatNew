import React, { lazy } from 'react';
import { Trans, useTranslation, withTranslation } from 'react-i18next';
import { notification } from 'antd';

import * as moment from 'moment';
import "moment/locale/vi"
import "moment/locale/en-au"
import "moment/locale/zh-cn"
import vi_VN from "antd/es/date-picker/locale/vi_VN";
import en_US from "antd/es/date-picker/locale/en_US"
import zh_CN from "antd/es/date-picker/locale/zh_CN"

export const DATEFORMAT = {
    DDMMYY_HHMM: "dd/MM/yyyy HH:mm",
    DDMMYY_HHMM_NEW: "dd/MM/yyyy '-' HH:mm",
    DDMMYY_HHMMSS: "dd/MM/yyyy HH:mm:ss",
    YYMMDD_HHMM: "yyyy/MM/dd HH:mm",
    HHMM_DDMMYY: "HH:mm dd/MM/yyyy",
    YYMMDD: "yyyy/MM/dd",
    DDMMYYYY: "dd/MM/yyyy",
    DDMM: "dd/MM",
    DATETIME_API: "dd/MM/yyyy HH:mm:ss",
    TIME_API: "HH:mm:ss",
    HHMM: "HH:mm",
    HHMMAA: "hh:mm aa",
    HHMMAA_24: "HH:mm aa",
    MMSS: "mm:ss",
    YYMMDD_HHMM_AA: "dd/MM/yyyy hh:mm aa",
    YYMMDD_HHMMSS: "yyyy/MM/dd HH:mm:ss",
    YY_MM_DD_HHMMSS: "yyyy-MM-dd HH:mm:ss",
    DATE_TIME_API_WAITER: "yyyy/MM/dd HH:mm:ss",
    DDMMYY: "dd/MM/yy",
    YYYY_MM_DD: "yyyy-MM-dd",
    DD_MM_YYYY: "dd-MM-yyyy",
    DDD_DD_MM: "EEEE dd/MM",
    TIMESTAMP_API: "yyyy-MM-dd'T'HH:mm:ss",
    TIMESTAMP_API3: "yyyy-MM-dd'T'HH:mm:ss.SSS",
    TIMESTAMP_API6: "yyyy-MM-dd'T'HH:mm:ss.SSSSSS"
}

export const isInt = (n) => {
    return Number(n) === n && n % 1 === 0;
}

export const convertDateShow = (date) => {
    try {
        return moment(date, 'YYYY/MM/DD').format('DD/MM/YYYY')
    } catch (e) {
        return date
    }
}

export const convertDateDDMMYYYY = (date) => {
    try {
        return moment(date, "YYYY-MM-DD[T]HH:mm:ss").format('DD-MM-YYYY')
    } catch (e) {
        return date
    }
}

export const convertDateYYYYMMDD = (date) => {
    try {
        return moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD')
    } catch (e) {
        return date
    }
}

export const convertDateHHmm = (date) => {
    try {
        return moment(date, "YYYY-MM-DD[T]HH:mm:ss").format('HH:mm')
    } catch (e) {
        return date
    }
}

export const convertDateHHmmss = (date) => {
    try {
        return moment(date, "YYYY-MM-DD[T]HH:mm:ss").format('HH:mm:ss')
    } catch (e) {
        return date
    }
}

export const checkBeforeTime = (date) => {
    try {
        return moment().isBefore(date)
    } catch (e) {
        return false
    }
}

export const getTextDefault = (value) => {
    if (value) {
        return value
    }
    return '-'
}

//Copy list to new list
export const copyList = (list) => {
    var result = []
    if (list) {
        for (var i = 0; i < list.length; i++) {
            var model = {}
            var data = list[i]
            for (var key in data) {
                model[key] = data[key]
            }
            result.push(model)
        }
    }
    return result
}

// Load data pagination
export const LoadDataPaging = (total_record, page, total_page, limit) => {
    var list = {
        total_record: total_record,
        page: page,
        total_page: total_page,
        limit: limit,
    }
    if (total_record === undefined || page === undefined || total_page === undefined || limit === undefined) {
        return null;
    } else if (total_record < 0 || page < 0 || total_page < 0 || limit < 0) {
        return null;
    } else { return list; }
}

//Kiểm tra khác nhau giữa 2 list, và key đặt biệt để kiểm tra nếu list đầu tiên đã có thì sẽ là khác (dùng cho Add)
export const differentList = (firstList, nextList, keyDifferentInFirst) => {
    if (firstList.length == nextList.length) {
        for (var i = 0; i < firstList.length; i++) {
            var data = firstList[i]
            var model = nextList[i]
            for (var key in data) {
                if (key === keyDifferentInFirst) {
                    return true
                }
                if (model[key] !== data[key]) {
                    return true
                }
            }
        }
        return false
    }
    return true
}

//Delete model in list with key and value
export const deleteModelInList = (list, key, value) => {
    if (!list) return null
    return list.filter(model => model[key] != value)
}

export const convertListToArrayId = (list, keyId) => {
    var result = []
    if (list) {
        for (var i = 0; i < list.length; i++) {
            result.push(list[i][keyId])
        }
    }
    return result
}

//Sort layout
export const sortlayout = (item, datas, currentList) => {
    let myData = [].concat(datas)
    let model = currentList.find(tab => tab.label === item.label)
    if (item.sort) {
        if (model.sort === "ascending") {
            model.sort = "descending";
        } else {
            model.sort = "ascending";
        }
    } else {
        currentList.forEach(tab => tab.sort = "")
        model.sort = "ascending";
    }
    let keySort = "";
    if (model.label) {
        keySort = model.keySort
    }
    if (model.sort == "ascending") {
        myData.sort((a, b) => a[keySort] < b[keySort] ? 1 : -1)
    } else if (model.sort == "descending") {
        myData.sort((a, b) => a[keySort] > b[keySort] ? 1 : -1)
    }
    return myData
}

export const getNumberPercentRounding = (number) => {
    if (!number) {
        return 0
    }
    var value = number % 10
    var count = value >= 5 ? 10 : 0
    return number - value + count
}

export const convertAcreagetoInt = (number) => {
    let isStart = -1;
    let isEnd = -2;
    let num = number;
    let N = /\D/gi;
    if (typeof number == "string") {
        for (let i = 0; i < number.length; i++) {
            if (N.test(number[i]) === false && isStart === -1) {
                isStart = i;
            }
            if (N.test(number[i]) === true && isStart !== -1 && number[i] !== ".") {
                isEnd = i;
                break
            }
        }
        num = number.slice(isStart, isEnd)
    }
    return num
}

export const formatCurrency = (number) => {
    if (number !== null && number !== undefined) {
        var n = null;
        if (Number.isInteger(number)) {
            n = JSON.stringify(number).split('').reverse().join("");
        }
        else {
            n = number.split(' ').reverse().join("");
        }
        var n2 = n.replace(/\d\d\d(?!$)/g, "$&.");
        return n2.split('').reverse().join('') + ",00 ";
    } else {
        return 0;
    }
}

export const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    let str = b64Data.replace(/^data:image\/[a-z]+;base64,/, "");
    let byteCharacters = atob(str);
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        let slice = byteCharacters.slice(offset, offset + sliceSize);
        let byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        let byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return URL.createObjectURL(blob);
}

export const formatCurrencyNotComma = (number) => {
    if (number !== null && number !== undefined) {
        var n = null;
        if (Number.isInteger(number)) {
            n = JSON.stringify(number).split('').reverse().join("");
        }
        else {
            n = number.split(' ').reverse().join("");
        }
        var n2 = n.replace(/\d\d\d(?!$)/g, "$&.");
        return n2.split('').reverse().join('');
    } else {
        return 0;
    }
}

export const formatDate = (date, type = "DD/MM/YYYY") => {
    return moment(date).format(type)
}

export const getLocalStorage = (text, remove = false) => {
    let data = localStorage.getItem(text);
    if (data) {
        if (remove) { localStorage.removeItem(text) }
        try {
            return JSON.parse(data);
        } catch {
            return null
        }
    }
    return false
}

export const translate = (text, trans = false) => {
    if (trans) {
        return trans(text)
    }
    else {
        return <Trans>{text}</Trans>
    }
}

export const convertUnsignedString = (s) => {
    let str = s;
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}

export const validatoInputCurrency = (value) => {
    let format = /[a-zA-z !@#$%^&*()_+\-=\[\]{};':,"\\|<>\/?]/;
    return typeof value == "string" ? format.test(convertUnsignedString(value)) == false : true
}

export const validateErrorNumber = (value) => {
    if (value == "") {
        return 0
    }
    else
        if (value.search(",00") !== -1) {
            return value.replace(",00", "");
        }
    return value
}

export const convertStringToFloat = (value, noparse = false) => {
    let text = value;
    if (typeof text == "string") {
        if (text.indexOf(0) == 0) {
            text = text.slice(1, text.length)
        }
        let number = "";
        for (let i = 0; i < text.length; i++) {
            if (text[i] == ",") {
                number = number + "."
            }
            else
                if (text[i] != ".") {
                    number = number + text[i]
                }
        }
        return number == "" ? "" : noparse ? number : parseFloat(number)
    }
    else {
        return text ? parseFloat(text) : 0
    }
}

export const convertFloatToString = (value) => {
    if (value) {
        let newText = ""
        let text = value;
        let _add = 0;
        let isExit = true;
        if (typeof value == "string") {
            text = value.split('').reverse().join("");
        }
        else {
            text = JSON.stringify(value).split('').reverse().join("");
        }
        if (text.indexOf(".") != -1) {
            isExit = false;
        }
        for (let i = 0; i < text.length; i++) {
            if (text[i] === ".") {
                newText = newText + ","
                _add = 0;
                isExit = true
            }
            else
                if ((_add + 1) % 3 == 0) {
                    if (i <= text.length - 2 && isExit) {
                        if (text[i] >= 0 && text[i + 1] !== "-") {
                            newText = newText + text[i] + ".";
                            _add = 0
                        }
                        else {
                            newText = newText + text[i]
                        }
                    }
                    else {
                        newText = newText + text[i]
                    }
                }
                else {
                    _add = _add + 1
                    newText = newText + text[i]
                }
        }
        return newText.split('').reverse().join('')
    }
    return 0;
}

export const converAddress = (address = []) => {
    let _city = "";
    let _district = "";
    let _ward = "";
    let _address
    let index = 0;
    let isStart = address.length;
    for (let i = address.length; i > 0; i--) {
        if (address[i] == ",") {
            if (index === 2) {
                _ward = address.slice(i + 1, isStart);
                _address = address.slice(0, i);
                break
            }
            if (index === 1) {
                _district = address.slice(i + 1, isStart);
                index = 2;
                isStart = i;
            }
            if (index === 0) {
                _city = address.slice(i + 1, isStart);
                index = 1;
                isStart = i;
            }
        }
    }
    return { _city, _district, _ward, _address }
}

export const datePichkerLocation = () => {
    let language = getLocalStorage("language")
    switch (language) {
        case "vi":
            return vi_VN;
        case "en":
            return en_US
        case "zh":
            return zh_CN
    }
}

export const renderDayAgo = (date) => {
    let time = moment().unix() - moment(date).unix()
    let language = getLocalStorage("language")
    if (time > 172800) {
        return formatDate(moment(date))
    }
    else {
        return moment(date).locale(language).startOf('day').fromNow()
    }
}

export const createDataSelect = (value, label, options) => {
    return { value, label, options }
};

export const capitalizeText = (text) => {
    let result = text.slice(0, 1).toUpperCase() + text.slice(1, text.length).toLowerCase()
    return result;
}

const token = () => {
    if (getLocalStorage('user')) {
        let token = getLocalStorage('user').token;
        if (token) { return token }
    }
    return null
}; // Production
export const TOKEN = token()

const tokenChat = () => {
    if (getLocalStorage('user')) {
        let chat_info = getLocalStorage('user').chat_info;
        if (chat_info) {
            return chat_info.api_token
        }
    }
    return null
}; // Production
export const TOKEN_CHAT = tokenChat()

const tokenQueueChat = () => {
    if (getLocalStorage('user')) {
        let chat_info = getLocalStorage('user').chat_info;
        if (chat_info) {
            return chat_info.queue_token
        }
    }
    return null
}; // Production
export const TOKEN_QUEUE_CHAT = tokenQueueChat()


export const showNotification = ({ type, message, title, duration = 4.5 }) => {
    notification[type ? type : 'success']({
        message: title,
        description: message,
        duration
    });
}

export const convertNumberTwoNumber = (second) => {
    if (second > 10) {
        return second
    } else {
        return `0${second}`
    }
}

export const getDisplayDateTime = (dateTime) => {
    // const lang = getLocalStorage('language');
    // console.log({datassssss : moment(dateTime, 'MM-DD-YYYY')});
    // if(dateTime == "Invalid date"){
    //     console.log('Invalid date');
    //     return null;
    // }
    // else {
    //     if(lang==='vi') {
    return moment(dateTime, 'DD-MM-YYYY');
    //     } else {
    //         return moment(dateTime, 'MM-DD-YYYY');
    //     }
    // }
}
export const isSameDay = (a, b) => {
    if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
    // Compare least significant, most likely to change units first
    // Moment's isSame clones moment inputs and is a tad slow
    return a.date() === b.date()
        && a.month() === b.month()
        && a.year() === b.year();
}

export const convertDateTimeChat = (date) => {
    try {
        return moment(date, DATEFORMAT.YY_MM_DD_HHMMSS).format('HH:mm A, MM/YYYY')
    } catch (e) {
        return date
    }
}

export const getRelationTime = (date, t) => {
    try {
        var relationTimeStr = ""
        var millisecondData = moment(date, "YYYY-MM-DD HH:mm:ss").valueOf()
        var millisecondNow = moment().valueOf()
        var millisecondDiff = millisecondNow - millisecondData
        if (millisecondDiff > 0) {
            if (millisecondDiff / 1000 < 60) {
                relationTimeStr = Math.ceil(millisecondDiff / 1000) + " " + t("text_second_before")
            } else if (millisecondDiff / 1000 / 60 < 60) {
                relationTimeStr = Math.ceil(millisecondDiff / 1000 / 60) + " " + t("text_minute_before")
            } else if (millisecondDiff / 1000 / 60 / 60 < 24) {
                relationTimeStr = Math.ceil(millisecondDiff / 1000 / 60 / 60) + " " + t("text_hour_before")
            } else {
                relationTimeStr = convertDateDDMMYYYY(date)
            }
        }
        return relationTimeStr
    } catch (e) {
        return date
    }
}

export const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result, img.type));
    reader.readAsDataURL(img);
}
export const getBase64Promise = (img) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = function () {
            resolve({
                data: reader.result,
                mimetype: img.type,
                filename: img.name
            });
        }
        reader.readAsDataURL(img);
    });
}

export function convertDateChat(date) {
    try {
        return moment(date, DATEFORMAT.YY_MM_DD_HHMMSS).format('HH:mm')
    } catch (e) {
        return date
    }
}
export function convertDateMMYYYY(date) {
    try {
        return moment(date, "YYYY-MM-DD[T]HH:mm:ss").format('MM/YYYY')
    } catch (e) {
        return date
    }
}

export const GENDER = {
    MALE: '1',
    FEMALE: '2',
    OTHER: '3'
};

export const getGenderDisplay = (gender) => {
    let result = '';
    switch (String(gender)) {
        case GENDER.MALE:
            result = <Trans>male</Trans>;
            break;
        case GENDER.FEMALE:
            result = <Trans>female</Trans>;
            break;
        case GENDER.OTHER:
            result = <Trans>other</Trans>;
            break;
        default:
            result = null;
    }
    return result
}


export const convertBirthdayToAge = (birthday) => {
    try {
        var today = new Date()
        var bd = new Date(birthday)
        var age = today.getFullYear() - bd.getFullYear()
    } catch (e) {
        console.log("error: " + e);
        return "--"
    }
    return age
}

/**
 * Check object duplicate of a array by object id
 * @param {*} array: array check
 * @param {*} obj: object check
 * @param {*} objId: id of obj
 * @return: true if array have duplicate object, else: false
 */
export const checkDuplicateObjectOfArray = (array, obj, objId) => {
    let isDuplicate = false;
    for (let i = 0; i < array.length; i++) {
        if (obj[objId] === array[i][objId]) {
            isDuplicate = true
        }
    }
    if (isDuplicate) return true;
    return false;
}

/**
 * remove object of array by object id
 * @param {*} array: array
 * @param {*} obj: object
 * @param {*} objId: id of object
 */
export const removeObjectOfArray = (array, obj, objId) => {
    for (let i = 0; i < array.length; i++) {
        if (obj[objId] === array[i][objId]) {
            array.splice(i, 1);
        }
    }
}

export const getStatusDisplay = (status) => {
    if (status === 0) {
        return 'Offline'
    }
    else if (status === 1) {
        return 'Online'
    }
    else return null;
}
// to convert size in bytes to KB, MB, GB 
export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}


export const removeExtraSpace = (s) => {
    let result = s.trim().split(/ +/).join("")
    return result
};

/**
 * Download file trên browser với url public bất kỳ trên server
 * @param {DOM} e element DOM
 * @param {string} urlFile: public url file trên server 
 * @param {string} nameFile: tên file download về.
 */
export const downloadFileURL = (e, urlFile, nameFile) => {
    e.stopPropagation()
    const requestOptions = {
        method: "GET"
    };
    fetch(urlFile, requestOptions).then(res => res.blob()).then(res => {
        const url = window.URL.createObjectURL(res)
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', nameFile);
        link.click();
    })
}
/**
 * 
 * @param {string} baseClassName 
 * @param  {...any} modifiers 
 * @returns 
 */
export function mapModifiers(baseClassName, ...modifiers) {
    return modifiers
        .reduce((acc, m) => (!m ? acc : [...acc, ...(typeof m === 'string' ? [m] : m)]), [])
        .map(m => `-${m}`)
        .reduce((classNames, suffix) => (classNames += ` ${baseClassName}${suffix}`), baseClassName);
}
/**
 * convert path URL to link url
 * @param {string} url: route url 
 * @param {array} params: mảng chứa các giá trị của param
 */
export function convertToLinkUrl(url, params) {
    let linkUrl = url;
    const temp = linkUrl.split('/');
    let urlArr = [];
    for (let t = 0; t < temp.length; t++) {
        if (temp[t].includes(':')) urlArr.push(temp[t])
    }
    for (let i = 0; i < params.length; i++) {
        linkUrl = linkUrl.replace(urlArr[i], params[i]);
    }
    return linkUrl;
}