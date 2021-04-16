import { monitoringAction } from "../action";

const initialState = {
    isFetching: false,
    list: [],
    meta: null,
    success: false,
    error: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case monitoringAction.GET_LIST_MONITORING_REQUEST:
            return {
                ...state,
                isFetching: true,
                list: [],
                success: false,
                error: false,
            }
        case monitoringAction.GET_LIST_MONITORING_SUCCESS:
            return {
                ...state,
                isFetching: false,
                list: action.response,
                meta: action.meta,
                success: true,
                error: false,
            }
        case monitoringAction.GET_LIST_MONITORING_FAILURE:
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