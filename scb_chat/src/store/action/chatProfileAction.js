const name = "CHAT_"

const actions = {
    USER_LIST_REQUEST: name + "USER_LIST_REQUEST",
    USER_LIST_SUCCESS: name + "USER_LIST_SUCCESS",//user
    USER_LIST_FAILURE: name + "USER_LIST_FAILURE",

    ROOM_CHAT_LIST_REQUEST: name + "ROOM_CHAT_LIST_REQUEST",
    ROOM_CHAT_LIST_SUCCESS: name + "ROOM_CHAT_LIST_SUCCESS",//lấy danh sách room
    ROOM_CHAT_LIST_FAILURE: name + "ROOM_CHAT_LIST_FAILURE",

    ROOM_LIST_REQUEST: name + "ROOM_LIST_REQUEST",
    ROOM_LIST_SUCCESS: name + "ROOM_LIST_SUCCESS",
    ROOM_LIST_FAILURE: name + "ROOM_LIST_FAILURE",//lấy all room

    ROOM_LOG_CHAT_REQUEST: name + "ROOM_LOG_CHAT_REQUEST",
    ROOM_LOG_CHAT_SUCCESS: name + "ROOM_LOG_CHAT_SUCCESS", //lấy tin nhắn
    ROOM_LOG_CHAT_FAILURE: name + "ROOM_LOG_CHAT_FAILURE",

    ROOM_INFO_REQUEST: name + "ROOM_INFO_REQUEST",
    ROOM_INFO_SUCCESS: name + "ROOM_INFO_SUCCESS", // info room
    ROOM_INFO_FAILURE: name + "ROOM_INFO_FAILURE",

    ROOM_USER_INFO_REQUEST: name + "ROOM_USER_INFO_REQUEST",
    ROOM_USER_INFO_SUCCESS: name + "ROOM_USER_INFO_SUCCESS",// info user
    ROOM_USER_INFO_FAILURE: name + "ROOM_USER_INFO_FAILURE",

    ROOM_GROUP_EDIT_REQUEST: name + "ROOM_GROUP_EDIT_REQUEST",
    ROOM_GROUP_EDIT_SUCCESS: name + "ROOM_GROUP_EDIT_SUCCESS", // chỉnh sửa thông tin room
    ROOM_GROUP_EDIT_FAILURE: name + "ROOM_GROUP_EDIT_FAILURE",

    ROOM_GROUP_EDIT_MEMBER_REQUEST: name + "ROOM_GROUP_EDIT_MEMBER_REQUEST",
    ROOM_GROUP_EDIT_MEMBER_SUCCESS: name + "ROOM_GROUP_EDIT_MEMBER_SUCCESS",
    ROOM_GROUP_EDIT_MEMBER_FAILURE: name + "ROOM_GROUP_EDIT_MEMBER_FAILURE",

    CREATE_ROOM_WITH_USER_REQUEST: name + "CREATE_ROOM_WITH_USER_REQUEST",
    CREATE_ROOM_WITH_USER_SUCCESS: name + "CREATE_ROOM_WITH_USER_SUCCESS",
    CREATE_ROOM_WITH_USER_FAILURE: name + "CREATE_ROOM_WITH_USER_FAILURE",

    CREATE_ROOM_WITH_GROUP_REQUEST: name + "CREATE_ROOM_WITH_GROUP_REQUEST",
    CREATE_ROOM_WITH_GROUP_SUCCESS: name + "CREATE_ROOM_WITH_GROUP_SUCCESS",
    CREATE_ROOM_WITH_GROUP_FAILURE: name + "CREATE_ROOM_WITH_GROUP_FAILURE",

    USER_ATTACHMENT_LIST_REQUEST: name + "USER_ATTACHMENT_LIST_REQUEST",
    USER_ATTACHMENT_LIST_SUCCESS: name + "USER_ATTACHMENT_LIST_SUCCESS",
    USER_ATTACHMENT_LIST_FAILURE: name + "USER_ATTACHMENT_LIST_FAILURE",

    ROOM_ATTACHMENT_FILES_REQUEST: name + "ROOM_ATTACHMENT_FILES_REQUEST",
    ROOM_ATTACHMENT_FILES_SUCCESS: name + "ROOM_ATTACHMENT_FILES_SUCCESS",
    ROOM_ATTACHMENT_FILES_FAILURE: name + "ROOM_ATTACHMENT_FILES_FAILURE",

    ROOM_ATTACHMENT_LINKS_REQUEST: name + "ROOM_ATTACHMENT_LINKS_REQUEST",
    ROOM_ATTACHMENT_LINKS_SUCCESS: name + "ROOM_ATTACHMENT_LINKS_SUCCESS",
    ROOM_ATTACHMENT_LINKS_FAILURE: name + "ROOM_ATTACHMENT_LINKS_FAILURE",

    ROOM_ATTACHMENT_MEDIA_REQUEST: name + "ROOM_ATTACHMENT_MEDIA_REQUEST",
    ROOM_ATTACHMENT_MEDIA_SUCCESS: name + "ROOM_ATTACHMENT_MEDIA_SUCCESS",
    ROOM_ATTACHMENT_MEDIA_FAILURE: name + "ROOM_ATTACHMENT_MEDIA_FAILURE",

    ROOM_GROUP_QUIT_ROOM_REQUEST: name + "ROOM_GROUP_QUIT_ROOM_REQUEST",
    ROOM_GROUP_QUIT_ROOM_SUCCESS: name + "ROOM_GROUP_QUIT_ROOM_SUCCESS",
    ROOM_GROUP_QUIT_ROOM_FAILURE: name + "ROOM_GROUP_QUIT_ROOM_FAILURE",

    ROOM_DELETE_REQUEST: name + "ROOM_DELETE_REQUEST",
    ROOM_DELETE_SUCCESS: name + "ROOM_DELETE_SUCCESS",
    ROOM_DELETE_FAILURE: name + "ROOM_DELETE_FAILURE",

    ROOM_GROUP_ADD_MEMBER_LIST_REQUEST: name + "ROOM_GROUP_ADD_MEMBER_LIST_REQUEST",
    ROOM_GROUP_ADD_MEMBER_LIST_SUCCESS: name + "ROOM_GROUP_ADD_MEMBER_LIST_SUCCESS",
    ROOM_GROUP_ADD_MEMBER_LIST_FAILURE: name + "ROOM_GROUP_ADD_MEMBER_LIST_FAILURE",

    CHAT_UPLOAD_FILE_REQUEST: name + "CHAT_UPLOAD_FILE_REQUEST",
    CHAT_UPLOAD_FILE_SUCCESS: name + "CHAT_UPLOAD_FILE_SUCCESS",
    CHAT_UPLOAD_FILE_FAILURE: name + "CHAT_UPLOAD_FILE_FAILURE",

    CHAT_SEARCH_MESSAGE_REQUEST: name + "CHAT_SEARCH_MESSAGE_REQUEST",
    CHAT_SEARCH_MESSAGE_SUCCESS: name + "CHAT_SEARCH_MESSAGE_SUCCESS",
    CHAT_SEARCH_MESSAGE_FAILURE: name + "CHAT_SEARCH_MESSAGE_FAILURE",

    CHAT_SEARCH_MESSAGE_ALL_REQUEST: name + "CHAT_SEARCH_MESSAGE_ALL_REQUEST",
    CHAT_SEARCH_MESSAGE_ALL_SUCCESS: name + "CHAT_SEARCH_MESSAGE_ALL_SUCCESS",
    CHAT_SEARCH_MESSAGE_ALL_FAILURE: name + "CHAT_SEARCH_MESSAGE_ALL_FAILURE",

    CHAT_LOAD_MORE_LIST_IMAGE_REQUEST: name + "CHAT_LOAD_MORE_LIST_IMAGE_REQUEST",

    CHAT_CLEAR_DATA: name + "CHAT_CLEAR_DATA",

    getUserListResquest: (params) => ({
        type: actions.USER_LIST_REQUEST,
        params: params
    }),

    getRoomChatListResquest: (params) => ({
        type: actions.ROOM_CHAT_LIST_REQUEST,
        params: params
    }),

    getRoomListResquest: (params) => ({
        type: actions.ROOM_LIST_REQUEST,
        params: params
    }),

    getRoomLogChatResquest: (params) => ({
        type: actions.ROOM_LOG_CHAT_REQUEST,
        params: params
    }),

    getRoomInfoResquest: (params) => ({
        type: actions.ROOM_INFO_REQUEST,
        params: params
    }),

    getRoomUserInfoResquest: (params) => ({
        type: actions.ROOM_USER_INFO_REQUEST,
        params: params
    }),

    editRoomGroupResquest: (params) => ({
        type: actions.ROOM_GROUP_EDIT_REQUEST,
        params: params
    }),

    editMemberRoomGroupResquest: (params) => ({
        type: actions.ROOM_GROUP_EDIT_MEMBER_REQUEST,
        params: params
    }),

    createRoomGroupRequest: (params) => ({
        type: actions.CREATE_ROOM_WITH_GROUP_REQUEST,
        params: params
    }),

    createRoomUserRequest: (params) => ({
        type: actions.CREATE_ROOM_WITH_USER_REQUEST,
        params: params
    }),

    getUserAttachmentListRequest: (params) => ({
        type: actions.USER_ATTACHMENT_LIST_REQUEST,
        params: params
    }),

    getRoomAttachmentFilesResquest: (params) => ({
        type: actions.ROOM_ATTACHMENT_FILES_REQUEST,
        params: params
    }),

    getRoomAttachmentLinksResquest: (params) => ({
        type: actions.ROOM_ATTACHMENT_LINKS_REQUEST,
        params: params
    }),

    getRoomAttachmentMediaResquest: (params) => ({
        type: actions.ROOM_ATTACHMENT_MEDIA_REQUEST,
        params: params
    }),


    quitRoomGroupResquest: (params) => ({
        type: actions.ROOM_GROUP_QUIT_ROOM_REQUEST,
        params: params
    }),

    deleteRoomRequest: (params) => ({
        type: actions.ROOM_DELETE_REQUEST,
        params: params
    }),

    getListMemberAddRoom: (params) => ({
        type: actions.ROOM_GROUP_ADD_MEMBER_LIST_REQUEST,
        params: params
    }),

    uploadFile: (params) => ({
        type: actions.CHAT_UPLOAD_FILE_REQUEST,
        params: params
    }),

    searchMessage: (params) => ({
        type: actions.CHAT_SEARCH_MESSAGE_REQUEST,
        params: params
    }),

    searchAllMessage: (params) => ({
        type: actions.CHAT_SEARCH_MESSAGE_ALL_REQUEST,
        params: params
    }),

    setLoadMoreListImage: (params) => ({
        type: actions.CHAT_LOAD_MORE_LIST_IMAGE_REQUEST,
        params: params
    }),

    clear: () => ({
        type: actions.CHAT_CLEAR_DATA,
    })
}

export default actions;