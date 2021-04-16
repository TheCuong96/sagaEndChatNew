import { staffAction } from '../../action';

const initialState = {
    data: {},
    success: false,
    error: false,
    isFetching: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case staffAction.STAFF_PROFILE_REQUEST:
            return {
                ...state,
                isFetching: true,
            }
        case staffAction.STAFF_PROFILE_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.response.error,
                success: false,
            }
        case staffAction.STAFF_PROFILE_SUCCESS:
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