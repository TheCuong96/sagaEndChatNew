const name = 'GET_DASHBOARD';
const actions = {
    GET_DASHBOARD_REQUEST: name + '_REQUEST',
    GET_DASHBOARD_FAILURE: name + '_FAILURE',
    GET_DASHBOARD_SUCCESS: name + '_SUCCESS',

    getDashboardInfo: (params) => ({
        type: actions.GET_DASHBOARD_REQUEST,
        params: params
    }),
};
export default actions;