import { mainAction } from "../action";

const initialState = {
    toggle: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case mainAction.TOGGLE_REQUEST:
            return {
                ...state,
                toggle: false,
            }
        case mainAction.TOGGLE_SUCCESS:
            return {
                ...state,
                toggle: !action.toggle,
            }
        default:
            return state;
    }
}