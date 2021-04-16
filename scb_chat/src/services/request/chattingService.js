import api from '../api';
import { TOKEN } from 'functions/Utils';
// const TOKEN = 'MTAwMDAwMDAwNzoxYmMzNDczNWIwYThlZTk3NTJhMGE4NGI2YjUzNThiNDQwMDlhMmEz'
export const chattingService = {
        // active room chat list trong tab active chat
    //     getActiveRoomList() {
    //     const requestOptions = {
    //         method: "GET",
    //         headers: api.getHeader(TOKEN),
    //     };
    //     const url = api.getUrl(api.ACTIVE_ROOM_CHAT_LIST);
    //     return api.handleRequest(url, requestOptions);
    // },
    getActiveRoomList(data) {
        //https://git.minerva.payload/chatting/document-chatting/-/wikis/chat_api/room/chat_list
        // lấy danh sách room và info có phân trang
        const { current_record } = data
        const params = { current_record };

        const requestOptions = {
            method: "GET",
            headers: api.getHeader(TOKEN),
        };
        const url = api.getUrl(api.ACTIVE_ROOM_CHAT_LIST, params);
        return api.handleRequest(url, requestOptions);
    },

}