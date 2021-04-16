import { dashboardAction } from "../action";

const initialState = {
    isFetching: false,
    list: [],
    meta: null,
    success: false,
    error: false,
};

export default (state = initialState, action) => {
    switch (action.type) {

        case dashboardAction.GET_DASHBOARD_REQUEST:
            return {
                ...state,
                isFetching: true,
                list: [],
                success: false,
                error: false,
            }
        case dashboardAction.GET_DASHBOARD_SUCCESS:
            console.log("success")
            return {
                ...state,
                isFetching: false,
                list: action.response,
                meta: action.meta,
                success: true,
                error: false,
            }
        case dashboardAction.GET_DASHBOARD_FAILURE:
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