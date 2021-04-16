import {put, call, takeLatest, all, fork} from "redux-saga/effects";
import {monitoringService} from "services";
import {monitoringAction} from 'store/action';
import {showNotification} from "functions/Utils";
import {NOTIFICATION_TYPE} from "contant";
import {actionMonitorService} from "services/request/monitoringService";


export function* getListMonitoring(params) {
    try {
        const response = yield monitoringService.getListMonitoring(params);
        const {detail, total_page, total_record, page} = response;
        const metaData = {
            total_page,
            total_record,
            page,
        }
        if (response.success) {
            yield put({ type: monitoringAction.GET_LIST_MONITORING_SUCCESS, response: detail, meta: metaData });
        }
        else {
            yield put({ type: monitoringAction.GET_LIST_MONITORING_FAILURE, err: response });
            showNotification({ type: NOTIFICATION_TYPE.error, message: response.error_message, title: 'Error' });
        }
    } catch (err) {
        yield put({type: monitoringAction.GET_LIST_MONITORING_FAILURE, err: null});
    }
}
export function* monitoringSaga() {
    yield takeLatest(monitoringAction.GET_LIST_MONITORING_REQUEST, getListMonitoring);
}

export function* actionMonitor(payload) {
    try {

        const response = yield actionMonitorService.actionMonitor(payload.body);
        const { detail } = response
        if (response.success === true) {
            yield put({type: monitoringAction.ACTION_MONITOR_SUCCESS, response: detail});
        } else {
            yield put({type: monitoringAction.ACTION_MONITOR_FAILURE, err: response});
            showNotification({type: NOTIFICATION_TYPE.error, message: response.error_message, title: 'Error'});
        }
    } catch (err) {
        yield put({type: monitoringAction.ACTION_MONITOR_FAILURE, err: null});
    }
}
export function* actionMonitorWatcher() {
    yield takeLatest(monitoringAction.ACTION_MONITOR_REQUEST, actionMonitor);
}

export default function* rootSaga() {
    yield all([
        fork(monitoringSaga),
        fork(actionMonitorWatcher),

    ]);
}