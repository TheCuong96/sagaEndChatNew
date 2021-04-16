import { projectAction } from "../action";

const initialState = {
    isFetching: false,
    list: [],
    meta: null,
    success: false,
    error: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case projectAction.GET_PROJECT_LIST_REQUEST:
            console.log("request")
            return {
                ...state,
                isFetching: true,
                list: [],
                success: false,
                error: false,
            }
        case projectAction.GET_PROJECT_LIST_SUCCESS:
            console.log("success")
            return {
                ...state,
                isFetching: false,
                list: action.response,
                meta: action.meta,
                success: true,
                error: false,
            }
        case projectAction.GET_PROJECT_LIST_FAILURE:
            return {
                ...state,
                isFetching: false,
                list: [],
                success: false,
                error: true,
            }
        case projectAction.CREATE_NEW_PROJECT_REQUEST:
            console.log("request")
            return {
                ...state,
                isFetching: true,
                list: [],
                success: false,
                error: false,
            }
        case projectAction.CREATE_NEW_PROJECT_SUCCESS:
            console.log("success")
            return {
                ...state,
                isFetching: false,
                list: action.response,
                meta: action.meta,
                success: true,
                error: false,
            }
        case projectAction.CREATE_NEW_PROJECT_FAILURE:
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