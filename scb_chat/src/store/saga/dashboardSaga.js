import { call, put, takeLatest } from "redux-saga/effects";
import { dashboardService } from "services";
import { dashboardAction } from 'store/action';
import { showNotification } from "functions/Utils";
import { NOTIFICATION_TYPE } from "contant";

export function* getDashboardInfo(params) {

    try {
        const response = yield dashboardService.getDashboardInfo(params);
        const { detail } = response;

        if (response.success) {
            yield put({ type: dashboardAction.GET_DASHBOARD_SUCCESS, response: detail });
        }
        else {
            yield put({ type: dashboardAction.GET_DASHBOARD_FAILURE, err: response });
            showNotification({ type: NOTIFICATION_TYPE.error, message: response.error_message, title: 'Error' });
        }
    } catch (err) {
        yield put({ type: dashboardAction.GET_DASHBOARD_FAILURE, err: null });
    }
}

export default function* dashboardSaga() {
    yield takeLatest(dashboardAction.GET_DASHBOARD_REQUEST, getDashboardInfo);
}