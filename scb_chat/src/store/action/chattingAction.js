const name = "CHAT_"

const actions = {

    ACTIVE_ROOM_CHAT_LIST_REQUEST: name + "ACTIVE_ROOM_CHAT_LIST_REQUEST",
    ACTIVE_ROOM_CHAT_LIST_SUCCESS: name + "ACTIVE_ROOM_CHAT_LIST_SUCCESS",//lấy danh sách room
    ACTIVE_ROOM_CHAT_LIST_FAILURE: name + "ACTIVE_ROOM_CHAT_LIST_FAILURE",



    getActiveRoomChatListResquest: (params) => ({
        type: actions.ACTIVE_ROOM_CHAT_LIST_REQUEST,
        params: params
    }),

}

export default actions;