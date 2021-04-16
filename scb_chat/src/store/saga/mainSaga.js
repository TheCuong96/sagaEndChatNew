import { put, takeLatest, all, fork } from "redux-saga/effects";
import { mainAction } from '../action';

export function* toggleClick(payload) {
    const toggle = payload.params;
    yield put({ type: mainAction.TOGGLE_SUCCESS, toggle })
}
export function* toggleClickWatcher() {
    yield takeLatest(mainAction.TOGGLE_REQUEST, toggleClick);
}
export default function* rootSaga() {
    yield all([
        fork(toggleClickWatcher),
    ]);
}