import { chatProfileAction } from "../action/index";
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
        case chatProfileAction.USER_LIST_REQUEST:
            return {
                ...state,
                error: false,
                success: false,
                isLoadListUser: true,
                isFetchingLeftMenu: getFetchingLeftMenu({ ...state, isLoadListUser: true }),
                listUser: null
            }
        case chatProfileAction.USER_LIST_FAILURE:
            return {
                ...state,
                error: action.err,
                success: false,
                isLoadListUser: false,
                isFetchingLeftMenu: getFetchingLeftMenu({ ...state, isLoadListUser: false }),
                listUser: null
            }
        case chatProfileAction.USER_LIST_SUCCESS:
            return {
                ...state,
                isLoadListUser: false,
                isFetchingLeftMenu: getFetchingLeftMenu({ ...state, isLoadListUser: false }),
                error: false,
                success: true,
                listUser: action.response,
            }
        case chatProfileAction.ROOM_CHAT_LIST_REQUEST:
            return {
                ...state,
                error: false,
                success: false,
                isLoadRoomChatList: true,
                isFetchingLoadmoreLeftMenu: getLoadmoreLeftMenu({ ...state, isLoadRoomChatList: true }),
                roomChatList: null
            }
        case chatProfileAction.ROOM_CHAT_LIST_FAILURE:
            return {
                ...state,
                error: action.err,
                success: false,
                isLoadRoomChatList: false,
                isFetchingLoadmoreLeftMenu: getLoadmoreLeftMenu({ ...state, isLoadRoomChatList: false }),
                roomChatList: null
            }
        case chatProfileAction.ROOM_CHAT_LIST_SUCCESS:
            return {
                ...state,
                isLoadRoomChatList: false,
                isFetchingLoadmoreLeftMenu: getLoadmoreLeftMenu({ ...state, isLoadRoomChatList: false }),
                error: false,
                success: true,
                roomChatList: action.response,
            }
        case chatProfileAction.ROOM_LIST_REQUEST:
            return {
                ...state,
                error: false,
                success: false,
                isLoadRoomList: true,
                isFetchingLeftMenu: getFetchingLeftMenu({ ...state, isLoadRoomList: true }),
                roomListAll: null
            }
        case chatProfileAction.ROOM_LIST_FAILURE:
            return {
                ...state,
                error: action.err,
                success: false,
                isLoadRoomList: false,
                isFetchingLeftMenu: getFetchingLeftMenu({ ...state, isLoadRoomList: false }),
                roomListAll: null
            }
        case chatProfileAction.ROOM_LIST_SUCCESS:
            return {
                ...state,
                isLoadRoomList: false,
                isFetchingLeftMenu: getFetchingLeftMenu({ ...state, isLoadRoomList: false }),
                error: false,
                success: true,
                roomListAll: action.response.detail,
            }
        case chatProfileAction.ROOM_INFO_REQUEST:
            return {
                ...state,
                error: false,
                success: false,
                isLoadInfoRoom: true,
                isFetching: getFetchingBody({ ...state, isLoadInfoRoom: true }),
                roomInfo: null
            }
        case chatProfileAction.ROOM_INFO_FAILURE:
            return {
                ...state,
                error: action.err,
                success: false,
                isLoadInfoRoom: false,
                isFetching: getFetchingBody({ ...state, isLoadInfoRoom: false }),
                roomInfo: null
            }
        case chatProfileAction.ROOM_INFO_SUCCESS:
            return {
                ...state,
                isLoadInfoRoom: false,
                isFetching: getFetchingBody({ ...state, isLoadInfoRoom: false }),
                error: false,
                success: true,
                roomInfo: action.response,
            }
        case chatProfileAction.ROOM_GROUP_EDIT_REQUEST:
            return {
                ...state,
                error: false,
                success: false,
                isLoadEditGroupRoom: true,
                isFetching: getFetchingBody({ ...state, isLoadEditGroupRoom: true }),
                editGroup: null
            }
        case chatProfileAction.ROOM_GROUP_EDIT_FAILURE:
            return {
                ...state,
                error: action.err,
                success: false,
                isLoadEditGroupRoom: false,
                isFetching: getFetchingBody({ ...state, isLoadEditGroupRoom: false }),
                editGroup: null
            }
        case chatProfileAction.ROOM_GROUP_EDIT_SUCCESS:
            return {
                ...state,
                isLoadEditGroupRoom: false,
                isFetching: getFetchingBody({ ...state, isLoadEditGroupRoom: false }),
                error: false,
                success: true,
                editGroup: action.response,
            }
        case chatProfileAction.ROOM_GROUP_EDIT_MEMBER_REQUEST:
            return {
                ...state,
                error: false,
                success: false,
                isLoadEditMemberRoom: true,
                isFetching: getFetchingBody({ ...state, isLoadEditMemberRoom: true }),
                editGroupMember: null
            }
        case chatProfileAction.ROOM_GROUP_EDIT_MEMBER_FAILURE:
            return {
                ...state,
                error: action.err,
                success: false,
                isLoadEditMemberRoom: false,
                isFetching: getFetchingBody({ ...state, isLoadEditMemberRoom: false }),
                editGroupMember: null
            }
        case chatProfileAction.ROOM_GROUP_EDIT_MEMBER_SUCCESS:
            return {
                ...state,
                isLoadEditMemberRoom: false,
                isFetching: getFetchingBody({ ...state, isLoadEditMemberRoom: false }),
                error: false,
                success: true,
                editGroupMember: action.response,
            }
        case chatProfileAction.CREATE_ROOM_WITH_USER_REQUEST:
            return {
                ...state,
                error: false,
                success: false,
                isLoadCreateUserRoom: true,
                isFetching: getFetchingBody({ ...state, isLoadCreateUserRoom: true }),
                createUserChat: null
            }
        case chatProfileAction.CREATE_ROOM_WITH_USER_FAILURE:
            return {
                ...state,
                error: action.err,
                success: false,
                isLoadCreateUserRoom: false,
                isFetching: getFetchingBody({ ...state, isLoadCreateUserRoom: false }),
                createUserChat: null
            }
        case chatProfileAction.CREATE_ROOM_WITH_USER_SUCCESS:
            return {
                ...state,
                isLoadCreateUserRoom: false,
                isFetching: getFetchingBody({ ...state, isLoadCreateUserRoom: false }),
                error: false,
                success: true,
                createUserChat: action.response,
            }
        case chatProfileAction.CREATE_ROOM_WITH_GROUP_REQUEST:
            return {
                ...state,
                error: false,
                success: false,
                isLoadCreateRoom: true,
                isFetching: getFetchingBody({ ...state, isLoadCreateRoom: true }),
                createGroupChat: null
            }
        case chatProfileAction.CREATE_ROOM_WITH_GROUP_FAILURE:
            return {
                ...state,
                error: action.err,
                success: false,
                isLoadCreateRoom: false,
                isFetching: getFetchingBody({ ...state, isLoadCreateRoom: false }),
                createGroupChat: null
            }
        case chatProfileAction.CREATE_ROOM_WITH_GROUP_SUCCESS:
            return {
                ...state,
                isLoadCreateRoom: false,
                isFetching: getFetchingBody({ ...state, isLoadCreateRoom: false }),
                error: false,
                success: true,
                createGroupChat: action.response,
            }
        case chatProfileAction.USER_ATTACHMENT_LIST_REQUEST:
            return {
                ...state,
                error: false,
                isLoadUserAttachmentList: true,
                isFetching: getFetchingBody({ ...state, isLoadUserAttachmentList: true }),
                userAttachmentList: null
            }
        case chatProfileAction.USER_ATTACHMENT_LIST_FAILURE:
            return {
                ...state,
                error: action.err,
                success: false,
                isLoadUserAttachmentList: false,
                isFetching: getFetchingBody({ ...state, isLoadUserAttachmentList: false }),
                userAttachmentList: null
            }
        case chatProfileAction.USER_ATTACHMENT_LIST_SUCCESS:
            return {
                ...state,
                isLoadUserAttachmentList: false,
                isFetching: getFetchingBody({ ...state, isLoadUserAttachmentList: false }),
                error: false,
                success: true,
                userAttachmentList: action.response,
            }

        case chatProfileAction.ROOM_ATTACHMENT_FILES_REQUEST:
            return {
                ...state,
                error: false,
                success: false,
                isLoadRoomAttachmentFileList: true,
                isFetching: getFetchingBody({ ...state, isLoadRoomAttachmentFileList: true }),
                attachmentFiles: null
            }
        case chatProfileAction.ROOM_ATTACHMENT_FILES_FAILURE:
            return {
                ...state,
                error: action.err,
                success: false,
                isLoadRoomAttachmentFileList: false,
                isFetching: getFetchingBody({ ...state, isLoadRoomAttachmentFileList: false }),
                attachmentFiles: null
            }
        case chatProfileAction.ROOM_ATTACHMENT_FILES_SUCCESS:
            return {
                ...state,
                isLoadRoomAttachmentFileList: false,
                isFetching: getFetchingBody({ ...state, isLoadRoomAttachmentFileList: false }),
                error: false,
                success: true,
                attachmentFiles: action.response,
            }

        case chatProfileAction.ROOM_ATTACHMENT_LINKS_REQUEST:
            return {
                ...state,
                error: false,
                success: false,
                isLoadRoomAttachmentLinksList: true,
                isFetching: getFetchingBody({ ...state, isLoadRoomAttachmentLinksList: true }),
                attachmentLinks: null
            }
        case chatProfileAction.ROOM_ATTACHMENT_LINKS_FAILURE:
            return {
                ...state,
                error: action.err,
                success: false,
                isLoadRoomAttachmentLinksList: false,
                isFetching: getFetchingBody({ ...state, isLoadRoomAttachmentLinksList: false }),
                attachmentLinks: null
            }
        case chatProfileAction.ROOM_ATTACHMENT_LINKS_SUCCESS:
            return {
                ...state,
                isLoadRoomAttachmentLinksList: false,
                isFetching: getFetchingBody({ ...state, isLoadRoomAttachmentLinksList: false }),
                error: false,
                success: true,
                attachmentLinks: action.response,
            }

        case chatProfileAction.ROOM_ATTACHMENT_MEDIA_REQUEST:
            return {
                ...state,
                error: false,
                isLoadRoomAttachmentMediaList: true,
                isFetching: getFetchingBody({ ...state, isLoadRoomAttachmentMediaList: true }),
                attachmentMedia: null
            }
        case chatProfileAction.ROOM_ATTACHMENT_MEDIA_FAILURE:
            return {
                ...state,
                error: action.err,
                success: false,
                isLoadRoomAttachmentMediaList: false,
                isFetching: getFetchingBody({ ...state, isLoadRoomAttachmentMediaList: false }),
                attachmentMedia: null
            }
        case chatProfileAction.ROOM_ATTACHMENT_MEDIA_SUCCESS:
            return {
                ...state,
                isLoadRoomAttachmentMediaList: false,
                isFetching: getFetchingBody({ ...state, isLoadRoomAttachmentMediaList: false }),
                error: false,
                success: true,
                attachmentMedia: action.response,
            }

        case chatProfileAction.ROOM_LOG_CHAT_REQUEST:
            return {
                ...state,
                error: false,
                success: false,
                isFetchingChatLog: true,
                listLogMessage: null
            }
        case chatProfileAction.ROOM_LOG_CHAT_FAILURE:
            return {
                ...state,
                error: action.err,
                success: false,
                isFetchingChatLog: false,
                listLogMessage: null
            }
        case chatProfileAction.ROOM_LOG_CHAT_SUCCESS:
            return {
                ...state,
                isFetchingChatLog: false,
                error: false,
                success: true,
                listLogMessage: action.response,
            }
        case chatProfileAction.ROOM_GROUP_QUIT_ROOM_REQUEST:
            return {
                ...state,
                error: false,
                success: false,
                isLoadQuitRoom: true,
                isFetching: getFetchingBody({ ...state, isLoadQuitRoom: true }),
                quitRoom: null
            }
        case chatProfileAction.ROOM_GROUP_QUIT_ROOM_FAILURE:
            return {
                ...state,
                error: action.err,
                success: false,
                isLoadQuitRoom: false,
                isFetching: getFetchingBody({ ...state, isLoadQuitRoom: false }),
                quitRoom: null
            }
        case chatProfileAction.ROOM_GROUP_QUIT_ROOM_SUCCESS:
            return {
                ...state,
                isLoadQuitRoom: false,
                isFetching: getFetchingBody({ ...state, isLoadQuitRoom: false }),
                error: false,
                success: true,
                quitRoom: action.response,
            }
        case chatProfileAction.ROOM_DELETE_REQUEST:
            return {
                ...state,
                error: false,
                success: false,
                isLoadDeleteRoom: true,
                isFetching: getFetchingBody({ ...state, isLoadDeleteRoom: true }),
                deleteRoom: null
            }
        case chatProfileAction.ROOM_DELETE_FAILURE:
            return {
                ...state,
                error: action.err,
                success: false,
                isLoadDeleteRoom: false,
                isFetching: getFetchingBody({ ...state, isLoadDeleteRoom: false }),
                deleteRoom: null
            }
        case chatProfileAction.ROOM_DELETE_SUCCESS:
            return {
                ...state,
                isLoadDeleteRoom: false,
                isFetching: getFetchingBody({ ...state, isLoadDeleteRoom: false }),
                error: false,
                success: true,
                deleteRoom: action.response,
            }

        case chatProfileAction.ROOM_GROUP_ADD_MEMBER_LIST_REQUEST:
            return {
                ...state,
                error: false,
                success: false,
                isLoadAddMemberRoom: true,
                isFetching: getFetchingBody({ ...state, isLoadAddMemberRoom: true }),
                listAddMemberInRoom: null
            }
        case chatProfileAction.ROOM_GROUP_ADD_MEMBER_LIST_FAILURE:
            return {
                ...state,
                error: action.err,
                success: false,
                isLoadAddMemberRoom: false,
                isFetching: getFetchingBody({ ...state, isLoadAddMemberRoom: false }),
                listAddMemberInRoom: null
            }
        case chatProfileAction.ROOM_GROUP_ADD_MEMBER_LIST_SUCCESS:
            return {
                ...state,
                isLoadAddMemberRoom: false,
                isFetching: getFetchingBody({ ...state, isLoadAddMemberRoom: false }),
                error: false,
                success: true,
                listAddMemberInRoom: action.response,
            }
        case chatProfileAction.CHAT_UPLOAD_FILE_REQUEST:
            return {
                ...state,
                error: false,
                success: false,
                isUploadFile: true,
                isFetching: getFetchingBody({ ...state, isUploadFile: true }),
                uploadFile: null
            }
        case chatProfileAction.CHAT_UPLOAD_FILE_FAILURE:
            return {
                ...state,
                error: action.err,
                success: false,
                isUploadFile: false,
                isFetching: getFetchingBody({ ...state, isUploadFile: false }),
                uploadFile: null
            }
        case chatProfileAction.CHAT_UPLOAD_FILE_SUCCESS:
            return {
                ...state,
                isUploadFile: false,
                isFetching: getFetchingBody({ ...state, isUploadFile: false }),
                error: false,
                success: true,
                uploadFile: action.response,
            }

        case chatProfileAction.CHAT_SEARCH_MESSAGE_REQUEST:
            return {
                ...state,
                error: false,
                success: false,
                isLoadSearchMessage: true,
                isFetchingLoadmoreLeftMenu: getLoadmoreLeftMenu({ ...state, isLoadSearchMessage: true }),
                searchMessage: null
            }
        case chatProfileAction.CHAT_SEARCH_MESSAGE_FAILURE:
            return {
                ...state,
                error: action.err,
                success: false,
                isLoadSearchMessage: false,
                isFetchingLoadmoreLeftMenu: getLoadmoreLeftMenu({ ...state, isLoadSearchMessage: false }),
                searchMessage: null
            }
        case chatProfileAction.CHAT_SEARCH_MESSAGE_SUCCESS:
            return {
                ...state,
                isLoadSearchMessage: false,
                isFetchingLoadmoreLeftMenu: getLoadmoreLeftMenu({ ...state, isLoadSearchMessage: false }),
                error: false,
                success: true,
                searchMessage: action.response,
            }

        case chatProfileAction.CHAT_SEARCH_MESSAGE_ALL_REQUEST:
            return {
                ...state,
                error: false,
                success: false,
                isLoadSearchAllMessage: true,
                isFetchingLoadmoreLeftMenu: getLoadmoreLeftMenu({ ...state, isLoadSearchAllMessage: true }),
                searchAllMessage: null
            }
        case chatProfileAction.CHAT_SEARCH_MESSAGE_ALL_FAILURE:
            return {
                ...state,
                error: action.err,
                success: false,
                isLoadSearchAllMessage: false,
                isFetchingLoadmoreLeftMenu: getLoadmoreLeftMenu({ ...state, isLoadSearchAllMessage: false }),
                searchMessage: null
            }
        case chatProfileAction.CHAT_SEARCH_MESSAGE_ALL_SUCCESS:
            return {
                ...state,
                isLoadSearchAllMessage: false,
                isFetchingLoadmoreLeftMenu: getLoadmoreLeftMenu({ ...state, isLoadSearchAllMessage: false }),
                error: false,
                success: true,
                searchAllMessage: action.response,
            }

        case chatProfileAction.ROOM_USER_INFO_REQUEST:
            return {
                ...state,
                error: false,
                success: false,
                isLoadUserInfoRoom: true,
                isFetching: getFetchingBody({ ...state, isLoadUserInfoRoom: true }),
                userInfo: null
            }
        case chatProfileAction.ROOM_USER_INFO_FAILURE:
            return {
                ...state,
                error: action.err,
                success: false,
                isLoadUserInfoRoom: false,
                isFetching: getFetchingBody({ ...state, isLoadUserInfoRoom: false }),
                userInfo: null
            }
        case chatProfileAction.ROOM_USER_INFO_SUCCESS:
            return {
                ...state,
                isLoadUserInfoRoom: false,
                isFetching: getFetchingBody({ ...state, isLoadUserInfoRoom: false }),
                error: false,
                success: true,
                userInfo: action.response,
            }

        case chatProfileAction.CHAT_LOAD_MORE_LIST_IMAGE_REQUEST:
            return {
                ...state,
                loadMoreImage: action.params
            }
        case chatProfileAction.CHAT_CLEAR_DATA: {
            return {
                ...state,
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
                loadMoreImage: null
            }
        }
        default:
            return state;
    }
};
