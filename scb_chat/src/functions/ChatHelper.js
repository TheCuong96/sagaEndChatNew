import { getLocalStorage, translate } from "./Utils"
import moment from 'moment'
import { chatContant } from 'contant'
import { notification } from 'antd';
import { ContentState, convertFromRaw, convertToRaw } from "draft-js";
const default_avatar = '../../images/icon_logo.png'
const default_save_message = '../../images/ic_save_message.png'
import { FILE_CONTENT_TYPE } from 'contant'

export const getTimeVideo = (valueTime) => {
    let time = moment(valueTime * 1000)
    if (valueTime < 60 * 60) {
        return time.format('mm:ss')
    } else {
        return time.format('HH:mm:ss')
    }
}
export const getClientMessageId = () => {
    var ret = moment().valueOf();
    var value = Math.floor(Math.random() * 4294967295);
    var str = ("0000000000000000000000" + value.toString(2)).slice(-22);
    var msgs = ret.toString(2) + str;
    return {
        client_mid: binaryToDecimal(msgs),
        timestamp: ret
    };
}

export const imageUrl = (url) => {
    if (url && url.name) {
        return URL.createObjectURL(url)
    }
    return url != null && url.includes('http') ? url : url == default_save_message ? url : default_avatar
}

export const mapperDataToListUserOnline = (listUser, listOnline) => {
    var data = listUser
    if (listOnline) {
        for (var i = 0; i < listOnline.length; i++) {
            if (data[listOnline[i]]) {
                data[listOnline[i]].isOnline = true
            }
        }
    }
    return data
}
export const mapperDataListUserDictionary = (listUser) => {
    let data = {}
    let userId = getLocalStorage('user').id
    if (listUser) {
        for (var key in listUser) {
            if (userId != key) {
                data[key] = createModelUserProject(listUser[key])
            }
        }
    }
    return data
}

export const mapperDataListBotDictionary = (listUser) => {
    let data = {}
    if (listUser) {
        for (var key in listUser) {
            data[key] = createModelBotChatProject(listUser[key])
        }
    }
    return data
}

const createModelBotChatProject = (data) => {
    const {
        system_user_id: userId,
        name,
        online_flag: isOnline,
        avatar_url: avatar
    } = data
    return { userId, fullName: name, username: name, avatar, isOnline }
}
const createModelUserProject = (data) => {
    // const {
    //     system_user_id: userId,
    //     fullname: fullName,
    //     username: username,
    //     phone: mobile,
    //     email: email,
    //     online_flag: isOnline,
    //     avatar_url: avatar
    // } = data
    // return { userId, fullName, username, mobile, email, avatar, isOnline }
    const {
        system_user_id: userId,
        fullname: fullName,
        username: username,
        phone: mobile,
        email: email,
        online_flag: isOnline,
        avatar_url: avatar
    } = data
    return { userId, fullName, username, mobile, email, avatar, isOnline }
}

export const mapperUserListData = (data) => {
    let list = []
    for (var key in data) {
        list.push(createModelUserToRoom(data[key]))
    }
    return list
}
export const searchListRoomDict = (listRoom, query) => {
    let list = []
    if (listRoom) {
        if (query) {
            query = query.trim()
        }
        Object.keys(listRoom).reduce(function (filtered, key) {
            let item = listRoom[key]
            if (item.roomName && item.roomName.toLowerCase().includes(query.toLowerCase())) {
                item.isSearch = true
                list.push(item)
            }
            return filtered;
        }, {})
    }
    return list
}

export const searchAllRoomMapper = (listRoom, listSearchMessage) => {
    let list = []
    if (listRoom && listRoom.length > 0) {
        list.push({ typeHeader: 1 })
        list = list.concat(listRoom)
    }
    if (listSearchMessage && listSearchMessage.length > 0) {
        list.push({ typeHeader: 2 })
        list = list.concat(listSearchMessage)
    }
    return list
}
export const searchListRoom = (listData, query) => {
    let list = []
    if (listData && listData.length > 0 && query != null) {
        list = listData.filter((item) => item.roomName && item.roomName.toLowerCase().includes(query.toLowerCase()))
    } else {
        list = [].concat(listData)
    }

    return list
}

export const mapperListRoomData = (listData, listRoom, listUser, translate) => {
    let list = []
    let user = getLocalStorage('user')
    let id = user.id
    for (var i = 0; i < listRoom.length; i++) {
        let model = listRoom[i]
        let sender = listUser[model.last_message_user] ? listUser[model.last_message_user] : createModelUserToRoomWithUserLocal(user, model.last_message_user)
        let isRead = false

        let memberTotal = 0
        let memberOnline = 0
        let listMember = []
        let name = model.room_name, avatar = model.room_avatar_url
        let totalUnread = model.unread_message_total
        if (model.room_member) {
            memberTotal = model.room_member.length
            for (var j = 0; j < model.room_member.length; j++) {
                let member = model.room_member[j]
                let userMember = listUser[member.system_user_id] ? listUser[member.system_user_id] : createModelUserToRoomWithUserLocal(user, member.system_user_id)
                if (userMember) {
                    listMember.push({ ...userMember, lastRead: member.last_read })
                    if (!isRead) {
                        isRead = model.last_message_user == id && id != member.system_user_id && model.last_message_time <= member.last_read
                    }
                    memberOnline += userMember.isOnline ? 1 : 0
                    if (model.room_type === chatContant.ROOM_TYPE_USER && userMember.userId != id) {
                        name = userMember.fullName ? userMember.fullName : userMember.username
                        avatar = userMember.avatar
                    } else if (model.room_type == chatContant.ROOM_TYPE_PERSONAL) {
                        name = translate('text_room_saved_message')
                        avatar = default_save_message
                        memberOnline++
                    }
                }
            }
        }
        let listMentions = model.last_message_mentions
        let message = model.last_message_body

        if (model.last_message_body && model.last_message_body.length > 0) {
            message = model.last_message_body
        } else if (model.attachments && model.attachments.length > 0) {
            let type;
            for (var j = 0; j < model.attachments.length; j++) {
                type = model.attachments[j].attachment_type
            }
            switch (type) {
                case chatContant.ATTACHMENT_TYPE_IMAGE:
                    message = translate('text_image_message')
                    break;
                case chatContant.ATTACHMENT_TYPE_VIDEO:
                    message = translate('text_video_message')
                    break;
                case chatContant.ATTACHMENT_TYPE_AUDIO:
                    message = translate('text_audio_message')
                    break;
                default:
                    message = translate('text_file_message')
                    break;
            }
        } else if (model.last_message_admin_event && model.last_message_admin_event.action) {
            const { message: text, listMentions: mentions } = passerMessageWithAdminEvent(model.last_message_admin_event, null, listUser, model, sender, translate)
            listMentions = mentions
            message = text
            // if (model.last_message_admin_event.action == chatContant.ADMIN_EVENT_CREATE_ROOM) {
            //     isRead = false
            //     totalUnread = 0
            // }
        }
        list.push(createModelRoomData(model.room_id,
            model.room_type === chatContant.ROOM_TYPE_GROUP,
            model.room_type,
            name,
            avatar,
            memberOnline > 0,
            listMember,
            memberTotal,
            memberOnline,
            totalUnread,
            message,
            model.last_message_time ? model.last_message_time : 0,
            sender,
            isRead,
            model.draft_message, null, listMentions
        ))
    }
    var listRoomData = listData ? [].concat(listData) : []
    if (list.length > 0) {
        for (var i = 0; i < list.length; i++) {
            var index = listRoomData.findIndex(item => item.roomId == list[i].roomId)
            if (index != -1) {
                listRoomData[index] = list[i]
            } else {
                listRoomData.push(list[i])
            }
        }
    }
    return listRoomData
}
export const createModelRoomData = (roomId, isGroup, roomType, roomName, avatar, isOnline, listMember, memberTotal, memberOnline, unreadTotal, message, time, sender, isRead, draft, typing, listMentions) => {
    return { roomId, isGroup, roomName, roomType, unreadTotal, message, time, sender, isOnline, isRead, avatar, memberTotal, memberOnline, listMember, typing, draft, listMentions }
}

export const convertTimeRelation = (millisecondData, t) => {
    try {
        var relationTimeStr = ""
        var millisecondToday = moment().startOf('day').valueOf()
        var millisecondDiff = millisecondData - millisecondToday
        if (millisecondDiff > 0) {
            relationTimeStr = moment(millisecondData).locale('en').format('h:mm A')
        }
        else {
            relationTimeStr = moment(millisecondData).format('DD/MM/YYYY')
        }
        return relationTimeStr
    } catch (e) {
        return moment(millisecondData).format('DD/MM/YYYY')
    }
}
export const convertTimeMessage = (millisecondData) => {
    let timer = millisecondData > 0 ? millisecondData : moment().valueOf()
    let time = moment(timer).locale('en')
    return time.format('h:mm A')
}

export const mapperUserToRoomInfo = (userInfo, listUser) => {
    const { system_user_id: userId, phone: mobile, email, room_id: roomId, fullname: fullName, avatar_url: avatar, username, last_read: lastRead } = userInfo

    var isOnline = listUser[userId] ? listUser[userId].isOnline : false
    let listMember = [{ userId, fullName, username, mobile, email, avatar, lastRead }]
    let data = createModelRoomInfo(roomId, false,
        fullName, avatar, isOnline, listMember, false, [userId], chatContant.ROOM_TYPE_USER)
    data.phone = mobile
    data.email = email
    return data
}
export const mapperLocalUserToRoomInfo = (roomData) => {
    let user = getLocalStorage('user')
    const {
        full_name: fullName, avatar_url: avatar, user_id: userId
    } = user
    let data = createModelRoomInfo(roomData.roomId, false,
        fullName, avatar, true, [], false, [userId], roomData.roomType)
    data.phone = user.mobile
    data.email = user.email
    return data
}
export const mapperRoomInfoData = (roomInfo, listUser) => {
    let user = getLocalStorage('user')
    let id = user.id
    let memberList = []
    let isAdmin = roomInfo.room_admin.find((value) => value == id) != null
    let memberOnline = 0
    let name = roomInfo.room_name, avatar = roomInfo.room_avatar_url, phone = null, email = null

    if (roomInfo.room_member && listUser) {
        for (var j = 0; j < roomInfo.room_member.length; j++) {
            const { system_user_id: userId, last_read: lastRead } = roomInfo.room_member[j]
            let member = listUser[userId] ? listUser[userId] : createModelUserToRoomWithUserLocal(user, userId)
            let admin = roomInfo.room_admin.find((value) => value == userId) != null
            if (member) {
                memberList.push({ ...member, lastRead, isAdmin: admin })
                memberOnline += member.isOnline ? 1 : 0
                if (roomInfo.room_type === chatContant.ROOM_TYPE_USER && userId != id) {
                    name = member.fullName ? member.fullName : member.username
                    avatar = member.avatar
                    phone = member.phone
                    email = member.email
                }
            }
        }
    }
    let data = createModelRoomInfo(roomInfo.room_id, roomInfo.room_type === chatContant.ROOM_TYPE_GROUP,
        name, avatar, memberOnline > 0, memberList, isAdmin, roomInfo.room_admin, roomInfo.room_type)
    data.phone = phone
    data.email = email

    return data
}

export const createModelUserToRoom = (member) => {
    let model = {
        ...member,
        roomName: member.fullName ? member.fullName : member.username,
        isGroup: false,
        isOnline: member.isOnline,
        listMember: [{ ...member, lastRead: 0 }]
    }
    return model
}

const createModelRoomInfo = (roomId, isGroup, roomName, avatar, isOnline, listMember, isAdmin, roomAdminIds, roomType) => {
    return { roomId, isGroup, roomName, avatar, isOnline, listMember, isAdmin, roomAdminIds, roomType }
}


// export const filterListMemberInRoom = (listMember, roomDataInfo) => {
//     let list = [].concat(listMember)
//     if (roomDataInfo && roomDataInfo.listMember) {
//         list = filterListMemberWithId(listMember, roomDataInfo.listMember)
//     }
//     return list
// }

export const filterListMemberWithId = (listMember, listID) => {
    let list = [].concat(listMember)
    if (listID) {
        list = listMember.filter(((item) => listID.some((i) => i == item.userId)))
    }
    return list
}

const binaryToDecimal = (data) => {
    var ret = "";
    while (data !== "0") {
        var end = 0;
        var fullNum = "";
        var i = 0;
        for (; i < data.length; i++) {
            end = 2 * end + parseInt(data[i], 10);
            if (end >= 10) {
                fullNum += "1";
                end -= 10;
            } else {
                fullNum += "0";
            }
        }
        ret = end.toString() + ret;
        data = fullNum.slice(fullNum.indexOf("1"));
    }
    return ret;

}

export const mapperDataFileList = (listData) => {
    var list = []
    if (listData) {
        for (var i = 0; i < listData.length; i++) {
            const {
                attachment_type: type,
                description: description,
                thumbnail_url: thumbnail,
                created_at: createAt,
                attachment_id: id,
                attachment_title: title,
                attachment_file_url: url
            } = listData[i]
            list.push({ id, title, url, type, description, thumbnail, createAt })
        }
    }
    return list
}

const createModelUserToRoomWithUserLocal = (data, userId) => {
    const {
        full_name: fullName,
        username: username,
        mobile: mobile,
        avatar_url: avatar
    } = data
    if (userId == data.id) {
        return { userId, fullName, username, mobile, avatar }
    }
    else if (userId != null) {
        return { userId }
    } else {
        return { userId: data.id, fullName, username, mobile, avatar }
    }
}

const createModelMessageItem = (isMessageOut, sender, messageType, type, clientMid, serverMid, message, mentions, status, url, timeStamp, thumbnail, preview, fileType, isHideAvatar) => {
    return { type, clientMid, isMessageOut, messageType, sender, message, serverMid, mentions, isHideAvatar, url, timeStamp, thumbnail, status, preview, fileType }
}

export const mapperNewMessageWithListRoom = (message, listRoom, listRoomAll, listUser, roomData, translate) => {
    let list = [].concat(listRoom)
    let room = list.find((item) => item.roomId == message.room_id)
    if (room) {
        list = list.filter((item) => item != room)
    } else {
        room = listRoomAll[message.room_id]
    }
    let roomId = roomData ? roomData.roomId : null
    if (room) {
        let user = getLocalStorage('user')
        let sender = listUser[message.sender_id] ? listUser[message.sender_id] : createModelUserToRoomWithUserLocal(user, message.sender_id)
        let body = message.body
        let listMentions = []
        if (message.body && message.body.length > 0) {
            body = message.body
        } else if (message.attachments && message.attachments.length > 0) {
            let type;
            for (var j = 0; j < message.attachments.length; j++) {
                type = message.attachments[j].attachment_type
            }
            switch (type) {
                case chatContant.ATTACHMENT_TYPE_IMAGE:
                    body = translate('text_image_message')
                    break;
                case chatContant.ATTACHMENT_TYPE_VIDEO:
                    body = translate('text_video_message')
                    break;
                case chatContant.ATTACHMENT_TYPE_AUDIO:
                    body = translate('text_audio_message')
                    break;
                default:
                    body = translate('text_file_message')
                    break;
            }
        } else if (message.admin_event && message.admin_event.action) {
            const { message: text, listMentions: mentions } = passerMessageWithAdminEvent(message.admin_event, null, listUser, message, sender, translate)
            listMentions = mentions
            body = text
        }
        room.listMentions = listMentions
        room.message = body
        room.time = message.timestamp
        room.sender = sender
        if (roomId !== room.roomId) {
            room.unreadTotal = room.unreadTotal ? room.unreadTotal + 1 : 1
        } else {
            room.unreadTotal = 0
        }
        room.isRead = false
        list = [room].concat(list) //add room len top
    }
    return list
}
export const mapperNewMessageData = (message, listUser, listMessageData, roomData, translate) => {
    let listMessage = [].concat(listMessageData)
    let messageResult = mapperMessageToMessageModel(message, listUser, listMessage[listMessage.length - 1], roomData, translate)
    let isResultMessage = false
    //kiểm tra message nhận về để update trạng thái
    if (messageResult && messageResult.length > 0 && messageResult[0].timeStamp) {
        let listMessageOld = listMessage.filter((item) => item.clientMid === messageResult[0].clientMid && !item.serverMid)
        if (listMessageOld.length > 0) {
            for (var i = 0; i < listMessageOld.length; i++) {
                listMessageOld[i].serverMid = messageResult[0].serverMid
                listMessageOld[i].timeStamp = messageResult[0].timeStamp
                listMessageOld[i].status = roomData.roomType != chatContant.ROOM_TYPE_PERSONAL ? chatContant.STATUS_SENT : chatContant.STATUS_READ
            }
            isResultMessage = true
        }
    }
    //không phải message nhận về sau khi send
    if (!isResultMessage) {
        let endMessage = listMessage[listMessage.length - 1]
        let timeMessage = getTimeMessage(endMessage, messageResult, translate)
        if (timeMessage) {
            listMessage.push(timeMessage)
        }
        listMessage = listMessage.concat(messageResult)
    }
    return listMessage
}

export const getTimeMessage = (messageOld, resultMessage, translate) => {
    let timeMessage = null
    let isSameDate = false
    if (!resultMessage) {
        return null
    }
    if (messageOld) {
        isSameDate = checkDatesAreOnSameDay(messageOld.timeStamp, resultMessage.timeStamp)
    }
    if (!isSameDate) {
        let isToday = checkDatesAreOnSameDay(moment().valueOf(), resultMessage.timeStamp)
        let time = isToday ? translate('chat_today') : moment(resultMessage.timeStamp).format('DD/MM/yyyy')
        timeMessage = createModelMessageItem(false, null, chatContant.MESSAGE_TYPE_ADMIN,
            chatContant.VIEW_TIME, null, null, time, null, null, null, resultMessage.timeStamp)
        timeMessage.isTopLine = isToday
    }
    return timeMessage
}
export const createTimeMessageTop = (timeStamp, id, translate, isNoneTop) => {
    let isToday = checkDatesAreOnSameDay(moment().valueOf(), timeStamp)
    let time = isToday ? translate('chat_today') : moment(timeStamp).format('DD/MM/yyyy')
    let timeItem = createModelMessageItem(false, null, chatContant.MESSAGE_TYPE_ADMIN,
        chatContant.VIEW_TIME, null, id, time, null, null, null, timeStamp)
    timeItem.isTopLine = isNoneTop && isToday
    return timeItem
}

export const mapperListLogMessageData = (listLogMessage, listUser, roomData, orderFlag, translate) => {
    let listResult = []
    let listLog = [].concat(listLogMessage)
    listLog = listLog.sort((a, b) => b.timestamp < a.timestamp ? 1 : -1)
    for (var i = 0; i < listLog.length; i++) {
        let list = mapperMessageToMessageModel(listLog[i], listUser, listResult[listResult.length - 1], roomData, translate)
        if (listResult.length > 0 && list.length > 0 && !checkDatesAreOnSameDay(listResult[listResult.length - 1].timeStamp, list[0].timeStamp)) {
            let timeMessage = createTimeMessageTop(list[0].timeStamp, list[0].serverMid, translate, listResult.length > 0)
            listResult = listResult.concat([timeMessage])
        }
        listResult = listResult.concat(list)
    }
    if (listResult.length > 0 && listResult[0].type === chatContant.VIEW_TIME) {
        listResult = listResult.slice(1)
    }
    return listResult
}

const mapperMessageToMessageModel = (message, listUser, previousMessage, roomData, translate) => {
    const {
        message_type: type
    } = message
    let listMessage = []
    switch (type) {
        case chatContant.MESSAGE_TYPE_VIEW:
            listMessage = listMessage.concat(mapperListMessageViewModel(message, listUser, previousMessage, roomData))
            break;
        case chatContant.MESSAGE_TYPE_ADMIN:
            listMessage = listMessage.concat(mapperListMessageViewCenterModel(message, listUser, roomData, translate))
            break;
    }
    return listMessage
}

export const checkDatesAreOnSameDay = (timeStamp1, timeStamp2) => {
    let time1 = moment(timeStamp1)
    let time2 = moment(timeStamp2)
    return time1.isSame(time2, 'days')
}
export const checkDatesAreOnSameMonthYear = (timeStamp1, timeStamp2) => {
    let time1 = moment(timeStamp1)
    let time2 = moment(timeStamp2)
    return time1.isSame(time2, 'month') && time1.isSame(time2, 'year')
}

const mapperListMessageViewModel = (message, listUser, previousMessage, roomData) => {
    const {
        sender_id: userId, message_type: type, server_mid: serverMid,
        timestamp: timeStamp, body, mentions, attachments,
        link_preview: preview, client_mid: clientMid, admin_event: adminEvent
    } = message
    let listMessage = []
    let user = getLocalStorage('user')
    const sender = listUser[userId] ? listUser[userId] : createModelUserToRoomWithUserLocal(user, userId)
    let isMessageOut = userId ? userId == user.id : true
    let status = chatContant.STATUS_SENT //todo status read and error
    if (roomData && roomData.roomType != chatContant.ROOM_TYPE_PERSONAL) {
        if (serverMid) {
            status = chatContant.STATUS_SENT
        } else if (clientMid) {
            status = chatContant.STATUS_SENDING
        }
    } else {
        status = chatContant.STATUS_READ
    }
    if (body && body.length > 0) {
        let listMentions = []
        if (mentions && mentions.length > 0) {
            for (var i = 0; i < mentions.length; i++) {
                listMentions.push({
                    userId: mentions[i].user_id,
                    start: mentions[i].start,
                    end: mentions[i].end,
                })
            }
        }
        let previewData = null
        if (preview) {
            const { website_url: url, title, description, image, host } = preview
            previewData = { url, title, description, image, host }
        }
        listMessage.push(createModelMessageItem(isMessageOut, sender, type, chatContant.VIEW_MESSAGE, clientMid,
            serverMid, body, listMentions, status, null, timeStamp, null, previewData))
    }
    if (attachments) {
        for (var j = 0; j < attachments.length; j++) {
            let file = attachments[j]
            if (file.content_type.includes('image')) {
                listMessage.push(createModelMessageItem(isMessageOut, sender, type, chatContant.VIEW_IMAGE, clientMid, serverMid, file.title, null, status, file.file_url, timeStamp, file.thumbnail_url, null, file.content_type))
            } else if (file.content_type.includes('video')) {
                listMessage.push(createModelMessageItem(isMessageOut, sender, type, chatContant.VIEW_VIDEO, clientMid, serverMid, file.title, null, status, file.file_url, timeStamp, file.thumbnail_url, null, file.content_type))
            } else if (file.content_type.includes('audio')) {
                listMessage.push(createModelMessageItem(isMessageOut, sender, type, chatContant.VIEW_AUDIO, clientMid, serverMid, file.title, null, status, file.file_url, timeStamp, file.thumbnail_url, null, file.content_type))
            } else {
                listMessage.push(createModelMessageItem(isMessageOut, sender, type, chatContant.VIEW_FILE, clientMid, serverMid, file.title, null, status, file.file_url, timeStamp, file.thumbnail_url, null, file.content_type))
            }
        }
    }
    for (var i = 0; i < listMessage.length; i++) {
        if (i === 0) {
            if (previousMessage && sender && previousMessage.sender && previousMessage.sender.userId == sender.userId && previousMessage.messageType === chatContant.MESSAGE_TYPE_VIEW) {
                listMessage[i].isHideAvatar = true
            } else {
                listMessage[i].isHideAvatar = false
            }
        } else {
            listMessage[i].isHideAvatar = true
        }
    }
    return listMessage
}
const passerMessageWithAdminEvent = (adminEvent, senderName, listUser, roomData, sender, translate) => {
    let user = getLocalStorage('user')
    let listMentions = []
    let message = ""
    let urlAvatar = ""
    if (senderName) {
        listMentions.push({
            userId: sender.userId, start: 0, end: senderName.length
        })
    }
    if (adminEvent && adminEvent.action) {
        switch (adminEvent.action) {
            case chatContant.ADMIN_EVENT_CREATE_ROOM:
                if (roomData && (roomData.roomType == chatContant.ROOM_TYPE_GROUP || roomData.room_type == chatContant.ROOM_TYPE_GROUP)) {
                    message = `${senderName ? `${senderName} ` : ""}${translate('chat_admin_event_create_room')} "${adminEvent.text ? adminEvent.text : roomData.roomName ? roomData.roomName : roomData.room_name}"`
                } else {
                    message = translate('text_start_conversation')
                    listMentions = []
                }
                break;
            case chatContant.ADMIN_EVENT_EDIT_GROUP_NAME:
                message = `${senderName ? `${senderName} ` : ""}${translate('chat_admin_event_change_name_room')} "${adminEvent.text}"`
                break;
            case chatContant.ADMIN_EVENT_EDIT_GROUP_AVATAR:
                message = `${senderName ? `${senderName} ` : ""}${translate('chat_admin_event_change_avatar_room')}`
                urlAvatar = adminEvent.text
                break;
            case chatContant.ADMIN_EVENT_ADD_MEMBER:
                message = `${senderName ? `${senderName} ` : ""}${translate('text_action_chat_add_member')} `
                let length = message.length
                if (adminEvent.user_list) {
                    for (var i = 0; i < adminEvent.user_list.length; i++) {
                        const member = listUser[adminEvent.user_list[i]] ? listUser[adminEvent.user_list[i]] : createModelUserToRoomWithUserLocal(user, adminEvent.user_list[i])
                        if (member) {
                            let memberName = member.fullName ? member.fullName : member.username ? member.username : 'User not found'
                            if (memberName) {
                                listMentions.push({
                                    userId: member.userId, start: message.length, end: message.length + memberName.length
                                })
                                message = `${message}${memberName}, `
                            }
                        }
                    }
                    if (length < message.length) {
                        message = message.slice(0, -2)
                    }
                }
                break;
            case chatContant.ADMIN_EVENT_REMOVE_MEMBER:
                message = `${senderName ? `${senderName} ` : ""}${translate('text_action_chat_remove_member')} `
                let msgLength = message.length
                if (adminEvent.user_list) {
                    for (var i = 0; i < adminEvent.user_list.length; i++) {
                        const member = listUser[adminEvent.user_list[i]] ? listUser[adminEvent.user_list[i]] : createModelUserToRoomWithUserLocal(user, adminEvent.user_list[i])
                        if (member) {
                            let memberName = member.fullName ? member.fullName : member.username ? member.username : 'User not found'
                            if (memberName) {
                                listMentions.push({
                                    userId: member.userId, start: message.length, end: message.length + memberName.length
                                })
                                message = `${message}${memberName}, `
                            }
                        }
                    }
                    if (msgLength < message.length) {
                        message = message.slice(0, -2)
                    }
                }
                break;
            case chatContant.ADMIN_EVENT_OUT_ROOM:
                message = `${senderName ? `${senderName} ` : ""}${translate('text_action_chat_has_left')} `
                break;
        }
    }
    return { listMentions, message, urlAvatar }
}
const mapperListMessageViewCenterModel = (messageData, listUser, roomData, translate) => {
    const {
        sender_id: userId, message_type: type, server_mid: serverMid,
        timestamp: timeStamp, body, mentions, attachments,
        link_preview: preview, client_mid: clientMid, admin_event: adminEvent
    } = messageData

    let listMessage = []
    let user = getLocalStorage('user')
    const sender = listUser[userId] ? listUser[userId] : createModelUserToRoomWithUserLocal(user, userId)
    let senderName = sender.userId == user.id ? translate('you') : sender.fullName ? sender.fullName : sender.username
    const { message, listMentions, urlAvatar } = passerMessageWithAdminEvent(adminEvent, senderName, listUser, roomData, sender, translate)
    listMessage.push(createModelMessageItem(false, sender, type, chatContant.VIEW_ACTIONS, null,
        serverMid, message, listMentions, null, urlAvatar, timeStamp))
    return listMessage
}

export const mapperMentions = (listMention, listUser, message) => {
    let list = []
    let msgList = message.split(' ')
    let listData = []
    var startMsg = 0
    for (var i = 0; i < msgList.length; i++) {
        listData.push({ data: msgList[i], start: startMsg, end: (startMsg + msgList[i].length) })
        startMsg = startMsg + msgList[i].length + 1
    }
    if (listMention && listUser) {
        for (var i = 0; i < listMention.length; i++) {
            let user = listUser.find((item) => item.username === listMention[i].value)
            let model = listData.find((item) => item.data == `@${listMention[i].value}`)
            let localUser = getLocalStorage('user')
            let userId = user ? user.userId : listMention[i].value == localUser.username ? localUser.id : null
            if (userId != null) {
                list.push({ user_id: userId, start: model.start, end: model.end })
                listData = listData.filter((item) => item != model)
            }
        }
    }
    return list
}

export const mapperListRoomReadMessage = (listRoomData, readMessageData) => {
    let listRoom = [].concat(listRoomData)
    const { sender_id: userId, room_id: roomId, read_timestamp: readTimestamp } = readMessageData
    let room = listRoom.find((item) => item.roomId == roomId)
    if (room) {
        let user = getLocalStorage('user')
        let id = user.id
        if (id == userId) {
            room.unreadTotal = 0
        } else if (room.sender) {
            room.isRead = room.sender.userId == id && id != userId && room.time <= readTimestamp
        }
        if (room.listMember) {
            let member = room.listMember.find((item) => item.userId == userId)
            if (member) {
                member.lastRead = readTimestamp
            }
        }
    }
    return listRoom
}

export const mapperListRoomTyping = (listRoomData, listUser, typingMessageData) => {
    let listRoom = [].concat(listRoomData)
    const { sender_id: userId, room_id: roomId, state: state } = typingMessageData
    let room = listRoom.find((item) => item && item.roomId == roomId)
    if (room) {
        if (state === 1) {
            room.typing = listUser[userId]
        } else {
            room.typing = null
        }
    }
    return listRoom
}
export const mapperListRoomSendFile = (listRoomData, listUser, sendFileMessageData) => {
    let listRoom = [].concat(listRoomData)
    const { sender_id: userId, room_id: roomId, state: state } = sendFileMessageData
    let room = listRoom.find((item) => item.roomId == roomId)
    if (room) {
        if (state === 1) {
            room.sendFile = listUser[userId]
        } else {
            room.sendFile = null
        }
    }
    return listRoom
}
export const mapperDraftRoom = (listRoomData, draftMessage) => {
    const { room_id: roomId, body: body, mentions, state } = draftMessage
    let list = [].concat(listRoomData)
    let room = list.find((item) => item && item.roomId == roomId)
    if (room) {
        room.draft = state === 1 ? { roomId, body, mentions, state } : null
    }
    return list
}
export const findRoomDefault = (roomChange, listRoomData) => {
    let room = listRoomData.find((item) => item && item.roomId == roomChange.roomId)
    if (room) {
        return room
    }
    return roomChange
}
export const fileListMapper = (listFile, listAttachmentData, listUser) => {
    var listAttachment = [].concat(listAttachmentData)
    var list = [].concat(listFile)
    for (var i = 0; i < listAttachment.length; i++) {
        let groupLast = list[list.length - 1]
        let date = moment(listAttachment[i].created_at, 'YYYY-MM-DD H:mm:ss')
        let model = createModelAttachment(listAttachment[i], listUser)
        if (groupLast && checkDatesAreOnSameMonthYear(groupLast.date, date)) {
            groupLast.list.push(model)
        } else {
            list.push({ date, list: [model] }) //add new group date
        }
    }
    return list
}
const createModelAttachment = (attachment, listUser) => {
    const {
        attachment_type: type,
        description, thumbnail_url: thumbnailUrl,
        created_at: createdAt,
        attachment_id: id, attachment_title: title, attachment_file_url: url,
        sender_id: userId
    } = attachment
    let user = getLocalStorage('user')
    const sender = listUser[userId] ? listUser[userId] : createModelUserToRoomWithUserLocal(user, userId)
    return { id, type, description, thumbnailUrl, createdAt, title, url, sender }
}
export const convertTime = (time, format, formatShow) => {
    return moment(time, format).format(formatShow)
}

export const getLastReadMessageInRoom = (roomData) => {
    if (roomData) {
        let listMember = [].concat(roomData.listMember)
        let id = getLocalStorage('user').id
        listMember = listMember.filter((item) => item.userId != id)
        let max = Math.max(...listMember.map(item => item.lastRead))
        return max
    }
}
export const mapperLastReadMessageWithLog = (listLogMessage, lastReadMember, lastReadCurrent, translate) => {
    let list = [].concat(listLogMessage)
    for (var i = 0; i < list.length; i++) {
        if (list[i].timeStamp <= lastReadMember && list[i].status === chatContant.STATUS_SENT) {
            list[i].status = chatContant.STATUS_READ
        }
    }
    let newMessageTitle = list.find((item) => item.type == chatContant.VIEW_NEW_MESSAGE)
    if (!newMessageTitle && lastReadCurrent) {
        let listOld = list.filter((item) => item.timeStamp < lastReadCurrent)
        let listNew = list.filter((item) => item.timeStamp >= lastReadCurrent)
        list = [].concat(listOld)
        let newMessageTitle = createModelMessageItem(false, null, chatContant.MESSAGE_TYPE_ADMIN,
            chatContant.VIEW_NEW_MESSAGE, null, null, translate('new_messages'), null, null, null, lastReadCurrent)
        list = list.concat([newMessageTitle])
        list = list.concat(listNew)
    }
    return list
}
export const getAllFileListInListMessage = (listMessageData) => {
    let list = []
    let listMessage = [].concat(listMessageData)
    listMessage = listMessage.filter((item) => chatContant.VIEW_AUDIO === item.type || chatContant.VIEW_FILE === item.type
        || chatContant.VIEW_VIDEO === item.type || chatContant.VIEW_IMAGE === item.type
    )
    for (var i = 0; i < listMessage.length; i++) {
        let type = chatContant.ATTACHMENT_TYPE_FILE
        switch (listMessage[i].type) {
            case chatContant.VIEW_AUDIO: type = chatContant.ATTACHMENT_TYPE_AUDIO
                break
            case chatContant.VIEW_VIDEO: type = chatContant.ATTACHMENT_TYPE_VIDEO
                break
            case chatContant.VIEW_IMAGE: type = chatContant.ATTACHMENT_TYPE_IMAGE
                break
            default:
                type = chatContant.ATTACHMENT_TYPE_FILE
                break
        }
        if (type != chatContant.ATTACHMENT_TYPE_FILE) {
            list.push({
                type, thumbnailUrl: listMessage[i].thumbnail,
                title: listMessage[i].message, url: listMessage[i].url,
                timeStamp: listMessage[i].timeStamp,
            })
        }
    }
    return list
}

export const mapperSearchMessage = (searchMessageData = [], listUser, lastRead, listRoomAll, translate) => {
    let list = [].concat(searchMessageData)
    let listResult = []
    for (var i = 0; i < list.length; i++) {
        listResult.push(createModelMessasgeSearch(list[i], listUser, lastRead, listRoomAll, translate))
    }
    return listResult
}
const createModelMessasgeSearch = (message, listUser, lastRead, listRoomAll, translate) => {
    const {
        room_id: roomId,
        sender_id: userId, message_type: type, server_mid: serverMid,
        timestamp: timeStamp, body: body, mentions: mentions, attachment_list: attachments,
        link_preview: preview, client_mid: clientMid
    } = message
    let user = getLocalStorage('user')
    const sender = listUser[userId] ? listUser[userId] : createModelUserToRoomWithUserLocal(user, userId)
    let isMessageOut = userId ? userId == user.id : true
    let status = lastRead > timeStamp ? chatContant.STATUS_READ : chatContant.STATUS_SENT //todo status read and error

    if (body && body.length > 0) {
        let listMentions = []
        if (mentions && mentions.length > 0) {
            for (var i = 0; i < mentions.length; i++) {
                listMentions.push({
                    userId: mentions[i].user_id,
                    start: mentions[i].start,
                    end: mentions[i].end,
                })
            }
        }
        let model = createModelMessageItem(isMessageOut, sender, type, chatContant.VIEW_MESSAGE, clientMid,
            serverMid, body, listMentions, status, null, timeStamp, null)
        model.typeSearchMessage = true
        model.roomId = roomId
        model.roomData = findRoomWithRoomId(listRoomAll, listUser, roomId, user.id, translate)
        return model
    }
    return null
}

export const showMessageNotification = ({ key, name, message, duration = 4.5 }) => {
    notification['info']({
        key, message: name, description: message, duration: duration
    })
    console.log('info', message);
}
// console.log("notification", notification['info'])
export const mapperNewRoomWithListRoom = (listRoomData, listUser, newRoom, translate) => {
    let listMember = []
    let user = getLocalStorage('user')
    let memberOnline = 0
    let memberTotal = 0
    let room = null
    let listRoom = [].concat(listRoomData)
    if (newRoom) {
        let roomName = newRoom.room_name
        let avatar = newRoom.room_avatar_url
        if (newRoom.room_member) {
            memberTotal = newRoom.room_member.length
            for (var i = 0; i < newRoom.room_member.length; i++) {
                const { last_read: lastRead, system_user_id: userId } = newRoom.room_member[i]
                let member = listUser[userId] ? listUser[userId] : createModelUserToRoomWithUserLocal(user, userId)
                if (userId != user.id && member && newRoom.room_type != chatContant.ROOM_TYPE_GROUP) {
                    roomName = member.fullName
                    avatar = member.avatar
                }
                listMember.push({ ...member, lastRead })
                memberOnline += member.isOnline ? 1 : 0
            }
        }
        let totalUnread = 1
        let message = ""
        let sender = null
        if (newRoom.room_admin && newRoom.room_admin.length > 0) {
            sender = listUser[newRoom.room_admin[0]] ? listUser[newRoom.room_admin[0]] : createModelUserToRoomWithUserLocal(user, newRoom.room_admin[0])
            if (newRoom.room_admin.filter(id => id == user.id).length > 0) {
                message = `${translate('chat_admin_event_create_room')} "${roomName}"`
            } else {
                message = `${translate('text_action_chat_add_member')} ${user.full_name}`
            }
        }
        room = createModelRoomData(newRoom.room_id,
            newRoom.room_type === chatContant.ROOM_TYPE_GROUP,
            newRoom.room_type, roomName, avatar,
            memberOnline > 0,
            listMember,
            memberTotal,
            memberOnline, totalUnread, message, moment().valueOf(), sender
        )
        listRoom = [room].concat(listRoom)
    }
    return listRoom
}

export const mapperOutRoomWithListRoom = (listRoomData, roomId) => {
    let list = [].concat(listRoomData)
    list = list.filter((item) => item.roomId != roomId)
    return list
}

export const mapperOutRoomWithListUser = (listUser, roomId) => {
    let list = [].concat(listUser)
    let user = list.find((item) => item.roomId == roomId)
    if (user) {
        user.roomId = null
    }
    return list
}
export const mapperListAllRoomWithEvent = (listRoomData, adminEvent, roomId) => {
    const { user_list: userList, text, action } = adminEvent
    let roomList = { ...listRoomData }
    let room = roomList[roomId]
    if (room) {
        switch (action) {
            case chatContant.ADMIN_EVENT_EDIT_GROUP_NAME:
                room.roomName = text
                break;
            case chatContant.ADMIN_EVENT_EDIT_GROUP_AVATAR:
                room.avatar = text
                break;
        }
    }
    return roomList
}
export const mapperListRoomWithEvent = (listRoomData, adminEvent, roomId, listUser) => {
    const { user_list: userList, text, action } = adminEvent
    let list = [].concat(listRoomData)
    let room = list.find((item) => item.roomId == roomId)
    if (room) {
        let listMember = [].concat(room.listMember)
        switch (action) {
            case chatContant.ADMIN_EVENT_EDIT_GROUP_NAME:
                room.roomName = text
                break;
            case chatContant.ADMIN_EVENT_EDIT_GROUP_AVATAR:
                room.avatar = text
                break;
            case chatContant.ADMIN_EVENT_ADD_MEMBER:
                if (userList) {
                    for (var i = 0; i < userList.length; i++) {
                        let member = listUser[userList[i]] ? listUser[userList[i]] : createModelUserToRoomWithUserLocal(user, userList[i])
                        if (member) {
                            listMember.push(member)
                        }
                    }
                }
                room.listMember = listMember
                break;
            case chatContant.ADMIN_EVENT_REMOVE_MEMBER:
            case chatContant.ADMIN_EVENT_OUT_ROOM:
                if (userList) {
                    for (var i = 0; i < userList.length; i++) {
                        listMember = listMember.filter((item) => item.userId != userList[i])
                    }
                }
                room.listMember = listMember
                break;
        }
        let memberOnline = 0
        for (var i = 0; i < listMember.length; i++) {
            memberOnline += listMember[i].isOnline ? 1 : 0
        }
        room.memberTotal = listMember.length
        room.memberOnline = memberOnline
    }
    return list
}

export const mapperRoomInfoWithEvent = (roomDataInfo, adminEvent, roomId, listUser) => {
    const { user_list: userList, text, action, selected_user_id: selectedUser } = adminEvent
    let room = roomDataInfo
    if (room && room.roomId == roomId) {
        let listMember = [].concat(room.listMember)
        let roomAdminIds = [].concat(room.roomAdminIds)
        switch (action) {
            case chatContant.ADMIN_EVENT_EDIT_GROUP_NAME:
                room.roomName = text
                break;
            case chatContant.ADMIN_EVENT_EDIT_GROUP_AVATAR:
                room.avatar = text
                break;
            case chatContant.ADMIN_EVENT_ADD_MEMBER:
                if (userList) {
                    for (var i = 0; i < userList.length; i++) {
                        let member = listUser[userList[i]] ? listUser[userList[i]] : createModelUserToRoomWithUserLocal(user, userList[i])
                        if (member) {
                            listMember.push(member)
                        }
                    }
                }
                room.listMember = listMember
                break;
            case chatContant.ADMIN_EVENT_REMOVE_MEMBER:
            case chatContant.ADMIN_EVENT_OUT_ROOM:
                if (userList) {
                    for (var i = 0; i < userList.length; i++) {
                        listMember = listMember.filter((item) => item.userId != userList[i])
                        roomAdminIds = roomAdminIds.filter((item) => item != userList[i])
                    }
                }
                if (text) {
                    var member = listMember.find((item) => item.userId == text)
                    if (member) {
                        member.isAdmin = true
                        room.isAdmin = getLocalStorage('user').id == text
                    }
                    roomAdminIds.push(text)
                }
                room.listMember = listMember
                room.roomAdminIds = roomAdminIds
                break;
        }
    }
    return room
}


export const checkHaveLinkMessage = (message) => {
    if (message) {
        var list = message.split(' ')
        if (list) {
            for (var i = 0; i < list.length; i++) {
                if (isURL(list[i])) return true
            }
        }
    }
    return false
}

export const isURL = (str) => {
    const pattern = new RegExp('^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})', 'gi')
    return pattern.test(str);
}

export const mapperListRoomAll = (listRoom, listUser) => {
    var list = {}
    if (listRoom) {
        for (var key in listRoom) {
            var {
                room_id: roomId,
                room_name: roomName,
                room_avatar: avatar,
                room_type_id: roomType,
                single_chat_id: singleChatId
            } = listRoom[key]
            if (roomType == chatContant.ROOM_TYPE_USER) {
                var user = listUser[singleChatId]
                if (user) {
                    roomName = user.fullName
                    avatar = user.avatar
                }
            }
            list[key] = { roomId, roomName, avatar, roomType, isGroup: roomType == chatContant.ROOM_TYPE_GROUP, singleChatId }
        }
    }
    return list
}

export const mapperNewRoomWithListRoomAll = (listRoom, newRoom) => {
    if (listRoom) {
        listRoom[newRoom.roomId] = {
            roomId: newRoom.roomId,
            roomName: newRoom.roomName,
            avatar: newRoom.avatar,
            roomType: chatContant.ROOM_TYPE_USER,
            singleChatId: newRoom.singleChatId
        }
    }
    return listRoom
}
export const mapperNewGroupRoomWithListRoomAll = (listRoom, listUser, newGroup) => {
    if (listRoom) {
        let { room_id: roomId,
            room_name: roomName,
            room_type: roomType,
            room_avatar_url: avatar,
            room_member: roomMember
        } = newGroup
        let user = getLocalStorage('user')
        let singleChatId = null
        if (!listRoom[roomId]) {
            if (roomMember && roomType == chatContant.ROOM_TYPE_USER) {
                for (var i = 0; i < roomMember.length; i++) {
                    if (roomMember[i].system_user_id != user.id) {
                        let member = listUser[roomMember[i].system_user_id]
                        if (member) {
                            roomName = member.fullName
                            avatar = member.avatar
                        }
                        singleChatId = roomMember[i].system_user_id
                    }
                }
            }
            listRoom[roomId] = { roomId, roomType, isGroup: roomType == chatContant.ROOM_TYPE_GROUP, roomName, avatar, singleChatId }
        }
    }
    return listRoom
}

export const findRoomPresonal = (listRoomAllDefault, translate) => {
    let roomSaved = Object.values(listRoomAllDefault).find(item => item.roomType == chatContant.ROOM_TYPE_PERSONAL)
    if (roomSaved) {
        roomSaved.roomName = translate('text_room_saved_message')
        roomSaved.avatar = default_save_message
    }
    return roomSaved
}

export const mapperListUserToMentions = (listUser) => {
    let list = []
    if (listUser) {
        for (var i = 0; i < listUser.length; i++) {
            const { fullName: name, avatar, userId, username } = listUser[i]
            list.push({ name, avatar, userId, username })
        }
    }
    return list
}
export const mapperDataSendMessageTextAndMentions = (raw) => {
    let entityMention = []
    let message = ""
    for (var i = 0; i < raw.blocks.length; i++) {
        message += raw.blocks[i].text + "\n"
        entityMention = entityMention.concat(raw.blocks[i].entityRanges)
    }
    if (message.length > 0) {
        message = message.slice(0, -1)
    }
    let mentions = [];
    for (let key in raw.entityMap) {
        const ent = raw.entityMap[key];
        if (ent.type == "mention") {
            let start = entityMention[key].offset
            let length = entityMention[key].length
            let user_id = ent.data.mention.userId
            mentions.push({ user_id, start, end: start + length });
        }
    }
    mentions = mapperEmojiWithMentions(message, mentions)
    return { message, mentions }
}
const mapperEmojiWithMentions = (message, mentions) => {
    const listEmojiIndex = getEmojiIndexes(message).result
    let listMentions = [].concat(mentions)
    if (listEmojiIndex.length > 0) {
        listEmojiIndex.forEach(item => {
            listMentions = listMentions.map((mention) => {
                if (mention.start > item.index) {
                    mention.start += item.length - 1
                    mention.end += item.length - 1
                }
                return mention
            })
        })
    }
    return listMentions
}
const convertMentionWithEmojiState = (message, mentions) => {
    let result = getEmojiIndexes(message).result
    result = result.sort((a, b) => b.index > a.index ? 1 : -1)
    let listMentions = [].concat(mentions)
    if (result.length > 0) {
        result.forEach(item => {
            listMentions = listMentions.map((mention) => {
                if (mention.start >= item.index) {
                    mention.start -= item.length - 1
                    mention.end -= item.length - 1
                }
                return { ...mention }
            })

        })
    }
    return listMentions
}
export const getEmojiIndexes = (text) => {
    const emojiRegex = require('emoji-regex')
    const regex = emojiRegex()
    const result = []
    let match
    while (match = regex.exec(text)) {
        const emoji = match[0]
        const index = text.indexOf(match[0])
        const { length } = emoji
        result.push({ emoji, index, length })
        var repareText = ""
        for (var i = 0; i < length; i++) {
            repareText += " "
        }
        text = text.substr(0, index) + repareText + text.substr(index + length, text.length)
    }
    return { result, text }
}

export const createMentionEntities = (message, tags) => {
    var rawContent = convertToRaw(ContentState.createFromText(message));
    const rawState = []
    if (tags) {
        for (var i = 0; i < tags.length; i++) {
            var name = message.substring(tags[i].start, tags[i].end)
            rawState.push({
                type: 'mention',
                mutability: 'SEGMENTED',
                data: { mention: { userId: tags[i].user_id, name: name } }
            })
        }
    }
    const listMentions = convertMentionWithEmojiState(message, tags)
    rawContent.entityMap = [...rawState];
    let length = 0
    rawContent.blocks = rawContent.blocks.map(block => {
        const ranges = [];
        if (listMentions.length > 0) {
            listMentions.forEach((tag, index) => {
                let offset = tag.start - length
                let end = tag.end - tag.start
                if (tag.start - length < block.text.length) {
                    ranges.push({
                        key: index,
                        length: end,
                        offset
                    });
                }
            });
        }
        length += block.text.length
        return { ...block, entityRanges: ranges };
    });
    return convertFromRaw(rawContent);
};

export const filterMentionsWithValue = (listMentions, value) => {
    let list = []
    if (value.length > 0) {
        list = listMentions.filter((item) => item.name.toLowerCase().indexOf(value.toLowerCase()) >= 0)
    } else {
        list = [].concat(listMentions)
    }
    return list
}
export const mapperErrorMessageWithMessage = (listMessage, clientMid) => {
    let list = listMessage.filter((item) => item.clientMid == clientMid)
    if (list && list.length > 0) {
        for (var i = 0; i < list.length; i++) {
            list[i].status = chatContant.STATUS_ERROR
        }
    }
    return listMessage
}

export const getListFileAndOutSize = (files) => {
    let results = []
    let listOutSize = []
    let listSizeEmpty = []
    if (files && files.length > 0) {
        for (var i = 0; i < files.length; i++) {
            const size = Math.round((files[i].size / 1024));
            if (size >= chatContant.MAX_SIZE_IMAGE) {
                listOutSize.push(files[i])
            } else if (size > 0) {
                results.push(files[i])
            } else {
                listSizeEmpty.push(files[i])
            }
        }
    }
    return { results, listOutSize, listSizeEmpty }
}

export const getLastReadMessageCurrentUser = (roomData) => {
    let user = getLocalStorage('user')
    let lastRead = null
    if (roomData.listMember) {
        let member = roomData.listMember.find((item) => item.userId == user.id)
        if (member) {
            lastRead = member.lastRead
        }
    }
    return lastRead
}

export const findRoomWithRoomId = (listAllRoom, listUser, roomId, userId, translate) => {
    if (listAllRoom) {
        let room = listAllRoom[roomId]
        if (room && room.roomType != chatContant.ROOM_TYPE_GROUP) {
            if (room.singleChatId == userId) {
                room.roomName = translate('text_room_saved_message')
                room.avatar = default_save_message
            } else {
                let user = listUser[room.singleChatId]
                if (user) {
                    room.roomName = user.fullName
                    room.roomName = user.avatar
                }
            }
        }
        return room
    }

}
export function isValidImageType(type) {
    return type === FILE_CONTENT_TYPE.PNG
        || type === FILE_CONTENT_TYPE.JPEG
        || type === FILE_CONTENT_TYPE.JPG
        || type === FILE_CONTENT_TYPE.GIF
        || type === FILE_CONTENT_TYPE.DWG;
}