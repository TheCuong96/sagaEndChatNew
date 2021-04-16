import {monitoringAction} from "../action";

const initialState = {
    isFetching: false,
    detail: [],
    meta: null,
    success: false,
    error: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case monitoringAction.ACTION_MONITOR_REQUEST:
            return {
                ...state,
                isFetching: true,
                detail: [],
                success: false,
                error: false,
            }
        case monitoringAction.ACTION_MONITOR_SUCCESS:
            return {
                ...state,
                isFetching: false,
                detail: action.response,
                meta: action.meta,
                success: true,
                error: false,
            }
        case monitoringAction.ACTION_MONITOR_FAILURE:
            return {
                ...state,
                isFetching: false,
                detail: [],
                success: false,
                error: true,
            }
        case monitoringAction.ACTION_MONITOR_CLEAR_DATA:
            return {
                ...state,
                detail: [],
                success: false,
            };
        default:
            return state;
    }
}