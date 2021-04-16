// eslint-disable-next-line
import { put, takeLatest, all, fork, call } from "redux-saga/effects";
import { chatProfileService } from "../../services/index";
import { chatProfileAction } from '../action/index';
import { getLocalStorage } from "functions/Utils";
import { mapperDataListUserDictionary, mapperDataToListUserOnline, mapperDataListBotDictionary } from "functions/ChatHelper";

export function* getUserList() {
    try {
        const response = yield chatProfileService.getUserList()
        if (response.success) {
            //const responseChatBot = yield chatProfileService.geChatBotList()
            var data = mapperDataListUserDictionary(response.detail)
            // if (responseChatBot.success) {
            //    data = { ...data, ...mapperDataListBotDictionary(responseChatBot.detail) }
            // }

            // data = mapperDataToListUserOnline(data, onlineList)
            yield put({ type: chatProfileAction.USER_LIST_SUCCESS, response: data })
        } else {
            yield put({ type: chatProfileAction.USER_LIST_FAILURE, err: response });
        }
    } catch (err) {
        yield put({ type: chatProfileAction.CHAT_UPLOAD_FILE_FAILURE, err: { err } });
    }
}

export function* getUserListWatcher() {
    yield takeLatest(chatProfileAction.USER_LIST_REQUEST, getUserList);
}

export function* getRoomChatList(payload) {
    try {
        const response = yield chatProfileService.getRoomChatList(payload.params);
        response.success ? yield put({ type: chatProfileAction.ROOM_CHAT_LIST_SUCCESS, response }) : yield put({ type: chatProfileAction.ROOM_CHAT_LIST_FAILURE, err: response });
    } catch (err) {
        yield put({ type: chatProfileAction.ROOM_CHAT_LIST_FAILURE, err: { err } });
    }
}

export function* getRoomChatListWatcher() {
    yield takeLatest(chatProfileAction.ROOM_CHAT_LIST_REQUEST, getRoomChatList);
}

export function* getRoomList() {
    try {
        const response = yield chatProfileService.getRoomList();
        response.success ? yield put({ type: chatProfileAction.ROOM_LIST_SUCCESS, response }) : yield put({ type: chatProfileAction.ROOM_LIST_FAILURE, err: response });
    } catch (err) {
        yield put({ type: chatProfileAction.ROOM_LIST_FAILURE, err: { err } });
    }
}

export function* getRoomListWatcher() {
    yield takeLatest(chatProfileAction.ROOM_LIST_REQUEST, getRoomList);
}

export function* getRoomLogChat(payload) {
    try {
        const { room_id, order_flag, searchMsg, timestamp } = payload.params
        const response = yield chatProfileService.getRoomLogChat(payload.params);
        if (searchMsg && response.detail) {
            let listDetail = [].concat(response.detail)
            listDetail = listDetail.concat([searchMsg])
            // if (response.detail.length < 20) {
            const response2 = yield chatProfileService.getRoomLogChat({ ...payload.params, order_flag: "1" });
            if (response2.success && response2.detail) {
                listDetail = listDetail.concat(response2.detail)
            }
            // }
            response.detail = listDetail
        }
        // else if (timestamp) {
        //     let listDetail = [].concat(response.detail)
        //     if (response.detail.length >= 0) {
        //         const response2 = yield chatProfileService.getRoomLogChat({ ...payload.params, order_flag: "1", timestamp });
        //         if (response2.success && response2.detail) {
        //             listDetail = listDetail.concat(response2.detail)
        //         }
        //     }
        //     response.detail = listDetail
        // }
        response.success ? yield put({ type: chatProfileAction.ROOM_LOG_CHAT_SUCCESS, response: { ...response, room_id, order_flag, searchMsg, timestamp } }) : yield put({ type: chatProfileAction.ROOM_LOG_CHAT_FAILURE, err: { ...response, room_id, order_flag } });
    } catch (err) {
        yield put({ type: chatProfileAction.ROOM_LOG_CHAT_FAILURE, err: { err } });
    }
}

export function* getRoomLogChatWatcher() {
    yield takeLatest(chatProfileAction.ROOM_LOG_CHAT_REQUEST, getRoomLogChat);
}

export function* getRoomInfo(payload) {
    try {
        const response = yield chatProfileService.getRoomInfo(payload.params);
        response.success ? yield put({ type: chatProfileAction.ROOM_INFO_SUCCESS, response }) : yield put({ type: chatProfileAction.ROOM_INFO_FAILURE, err: response });
    } catch (err) {
        yield put({ type: chatProfileAction.ROOM_INFO_FAILURE, err: { err } });
    }
}

export function* getRoomInfoWatcher() {
    yield takeLatest(chatProfileAction.ROOM_INFO_REQUEST, getRoomInfo);
}
export function* getUserInfo(payload) {
    try {
        const response = yield chatProfileService.getUserInfo(payload.params);
        response.success ? yield put({ type: chatProfileAction.ROOM_USER_INFO_SUCCESS, response }) : yield put({ type: chatProfileAction.ROOM_USER_INFO_FAILURE, err: response });
    } catch (err) {
        yield put({ type: chatProfileAction.ROOM_USER_INFO_FAILURE, err: { err } });
    }
}

export function* getUserInfoWatcher() {
    yield takeLatest(chatProfileAction.ROOM_USER_INFO_REQUEST, getUserInfo);
}
export function* editRoomMember(payload) {
    try {
        const response = yield chatProfileService.editRoomMember(payload.params);
        response.success ? yield put({ type: chatProfileAction.ROOM_GROUP_EDIT_MEMBER_SUCCESS, response }) : yield put({ type: chatProfileAction.ROOM_GROUP_EDIT_MEMBER_FAILURE, err: response });
    } catch (err) {
        yield put({ type: chatProfileAction.ROOM_GROUP_EDIT_MEMBER_FAILURE, err: { err } });
    }
}

export function* editRoomMemberWatcher() {
    yield takeLatest(chatProfileAction.ROOM_GROUP_EDIT_MEMBER_REQUEST, editRoomMember);
}

export function* editRoomGroup(payload) {
    try {
        const response = yield chatProfileService.editRoomGroup(payload.params);
        response.success ? yield put({ type: chatProfileAction.ROOM_GROUP_EDIT_SUCCESS, response }) : yield put({ type: chatProfileAction.ROOM_GROUP_EDIT_FAILURE, err: response });
    } catch (err) {
        yield put({ type: chatProfileAction.ROOM_GROUP_EDIT_FAILURE, err: { err } });
    }
}

export function* editRoomGroupWatcher() {
    yield takeLatest(chatProfileAction.ROOM_GROUP_EDIT_REQUEST, editRoomGroup);
}

export function* createRoomWithGroup(payload) {
    try {
        const response = yield chatProfileService.createRoomWithGroup(payload.params);
        response.success ? yield put({ type: chatProfileAction.CREATE_ROOM_WITH_GROUP_SUCCESS, response }) : yield put({ type: chatProfileAction.CREATE_ROOM_WITH_GROUP_FAILURE, err: response });
    } catch (err) {
        yield put({ type: chatProfileAction.CREATE_ROOM_WITH_GROUP_FAILURE, err: { err } });
    }
}

export function* createRoomWithGroupWatcher() {
    yield takeLatest(chatProfileAction.CREATE_ROOM_WITH_GROUP_REQUEST, createRoomWithGroup);
}

export function* createRoomWithUser(payload) {
    try {
        const response = yield chatProfileService.createRoomWithUser(payload.params);
        response.success ? yield put({ type: chatProfileAction.CREATE_ROOM_WITH_USER_SUCCESS, response }) : yield put({ type: chatProfileAction.CREATE_ROOM_WITH_USER_FAILURE, err: response });
    } catch (err) {
        yield put({ type: chatProfileAction.CREATE_ROOM_WITH_USER_FAILURE, err: { err } });
    }
}

export function* createRoomWithUserWatcher() {
    yield takeLatest(chatProfileAction.CREATE_ROOM_WITH_USER_REQUEST, createRoomWithUser);
}
export function* getUserAttachmentList(payload) {
    try {
        const response = yield chatProfileService.getUserAttachmentList(payload.params);
        response.success ? yield put({ type: chatProfileAction.USER_ATTACHMENT_LIST_SUCCESS, response }) : yield put({ type: chatProfileAction.USER_ATTACHMENT_LIST_FAILURE, err: response });
    } catch (err) {
        yield put({ type: chatProfileAction.USER_ATTACHMENT_LIST_FAILURE, err: { err } });
    }
}
export function* getUserAttachmentListWatcher() {
    yield takeLatest(chatProfileAction.USER_ATTACHMENT_LIST_REQUEST, getUserAttachmentList);
}

export function* getRoomAttachmentFilesList(payload) {
    try {
        const response = yield chatProfileService.getRoomAttachmentFileList(payload.params);
        response.success ? yield put({ type: chatProfileAction.ROOM_ATTACHMENT_FILES_SUCCESS, response }) : yield put({ type: chatProfileAction.ROOM_ATTACHMENT_FILES_FAILURE, err: response });
    } catch (err) {
        yield put({ type: chatProfileAction.ROOM_ATTACHMENT_FILES_FAILURE, err: { err } });
    }
}
export function* getRoomAttachmentFilesListWatcher() {
    yield takeLatest(chatProfileAction.ROOM_ATTACHMENT_FILES_REQUEST, getRoomAttachmentFilesList);
}

export function* getRoomAttachmentMediaList(payload) {
    try {
        const response = yield chatProfileService.getRoomAttachmentMediaList(payload.params);
        response.success ? yield put({ type: chatProfileAction.ROOM_ATTACHMENT_MEDIA_SUCCESS, response }) : yield put({ type: chatProfileAction.ROOM_ATTACHMENT_MEDIA_FAILURE, err: response });
    } catch (err) {
        yield put({ type: chatProfileAction.ROOM_ATTACHMENT_MEDIA_FAILURE, err: { err } });
    }
}

export function* getRoomAttachmentMediaListWatcher() {
    yield takeLatest(chatProfileAction.ROOM_ATTACHMENT_MEDIA_REQUEST, getRoomAttachmentMediaList);
}

export function* getRoomAttachmentLinksList(payload) {
    try {
        const response = yield chatProfileService.getRoomAttachmentLinksList(payload.params);
        response.success ? yield put({ type: chatProfileAction.ROOM_ATTACHMENT_LINKS_SUCCESS, response }) : yield put({ type: chatProfileAction.ROOM_ATTACHMENT_LINKS_FAILURE, err: response });
    } catch (err) {
        yield put({ type: chatProfileAction.ROOM_ATTACHMENT_LINKS_FAILURE, err: { err } });
    }
}

export function* getRoomAttachmentLinksListWatcher() {
    yield takeLatest(chatProfileAction.ROOM_ATTACHMENT_LINKS_REQUEST, getRoomAttachmentLinksList);
}

export function* quitRoomGroup(payload) {
    try {
        const { room_id } = payload.params
        const response = yield chatProfileService.quitRoomChat(payload.params);
        response.success ? yield put({ type: chatProfileAction.ROOM_GROUP_QUIT_ROOM_SUCCESS, response: { ...response, room_id } }) : yield put({ type: chatProfileAction.ROOM_GROUP_QUIT_ROOM_FAILURE, err: response });
    } catch (err) {
        yield put({ type: chatProfileAction.ROOM_GROUP_QUIT_ROOM_FAILURE, err: { err } });
    }
}
export function* quitRoomGroupWatcher() {
    yield takeLatest(chatProfileAction.ROOM_GROUP_QUIT_ROOM_REQUEST, quitRoomGroup);
}

export function* deleteRoom(payload) {
    try {
        const { room_id } = payload.params
        const response = yield chatProfileService.deleteRoomChat(payload.params);
        response.success ? yield put({ type: chatProfileAction.ROOM_DELETE_SUCCESS, response: { ...response, room_id } }) : yield put({ type: chatProfileAction.ROOM_DELETE_FAILURE, err: response });
    } catch (err) {
        yield put({ type: chatProfileAction.ROOM_DELETE_FAILURE, err: { err } });
    }
}
export function* deleteRoomWatcher() {
    yield takeLatest(chatProfileAction.ROOM_DELETE_REQUEST, deleteRoom);
}

export function* getListMemberAddRoomGroup(payload) {
    try {
        const response = yield chatProfileService.getListMemberAddRoom(payload.params);
        response.success ? yield put({ type: chatProfileAction.ROOM_GROUP_ADD_MEMBER_LIST_SUCCESS, response }) : yield put({ type: chatProfileAction.ROOM_GROUP_ADD_MEMBER_LIST_FAILURE, err: response });
    } catch (err) {
        yield put({ type: chatProfileAction.ROOM_GROUP_ADD_MEMBER_LIST_FAILURE, err: { err } });
    }
}
export function* getListMemberAddRoomGroupWatcher() {
    yield takeLatest(chatProfileAction.ROOM_GROUP_ADD_MEMBER_LIST_REQUEST, getListMemberAddRoomGroup);
}

export function* uploadFile(payload) {
    try {
        const { fileLists, room_id } = payload.params
        let responses = yield call(() => new Promise((resolve) => {
            Promise.all(fileLists.map((upload_file, index) => chatProfileService.uploadFile({ upload_file }, index + 1)))
                .then((_result) => {
                    resolve(_result)
                })
        }))
        let success = true
        let responseError = null
        let listFile = []
        responses = responses.sort((a, b) => a.index_request > b.index_request ? 1 : -1)

        for (var i = 0; i < responses.length; i++) {
            if (!responses[i].success) {
                success = false
                responseError = responses[i]
                break
            } else {
                listFile.push(responses[i].detail)
            }
        }
        const response = { listFile, room_id }
        success ? yield put({ type: chatProfileAction.CHAT_UPLOAD_FILE_SUCCESS, response: response })
            : yield put({ type: chatProfileAction.CHAT_UPLOAD_FILE_FAILURE, err: responseError });
    } catch (err) {
        yield put({ type: chatProfileAction.CHAT_UPLOAD_FILE_FAILURE, err: { err } });
    }
}

export function* uploadFileWatcher() {
    yield takeLatest(chatProfileAction.CHAT_UPLOAD_FILE_REQUEST, uploadFile);
}

export function* roomSearchMessage(payload) {
    try {
        const response = yield chatProfileService.roomSearchMessage(payload.params);
        response.success ? yield put({ type: chatProfileAction.CHAT_SEARCH_MESSAGE_SUCCESS, response }) : yield put({ type: chatProfileAction.CHAT_SEARCH_MESSAGE_FAILURE, err: response });
    } catch (err) {
        yield put({ type: chatProfileAction.CHAT_SEARCH_MESSAGE_FAILURE, err: { err } });
    }
}
export function* roomSearchMessageWatcher() {
    yield takeLatest(chatProfileAction.CHAT_SEARCH_MESSAGE_REQUEST, roomSearchMessage);
}
export function* roomSearchAllMessage(payload) {
    try {
        const response = yield chatProfileService.roomSearchAllMessage(payload.params);
        response.success ? yield put({ type: chatProfileAction.CHAT_SEARCH_MESSAGE_ALL_SUCCESS, response }) : yield put({ type: chatProfileAction.CHAT_SEARCH_MESSAGE_ALL_FAILURE, err: response });
    } catch (err) {
        yield put({ type: chatProfileAction.CHAT_SEARCH_MESSAGE_ALL_FAILURE, err: { err } });
    }
}
export function* roomSearchAllMessageWatcher() {
    yield takeLatest(chatProfileAction.CHAT_SEARCH_MESSAGE_ALL_REQUEST, roomSearchAllMessage);
}


export default function* rootSaga() {
    yield all([
        fork(getUserListWatcher),
        fork(getRoomListWatcher),
        fork(getRoomChatListWatcher),
        fork(getRoomInfoWatcher),
        fork(getRoomAttachmentLinksListWatcher),
        fork(editRoomMemberWatcher),
        fork(editRoomGroupWatcher),
        fork(createRoomWithGroupWatcher),
        fork(createRoomWithUserWatcher),
        fork(getRoomLogChatWatcher),
        fork(getRoomAttachmentMediaListWatcher),
        fork(getRoomAttachmentFilesListWatcher),
        fork(getUserAttachmentListWatcher),
        fork(quitRoomGroupWatcher),
        fork(getListMemberAddRoomGroupWatcher),
        fork(uploadFileWatcher),
        fork(roomSearchMessageWatcher),
        fork(getUserInfoWatcher),
        fork(deleteRoomWatcher),
        fork(roomSearchAllMessageWatcher),
    ]);
}