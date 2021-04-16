import { call, put, takeLatest } from "redux-saga/effects";
import { historyMonitorService } from "services";
import { historyMonitorAction } from 'store/action';
import { showNotification } from "functions/Utils";
import { NOTIFICATION_TYPE } from "contant";

export function* getListHistoryMonitor(params) {
    console.log({params})
    try {
        const response = yield historyMonitorService.getListHistoryMonitor(params);
        const { detail, total_page, total_record, page } = response;

        const metaData = {
            total_page,
            total_record,
            page,
        }
        if (response.success) {
            yield put({ type: historyMonitorAction.GET_LIST_HISTORY_MONITOR_SUCCESS, response: detail, meta: metaData });
        }
        else {
            yield put({ type: historyMonitorAction.GET_LIST_HISTORY_MONITOR_FAILURE, err: response });
            showNotification({ type: NOTIFICATION_TYPE.error, message: response.error_message, title: 'Error' });
        }
    } catch (err) {
        yield put({ type: historyMonitorAction.GET_LIST_HISTORY_MONITOR_FAILURE, err: null });
    }
}

export default function* historyMonitorSaga() {
    yield takeLatest(historyMonitorAction.GET_LIST_HISTORY_MONITOR_REQUEST, getListHistoryMonitor);
}