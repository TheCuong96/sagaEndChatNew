
const initialState = {
    userId: null,

    pageLogMessage: null, //todo log message

    selectTab: 1,//tab selected default 1: listRoom, 2: listFile, 3: listUser
    roomData: null, //room selected
    roomDataChange: null,//room data before change
    listRoomDefault: {
        data: [],
        page: 1,
        totalPage: 1,
        totalRecord: 0,
    }, //tab 1,2 list room chat paging
    listRoomAllDefault: null, //tab 1,2 listRoom All Default {key:object }
    listRoom: [], //tab 1,2 list room show ui
    loadMoreChatList: null,//load more list chat 

    searchSelectedWithRoom: null, //item search selected.
    listRoomSearchAll: {
        data: [],
        page: 1,
        dataDefault: [],//data default for search get message response
        totalPage: 1
    },//search all room,
    loadMoreSearchAllRoom: null,//loadmore search all room.

    listUserDefault: null, //tab 3
    listUser: null, //tab 3

    isSearchRoom: false, //type search room
    searchKey: null, //key search
    enterSearch: null, //hanlder enter search with api
    searchDatas: {
        data: [],
        dataDefault: [],
        page: 1,
        totalPage: 1
    }, //search list message
    loadMoreSearch: null,//loadmore search selected
    searchSelected: null, //search message selected

    createUserRoom: null, //create room for user

    isShowRoomInfo: false, // show room info
    isShowDataMedia: false, //show data media list infor room
    isShowDataFiles: false, //show data files list infor room

    roomInfoData: null,//room data
    roomInfoDataFiles: {
        data: [],
        page: 1,
        totalPage: 1
    },//room data list files
    roomInfoDataMedia: {
        data: [],
        page: 1,
        totalPage: 1,
        totalRecord: 0
    },//room data list media

    roomInfoDataMention: null,//room data
    roomInfoDataMentionFiles: {
        data: [],
        page: 1,
        totalPage: 1,

    },//room data list files
    roomInfoDataMentionMedia: {
        data: [],
        page: 1,
        totalPage: 1,
        totalRecord: 0
    },//room data list media
    mentionData: null, //mention data after click chat

    loadMoreFiles: null,//loadMore file
    loadMoreMedia: null,//loadMore media

    newGroupsName: null, //set new group name
    newGroupsAvatarFile: null, //set new group avatar
    deleteMember: null, //delete member in groups
    isShowAddMember: false, //show model add member in groups
    listMemberAddInRoom: null, //show model add member in groups
    addMember: null, //add member in groups
    listMember: null, //list member for add member in groups
    loadMoreFileLastId: null, //load more file with last id in room
    loadMoreImageLastId: null, //load more image with last id in room
    actionOutGroup: null, //out groups
    actionRemoveGroup: null, //out groups
    addNewMessage: null,//send tin nhắn mới,
    //Message
    messageDraft: null,//message draft,
    messageSendData: null,//send message data
    messageSendDataWithFiles: null,//send message and list file

    scrollBottom: false,//scroll to bottom
    lastRead: null, // last timestamp read message in room
    clearChatBody: false,//clear chat body message cache height
    listMessage: {
        data: [],
        page: 1,
        totalPage: 1
    }, //list message log in room
    currentIndexMessage: 0,// current index active scroll
    loadMessage: null,//load more message
    isMutilLoadMessageWithSearch: false,//load message scroll top and bottom if search
    //open list media attachment
    attachmentDataShow: null,
    isShowAttachmentDataShow: false,
    showListRoom: true,//show list room left menu
};

function init(state) {
    return { ...state };
}

function reducer(state, action) {
    switch (action.type) {
        case 'SET_VALUE':
            const { keys, value } = action;
            return { ...state, [keys]: value };
        case 'RESET_ALL':
            return init(action.payload);
        default:
            throw new Error();
    }
}

export { initialState, reducer, init };
