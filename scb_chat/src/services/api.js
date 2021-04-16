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
    CREATE_PROJECT: DOMAIN.api + CHAT_API + "/project/create",// tạo dự án mới 
    // ACCOUNT
    LOGIN: DOMAIN.api + CHAT_API + "/login",


    // CHAT
    ACTIVE_ROOM_CHAT_LIST: DOMAIN.api + CHAT_API + "/room/list",


    // //CHAT V2
    CHAT_QUEUE_INFO: DOMAIN.old_chatapi + CHAT_API + "/user/queue_info", //　lấy info queue
    CHAT_ROOM_LIST: DOMAIN.old_chatapi + CHAT_API + "/room/room_list", //Lấy toàn bộ danh sách room
    CHAT_ROOM_CHAT_LIST: DOMAIN.old_chatapi + CHAT_API + "/room/chat_list", //Lấy danh sách room ( gồm user chat và group chat)
    CHAT_ROOM_INFO: DOMAIN.old_chatapi + CHAT_API + "/room/group_info", //Lấy info room
    CHAT_ROOM_LOG_CHAT: DOMAIN.old_chatapi + CHAT_API + "/room/log_chat", //Lấy log_chat room
    CHAT_ROOM_MEMBER_EDIT: DOMAIN.old_chatapi + CHAT_API + "/room/member_edit", //Thêm xoá thành viên vào group chat
    CHAT_ROOM_GROUP_EDIT: DOMAIN.old_chatapi + CHAT_API + "/room/group_edit", //Sửa thông tin group
    CHAT_ROOM_CREATE_GROUP: DOMAIN.old_chatapi + CHAT_API + "/room/create_group_chat", //Tạo nhóm chat
    CHAT_ROOM_CREATE_USER: DOMAIN.old_chatapi + CHAT_API + "/room/create_user_chat", //Tạo phòng đơn
    CHAT_ROOM_QUIT_ROOM: DOMAIN.old_chatapi + CHAT_API + "/room/quit_group", //User thoát khỏi room chat nhóm
    CHAT_ROOM_DELETE_ROOM: DOMAIN.old_chatapi + CHAT_API + "/room/delete_room", //xoá phòng chat user - user
    CHAT_FILE_ATTACHMENT_FILE_LIST: DOMAIN.old_chatapi + CHAT_API + "/attachment/file_list", // Lấy danh sách file không phải media trong phòng chat
    CHAT_FILE_ATTACHMENT_LINKS_LIST: DOMAIN.old_chatapi + CHAT_API + "/attachment/url_list", // Lấy danh sách links trong phòng chat
    CHAT_FILE_ATTACHMENT_MEDIA_LIST: DOMAIN.old_chatapi + CHAT_API + "/attachment/media_list", // Lấy danh sách media image, video, gif trong phòng chat
    CHAT_USER_FILE_ATTACHMENT_LIST: DOMAIN.old_chatapi + CHAT_API + "/user/attachment_list", // Lấy danh sách file của user
    CHAT_USER_PROFILE: DOMAIN.old_chatapi + CHAT_API + "/user/profile", // Lấy profile user

    CHAT_USER_LIST_ONLINE: DOMAIN.old_chatapi + CHAT_API + "/user/online_list", //Lấy danh sách người dùng trực tuyến
    CHAT_ROOM_MEMBER_LIST_ADD_IN_ROOM: DOMAIN.old_chatapi + CHAT_API + "/room/add_member_list", //Lấy danh sách người dùng chưa có trong phòng
    CHAT_FILE_UPLOAD: DOMAIN.old_chatapi + CHAT_API + "/attachment/upload_file", //Tải tập tin lên server
    CHAT_ROOM_SEARCH_MESSAGE: DOMAIN.old_chatapi + CHAT_API + "/room/message/search", //Lấy danh sách room ( gồm user chat và group chat)
    CHAT_ROOM_SEARCH_ALL_MESSAGE: DOMAIN.old_chatapi + CHAT_API + "/room/message/search_all_rooms", //Search text all rooms.

    CHAT_BOT_LIST: DOMAIN.old_chatapi + CHAT_API + "/chatbot/list", //Lấy danh sách chatterbot
    //CHAT V2 + PROFJECT
    CHAT_USER_LIST: DOMAIN.old_chatapi + CHAT_API + "/user/list", //Lấy danh sách user theo từng dự án

    getHeader, getUrl, authHeader, handleRequest, handleRequestBinary, postWithFormData,
    // postWithFormDataTest,
    CONTENT_TYPE
}