const name = 'LOGIN_';
const actions = {

    LOGIN_REQUEST: name + '_REQUEST',
    LOGIN_FAILURE: name + '_FAILURE',
    LOGIN_SUCCESS: name + '_SUCCESS',

    loadLogin: (params) => ({
        // https://git.minerva.vn/camera/document-manager-system/-/wikis/Login
        type: actions.LOGIN_REQUEST,
        params: params
    }),
};
export default actions;