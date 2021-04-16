import { call, put, takeLatest } from "redux-saga/effects";
import { projectService } from "services";
import { projectAction } from 'store/action';
import { showNotification } from "functions/Utils";
import { NOTIFICATION_TYPE } from "contant";

export function* getProjectList(params) {
    try {

        const response = yield projectService.getProjectList(params);
        const { detail, total_page, total_record, page } = response;
        const metaData = {
            total_page,
            total_record,
            page,
        }
        if (response.success) {
            yield put({ type: projectAction.GET_PROJECT_LIST_SUCCESS, response: detail, meta: metaData });
        }
        else {
            yield put({ type: projectAction.GET_PROJECT_LIST_FAILURE, err: response });
            showNotification({ type: NOTIFICATION_TYPE.error, message: response.error_message, title: 'Error' });
        }
    } catch (err) {
        yield put({ type: projectAction.GET_PROJECT_LIST_FAILURE, err: null });
    }
}
export function* createNewProject(params) {
    try {
        console.log({params})
        const response = yield projectService.createNewProject(params.body.values);

        const { detail } = response;
        console.log({response})
        console.log({params})
        if (response.success) {
            yield put({ type: projectAction.CREATE_NEW_PROJECT_SUCCESS, response: detail });
            showNotification({ type: NOTIFICATION_TYPE.success, message: response.success, title: 'Success' });
        }
        else {
            yield put({ type: projectAction.CREATE_NEW_PROJECT_FAILURE ,err: response });
            showNotification({ type: NOTIFICATION_TYPE.error, message: response.error_message, title: 'Error' });
        }
    } catch (err) {
        yield put({ type: projectAction.CREATE_NEW_PROJECT_FAILURE, err: null });
    }
}

export default function* projectSaga() {
    yield takeLatest(projectAction.GET_PROJECT_LIST_REQUEST, getProjectList);
    yield takeLatest(projectAction.CREATE_NEW_PROJECT_REQUEST, createNewProject);
}