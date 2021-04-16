import accountReducer from "./accountReducer";
import chatReducer from "./chatReducer";
import chatProfileReducer from "./chatProfileReducer";
import mainReducer from './mainReducer';
import { combineReducers } from 'redux';
import monitoringReducer from './monitoringReducer';
import historyMonitorReducer from "store/reducer/historyMonitorReducer";
import staffReducer from './staffReducer';
import dashboardReducer from "store/reducer/dashboardReducer";
import chatbotReducer from "store/reducer/chatbotReducer";
import projectReducer from "store/reducer/projectReducer";
import actionMonitorReducer from "store/reducer/actionMonitorReducer";
import chattingReducer from "store/reducer/chattingReducer";

const allReducers = combineReducers({
    chattingReducer,
    accountReducer,
    chatReducer,
    chatProfileReducer,
    mainReducer,
    monitoringReducer,
    historyMonitorReducer,
    staffReducer,
    dashboardReducer,
    chatbotReducer,
    projectReducer,
    actionMonitorReducer
});

export default allReducers;