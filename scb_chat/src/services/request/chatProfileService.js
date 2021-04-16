import api from '../api';
import { TOKEN } from 'functions/Utils';

const OLD_CHAT_TOKEN = 'MTAwMDAxMDAwMzo5YjFhMzMzYWZmNDQ4OWU2MmIxNzk4Y2EwYjg0ZmI3YjAxN2ViNWRh'
export const chatProfileService = {
    getUserQueueInfo(OLD_CHAT_TOKEN) {
        //https://git.minerva.vn/chatting/document-chatting/-/wikis/chat_api/user/queue_info
        // lấy info của user đang login
        const requestOptions = {
            method: "GET",
            headers: api.getHeader(OLD_CHAT_TOKEN),
        };
        const url = api.getUrl(api.CHAT_QUEUE_INFO);
        return api.handleRequest(url, requestOptions);
    },
    //get list user theo dự án
    getUserList() {
        //https://git.minerva.vn/camera/document-manager-system/-/wikis/User/list_user
        const requestOptions = {
            method: "GET",
            headers: api.getHeader(OLD_CHAT_TOKEN),
        };
        const url = api.getUrl(api.CHAT_USER_LIST);
        return api.handleRequest(url, requestOptions);
    },

    geChatBotList() {
        //https://git.minerva.vn/chatting/document-chatting/-/wikis/chat_api/chatterbot/list
        const requestOptions = {
            method: "GET",
            headers: api.getHeader(OLD_CHAT_TOKEN),
        };
        const url = api.getUrl(api.CHAT_BOT_LIST);
        return api.handleRequest(url, requestOptions);
    },

    getRoomChatList(data) {
        //https://git.minerva.payload/chatting/document-chatting/-/wikis/chat_api/room/chat_list
        // lấy danh sách room và info có phân trang
        const { current_record } = data
        const params = { current_record };

        const requestOptions = {
            method: "GET",
            headers: api.getHeader(OLD_CHAT_TOKEN),
        };
        const url = api.getUrl(api.CHAT_ROOM_CHAT_LIST, params);
        return api.handleRequest(url, requestOptions);
    },
    getRoomList() {
        //https://git.minerva.vn/chatting/document-chatting/-/wikis/chat_api/room/room_list
        // lấy toàn bộ danh sách room
        const requestOptions = {
            method: "GET",
            headers: api.getHeader(OLD_CHAT_TOKEN),
        };
        const url = api.getUrl(api.CHAT_ROOM_LIST);
        return api.handleRequest(url, requestOptions);
    },
    getRoomInfo(data) {
        //https://git.minerva.vn/chatting/document-chatting/-/wikis/chat_api/room/group_info
        // lấy info group
        const { room_id } = data
        const params = { room_id };
        const requestOptions = {
            method: "GET",
            headers: api.getHeader(OLD_CHAT_TOKEN),
        };
        const url = api.getUrl(api.CHAT_ROOM_INFO, params);
        return api.handleRequest(url, requestOptions);
    },

    getUserInfo(data) {
        //https://git.minerva.vn/chatting/document-chatting/-/wikis/chat_api/user/info
        const { system_user_id } = data
        const params = { system_user_id };
        const requestOptions = {
            method: "GET",
            headers: api.getHeader(OLD_CHAT_TOKEN),
        };
        const url = api.getUrl(api.CHAT_USER_PROFILE, params);
        return api.handleRequest(url, requestOptions);
    },
    editRoomMember(data) {
        //https://git.minerva.vn/chatting/document-chatting/-/wikis/chat_api/room/member_edit
        const { room_id, add_user_list, del_user_list } = data
        const body = { room_id, add_user_list, del_user_list };
        const requestOptions = {
            method: "POST",
            headers: api.getHeader(OLD_CHAT_TOKEN),
            body: body
        };
        const url = api.getUrl(api.CHAT_ROOM_MEMBER_EDIT);
        return api.handleRequest(url, requestOptions);
    },

    createRoomWithGroup(params) {
        //https://git.minerva.vn/chatting/document-chatting/-/wikis/chat_api/room/create_group_chat
        // tạo nhóm chat
        return api.postWithFormData(params, OLD_CHAT_TOKEN, api.CHAT_ROOM_CREATE_GROUP)
    },

    createRoomWithUser(data) {
        //https://git.minerva.vn/chatting/document-chatting/-/wikis/chat_api/room/create_user_chat
        //tạo phòng đơn 
        const { system_user_id } = data
        const body = { system_user_id };
        const requestOptions = {
            method: "POST",
            headers: api.getHeader(OLD_CHAT_TOKEN),
            body: body
        };
        const url = api.getUrl(api.CHAT_ROOM_CREATE_USER);
        return api.handleRequest(url, requestOptions);
    },

    editRoomGroup(params) {
        //https://git.minerva.vn/chatting/document-chatting/-/wikis/chat_api/room/group_edit
        // sửa thông tin group
        return api.postWithFormData(params, OLD_CHAT_TOKEN, api.CHAT_ROOM_GROUP_EDIT)
    },

    getUserAttachmentList(data) {
        //https://git.minerva.vn/chatting/document-chatting/-/wikis/chat_api/user/attachment_list
        // lấy danh sách file của user
        const { sender, limit, page, attachment_type_list } = data
        const params = { sender, limit, page, attachment_type_list };
        const requestOptions = {
            method: "GET",
            headers: api.getHeader(OLD_CHAT_TOKEN),
        };
        const url = api.getUrl(api.CHAT_USER_FILE_ATTACHMENT_LIST, params);
        return api.handleRequest(url, requestOptions);
    },

    getRoomAttachmentFileList(data) {
        //https://git.minerva.vn/chatting/document-chatting/-/wikis/chat_api/attachment/file_list
        // danh sách các file
        const { room_id, limit, page } = data
        const params = { room_id, limit, page };
        const requestOptions = {
            method: "GET",
            headers: api.getHeader(OLD_CHAT_TOKEN),
        };
        const url = api.getUrl(api.CHAT_FILE_ATTACHMENT_FILE_LIST, params);
        return api.handleRequest(url, requestOptions);
    },

    getRoomAttachmentLinksList(data) {
        //https://git.minerva.vn/chatting/document-chatting/-/wikis/chat_api/attachment/url_list
        // url list
        const { room_id, limit, page } = data
        const params = { room_id, limit, page };
        const requestOptions = {
            method: "GET",
            headers: api.getHeader(OLD_CHAT_TOKEN),
        };
        const url = api.getUrl(api.CHAT_FILE_ATTACHMENT_LINKS_LIST, params);
        return api.handleRequest(url, requestOptions);
    },

    getRoomAttachmentMediaList(data) {
        //https://git.minerva.vn/chatting/document-chatting/-/wikis/chat_api/attachment/media_list
        //media list
        const { room_id, limit, page } = data
        const params = { room_id, limit, page };
        const requestOptions = {
            method: "GET",
            headers: api.getHeader(OLD_CHAT_TOKEN),
        };
        const url = api.getUrl(api.CHAT_FILE_ATTACHMENT_MEDIA_LIST, params);
        return api.handleRequest(url, requestOptions);
    },

    getRoomLogChat(data) {
        //https://git.minerva.vn/chatting/document-chatting/-/wikis/chat_api/room/log_chat
        //Lấy danh message từ trong room
        const { room_id, limit, page, order_flag, message_id, timestamp } = data
        const params = { room_id, limit, page, order_flag, message_id, timestamp };
        const requestOptions = {
            method: "GET",
            headers: api.getHeader(OLD_CHAT_TOKEN),
        };
        const url = api.getUrl(api.CHAT_ROOM_LOG_CHAT, params);
        return api.handleRequest(url, requestOptions);
    },

    quitRoomChat(data) {
        //https://git.minerva.vn/chatting/document-chatting/-/wikis/chat_api/room/quit_group
        //User thoát khỏi room chat nhóm
        const { room_id } = data
        const body = { room_id }
        const requestOptions = {
            method: "POST",
            headers: api.getHeader(OLD_CHAT_TOKEN),
            body: body
        };
        const url = api.getUrl(api.CHAT_ROOM_QUIT_ROOM);
        return api.handleRequest(url, requestOptions);
    },

    deleteRoomChat(data) {
        //https://git.minerva.vn/chatting/document-chatting/-/wikis/chat_api/room/delete_room
        //Api xoá phòng chat user - user
        const { room_id } = data
        const body = { room_id }
        const requestOptions = {
            method: "POST",
            headers: api.getHeader(OLD_CHAT_TOKEN),
            body: body
        };
        const url = api.getUrl(api.CHAT_ROOM_DELETE_ROOM);
        return api.handleRequest(url, requestOptions);
    },
    getListMemberAddRoom(data) {
        const { room_id, user_name } = data
        const params = { room_id, user_name }
        const requestOptions = {
            method: "GET",
            headers: api.getHeader(OLD_CHAT_TOKEN),
        };
        const url = api.getUrl(api.CHAT_ROOM_MEMBER_LIST_ADD_IN_ROOM, params);
        return api.handleRequest(url, requestOptions);
    },

    uploadFile(params, index) {
        //https://git.minerva.vn/chatting/document-chatting/-/wikis/chat_api/attachment/upload_file
        //Tải tập tin lên server
        return api.postWithFormData(params, OLD_CHAT_TOKEN, api.CHAT_FILE_UPLOAD, null, index)
    },

    roomSearchMessage(data) {
        //https://git.minerva.vn/chatting/document-chatting/-/wikis/chat_api/room/message/search-message
        //Search text trong room.
        const { room_id, search_text, page, limit } = data
        const body = { room_id, search_text, page, limit }
        const requestOptions = {
            method: "POST",
            headers: api.getHeader(OLD_CHAT_TOKEN),
            body
        };
        const url = api.getUrl(api.CHAT_ROOM_SEARCH_MESSAGE);
        return api.handleRequest(url, requestOptions);
    },
    roomSearchAllMessage(data) {
        //https://git.minerva.vn/chatting/document-chatting/-/wikis/chat_api/room/message/search-all-rooms
        //Search text all rooms.
        const { search_text, page, limit } = data
        const body = { search_text, page, limit }
        const requestOptions = {
            method: "POST",
            headers: api.getHeader(OLD_CHAT_TOKEN),
            body
        };
        const url = api.getUrl(api.CHAT_ROOM_SEARCH_ALL_MESSAGE);
        return api.handleRequest(url, requestOptions);
    },


}