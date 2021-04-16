import { put, takeLatest, all, fork } from "redux-saga/effects";
import { chatAction } from "../action/index";

export function* handleRabbitResponse(payload) {
  let { key_message, body } = payload.params;
  yield put({
    type: key_message,
    response: body,
  });
}

export function* handleRabbitResponseWatcher() {
  yield takeLatest(chatAction.RABBIT_RESPONSE, handleRabbitResponse);
}

export default function* rootSaga() {
  yield all([fork(handleRabbitResponseWatcher)]);
}
