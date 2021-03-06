import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chatAction, chatProfileAction } from 'store/action'
import { useTranslation } from 'react-i18next'
import { chatContant, PAGES_URL, NOTIFICATION_TYPE } from 'contant'
import ConversationLeft from '../Chat/Layout/ActiveChat/ConversationLeft'
import ConversationRight from '../Chat/Layout/ActiveChat/ConversationRight';
import DialogConfirm from './Dialog/DialogConfirm'
import DialogAddMember from './Dialog/DialogAddMember'
import DialogShowMediaList from './Dialog/DialogShowMediaList'
import * as helper from 'functions/ChatHelper'
import { reducer, initialState, init } from './reducer';
import { showNotification } from 'functions/Utils'


const ChatMain = (props) => {
    // const { userId } = props
    
    const dispatch = useDispatch()
    const chatReducer = useSelector(state => state.chatReducer)
    const { newMessage, typingMessage, sendingFileMessage, readMessage, draftMessage, newRoom, outRoom, errorMessage } = chatReducer
    const chatProfileReducer = useSelector(state => state.chatProfileReducer)
    const { listUser, roomChatList, roomListAll, roomInfo, userInfo, listLogMessage, searchMessage, searchAllMessage, editGroup, editGroupMember, createUserChat, createGroupChat,
        attachmentFiles, attachmentMedia, listAddMemberInRoom, deleteRoom, quitRoom,
        error, isFetching, isFetchingLeftMenu, isFetchingChatLog, isFetchingLoadmoreLeftMenu } = chatProfileReducer

    const { t } = useTranslation()
    const [state, dispatchState] = React.useReducer(reducer, initialState, init);
    const setState = (value) => {
        let key = Object.keys(value);
        for (let i in key) {
            let keys = key[i]
            dispatchState({ type: 'SET_VALUE', keys, value: value[keys] });
        }
        //
    };
    console.log("ahihi",chatProfileReducer);
    //handler typing timer
    const [listTypingTimer, setListTypingTimer] = useState([])
    const [listSendingTimer, setListSendingTimer] = useState([])

    const [updateTyping, setTypingData] = useState()
    //{timeMer,add message}
    const [listWaiting, setListWaiting] = useState([])
    const [errorSendMsgId, setSendMsgId] = useState()
    const [indexScrollMessage, updateScrollMessage] = useState(-1)  //index message use scroll message list
    const [isBrowserActive, setBrowserActive] = useState(true) //check tab browser is active
    //call api
    useEffect(() => {
        getListUser()
        getAllRoomList()
        document.addEventListener("visibilitychange", function (e) {
            //check xem s??? ki???n thay ?????i kh??? n??ng hi???n th??? c?? ???????c k??ch ho???t kh??ng
            //set ng?????c l???i v???i tr???ng th??i hidden c???a document
            setBrowserActive(!e.target.hidden)
        });
        //set userId v??o state
        setState({ userId: props.userId })
    }, [])
    //API
    const getRoomChatList = (current_record = 0) => {
        if (current_record < state.listRoomDefault.totalRecord || current_record === 0) {
            dispatch(chatProfileAction.getRoomChatListResquest({ current_record: current_record > 0 ? current_record : "0" }))
        }
    }
    const getAllRoomList = () => {
        dispatch(chatProfileAction.getRoomListResquest())
    }
    const getListUser = () => {
        dispatch(chatProfileAction.getUserListResquest())
    }

    // call api l???y th??ng tin ph??ng chat
    const getRoomInfo = ({ room_id = state.roomData.roomId }) => {
        dispatch(chatProfileAction.getRoomInfoResquest({ room_id: room_id })) /*get dataInfo */
    }

    //call api l???y th??ng tin user trong ph??ng chat
    const getRoomUserInfo = () => {
        let singleChatId = state.roomData.singleChatId
        if (state.roomData.listMember) {
            let listMember = state.roomData.listMember.filter((member) => member.userId != state.userId)
            if (listMember.length > 0) {
                singleChatId = listMember[0].userId
            }
        }
        if (singleChatId) {
            dispatch(chatProfileAction.getRoomUserInfoResquest({ system_user_id: singleChatId })) /*get dataInfo */
        }
    }

    //call api l???y danh s??ch file v???
    const getListFileInRoom = (nextPage) => {
        let roomId = state.mentionData ? state.roomInfoDataMention.roomId : state.roomInfoData.roomId
        if (roomId) {
            dispatch(chatProfileAction.getRoomAttachmentFilesResquest({ room_id: roomId, limit: chatContant.CHAT_FILE_INFO_LIMIT, page: nextPage ? nextPage : 1 }))
        }
    }

    //call api l???y danh s??ch media v???
    const getListMediaInRoom = (nextPage) => {
        let roomId = state.mentionData ? state.roomInfoDataMention.roomId : state.roomInfoData.roomId
        if (roomId) {
            dispatch(chatProfileAction.getRoomAttachmentMediaResquest({ room_id: roomId, limit: chatContant.CHAT_MEDIA_FILE_INFO_LIMIT, page: nextPage ? nextPage : 1 }))
        }
    }

    //funtion ????? g???i api l???y log c???a ph??ng chat
    const getLogMessageRoom = (page, message_id, order_flag = chatContant.LOG_ORDER_FLAG_OLD, searchMsg, timestamp) => {
        if (order_flag == chatContant.LOG_ORDER_FLAG_NEW && !message_id) return;
        // console.log({ roomData: state.roomData })
        dispatch(chatProfileAction.getRoomLogChatResquest({
            room_id: state.roomData.roomId,
            page: page, order_flag, message_id,
            limit: chatContant.CHAT_LIST_LIMIT,
            timestamp: timestamp,
            searchMsg //ki???m tra ph???i message search tr??? v??? kh??ng, th?? add v??o ?????u list log.
        }))
    }

    //call api ????? ch???nh s???a list user trong group chat
    const callApiEditMemberGroup = ({ room_id = state.roomData?.roomId, del_user_list = [], add_user_list = [] }) => {
        //x??a data member list hi???n t???i ????? t???i member list m???i v???
        dispatch(chatProfileAction.clear())
        //g???i api ????? th??m th??nh vi??n m???i v??o group
        dispatch(chatProfileAction.editMemberRoomGroupResquest({
            room_id,
            del_user_list,
            add_user_list
        }))
    }

    //--End-API--//

    //Handle-data

    useEffect(() => {
        if (error) {
            showNotification({ type: NOTIFICATION_TYPE.error, title: t('error'), message: error.err ? error.err : error.error_message })
        }
    }, [error])

    useEffect(() => {
        if (roomListAll && listUser) {
            //danh s??ch t???t c??? c??c ph??ng chat v?? user chat
            let list = helper.mapperListRoomAll(roomListAll, listUser)
            let userList = helper.mapperUserListData(listUser)

            setState({ listRoomAllDefault: list, listUser: [].concat(userList), listUserDefault: [].concat(userList) })
            getRoomChatList() //call list chat after get config
        }
    }, [roomListAll, listUser])

    useEffect(() => {
        if (listUser && roomChatList?.detail) {
            //danh s??ch c??c group chat ??ang hi???n th???
            let list = helper.mapperListRoomData(state.listRoomDefault.data, roomChatList.detail, listUser, t)
            // list ph??ng chat group v?? chat user c?? tin nh???n cu???i c??ng
            setState({
                listRoom: list, listRoomDefault: {
                    data: list,
                    totalPage: roomChatList.total_page,
                    page: roomChatList.page,
                    totalRecord: roomChatList.total_record,
                }
            })
        }
    }, [roomChatList])

    //get listLog with key search
    useEffect(() => {
        if (!state.isSearchRoom) {
            if (state.searchKey && state.searchKey.length > 0) {
                //search ??? list ph??ng chat
                if (state.showListRoom) {
                    //list nh???ng t??n ph??ng chat ph?? h???p v???i t??n search
                    let listRoom = helper.searchListRoomDict(state.listRoomAllDefault, state.searchKey)
                    //g???n th??m typeHeader v??o list
                    let listRoomSearchAll = helper.searchAllRoomMapper(listRoom)
                    //g???i api search tin nh???n c?? ch???a text trong list tin nh???n
                    dispatch(chatProfileAction.searchAllMessage({ search_text: state.searchKey, page: 1, limit: chatContant.CHAT_LIST_LIMIT }))
                    setState({ listRoomSearchAll: { data: listRoomSearchAll, page: 1, totalPage: 1, dataDefault: [] }, searchSelectedWithRoom: null })
                } else {
                    //search ??? list user
                    let listUser = helper.searchListRoom(state.listUserDefault, state.searchKey)
                    //list user c?? ch???a t??? kh??a ph?? h???p ???????c l??u l???i state
                    setState({ listUser })
                }
            } else {
                //n???u kh??ng c?? t??? kh??a th?? set l???i m???c ?????nh ban ?????u
                setState({ listUser: [].concat(state.listUserDefault), listRoomSearchAll: { data: [], page: 1, totalPage: 1, dataDefault: [] }, searchSelectedWithRoom: null })
            }
        } else if (state.roomData) {
            if (state.searchKey && state.searchKey.length > 0) {
                let lastMessageAfterSearch = null
                //ch??a hi???u ??? ????y l??m g?? :)
                if (state.listMessage.data.length > 0) {
                    lastMessageAfterSearch = state.listMessage.data[state.listMessage.data.length - 1]
                }
                dispatch(chatProfileAction.searchMessage({ room_id: state.roomData.roomId, search_text: state.searchKey, limit: chatContant.CHAT_LIST_LIMIT, page: 1, }))
                setState({ searchDatas: { data: [], dataDefault: [], page: 1, totalPage: 1 }, lastMessageAfterSearch })
            }
            else {
                setState({ loadMoreSearch: null, searchDatas: { data: [], page: 1, dataDefault: [], totalPage: 1 }, lastMessageAfterSearch: null })
            }
        }
    }, [state.searchKey])

    useEffect(() => {
        if (searchAllMessage) {
            //nh???n data khi search t???t c??? c??c ph??ng chat
            if (searchAllMessage.detail) {
                //api hi???n ??ang fail n??n kh??ng bi???t kh??c n??y ch???y ntn
                let list = helper.mapperSearchMessage(searchAllMessage.detail, listUser, 0, state.listRoomAllDefault, t)
                let listRoomSearchAll = [].concat(state.listRoomSearchAll.data)
                let dataDefault = [].concat(state.listRoomSearchAll.dataDefault)
                dataDefault = dataDefault.concat(searchAllMessage.detail)
                if (searchAllMessage.page > 1) {
                    listRoomSearchAll = listRoomSearchAll.concat(list)
                } else {
                    let listMessage = helper.searchAllRoomMapper(null, list)
                    listRoomSearchAll = listRoomSearchAll.concat(listMessage)
                }
                setState({ listRoomSearchAll: { data: listRoomSearchAll, dataDefault, page: searchAllMessage.page, totalPage: searchAllMessage.total_page }, })
            }
            else {
                //show l???i c???a api
                showNotification({ type: "error", title: searchAllMessage.error_code, message: searchAllMessage.mess })
            }

        }
    }, [searchAllMessage])

    useEffect(() => {
        //ch??a r?? ch???c n??ng, c?? th??? l?? load th??m data khi search t???t c??? c??c ph??ng chat
        if (state.loadMoreSearchAllRoom && state.listRoomSearchAll.page < state.listRoomSearchAll.totalPage && state.listRoomSearchAll.data.length > 0 && !isFetchingLoadmoreLeftMenu) {
            let page = state.listRoomSearchAll.page + 1
            dispatch(chatProfileAction.searchAllMessage({ search_text: state.searchKey, page, limit: chatContant.CHAT_LIST_LIMIT }))
        }
    }, [state.loadMoreSearchAllRoom])

    useEffect(() => {
        if (state.selectTab != null) {
            let showListRoom = state.showListRoom
            //n???u l?? tab h??nh th?? kh??ng ki???m tra l???i
            if (state.selectTab != 2) {
                showListRoom = state.selectTab === 1
            }
            //tab user
            if (state.selectTab === 3) {
                //l???y list user m???c ?????nh v?? set l???i list user
                let list = state.listUserDefault
                setState({ listUser: list, searchKey: null, isSearchRoom: false, showListRoom, listRoomSearchAll: { data: [], page: 1, totalPage: 1 }, searchSelectedWithRoom: null })
            } else {
                //tab room chat
                if (state.selectTab == 1) {
                    //c???p nh???t v??? tr?? scroll t???i
                    updateScrollMessage(state.listMessage.data.length)
                }
                //set l???i list cho c??? tab 1 v?? tab 2
                let list = [].concat(state.listRoomDefault.data)
                setState({ listRoom: list, searchKey: null, isSearchRoom: false, showListRoom, listRoomSearchAll: { data: [], page: 1, totalPage: 1 }, searchSelectedWithRoom: null })
            }
        }
    }, [state.selectTab])



    useEffect(() => {
        if (state.isSearchRoom) {
            setState({ searchDatas: { data: [], dataDefault: [], page: 1, totalPage: 1 }, searchSelected: null, })
        }
    }, [state.isSearchRoom])

    useEffect(() => {
        if (searchMessage && state.roomData) {
            //nh???n data khi search 1 text trong 1 ph??ng chat nh???t ?????nh
            if (searchMessage.detail) {
                //api hi???n ??ang fail n??n kh??ng bi???t kh??c n??y ch???y ntn
                let lastRead = helper.getLastReadMessageInRoom(state.roomData)
                let list = helper.mapperSearchMessage(searchMessage.detail, listUser, lastRead, state.listRoomAllDefault, t)
                let dataDefault = [].concat(state.searchDatas.dataDefault)
                dataDefault = dataDefault.concat(searchMessage.detail)
                let listSearch = [].concat(state.searchDatas.data)
                listSearch = listSearch.concat(list)
                setState({ loadMoreSearch: null, searchDatas: { data: listSearch, page: searchMessage.page, dataDefault, totalPage: searchMessage.total_page } })
            }
            else {
                //show l???i c???a api
                showNotification({ type: "error", title: searchMessage.error_code, message: searchMessage.mess })
            }
        }
    }, [searchMessage])

    useEffect(() => {
        //ch??a r?? ch???c n??ng, c?? th??? l?? load th??m data khi search text c???a 1 ph??ng chat
        if (state.loadMoreSearch && state.searchDatas.page < state.searchDatas.totalPage && state.searchDatas.data.length > 0 && !isFetchingLoadmoreLeftMenu) {
            let page = state.searchDatas.page + 1
            dispatch(chatProfileAction.searchMessage({ room_id: state.roomData.roomId, search_text: state.searchKey, limit: chatContant.CHAT_LIST_LIMIT, page, }))
        }
    }, [state.loadMoreSearch])

    useEffect(() => {
        if (state.searchSelected) {
            //ch??a bi???t ch???c n??ng, c?? th??? do api search ch??a ch???y ???????c
            // console.log({ searchSelected: state.searchSelected })
            let searchMsg = null
            if (state.searchDatas.dataDefault) {
                searchMsg = state.searchDatas.dataDefault.find((item) => item.server_mid == state.searchSelected.serverMid)
            }
            getLogMessageRoom(1, state.searchSelected.serverMid, '0', searchMsg)
            setState({ listMessage: { data: [], page: 1, messageId: null } })
        }
    }, [state.searchSelected])

    useEffect(() => {
        if (state.searchSelectedWithRoom) {
            //ch??a bi???t ch???c n??ng, c?? th??? do api search ch??a ch???y ???????c
            // console.log({ searchSelectedWithRoom: state.searchSelectedWithRoom })
            setState({ roomData: null, roomDataChange: state.searchSelectedWithRoom.roomData })
        }
    }, [state.searchSelectedWithRoom])

    //hanlder after create room
    useEffect(() => {
        if (state.createUserRoom) {
            //nh???n data khi nh???n v??o nt v???i m???t user m???i ??? trong list user / tab 3
            if (state.createUserRoom.userId == state.userId) {
                let roomSaved = helper.findRoomPresonal(state.listRoomAllDefault, t)
                if (roomSaved) {
                    setState({ roomDataChange: roomSaved, roomInfoData: null, roomInfoDataMedia: null, createUserRoom: null })
                }
            } else {
                let newRoom = state.createUserRoom;
                //ki???m tra room name v?? room avatar t???n t???i hay ch??a, n???u ch??a th?? kh???i t???o qua list user
                if ((!newRoom.roomName && !newRoom.avatar)) {
                    let user = state.listUser.find(e => e.userId == room.userId);
                    // console.log({ user, listUser: state.listUser })
                    if (user) {
                        newRoom = helper.createModelUserToRoom(user)
                    }
                }
                newRoom.singleChatId = state.createUserRoom.userId
                //ch??a r?? singleChatId d??ng l??m g??
                setState({ roomDataChange: newRoom, roomInfoData: null, roomInfoDataMedia: null, createUserRoom: null })
                // dispatch(chatProfileAction.createRoomUserRequest({ system_user_id: state.createUserRoom.userId }))
            }
        }
    }, [state.createUserRoom])

    useEffect(() => {
        if (state.mentionData) {
            //nh???n data khi nh???n v??o t??n c???a user trong group chat, ??? tab info b??n ph???i
            if (state.mentionData.userId == state.userId) {
                let room = helper.mapperLocalUserToRoomInfo(state.roomData);
                // l???y data c???a ch??nh m??nh , l???y ??? local store
                setState({ roomInfoDataMention: room, isShowRoomInfo: true })
            } else {
                //g???i api ????? l???y th??ng tin c???a user ???????c nh???n theo id
                dispatch(chatProfileAction.getRoomUserInfoResquest({ system_user_id: state.mentionData.userId })) /*get dataInfo */
                setState({ isShowRoomInfo: true })
            }
        } else {
            //set data m???c ?????nh
            setState({ roomInfoDataMention: null, roomInfoDataMentionFiles: { data: [], page: 1, totalPage: 1 }, roomInfoDataMentionMedia: { data: [], page: 1, totalPage: 1 } })
        }
    }, [state.mentionData])

    //hanlder loadmore list room
    useEffect(() => {
        if (state.loadMoreChatList && state.listRoomDefault.data && state.listRoomDefault.data.length > 0 && !isFetchingLoadmoreLeftMenu && (!state.searchKey || state.searchKey.length == 0)) {
            getRoomChatList(state.listRoomDefault.data.length)
        }
    }, [state.loadMoreChatList])

    //Show room infor
    useEffect(() => {
        if (state.isShowDataFiles) {
            //nh???n data khi nh???n v??o hi???n list file ??? tab b??n ph???i chat room
            getListFileInRoom()
        }
        else {
            setState({ roomInfoDataFiles: { data: [], page: 1, totalPage: 1 }, roomInfoDataMentionFiles: { data: [], page: 1, totalPage: 1 } })
        }
    }, [state.isShowDataFiles])

    useEffect(() => {
        //nh???n data khi nh???n v??o hi???n list h??nh ??? tab b??n ph???i chat room
        if (state.isShowDataMedia && state.roomInfoData) {
            getListMediaInRoom()
        } else {
            setState({ roomInfoDataMedia: { data: [], page: 1, totalPage: 1 }, roomInfoDataMentionMedia: { data: [], page: 1, totalPage: 1 } })
        }
    }, [state.isShowDataMedia])


    //nh???n data khi nh???n vao 1 group chat b??n tr??i, nh???n data api tr??? v??? roomInfo
    useEffect(() => {
        if (roomInfo && listUser && state.roomData) {
            if (roomInfo.success) {
                let room = helper.mapperRoomInfoData(roomInfo.detail, listUser)
                let newRoomData = state.roomData
                //l???y th??ng tin v?? ki???m tra th??ng tin room c?? kh???p v???i nhau kh??ng
                if (room.roomId == newRoomData.roomId) {
                    newRoomData.listMember = room.listMember
                }
                setState({ roomInfoData: room, roomData: newRoomData })
                getLogMessageFirstRequest()
            }
            else {
                //d??ng ????? th??ng b??o l???i
            }
        }
    }, [roomInfo])

    //nh???n data c???a 1 user ???????c nh???n v??o trong tab b??n ph???i c???a room chat userInfo
    useEffect(() => {
        if (userInfo && listUser && state.roomData) {
            if (state.mentionData) {
                let roomMention = helper.mapperUserToRoomInfo(userInfo.detail, listUser)
                setState({ roomInfoDataMention: roomMention })
            } else {
                let newRoomData = state.roomData
                let room = helper.mapperUserToRoomInfo(userInfo.detail, listUser)
                if (!newRoomData.roomId) {
                    newRoomData.roomId = room.roomId
                }
                if (room.roomId == newRoomData.roomId) {
                    newRoomData.listMember = room.listMember
                }
                if (newRoomData.roomId) {
                    getLogMessageFirstRequest()
                }
                setState({ roomInfoData: room, roomData: newRoomData })
            }
        }
    }, [userInfo])

    useEffect(() => {
        if (attachmentFiles) {
            //list file trong tab b??n ph???i c???a room chat
            let data = state.mentionData ? [].concat(state.roomInfoDataMentionFiles.data) : [].concat(state.roomInfoDataFiles.data)
            let list = helper.mapperDataFileList(attachmentFiles.detail)
            data = data.concat(list)
            let page = attachmentFiles.page
            let totalPage = attachmentFiles.total_page
            if (state.mentionData) {
                setState({ roomInfoDataMentionFiles: { data, totalPage, page } })
            } else {
                setState({ roomInfoDataFiles: { data, totalPage, page } })
            }
        }
    }, [attachmentFiles])

    useEffect(() => {
        if (attachmentMedia) {
            //list file h??nh trong tab b??n ph???i c???a room chat
            let data = state.mentionData ? [].concat(state.roomInfoDataMentionMedia.data) : [].concat(state.roomInfoDataMedia.data)
            let list = helper.mapperDataFileList(attachmentMedia.detail)
            data = data.concat(list)
            let page = attachmentMedia.page ? attachmentMedia.page : 1
            let totalPage = attachmentMedia.total_page ? attachmentMedia.total_page : 1
            let totalRecord = attachmentMedia.total_record ? attachmentMedia.total_record : 0;

            if (state.mentionData) {
                setState({ roomInfoDataMentionMedia: { data, totalPage, page, totalRecord } })
            } else {
                // console.log({ attachmentDataShow: state.attachmentDataShow })
                let attachmentDataShow = null;
                if (state.attachmentDataShow) {
                    attachmentDataShow = {
                        currentIndex: state.attachmentDataShow.data.length - 1,
                        data: data,
                        page,
                        totalRecord
                    }
                }
                setState({ roomInfoDataMedia: { data, totalPage, page, totalRecord }, attachmentDataShow: attachmentDataShow })
            }
        }
    }, [attachmentMedia])

    //t???i th??m file trong ph??ng chat
    useEffect(() => {
        if (state.loadMoreFiles) {
            getListFileInRoom(state.loadMoreFiles)
        }
    }, [state.loadMoreFiles])

    //t???i th??m file media trong ph??ng chat
    useEffect(() => {
        if (state.loadMoreMedia) {
            getListMediaInRoom(state.loadMoreMedia)
        }
    }, [state.loadMoreMedia])

    //hander selected room and change roomData
    useEffect(() => {
        //ch???y khi nh???n v??o tab b??n tr??i , thay ?????i phong chat
        // console.log({ roomDataChange: state.roomDataChange })

        if (state.roomDataChange) {
            let params = {
                data: [],
                page: 1,
                totalPage: 1,
                totalRecord: 0
            }
            let newRoomData = state.roomDataChange.isSearch ? helper.findRoomDefault(state.roomDataChange, state.listRoomDefault.data) : state.roomDataChange;
            setState({
                roomDataChange: null,
                listMessage: {
                    data: [],
                    page: 1,
                    totalPage: 1
                },
                clearChatBody: true,
                // roomInfoData: null,
                roomData: newRoomData,
                mentionData: null,
                lastRead: null,
                roomInfoDataMention: null,
                isShowRoomInfo: false,
                isShowDataFiles: false,
                isShowDataMedia: false,
                isShowListUser: false,
                roomInfoDataFiles: params,//room data list files
                roomInfoDataMedia: params,// room data list media
                loadMoreMedia: null,
                loadMoreFiles: null,
            })
        }
    }, [state.roomDataChange])

    useEffect(() => {
        if (state.roomData) {
            //get room info
            if (state.roomData.isGroup) {
                dispatch(chatProfileAction.clear())
                getRoomInfo({ room_id: state.roomData.roomId })
            } else if (state.roomData.roomType == chatContant.ROOM_TYPE_PERSONAL) {
                let room = helper.mapperLocalUserToRoomInfo(state.roomData)
                setState({ roomInfoData: room })
                getLogMessageFirstRequest()
            } else {
                getRoomUserInfo()
            }
        }
    }, [state.roomData])

    //scroll xu???ng d?????i c??ng, hi???n ch??a ch???y
    useEffect(() => {
        if (state.scrollBottom) {
            setState({
                scrollBottom: false, listMessage: {
                    data: [],
                    page: 1,
                    totalPage: 1
                }, currentIndexMessage: 0
            })
            getLogMessageRoom(1)
        }
    }, [state.scrollBottom])

    //browser ??ang k??ch ho???t th?? b???t ?????u k???t n???i rabbit
    useEffect(() => {
        if (isBrowserActive) {
            // dispatch(chatAction.sendReconnectRabbit(true))
            if (state.roomData && state.roomData.roomId) {
                dispatch(chatAction.sendRabbitEvent({
                    key_message: chatAction.SEEN_MESSAGE,
                    data: { room_id: state.roomData.roomId }
                }))
            }
        }
    }, [isBrowserActive])

    //change group name
    useEffect(() => {
        if (state.newGroupsName && state.newGroupsName.trim().length > 0) {
            if (state.newGroupsName != state.roomInfoData.roomName) {
                dispatch(chatProfileAction.editRoomGroupResquest({
                    room_id: state.roomData.roomId,
                    group_name: state.newGroupsName.trim()
                }))
            }
            setState({ newGroupsName: null })
        }
    }, [state.newGroupsName])

    //Change group avatar
    useEffect(() => {
        if (state.newGroupsAvatarFile) {
            dispatch(chatProfileAction.editRoomGroupResquest({
                room_id: state.roomData.roomId,
                avatar: state.newGroupsAvatarFile
            }))
            setState({ newGroupsAvatarFile: null })
        }
    }, [state.newGroupsAvatarFile])

    //call api get list member to add room
    useEffect(() => {
        if (state.isShowAddMember) {
            if (listAddMemberInRoom) {
                let list = helper.filterListMemberWithId(state.listUserDefault, listAddMemberInRoom.detail.system_user_id_list)
                setState(({ listMemberAddInRoom: list }))
            }
            else {
                dispatch(chatProfileAction.getListMemberAddRoom({ room_id: state.roomData.roomId }))
            }
        }
    }, [state.isShowAddMember])

    //nh???n list user c?? th??? th??m trong group chat
    useEffect(() => {
        if (listAddMemberInRoom && listAddMemberInRoom.detail) {
            let list = helper.filterListMemberWithId(state.listUserDefault, listAddMemberInRoom.detail.system_user_id_list)
            setState(({ listMemberAddInRoom: list }))
        }
    }, [listAddMemberInRoom])

    //hander event stomp
    useEffect(() => {
        //nh???n data t??? socket stomp v???
        if (newMessage && state.listRoomDefault.data && state.listRoomAllDefault) {
            let waitingObject = listWaiting.find((item => item.message.clientMid == newMessage.client_mid))
            if (waitingObject) {
                clearTimeout(waitingObject.timerOut)
                let waitings = listWaiting.filter((item => item.message.clientMid != newMessage.client_mid))
                setListWaiting(waitings)
            }
            hanlderEventInNewMessage(newMessage)
            //update list room
            let listRoomDefault = helper.mapperNewMessageWithListRoom(newMessage, state.listRoomDefault.data, state.listRoomAllDefault, listUser, state.roomData, t)
            let listRoom = [].concat(state.listRoom)
            if (!state.searchKey || state.searchKey.length == 0) {
                listRoom = [].concat(listRoomDefault)
            }
            //  else if (!state.isSearchRoom) {
            //     listRoom = helper.searchListRoomDict(state.listRoomAllDefault, state.searchKey)
            // }
            //add message to list message
            if (state.roomData && newMessage.room_id == state.roomData.roomId) {
                if (state.lastMessageAfterSearch && state.searchSelected && state.userId != newMessage.sender_id && newMessage.body && newMessage.body.length > 0) {
                    // console.log({ newMessage })
                    helper.showMessageNotification({ key: state.roomData.roomId, name: state.roomData.roomName, message: newMessage.body })
                    return;
                }
                let listMessage = [].concat(state.listMessage.data)
                let roomInfo = state.roomInfoData ? state.roomInfoData : state.roomData
                listMessage = helper.mapperNewMessageData(newMessage, listUser, listMessage, roomInfo, t)
                let lastRead = helper.getLastReadMessageInRoom(state.roomInfoData)
                listMessage = helper.mapperLastReadMessageWithLog(listMessage, lastRead, state.lastRead, t)
                //send seen message if seen in room
                let sizeCount = (listMessage.length - state.listMessage.data.length)
                setState({
                    listRoomDefault: { ...state.listRoomDefault, data: listRoomDefault }, listRoom, listMessage: { ...state.listMessage, data: listMessage },
                })
                let currentIndex = state.currentIndexMessage
                if (currentIndex > listMessage.length - 10) {
                    currentIndex = listMessage.length
                    scrollMessage(currentIndex)
                } else if (state.currentIndexMessage > 0 && newMessage.sender_id != state.userId) {
                    scrollMessage(state.currentIndexMessage - sizeCount)
                }
                // if (newMessage.sender_id != state.userId) {
                sendEventAfterSeenMessage()
                // }
            } else {
                let room = state.listRoomAllDefault[newMessage.room_id]
                if (room && state.userId != newMessage.sender_id) {
                    //hi???n khi c?? tin nh???n m???i
                    let body = ""
                    if (newMessage.body != "") {
                        body = newMessage.body
                    }
                    else {
                        console.log({ newMessage })
                        //ch???n lo???i tin nh???n hi???n th??? n???u kh??ng ph???i text
                        switch (newMessage.attachments[newMessage.attachments.length - 1]?.attachment_type) {
                            case chatContant.ATTACHMENT_TYPE_IMAGE:
                                body = t('text_image_message')
                                break;
                            case chatContant.ATTACHMENT_TYPE_VIDEO:
                                body = t('text_video_message')
                                break;
                            case chatContant.ATTACHMENT_TYPE_AUDIO:
                                body = t('text_audio_message')
                                break;
                            default:
                                body = t('text_file_message')
                                break;
                        }

                    }
                    //show th??ng b??o l??n m??n h??nh v???i body
                    helper.showMessageNotification({ key: room.roomId, name: room.roomName, message: body })
                }
                setState({ listRoomDefault: { ...state.listRoomDefault, data: listRoomDefault }, listRoom, })
            }
        }
    }, [newMessage])

    //nh???n data khi t???o group chat m???i th??nh c??ng newRoom
    useEffect(() => {
        if (newRoom && listUser && state.listRoomDefault.data) {
            let listRoomDefault = helper.mapperNewRoomWithListRoom(state.listRoomDefault.data, listUser, newRoom, t)
            let listRoomAllDefault = helper.mapperNewGroupRoomWithListRoomAll(state.listRoomAllDefault, listUser, newRoom)
            let listRoom = [].concat(state.listRoom)
            //n???u kh??ng c?? t??? kh??a search tin nh???n th?? l???y m???c ?????nh
            if (!state.searchKey) {
                listRoom = [].concat(listRoomDefault)
            } else if (!state.isSearchRoom) {
                //n???u kh??ng c?? search room chat th?? l???y m???c ?????nh
                listRoom = helper.searchListRoom(listRoomDefault, state.searchKey)
            }
            setState({ listRoomDefault: { ...state.listRoomDefault, data: listRoomDefault }, listRoom, listRoomAllDefault })
        }
    }, [newRoom])

    useEffect(() => {
        if (errorSendMsgId) {
            let listMessage = [].concat(state.listMessage.data)
            let msg = listMessage.find((item) => item.clientMid == errorSendMsgId)
            if (msg && msg.status == chatContant.STATUS_SENDING) {
                msg.isDisable = true
                msg.status = chatContant.STATUS_ERROR
                let waitings = [].concat(listWaiting)
                let waitingObject = waitings.find((item => item.message.clientMid == errorSendMsgId))
                if (waitingObject) {
                    clearTimeout(waitingObject.timerOut)
                }
                waitings = waitings.filter((item => item.message.clientMid != errorSendMsgId))
                setListWaiting(waitings)
            }
            setSendMsgId()
        }
    }, [errorSendMsgId])

    useEffect(() => {
        if (listWaiting) {
            let list = [].concat(listWaiting)
            let isChangeList = false
            if (list) {
                for (var i = 0; i < list.length; i++) {
                    if (!list[i].timerOut) {
                        list[i].timerOut = (id) => setTimeout(() => {
                            setSendMsgId(id)
                        }, 10000);
                        list[i].timerOut(list[i].message.clientMid)
                        isChangeList = true
                    }
                }
                if (isChangeList) {
                    setListWaiting(list)
                }
            }
        }
    }, [listWaiting])

    useEffect(() => {
        if (state.addNewMessage) {
            if (state.lastMessageAfterSearch && state.searchSelected) {
                // ko cho th??m message trong khi search nh??ng ch??a scroll cu???i
                return;
            }
            let waitings = [].concat(listWaiting)
            waitings.push({ message: { clientMid: state.addNewMessage.client_mid } })
            setListWaiting(waitings)
            let listMessage = [].concat(state.listMessage.data)
            let roomInfo = state.roomInfoData ? state.roomInfoData : state.roomData
            listMessage = helper.mapperNewMessageData(state.addNewMessage, listUser, listMessage, roomInfo, t)
            setState({ listMessage: { ...state.listMessage, data: listMessage } })
            scrollMessage(listMessage.length, true)
        }
    }, [state.addNewMessage])



    useEffect(() => {
        if (listLogMessage && state.roomData && listLogMessage.detail && listLogMessage.room_id == state.roomData.roomId) {
            let listDetail = [].concat(listLogMessage.detail)

            // if (listDetail.length == 0 && listLogMessage.timestamp && listLogMessage.order_flag != chatContant.LOG_ORDER_FLAG_NEW) {
            //     getLogMessageRoom(1, null, chatContant.LOG_ORDER_FLAG_NEW, null, listLogMessage.timestamp)
            //     return;
            // }
            if (listDetail.length > 0) {
                let lastReadMember = helper.getLastReadMessageInRoom(state.roomInfoData)
                let list = helper.mapperListLogMessageData(listDetail, listUser, state.roomInfoData, listLogMessage.order_flag, t)
                list = helper.mapperLastReadMessageWithLog(list, lastReadMember, state.lastRead, t)
                let listMessage = [].concat(state.listMessage.data)
                let scrollIndex;
                if (listLogMessage.order_flag === chatContant.LOG_ORDER_FLAG_NEW) {
                    if (listMessage.length > 0 && list.length > 0) {
                        if (listMessage[listMessage.length - 1].sender && list[0].sender && listMessage[listMessage.length - 1].sender.userId == list[0].sender.userId) {
                            list[0].isHideAvatar = true
                        }
                    }
                    listMessage = listMessage.concat(list)
                    scrollIndex = listMessage.length - list.length
                } else {
                    if (list.length > 0) {
                        let timeMessage = helper.createTimeMessageTop(list[0].timeStamp, list[0].serverMid, t, listMessage.length > 0)
                        list = [timeMessage].concat(list)
                    }
                    if (listMessage.length > 0 && helper.checkDatesAreOnSameDay(listMessage[0].timeStamp, list[list.length - 1].timeStamp) && listMessage[0].type === chatContant.VIEW_TIME) {
                        listMessage = listMessage.slice(1) //xo?? time message ?????u list
                    }
                    if (listMessage.length > 0 && list.length > 0) {
                        if (listMessage[0].sender && list[list.length - 1].sender && listMessage[0].sender.userId == list[list.length - 1].sender.userId) {
                            listMessage[0].isHideAvatar = true
                        }
                    }
                    listMessage = list.concat(listMessage)
                    scrollIndex = list.length
                }
                let totalPage = listLogMessage.total_page
                let page = listLogMessage.page
                let lastMessageAfterSearch = state.lastMessageAfterSearch
                if (lastMessageAfterSearch && listMessage.find((item) => item.serverMid === lastMessageAfterSearch.serverMid && item.clientMid === lastMessageAfterSearch.clientMid && item.timeStamp === lastMessageAfterSearch.timeStamp) != null) {
                    lastMessageAfterSearch = null
                }
                setState({ listMessage: { ...state.listMessage, data: listMessage, totalPage, page }, lastMessageAfterSearch })
                if (listLogMessage.searchMsg) {
                    var index = listMessage.findIndex((item) => item.serverMid == listLogMessage.searchMsg.server_mid)
                    if (index != -1) {
                        scrollMessage(index, true, 1000)
                    }
                } else {
                    scrollMessage(scrollIndex, true)
                }
            }
        }
    }, [listLogMessage])

    useEffect(() => {
        if (state.loadMessage && state.listMessage.data.length > 0) {
            let startIndex = state.loadMessage.startIndex
            let messageId = null
            if (startIndex === 0) {
                messageId = state.listMessage.data[0].serverMid
            } else {
                messageId = state.listMessage.data[state.listMessage.data.length - 1].serverMid
            }
            getLogMessageRoom(1, messageId, startIndex === 0 ? chatContant.LOG_ORDER_FLAG_OLD : chatContant.LOG_ORDER_FLAG_NEW)
        }
    }, [state.loadMessage])

    //handler event message

    useEffect(() => {
        if (readMessage && state.listRoomDefault.data) {
            let listRoomDefault = [].concat(state.listRoomDefault.data)
            listRoomDefault = helper.mapperListRoomReadMessage(listRoomDefault, readMessage)
            let listRoom = [].concat(state.listRoom)
            listRoom = helper.mapperListRoomReadMessage(listRoom, readMessage)
            let listMessage = [].concat(state.listMessage.data)
            if (state.roomData && state.roomInfoData && state.roomData.roomId == readMessage.room_id && readMessage.sender_id != state.userId) {
                let roomInfoData = state.roomInfoData
                if (roomInfoData.listMember) {
                    let member = roomInfoData.listMember.find((item) => item.userId == readMessage.sender_id)
                    if (member) {
                        member.lastRead = readMessage.read_timestamp
                    }
                }
                let lastRead = helper.getLastReadMessageInRoom(state.roomInfoData)
                listMessage = helper.mapperLastReadMessageWithLog(listMessage, lastRead, state.lastRead, t)
                setState({ listRoomDefault: { ...state.listRoomDefault, data: listRoomDefault }, listMessage: { ...state.listMessage, data: listMessage } }, roomInfoData, listRoom)
            } else {
                setState({ listRoomDefault: { ...state.listRoomDefault, data: listRoomDefault }, listRoom })
            }
        }
    }, [readMessage])

    useEffect(() => {
        if (updateTyping) {
            let messageTyping = updateTyping
            messageTyping.state = 0
            let listRoom = helper.mapperListRoomTyping(state.listRoom, listUser, messageTyping)
            setState({ listRoom })
            setTypingData()
        }
    }, [updateTyping])

    useEffect(() => {
        if (typingMessage && state.listRoom) {
            let listTimer = [].concat(listTypingTimer)
            //handler typing
            let typing = listTimer.find(({ item }) => item.room_id == typingMessage.room_id)
            if (typing) {
                clearTimeout(typing.timer)
                listTimer = listTimer.filter(({ item }) => item.room_id != typingMessage.room_id)
            } else {
                typing = {}
            }

            if (typingMessage.status == 1) {
                typing.item = typingMessage
                typing.timerOut = (id) => setTimeout(() => {
                    let listResult = [].concat(listTypingTimer)
                    let result = listResult.find(({ item }) => item.room_id == id)
                    if (result) {
                        listResult = listResult.filter(({ item }) => item.room_id != id)
                        setListTypingTimer(listResult)
                        setTypingData(result.item)
                    }
                }, 5000)
                typing.timerOut(typingMessage.room_id)
                listTimer.push(typing)
                setListTypingTimer(listTimer)
            }

            let listRoom = helper.mapperListRoomTyping(state.listRoom, listUser, typingMessage)
            setState({ listRoom })
        }
    }, [typingMessage])

    useEffect(() => {
        if (sendingFileMessage && state.listRoom) {
            let listTimer = [].concat(listSendingTimer)
            //handler typing
            let typing = listTimer.find(({ item }) => item.room_id == sendingFileMessage.room_id)
            if (typing) {
                clearTimeout(typing.timer)
                listTimer = listTimer.filter(({ item }) => item.room_id != sendingFileMessage.room_id)
            } else {
                typing = {}
            }

            if (sendingFileMessage.status == 1) {
                typing.item = sendingFileMessage
                typing.timerOut = (id) => setTimeout(() => {
                    let listResult = [].concat(listSendingTimer)
                    let result = listResult.find(({ item }) => item.room_id == id)
                    if (result) {
                        listResult = listResult.filter(({ item }) => item.room_id != id)
                        setListSendingTimer(listResult)
                        setTypingData(result.item)
                    }
                }, 5000)
                typing.timerOut(sendingFileMessage.room_id)
                listTimer.push(typing)
                setListSendingTimer(listTimer)
            }

            let listRoom = helper.mapperListRoomSendFile(state.listRoom, listUser, sendingFileMessage)
            setState({ listRoom })
        }
    }, [sendingFileMessage])

    //nh???n data khi tho??t kh???i room chat
    useEffect(() => {
        if ((outRoom || deleteRoom || quitRoom) && state.listRoomDefault.data) {
            let roomId = outRoom ? outRoom.room_id : deleteRoom ? deleteRoom.room_id : quitRoom ? quitRoom.room_id : ""
            let listRoomDefault = helper.mapperOutRoomWithListRoom(state.listRoomDefault.data, roomId)
            let listRoom = [].concat(state.listRoom)
            if (!state.searchKey) {
                listRoom = [].concat(listRoomDefault)
            } else if (!state.isSearchRoom) {
                listRoom = helper.searchListRoom(listRoomDefault, state.searchKey)
            }
            let listUserDefault = helper.mapperOutRoomWithListUser(state.listUserDefault, roomId)
            let listUser = helper.mapperOutRoomWithListUser(state.listUser, roomId)
            let newRoomData = state.roomData
            let roomInfoData = state.roomInfoData

            if (newRoomData && (!newRoomData.roomId || newRoomData.roomId == roomId)) {
                newRoomData = null
                roomInfoData = null
            }

            let listRoomAllDefault = state.listRoomAllDefault
            delete listRoomAllDefault[roomId];
            setState({ listUserDefault, listUser, listRoomAllDefault, listRoomDefault: { ...state.listRoomDefault, data: listRoomDefault }, listRoom, roomData: newRoomData, roomInfoData, createUserRoom: null, })
            dispatch(chatProfileAction.clear())
        }
    }, [outRoom, deleteRoom, quitRoom])
    //tin nh???n nh??p c???a t???ng room
    useEffect(() => {
        if (draftMessage && state.listRoomDefault.data) {
            let listRoomDefault = helper.mapperDraftRoom(state.listRoomDefault.data, draftMessage)
            let listRoom = [].concat(state.listRoom)
            if (!state.searchKey) {
                listRoom = [].concat(listRoomDefault)
            } else if (!state.isSearchRoom) {
                listRoom = helper.searchListRoom(listRoomDefault, state.searchKey)
            }
            let listUserDefault = helper.mapperDraftRoom(state.listUserDefault, draftMessage)
            setState({ listRoomDefault: { ...state.listRoomDefault, data: listRoomDefault }, listRoom, listUserDefault })
        }
    }, [draftMessage])

    useEffect(() => {
        if (errorMessage && errorMessage.topic_type == chatAction.SEND_MESSAGE && state.roomData && state.roomData.roomId == errorMessage.room_id) {
            let listMessage = helper.mapperErrorMessageWithMessage(state.listMessage.data, errorMessage.message.client_mid)
            setState({ listMessage: { ...state.listMessage, data: listMessage } })
        }
    }, [errorMessage])
    //--end-handle-data--//

    //function
    const hanlderEventInNewMessage = (message) => {
        // console.log({ message })
        const { admin_event: adminEvent, room_id: roomId } = message
        //khi admin c???a group chat th??m action, vd: th??m ho???c x??a th??nh vi??n trong group
        if (adminEvent && adminEvent.action) {
            let listRoomDefault = helper.mapperListRoomWithEvent(state.listRoomDefault.data, adminEvent, roomId, listUser)
            let listRoomAllDefault = helper.mapperListAllRoomWithEvent(state.listRoomAllDefault, adminEvent, roomId)
            let listRoom = [].concat(state.listRoom);

            if (!state.searchKey || state.searchKey.length == 0) {
                listRoom = [].concat(listRoomDefault)
            }
            // else if (!state.isSearchRoom) {
            //     listRoom = helper.searchListRoomDict(listRoomAllDefault, state.searchKey)
            // }
            let roomInfoData = helper.mapperRoomInfoWithEvent(state.roomInfoData, adminEvent, roomId, listUser)
            let newRoomData = state.roomData
            if (newRoomData && newRoomData.roomId == roomId) {
                newRoomData = listRoomDefault.find((item) => item.roomId == roomId)
                setState({ listRoomDefault: { ...state.listRoomDefault, data: listRoomDefault }, listRoomAllDefault, listRoom, roomData: newRoomData, roomInfoData })
            }
            else {
                setState({ listRoomDefault: { ...state.listRoomDefault, data: listRoomDefault }, listRoomAllDefault, listRoom, roomInfoData })
            }
            // sendEventAfterSeenMessage()
        }
    }

    const onChangeState = (value) => {
        setState(value)
    }

    //ch???y 1 l???n khi group chat v???a ???????c g???i
    const getLogMessageFirstRequest = () => {
        if (state.searchSelectedWithRoom && state.listRoomSearchAll.data.length > 0) {
            let searchMsg = null
            if (state.listRoomSearchAll.dataDefault) {
                searchMsg = state.listRoomSearchAll.dataDefault.find((item) => item.server_mid == state.searchSelectedWithRoom.serverMid)
            }
            getLogMessageRoom(1, state.searchSelectedWithRoom.serverMid, '0', searchMsg)
        } else {
            //g???i api ????? l???y log chat c?? v???
            getLogMessageRoom(1)
        }
        //g???i ????? x??c nh???n ???? xem
        sendEventAfterSeenMessage()
    }

    //????? room chat scroll ?????n d??ng index
    const scrollMessage = (index, isTimeOut, time = 500) => {
        if (isTimeOut) {
            setTimeout(function () {
                updateScrollMessage(index)
            }, time);
        } else {
            updateScrollMessage(index)
        }
    }



    // //delete member in groups
    const deleteMember = () => {
        if (state.deleteMember) {
            const del_user_list = []
            del_user_list.push(state.deleteMember.userId)
            callApiEditMemberGroup({ room_id: state.roomData.roomId, del_user_list })
            setState({ deleteMember: null })
        }
    }

    //user out group chat
    const onOutGroup = () => {
        if (state.actionOutGroup) {
            dispatch(chatProfileAction.quitRoomGroupResquest({ room_id: state.actionOutGroup.roomId }))
            setState({ actionOutGroup: null })
        }
    }

    const onDeleteRoom = () => {
        if (state.actionRemoveGroup) {
            dispatch(chatProfileAction.deleteRoomRequest({ room_id: state.actionRemoveGroup.roomId }))
            setState({ actionRemoveGroup: null })
        }
    }

    // //Add new member in groups
    const addNewMember = (add_user_list) => {
        callApiEditMemberGroup({ room_id: state.roomData.roomId, add_user_list })
        setState({ isShowAddMember: false, listMemberAddInRoom: null })
    }


    const sendEventAfterSeenMessage = () => {
        if (isBrowserActive) {
            //g???i action seen_message
            dispatch(chatAction.sendRabbitEvent({
                key_message: chatAction.SEEN_MESSAGE,
                data: { room_id: state.roomData.roomId }
            }))
        }
    }

    const onNextImage = (page) => {
        dispatch(chatProfileAction.setLoadMoreListImage(page))
    }
    const onClose = (page) => {
        setState({ attachmentDataShow: null, isShowAttachmentDataShow: false })
        dispatch(chatProfileAction.clear())
    }
    //--end-fuction--//
    //layout
    return (
        <div className="conversation mb-5">
            {/* Tab b??n tr??i */}
            <ConversationLeft
                searchKey={state.searchKey}
                userId={state.userId}
                listRoomSearchAll={state.listRoomSearchAll}
                listRoom={state.listRoom}
                searchSelected={state.searchSelected}
                searchSelectedWithRoom={state.searchSelectedWithRoom}
                isSearchRoom={state.isSearchRoom}
                searchDatas={state.searchDatas}
                roomData={state.roomData}
                showListRoom={state.showListRoom}
                selectTab={state.selectTab}
                isFetching={isFetchingLeftMenu}
                listUser={state.listUser}
                onChangeData={(value) => onChangeState(value)}
                isFetchingLoadmoreLeftMenu={isFetchingLoadmoreLeftMenu}
            />
            {/* tab b??n ph???i */}
            <ConversationRight
                STATE={{ state, setState }}
                userId={state.userId}
                selectTab={state.selectTab}
                roomData={state.roomData}
                isShowRoomInfo={state.isShowRoomInfo}
                listMessage={state.listMessage}
                isSearchRoom={state.isSearchRoom}
                roomInfoData={state.roomInfoData}
                clearChatBody={state.clearChatBody}
                searchSelected={state.searchSelected}
                roomDataChange={state.roomDataChange}
                roomInfoDataMention={state.roomInfoDataMention}
                mentionData={state.mentionData}
                roomInfoDataFiles={state.roomInfoDataFiles}
                roomInfoDataMedia={state.roomInfoDataMedia}
                roomInfoDataMentionMedia={state.roomInfoDataMentionMedia}
                roomInfoDataMentionFiles={state.roomInfoDataMentionFiles}
                onChangeData={(value) => onChangeState(value)}
                isFetching={isFetching || (isFetchingChatLog && state.listMessage.data.length === 0)}
                scrollIndex={{ indexScrollMessage, updateScrollMessage }}
            />
            {/*Modal delete member in group*/}
            {state.deleteMember &&
                <DialogConfirm
                    visible={state.deleteMember}
                    onSave={deleteMember}
                    close={() => setState({ deleteMember: null })}
                    titleHeader="chat_delete_member"
                    title={`${t('chat_delete')} ${state.deleteMember.fullName} ${t('chat_delete_title')}`}
                />}

            {/*Modal add new member in group*/}
            {state.isShowAddMember && state.listMemberAddInRoom &&
                <DialogAddMember
                    visible={state.isShowAddMember}
                    close={() => setState({ isShowAddMember: false, listMemberAddInRoom: null })}
                    listMember={state.listMemberAddInRoom}
                    onSave={addNewMember}
                />}

            {/*Modal user out group*/}
            {/* tho??t ra kh???i group */}
            {state.actionOutGroup &&
                <DialogConfirm
                    visible={state.actionOutGroup}
                    ok="chat_out_group"
                    icon='/images/icon_out_group.png'
                    onSave={onOutGroup}
                    close={() => setState({ actionOutGroup: null })}
                    titleHeader="chat_out_group_title"
                    title={t('chat_out_groups')}
                />}
            {/* remove ng?????i ra kh???i group */}
            {state.actionRemoveGroup &&
                <DialogConfirm visible={state.actionRemoveGroup}
                    ok="chat_remove_ok"
                    icon='/images/icon_out_group.png'
                    onSave={onDeleteRoom}
                    close={() => setState({ actionRemoveGroup: null })}
                    titleHeader="chat_info_delete_group"
                    title={t('chat_remove_groups')}
                />}
            {/* comfix g???i file l??n */}
            {state.isShowAttachmentDataShow &&
                <DialogShowMediaList
                    attachmentData={state.attachmentDataShow}
                    visible={state.isShowAttachmentDataShow}
                    loadMore={(page) => state.selectTab == 2 ? onNextImage(page) : setState({ loadMoreMedia: page + 1 })}
                    close={() => onClose()}
                />}
        </div>
    )
}
export default ChatMain