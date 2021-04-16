import {chatbotAction} from "store/action";

const initialState = {
    isFetching: false,
    list: [],
    meta: null,
    success: false,
    error: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case chatbotAction.GET_LIST_POLL_REQUEST:
            return {
                ...state,
                isFetching: true,
                list: [],
                success: false,
                error: false,
            }
        case chatbotAction.GET_LIST_POLL_SUCCESS:
            return {
                ...state,
                isFetching: false,
                list: action.response,
                meta: action.meta,
                success: true,
                error: false,
            }
        case chatbotAction.GET_LIST_POLL_FAILURE:
            return {
                ...state,
                isFetching: false,
                list: [],
                success: false,
                error: true,
            }

        case chatbotAction.GET_LIST_QUESTION_REQUEST:
            return {
                ...state,
                isFetching: true,
                list: [],
                success: false,
                error: false,
            }
        case chatbotAction.GET_LIST_QUESTION_SUCCESS:
            return {
                ...state,
                isFetching: false,
                list: action.response,
                meta: action.meta,
                success: true,
                error: false,
            }
        case chatbotAction.GET_LIST_QUESTION_FAILURE:
            return {
                ...state,
                isFetching: false,
                list: [],
                success: false,
                error: true,
            }

        case chatbotAction.CREATE_POLL_REQUEST:
            return {
                ...state,
                isFetching: true,
            }
        case chatbotAction.CREATE_POLL_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.response.error_message,
                success: false,
            }
        case chatbotAction.CREATE_POLL_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.response.detail,
                success: true,
            }

        case chatbotAction.ADD_QUESTION_REQUEST:
            return {
                ...state,
                isFetching: true,
            }
        case chatbotAction.ADD_QUESTION_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.response.error_message,
                success: false,
            }
        case chatbotAction.ADD_QUESTION_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.response.detail,
                success: true,
            }

        default:
            return state;
    }
}