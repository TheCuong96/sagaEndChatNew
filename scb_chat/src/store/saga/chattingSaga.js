// eslint-disable-next-line
import { put, takeLatest, all, fork, call } from "redux-saga/effects";
import { chatProfileService, chattingService } from "../../services/index";
import { chattingAction } from '../action/index';
import { getLocalStorage } from "functions/Utils";
import { mapperDataListUserDictionary, mapperDataToListUserOnline, mapperDataListBotDictionary } from "functions/ChatHelper";

// export function* getChattingUserList() {
//     try {
//         const response = yield chatProfileService.getUserList()
//         if (response.success) {
//             //const responseChatBot = yield chatProfileService.geChatBotList()
//             var data = mapperDataListUserDictionary(response.detail)
//             // if (responseChatBot.success) {
//             //    data = { ...data, ...mapperDataListBotDictionary(responseChatBot.detail) }
//             // }
//             // data = mapperDataToListUserOnline(data, onlineList)
//             yield put({ type: chattingAction.USER_LIST_SUCCESS, response: data })
//         } else {
//             yield put({ type: chattingAction.USER_LIST_FAILURE, err: response });
//         }
//     } catch (err) {
//         yield put({ type: chattingAction.CHAT_UPLOAD_FILE_FAILURE, err: { err } });
//     }
// }
////
export function* getRoomList(payload) {
    try {
        const response = yield chattingService.getActiveRoomList(payload.params);
        response.success ? yield put({ type: chattingAction.ACTIVE_ROOM_CHAT_LIST_SUCCESS, response }) : yield put({ type: chattingAction.ACTIVE_ROOM_CHAT_LIST_FAILURE, err: response });
        console.log("oooooo",response);
        console.log("kkkkkk",response(payload.params));
    } catch (err) {
        yield put({ type: chattingAction.ACTIVE_ROOM_CHAT_LIST_FAILURE, err: { err } });
    }
    
}

export function* getRoomListWatcher() {
    yield takeLatest(chattingAction.ACTIVE_ROOM_CHAT_LIST_REQUEST, getRoomList);
}
////

// export function* getChattingUserListWatcher() {
//     yield takeLatest(chattingAction.USER_LIST_REQUEST, getChattingUserList);
// }
export default function* rootSaga() {
    yield all([
        fork(getRoomListWatcher)
    ]);
}