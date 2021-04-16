import React, { lazy } from 'react';
import moment from "moment"
import { Trans } from 'react-i18next';
const translate = (text) => {
    return <Trans>{text}</Trans>
}
export const MAX_SIZE_IMAGE = 2500000;
export const STATUS_UPDATE = {
    INIT: 0,
    SUCCESS: 1,
    FAILURE: 2
}

const IMAGE_URL = "../../";
const IMAGE_DEFAULT = "../../images/default_image.svg";
const TIME_REDIRECT_ERROR = 10000;
const MAP = {
    TOKEN: 'pk.eyJ1IjoiYnJpYW5iYW5jcm9mdCIsImEiOiJsVGVnMXFzIn0.7ldhVh3Ppsgv4lCYs65UdA',
    STYLE: 'https://images.minerva.vn/Style/minerva'
};

const chatContant = {
    STATUS_SENDING: 1,
    STATUS_SENT: 2,
    STATUS_ERROR: 3,
    STATUS_READ: 4,

    LOG_ORDER_FLAG_OLD: '1',
    LOG_ORDER_FLAG_NEW: '0',

    CHAT_USER_ATTACHMEN_SEND: 1,
    CHAT_USER_ATTACHMEN_RECIVED: 0,

    CHAT_USER_FILE_LIMIT: 24,
    CHAT_FILE_INFO_LIMIT: 5,
    CHAT_LINKS_INFO_LIMIT: 5,
    CHAT_MEDIA_FILE_INFO_LIMIT: 6,
    CHAT_LIST_LIMIT: 10,
    ROOM_CHAT_LIST_LIMIT: 20,
    //VIDEO_CALL_TYPE
    REQUEST_CALL: 1,
    JOIN_CALL: 2,
    OUT_CALL: 3,

    VIEW_MESSAGE: "VIEW_MESSAGE",
    VIEW_IMAGE: "VIEW_IMAGE",
    VIEW_VIDEO: "VIEW_VIDEO",
    VIEW_AUDIO: "VIEW_AUDIO",
    VIEW_FILE: "VIEW_FILE",
    VIEW_ACTIONS: "VIEW_ACTIONS",
    VIEW_TIME: "VIEW_TIME",
    VIEW_NEW_MESSAGE: "VIEW_NEW_MESSAGE",

    MESSAGE_TYPE_VIEW: 1,
    MESSAGE_TYPE_ADMIN: 2,


    ATTACHMENT_TYPE_URL: 1,
    ATTACHMENT_TYPE_IMAGE: 2,
    ATTACHMENT_TYPE_VIDEO: 3,
    ATTACHMENT_TYPE_AUDIO: 4,
    ATTACHMENT_TYPE_FILE: 5,

    ADMIN_EVENT_CREATE_ROOM: "CREATE_ROOM",
    ADMIN_EVENT_EDIT_GROUP_NAME: "GROUP_NAME",
    ADMIN_EVENT_EDIT_GROUP_AVATAR: "GROUP_AVATAR",
    ADMIN_EVENT_ADD_MEMBER: "ADD_MEMBER",
    ADMIN_EVENT_REMOVE_MEMBER: "REMOVE_MEMBER",
    ADMIN_EVENT_OUT_ROOM: "OUT_ROOM",

    ROOM_TYPE_USER: 1,
    ROOM_TYPE_GROUP: 2,
    ROOM_TYPE_PERSONAL: 3,

    VIEW_MESSAGE_HEIGHT: 90,
    VIEW_IMAGE_HEIGHT: 200,
    VIEW_VIDEO_HEIGHT: 200,
    VIEW_FILE_HEIGHT: 100,
    VIEW_ACTIONS_HEIGHT: 20,
    VIEW_TIME_HEIGHT: 70,

    LIST_WORD_EXTENSION: ["doc", "dot", "docm", "docx", "docm", "dotx", "dotm", "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
        "application/vnd.ms-word.document.macroEnabled.12"],
    LIST_IMAGE_EXTENSION: ["jpg", "png", "jpeg"],
    LIST_EXCEL_EXTENSION: ["xls", "xlt", "xla", "xltx", "xlsx", "xlsm", "xlsb", "xltm", "xlam",
        "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.template", "application/vnd.ms-excel.sheet.macroEnabled.12", "application/vnd.ms-excel.template.macroEnabled.12",
        "application/vnd.ms-excel.addin.macroEnabled.12", "application/vnd.ms-excel.sheet.binary.macroEnabled.12"],
    LIST_POWERPOINT_EXTENSION: ["pptx", "pptm", "ppt", "pot", "pps", "ppa", "potx", "potm", "ppam", "ppsx", "ppsm", "sldx", "sldm",
        "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.openxmlformats-officedocument.presentationml.template", "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
        "application/vnd.ms-powerpoint.addin.macroEnabled.12", "application/vnd.ms-powerpoint.presentation.macroEnabled.12", "application/vnd.ms-powerpoint.template.macroEnabled.12",
        "application/vnd.ms-powerpoint.slideshow.macroEnabled.12"],
    LIST_PDF_EXTENSION: ["pdf", "application/pdf"],
    MAX_SIZE_IMAGE: 200 * 1024,

    FILE_LIMIT_SELECTED: [
        "pptx", "pptm", "ppt", "pot", "pps", "ppa", "potx", "potm", "ppam", "ppsx", "ppsm", "sldx", "sldm",
        "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.openxmlformats-officedocument.presentationml.template", "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
        "application/vnd.ms-powerpoint.addin.macroEnabled.12", "application/vnd.ms-powerpoint.presentation.macroEnabled.12", "application/vnd.ms-powerpoint.template.macroEnabled.12",
        "application/vnd.ms-powerpoint.slideshow.macroEnabled.12",
        "pdf", "application/pdf",
        "xls", "xlt", "xla", "xltx", "xlsx", "xlsm", "xlsb", "xltm", "xlam",
        "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.template", "application/vnd.ms-excel.sheet.macroEnabled.12", "application/vnd.ms-excel.template.macroEnabled.12",
        "application/vnd.ms-excel.addin.macroEnabled.12", "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
        "doc", "dot", "docm", "docx", "docm", "dotx", "dotm", "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
        "application/vnd.ms-word.document.macroEnabled.12",
        "jpg", "png", "jpeg", "image/gif", 'image/png', 'image/jpeg', 'image/pjpeg', 'image/jpg',
        'mage/vnd.dwg', 'application/vnd.rar', 'application/rtf', 'application/zip', 'multipart/x-zip', 'application/x-compressed',
        '.zip', '.rar', '.7z', '.dwg', 'zip', 'rar', '7z', 'dwg', 'application/x-7z-compressed', 'application/x-zip-compressed',
        'video/x-flv', 'video/mp4', 'application/x-mpegURL', 'video/MP2T', 'video/3gpp', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv',
        'audio/basic', 'audio/L24', 'audio/mid', 'audio/mpeg', 'audio/mp4', 'audio/x-aiff', 'audio/x-mpegurl', 'audio/vnd.rn-realaudio', 'audio/ogg', 'audio/vorbis', 'audio/vnd.wav',
        'text/csv', 'text/plain']
}

const FILE_CONTENT_TYPE = {
    DEFAULT: "application/octet-stream",
    PDF: "application/pdf",
    PNG: "image/png",
    JPEG: "image/jpeg",
    JPG: "image/jpg",
    GIF: "image/gif",
    DOC: "application/msword",
    DOCX:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    XLS: "application/vnd.ms-excel",
    XLSX: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    DWG: "image/vnd.dwg",
};

const PAGES_URL = {
    login: '/login',
    forgot_password: '/forgot_password',
    register: '/register',
    home: '/',
    monitoring: '/monitoring',
    video_call: '/video_call',
    activeChat: '/active_chat',
    history: '/history',
    project: '/project',
    chatbot: '/chatbot',
    element: '/element',
    profile: '/profile',
    oldChat: '/oldchat',
    chatbot_detail: '/chatbot/detail/:id',
}

const NOTIFICATION_TYPE = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error',
}

const RULES = {
    phone: {
        form: [
            {
                validator: (rule, value) => {
                    if (value) {
                        if (value[0] != 0) {
                            return Promise.reject(translate("phone_error"))
                        }
                        else {
                            if (value.length < 10 || value.length > 16) {
                                const mess = translate("phone_length")
                                return Promise.reject(mess)
                            }
                            else {
                                return Promise.resolve()
                            }
                        }
                    }
                    else {
                        return Promise.reject(translate("input_null"))
                    }
                }
            }
        ],
        type: 'number'
    },
    identity: {
        form: [
            {
                required: true,
                message: translate("input_null")
            },
            {
                min: 9,
                message: translate("identity_length")
            }
        ],
        type: 'number'
    },
    number: {
        form: [
            {
                required: true,
                message: translate("input_null"),
            }
        ],
        type: 'number'
    },
    numberCode: {
        form: [
            {
                pattern: '/^[0-9\b]+$/',
                message: translate("input_null"),
            }
        ],
        type: 'number'
    },
    email: {
        form: [
            {
                type: 'email',
                message: translate("invalid_email"),
            },
            {
                required: true,
                message: translate("input_null"),
            },
        ],
        type: 'email'
    },
    password: {
        form: [
            {
                required: true,
                message: translate('input_pass_null')
            },
            {
                min: 6,
                message: translate("input_pass_min")
            },
            {
                max: 25,
                message: translate("input_pass_max")
            }
        ],
        type: 'password'
    },
    text: {
        form: (e) => {
            if (e) {
                return [{
                    required: true,
                    message: translate(e),
                }]
            }
            return [{
                required: true,
                message: translate("input_null"),
            }]
        },
        type: 'text'
    },
    birthday: {
        form: [
            ({ }) => ({
                validator: (rule, value) => {
                    if (value) {
                        let date = new Date();
                        let oldDate = new Date();
                        oldDate.setFullYear(oldDate.getFullYear() - 200)
                        date.setFullYear(date.getFullYear() - 16)
                        if (moment(date).endOf('day') < moment(value).endOf('day') || moment(oldDate).endOf('day') > moment(value).endOf('day')) {
                            return Promise.reject(translate("birth_day_error"))
                        }
                        else {
                            return Promise.resolve()
                        }
                    }
                    else {
                        return Promise.reject(translate("input_null"))
                    }
                }
            })
        ],
        type: 'text'
    },
    require: {
        form: [{ required: true, message: translate("input_null") }]
    }
};
const SIDEBAR_MENU_DATA = [
    {
        id: 1,
        label: 'dashboard',
        iconName: 'icon fas fa-layer-group',
        url: '/',
    },
    {
        id: 2,
        label: 'Monitoring',
        iconName: 'icon fas fa-list-alt',
        url: '/monitoring',
    },
    {
        id: 3,
        label: 'activesChat',
        iconName: 'icon fas fa-comments',
        url: '/active_chat',
    },
    {
        id: 4,
        label: 'history',
        iconName: 'icon fas fa-clock',
        url: '/history',
    },
    {
        id: 5,
        label: 'project',
        iconName: 'icon fas fa-folder-open',
        url: '/project',
    },
    {
        id: 6,
        label: 'Chatbot',
        iconName: 'icon fas fa-comment-dots',
        url: '/chatbot',
    },{
        id: 7,
        label: 'OldChat',
        iconName: 'icon fas fa-comment-dots',
        url: '/oldchat',
    }
]

const LANGUAGE_OPTIONS = [
    {
        id: 1,
        label: 'vietnam',
        value: "vi",
        image: "/images/lang_vn.jpg",
    },
    {
        id: 2,
        label: 'english',
        value: "en",
        image: "/images/lang_en.png",
    },
]
const MAX_FILE_SIZE = 10 * 1024 * 1024; // Max file size 10M

const optionProject = [
    { value: 1, label: "SCB" },
    { value: 2, label: "SCB Internet" },
    { value: 3, label: "SCB Internet Banking" },
]

const optionStatus = [
    {value: 1, label: "Đang chờ"},
    {value: 2, label: "Đang kết nối"},
    {value: 3, label: "Bot đang trả lời"},
]

const contantStatus = {
    1: 'Waiting',
    2: 'Joined',
    3: 'Lost',
    4: 'Chatbot reply',
    5: 'Reply',
}

export {
    PAGES_URL, RULES,
    IMAGE_URL, NOTIFICATION_TYPE,
    chatContant,
    TIME_REDIRECT_ERROR, MAP,
    IMAGE_DEFAULT,
    SIDEBAR_MENU_DATA,
    LANGUAGE_OPTIONS,
    MAX_FILE_SIZE,
    FILE_CONTENT_TYPE,
    optionProject,
    optionStatus,
    contantStatus
}
