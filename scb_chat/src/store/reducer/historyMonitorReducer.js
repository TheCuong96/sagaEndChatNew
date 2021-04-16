import { historyMonitorAction } from "../action";

const initialState = {
    isFetching: false,
    list: [],
    meta: null,
    success: false,
    error: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case historyMonitorAction.GET_LIST_HISTORY_MONITOR_REQUEST:
            return {
                ...state,
                isFetching: true,
                list: [],
                success: false,
                error: false,
            }
        case historyMonitorAction.GET_LIST_HISTORY_MONITOR_SUCCESS:
            return {
                ...state,
                isFetching: false,
                list: action.response,
                meta: action.meta,
                success: true,
                error: false,
            }
        case historyMonitorAction.GET_LIST_HISTORY_MONITOR_FAILURE:
            return {
                ...state,
                isFetching: false,
                list: [],
                success: false,
                error: true,
            }
        default:
            return state;
    }
}