const actions = {

    TOGGLE_REQUEST: 'LIST_REQUEST',
    TOGGLE_SUCCESS: 'LIST_SUCCESS',

    toggleExam: (params) => ({
        type: actions.TOGGLE_REQUEST,
        params: params
    }),

};
export default actions;