import { accountAction } from '../action';

const initialState = {
    login: null,
    isFetching: false,
    error: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        //login
        case accountAction.LOGIN_REQUEST:
            return { ...state, isFetching: true, login: null, success: false, error: false };
        case accountAction.LOGIN_SUCCESS:
            return { ...state, isFetching: false, success: true, login: action.response, error: false };
        case accountAction.LOGIN_FAILURE:
            return { ...state, isFetching: false, error: action.err, login: null };
        default:
            return state;
    }
}