import { put, takeLatest, all, fork } from "redux-saga/effects";
import { staffAction } from '../action';
import { accountService } from "../../services/index";
import { showNotification, translate } from "functions/Utils";

export function* staffProfile(payload) {
    try {
        const response = yield accountService.getStaffProfile();
        if (response.success) {
            yield put({ type: staffAction.STAFF_PROFILE_SUCCESS, response })
        }
        else {
            yield put({ type: staffAction.STAFF_PROFILE_FAILURE, err: response });
        }
    } catch (err) {
        yield put({ type: staffAction.STAFF_PROFILE_FAILURE, err });
    }
}

export function* staffProfileWatcher() {
    yield takeLatest(staffAction.STAFF_PROFILE_REQUEST, staffProfile);
}

export function* updateStaffProfile(payload) {
    const { params } = payload;
    try {
        const response = yield accountService.updateStaffProfile(params);
        if (response.success) {
            showNotification({ type: 'success', message: translate('update_success'), title: translate('success') })
            yield put({ type: staffAction.UPDATE_STAFF_PROFILE_SUCCESS, response })
            yield put({ type: staffAction.STAFF_PROFILE_REQUEST })
        }
        else {
            // yield put({ type: STAFFAction.UPDATE_STAFF_PROFILE_FAILURE, err: response });
            showNotification({ type: 'error', message: JSON.stringify(response.detail), title: translate('error') })
        }
    } catch (err) {
        if (err) {
            yield put({ type: staffAction.UPDATE_STAFF_PROFILE_FAILURE, err });
            console.log('err', err);
            showNotification({ type: 'error', message: JSON.stringify(err.detail), title: translate('error') })
        }
    }
}
export function* updateStaffProfileWatcher() {
    yield takeLatest(staffAction.UPDATE_STAFF_PROFILE_REQUEST, updateStaffProfile);
}

export function* updateAvatar(payload) {
    const avatar = payload.params;
    try {
        console.log('uploadRsp');
        const uploadRsp = yield accountService.uploadImageFile({avatar});
        if (uploadRsp.success) {
            const avatarUrl = {
                    "avatar_url": uploadRsp.detail.avatar_url
            }
            yield put({ type: staffAction.UPDATE_STAFF_PROFILE_REQUEST, params: avatarUrl })
        }
        else {
            // yield put({ type: STAFFAction.UPDATE_STAFF_PROFILE_FAILURE, err: response });
            console.log('uploadRsp', uploadRsp);
            showNotification({ type: 'error', message: JSON.stringify(uploadRsp), title: translate('error') })
        }
    } catch (err) {
        if (err) {
            // yield put({ type: STAFFAction.UPDATE_STAFF_PROFILE_FAILURE, err });
            console.log('err', err.TypeError);
            // showNotification({ type: 'error catching', message: JSON.stringify(err), title: 'Error' })
        }
    }
}
export function* updateAvatarWatcher() {
    yield takeLatest(staffAction.UPDATE_AVARTAR_REQUEST, updateAvatar);
}

export default function* rootSaga() {
    yield all([
        fork(staffProfileWatcher),
        fork(updateStaffProfileWatcher),
        fork(updateAvatarWatcher),
    ]);
}