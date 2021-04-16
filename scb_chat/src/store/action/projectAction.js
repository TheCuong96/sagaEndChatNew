const name = 'GET_PROJECT_LIST';

const actions = {
    GET_PROJECT_LIST_REQUEST: name + '_REQUEST',
    GET_PROJECT_LIST_FAILURE: name + '_FAILURE',
    GET_PROJECT_LIST_SUCCESS: name + '_SUCCESS',

    CREATE_NEW_PROJECT_REQUEST:  'CREATE_NEW_PROJECT_REQUEST',
    CREATE_NEW_PROJECT_FAILURE:  'CREATE_NEW_PROJECT_FAILURE',
    CREATE_NEW_PROJECT_SUCCESS:  'CREATE_NEW_PROJECT_SUCCESS',


    getProjectList: (params) => ({
        type: actions.GET_PROJECT_LIST_REQUEST,
        params: params
    }),
    createNewProject : (data) =>({
        type : actions.CREATE_NEW_PROJECT_REQUEST,
        body : data
    })
};
export default actions;