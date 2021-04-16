const name = 'STAFF_';
const actions = {

    STAFF_PROFILE_REQUEST: 'STAFF_PROFILE_REQUEST',
    STAFF_PROFILE_FAILURE: 'STAFF_PROFILE_FAILURE',
    STAFF_PROFILE_SUCCESS: 'STAFF_PROFILE_SUCCESS',

    UPDATE_STAFF_PROFILE_REQUEST: 'UPDATE_STAFF_PROFILE_REQUEST',
    UPDATE_STAFF_PROFILE_FAILURE: 'UPDATE_STAFF_PROFILE_FAILURE',
    UPDATE_STAFF_PROFILE_SUCCESS: 'UPDATE_STAFF_PROFILE_SUCCESS',

    UPDATE_AVARTAR_REQUEST: 'UPDATE_AVARTAR_REQUEST',
    UPDATE_AVARTAR_FAILURE: 'UPDATE_AVARTAR_FAILURE',
    UPDATE_AVARTAR_SUCCESS: 'UPDATE_AVARTAR_SUCCESS',

    STAFF_PROFILE_CLEAR: 'STAFF_PROFILE_CLEAR',

    loadStaffProfile: (params) => ({
        type: actions.STAFF_PROFILE_REQUEST,
        params: params
    }),

    updateStaffProfile: (params) => ({
        type: actions.UPDATE_STAFF_PROFILE_REQUEST,
        params: params
    }),

    updateAvatar: (params) => ({
        type: actions.UPDATE_AVARTAR_REQUEST,
        params: params
    }),

    requestClearAction: (params) => ({
        type: actions.STAFF_PROFILE_CLEAR,
    })
}

export default actions;