import {all, call, fork, put, takeLatest} from "redux-saga/effects";
import {chatbotService} from "services";
import {showNotification, translate} from "functions/Utils";
import {NOTIFICATION_TYPE} from "contant";
import {chatbotAction} from "store/action";

export function* getListPoll(params) {
    try {
        const response = yield chatbotService.getListPoll(params);
        const {detail, total_page, total_record, page} = response;
        const metaData = {
            total_page,
            total_record,
            page,
        }
        if (response.success) {
            yield put({type: chatbotAction.GET_LIST_POLL_SUCCESS, response: detail, meta: metaData});
        } else {
            yield put({type: chatbotAction.GET_LIST_POLL_FAILURE, err: response});
            showNotification({type: NOTIFICATION_TYPE.error, message: response.error_message, title: 'Error'});
        }
    } catch (err) {
        yield put({type: chatbotAction.GET_LIST_POLL_FAILURE, err: null});
    }
}

export function* chatbotSaga() {
    yield takeLatest(chatbotAction.GET_LIST_POLL_REQUEST, getListPoll);
}

export function* getListQuestion(params) {
    try {
        const response = yield chatbotService.getListQuestion(params);
        const {detail, total_page, total_record, page} = response;
        const metaData = {
            total_page,
            total_record,
            page,
        }
        if (response.success) {
            yield put({type: chatbotAction.GET_LIST_QUESTION_SUCCESS, response: detail, meta: metaData});
        } else {
            yield put({type: chatbotAction.GET_LIST_QUESTION_FAILURE, err: response});
            showNotification({type: NOTIFICATION_TYPE.error, message: response.error_message, title: 'Error'});
        }
    } catch (err) {
        yield put({type: chatbotAction.GET_LIST_QUESTION_FAILURE, err: null});
    }
}

export function* getListQuestionWatcher() {
    yield takeLatest(chatbotAction.GET_LIST_QUESTION_REQUEST, getListQuestion);
}

export function* createPoll(payload) {
    console.log('create')
    const { data } = payload;
    console.log({payload})
    console.log(data.poll_image)

    try {
        const response = yield chatbotService.createPoll(data);
        console.log('truoc success', response)
        if (response.success) {
            console.log('if')
            console.log(response)
            showNotification({ type: 'success', message: translate('create_success'), title: translate('success') })
            yield put({ type: chatbotAction.CREATE_POLL_SUCCESS, response })
        }
        else {
            console.log('else')
            // yield put({ type: STAFFAction.UPDATE_STAFF_PROFILE_FAILURE, err: response });
            showNotification({ type: 'error', message: JSON.stringify(response.error_message), title: translate('error') })
        }
    } catch (err) {
        if (err) {
            yield put({type: chatbotAction.CREATE_POLL_FAILURE, err});
            console.log('err', err);
            showNotification({type: 'error', message: JSON.stringify(err.detail), title: translate('error')})
        }
    }
}

export function* createPollWatcher() {
    yield takeLatest(chatbotAction.CREATE_POLL_REQUEST, createPoll);
}

export function* addQuestion(payload) {
    const { data } = payload;
    console.log(payload)
    try {
        const response = yield chatbotService.addQuestion(data);
        console.log('trc success', response)
        if (response.success) {
            console.log(response)
            console.log('poll id',data.poll_id)
            showNotification({ type: 'success', message: translate('update_success'), title: translate('success') })
            yield put({ type: chatbotAction.ADD_QUESTION_SUCCESS, response })
            yield put({ type: chatbotAction.GET_LIST_QUESTION_REQUEST, params: {"poll_id": data.poll_id}})
        }
        else {
            // yield put({ type: STAFFAction.UPDATE_STAFF_PROFILE_FAILURE, err: response });
            showNotification({ type: 'error', message: JSON.stringify(response.error_message), title: translate('error') })
        }
    } catch (err) {
        if (err) {
            yield put({ type: chatbotAction.ADD_QUESTION_FAILURE, err });
            console.log('err', err);
            showNotification({ type: 'error', message: JSON.stringify(err.detail), title: translate('error') })
        }
    }
}
export function* addQuestionWatcher() {
    yield takeLatest(chatbotAction.ADD_QUESTION_REQUEST, addQuestion);
}

export default function* rootSaga() {
    yield all([
        fork(chatbotSaga),
        fork(getListQuestionWatcher),
        fork(createPollWatcher),
        fork(addQuestionWatcher)
    ]);
}