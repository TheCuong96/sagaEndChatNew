import {
    getHeader, getUrl, authHeader, handleRequest, handleRequestBinary, postWithFormData,
    // postWithFormDataTest,
    CONTENT_TYPE
} from './lib.js';
import {MODE_ENV} from '../../env/env'

let DOMAIN = '';
if (process.env.TARGET_ENV === 'prod') {
    DOMAIN = MODE_ENV.prod;
    DOMAIN.api = MODE_ENV.prod.api
} else if (process.env.TARGET_ENV === 'dev') {
    DOMAIN = MODE_ENV.dev;
    DOMAIN.api = MODE_ENV.dev.api
    DOMAIN.chatapi = MODE_ENV.dev.chatapi
    DOMAIN.old_chatapi = MODE_ENV.local.old_chatapi
    DOMAIN.chatsearch = MODE_ENV.dev.chatsearch
} else if (process.env.TARGET_ENV === 'sta') {
    DOMAIN = MODE_ENV.sta;
    DOMAIN.api = MODE_ENV.sta.api
    DOMAIN.chatapi = MODE_ENV.sta.chatapi
} else {
    DOMAIN = MODE_ENV.local;
    DOMAIN.api = MODE_ENV.local.api
    DOMAIN.cloudapi = ""
    DOMAIN.old_chatapi = MODE_ENV.local.old_chatapi
    DOMAIN.chatsearch = ""
}

let USER_API = '/user_api/v1';
let CHAT_API = '/chat_api/v1';
let CHAT_SEARCH = '/chat_search';
export default {
    //CHATBOT
    POLL_LIST: DOMAIN.api + CHAT_API + "/poll/list",
    POLL_DETAIL: DOMAIN.api + CHAT_API + "/poll/detail",
    CREATE_POLL: DOMAIN.api + CHAT_API + "/poll/add",
    LIST_QUESTION: DOMAIN.api + CHAT_API + "/poll/question/list",
    ADD_QUESTION: DOMAIN.api + CHAT_API + "/poll/question/add",
    //MONINORING
    LIST_MONITORING: DOMAIN.api + CHAT_API + "/monitor/list",
    ACTION_MONITOR: DOMAIN.api + CHAT_API + "/monitor/action", // join leave conversion
    //STAFF
    STAFF_PROFILE: DOMAIN.api + CHAT_API + "/staff/profile",
    STAFF_PROFILE_UPDATE: DOMAIN.api + CHAT_API + "/staff/profile/edit",
    STAFF_AVATAR: DOMAIN.api + CHAT_API + "/staff/profile/avatar",
    //HISTORY MONITOR
    LIST_HISTORY_MONITOR: DOMAIN.api + CHAT_API + "/monitor/history",
    //Dashboard
    DASHBOARD_CUSTOMER: DOMAIN.api + CHAT_API + "/dashboard/info",
    //Project
    LIST_PROJECT: DOMAIN.api + CHAT_API + "/project/list",
    CREATE_PROJECT: DOMAIN.api + CHAT_API + "/project/create",// t???o d??? ??n m???i 
    // ACCOUNT
    LOGIN: DOMAIN.api + CHAT_API + "/login",


    // CHAT
    ACTIVE_ROOM_CHAT_LIST: DOMAIN.api + CHAT_API + "/room/list",


    // //CHAT V2
    CHAT_QUEUE_INFO: DOMAIN.old_chatapi + CHAT_API + "/user/queue_info", //???l???y info queue
    CHAT_ROOM_LIST: DOMAIN.old_chatapi + CHAT_API + "/room/room_list", //L???y to??n b??? danh s??ch room
    CHAT_ROOM_CHAT_LIST: DOMAIN.old_chatapi + CHAT_API + "/room/chat_list", //L???y danh s??ch room ( g???m user chat v?? group chat)
    CHAT_ROOM_INFO: DOMAIN.old_chatapi + CHAT_API + "/room/group_info", //L???y info room
    CHAT_ROOM_LOG_CHAT: DOMAIN.old_chatapi + CHAT_API + "/room/log_chat", //L???y log_chat room
    CHAT_ROOM_MEMBER_EDIT: DOMAIN.old_chatapi + CHAT_API + "/room/member_edit", //Th??m xo?? th??nh vi??n v??o group chat
    CHAT_ROOM_GROUP_EDIT: DOMAIN.old_chatapi + CHAT_API + "/room/group_edit", //S???a th??ng tin group
    CHAT_ROOM_CREATE_GROUP: DOMAIN.old_chatapi + CHAT_API + "/room/create_group_chat", //T???o nh??m chat
    CHAT_ROOM_CREATE_USER: DOMAIN.old_chatapi + CHAT_API + "/room/create_user_chat", //T???o ph??ng ????n
    CHAT_ROOM_QUIT_ROOM: DOMAIN.old_chatapi + CHAT_API + "/room/quit_group", //User tho??t kh???i room chat nh??m
    CHAT_ROOM_DELETE_ROOM: DOMAIN.old_chatapi + CHAT_API + "/room/delete_room", //xo?? ph??ng chat user - user
    CHAT_FILE_ATTACHMENT_FILE_LIST: DOMAIN.old_chatapi + CHAT_API + "/attachment/file_list", // L???y danh s??ch file kh??ng ph???i media trong ph??ng chat
    CHAT_FILE_ATTACHMENT_LINKS_LIST: DOMAIN.old_chatapi + CHAT_API + "/attachment/url_list", // L???y danh s??ch links trong ph??ng chat
    CHAT_FILE_ATTACHMENT_MEDIA_LIST: DOMAIN.old_chatapi + CHAT_API + "/attachment/media_list", // L???y danh s??ch media image, video, gif trong ph??ng chat
    CHAT_USER_FILE_ATTACHMENT_LIST: DOMAIN.old_chatapi + CHAT_API + "/user/attachment_list", // L???y danh s??ch file c???a user
    CHAT_USER_PROFILE: DOMAIN.old_chatapi + CHAT_API + "/user/profile", // L???y profile user

    CHAT_USER_LIST_ONLINE: DOMAIN.old_chatapi + CHAT_API + "/user/online_list", //L???y danh s??ch ng?????i d??ng tr???c tuy???n
    CHAT_ROOM_MEMBER_LIST_ADD_IN_ROOM: DOMAIN.old_chatapi + CHAT_API + "/room/add_member_list", //L???y danh s??ch ng?????i d??ng ch??a c?? trong ph??ng
    CHAT_FILE_UPLOAD: DOMAIN.old_chatapi + CHAT_API + "/attachment/upload_file", //T???i t???p tin l??n server
    CHAT_ROOM_SEARCH_MESSAGE: DOMAIN.old_chatapi + CHAT_API + "/room/message/search", //L???y danh s??ch room ( g???m user chat v?? group chat)
    CHAT_ROOM_SEARCH_ALL_MESSAGE: DOMAIN.old_chatapi + CHAT_API + "/room/message/search_all_rooms", //Search text all rooms.

    CHAT_BOT_LIST: DOMAIN.old_chatapi + CHAT_API + "/chatbot/list", //L???y danh s??ch chatterbot
    //CHAT V2 + PROFJECT
    CHAT_USER_LIST: DOMAIN.old_chatapi + CHAT_API + "/user/list", //L???y danh s??ch user theo t???ng d??? ??n

    getHeader, getUrl, authHeader, handleRequest, handleRequestBinary, postWithFormData,
    // postWithFormDataTest,
    CONTENT_TYPE
}