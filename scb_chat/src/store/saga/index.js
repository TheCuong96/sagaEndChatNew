// export default allSaga;
import { all } from "redux-saga/effects";
import accountSaga from "./accountSaga";
import chatSaga from "./chatSaga";
import chatProfileSaga from "./chatProfileSaga";
import mainSaga from "./mainSaga";
import monitoringSaga from "./monitoringSaga";
import historyMonitorSaga from "./historyMonitorSaga";
import staffSaga from "./staffSaga";
import dashboardSaga from "store/saga/dashboardSaga";
import chatbotSaga from "store/saga/chatbotSaga";
import projectSaga from "store/saga/projectSaga";
import chattingSaga from "store/saga/chattingSaga";

function* allSaga() {
  yield all([
    chattingSaga(),
    accountSaga(),
    chatSaga(),
    chatProfileSaga(),
    mainSaga(),
    monitoringSaga(),
    historyMonitorSaga(),
    staffSaga(),
    dashboardSaga(),
    chatbotSaga(),
    projectSaga()
  ]);
}

export default allSaga;