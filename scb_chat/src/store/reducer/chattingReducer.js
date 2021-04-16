import { chattingAction } from "../action/index";
const initialState = {
    //v2
    listUser: null,
    roomChatList: null,
    roomListAll: null,
    listLogMessage: null,
    roomInfo: null,
    editGroup: null,
    editGroupMember: null,
    createUserChat: null,
    createGroupChat: null,
    userAttachmentList: null,
    attachmentFiles: null,
    attachmentMedia: null,
    quitRoom: null,
    listAddMemberInRoom: null,
    uploadFile: null,
    searchMessage: null,
    userInfo: null,
    deleteRoom: null,

    error: false,
    success: false,
    isFetching: false,
    isFetchingLoadmoreLeftMenu: false,
    isFetchingChatLog: false,
    isFetchingLeftMenu: false,
};
const getFetchingLeftMenu = (state) => {
    return (state.isLoadListUser || state.isLoadRoomList)
}
const getLoadmoreLeftMenu = (state) => {
    return (state.isLoadRoomChatList || state.isLoadSearchMessage) && !getFetchingLeftMenu(state)
}
const getFetchingBody = (state) => {
    return (state.isLoadEditGroupRoom || state.isLoadInfoRoom || state.isLoadEditMemberRoom
        || state.isLoadCreateUserRoom || state.isLoadCreateRoom || state.isLoadUserAttachmentList
        || state.isLoadRoomAttachmentFileList || state.isLoadRoomAttachmentMediaList || state.isLoadQuitRoom || state.isLoadDeleteRoom
        || state.isLoadAddMemberRoom || state.isUploadFile || state.isLoadUserInfoRoom || state.isLoadRoomAttachmentLinksList)
}
export default (state = initialState, action) => {
    switch (action.type) {
        case chattingAction.ACTIVE_ROOM_CHAT_LIST_SUCCESS:
            return {
                ...state,
                error: false,
                success: false,
                isLoadRoomChatList: true,
                isFetchingLoadmoreLeftMenu: getLoadmoreLeftMenu({ ...state, isLoadRoomChatList: true }),
                roomChatList: null
            }
        case chattingAction.ACTIVE_ROOM_CHAT_LIST_FAILURE:
            return {
                ...state,
                error: action.err,
                success: false,
                isLoadRoomChatList: false,
                isFetchingLoadmoreLeftMenu: getLoadmoreLeftMenu({ ...state, isLoadRoomChatList: false }),
                roomChatList: null
            }
        case chattingAction.ACTIVE_ROOM_CHAT_LIST_SUCCESS:
            return {
                ...state,
                isLoadRoomChatList: false,
                isFetchingLoadmoreLeftMenu: getLoadmoreLeftMenu({ ...state, isLoadRoomChatList: false }),
                error: false,
                success: true,
                roomChatList: action.response,
            }
        default:
            return state;
    }
};
