const poll = 'GET_LIST_POLL';
const question = 'GET_LIST_QUESTION';
const actions = {

    GET_LIST_POLL_REQUEST: poll + '_REQUEST',
    GET_LIST_POLL_FAILURE: poll + '_FAILURE',
    GET_LIST_POLL_SUCCESS: poll + '_SUCCESS',

    GET_LIST_QUESTION_REQUEST: question + '_REQUEST',
    GET_LIST_QUESTION_FAILURE: question + '_FAILURE',
    GET_LIST_QUESTION_SUCCESS: question + '_SUCCESS',

    CREATE_POLL_REQUEST: 'CREATE_POLL_REQUEST',
    CREATE_POLL_FAILURE: 'CREATE_POLL_FAILURE',
    CREATE_POLL_SUCCESS: 'CREATE_POLL_SUCCESS',

    ADD_QUESTION_REQUEST: 'ADD_QUESTION_REQUEST',
    ADD_QUESTION_FAILURE: 'ADD_QUESTION_FAILURE',
    ADD_QUESTION_SUCCESS: 'ADD_QUESTION_SUCCESS',

    getListPoll: (params) => ({
        type: actions.GET_LIST_POLL_REQUEST,
        params: params
    }),

    getListQuestion: (params) => ({
        type: actions.GET_LIST_QUESTION_REQUEST,
        params: params
    }),

    createPoll: (data) => ({
        type: actions.CREATE_POLL_REQUEST,
        data: data
    }),

    addQuestion: (data) => ({
        type: actions.ADD_QUESTION_REQUEST,
        data: data
    }),

};
export default actions;