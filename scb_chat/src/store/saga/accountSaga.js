import { put, takeLatest, all, fork } from "redux-saga/effects";
import { accountAction } from '../action';
import { accountService, chatProfileService } from "../../services/index";

export function* login(payload) {
    let { username, password, onNext } = payload.params
    try {
        var response = yield accountService.login(username, password, onNext);
        if (response.success) {
            if (response && response.success === true) {
                // store user details and basic auth credentials in local storage
                //FIXME: setting queue
                const queueInfo = yield chatProfileService.getUserQueueInfo(response.detail.token)
                if (queueInfo.success) {
                    response.detail.chat_info = queueInfo.detail
                }
                localStorage.setItem('user', JSON.stringify(response['detail']));
                window.location.reload()
            }
            yield put({ type: accountAction.LOGIN_SUCCESS, response })
        }
        else {
            yield put({ type: accountAction.LOGIN_FAILURE, response });
        }
    } catch (err) {
        yield put({ type: accountAction.LOGIN_FAILURE, err: { err } });
    }
}

export function* loginWatcher() {
    yield takeLatest(accountAction.LOGIN_REQUEST, login);
}

export default function* rootSaga() {
    yield all([
        fork(loginWatcher),
    ]);
}