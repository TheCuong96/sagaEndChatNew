const name = 'GET_LIST_MONITORING';
const actions = {

    GET_LIST_MONITORING_REQUEST: name + '_REQUEST',
    GET_LIST_MONITORING_FAILURE: name + '_FAILURE',
    GET_LIST_MONITORING_SUCCESS: name + '_SUCCESS',

    // join leave action
    ACTION_MONITOR_REQUEST: 'ACTION_MONITOR_REQUEST',
    ACTION_MONITOR_FAILURE: 'ACTION_MONITOR_FAILURE',
    ACTION_MONITOR_SUCCESS: 'ACTION_MONITOR_SUCCESS',

    // CLEAR DATA
    ACTION_MONITOR_CLEAR_DATA: 'ACTION_MONITOR_CLEAR_DATA',

    getListMonitoring: (params) => ({
        type: actions.GET_LIST_MONITORING_REQUEST,
        params: params
    }),

    // Join leave room
    actionMonitor: (data) => ({
        type: actions.ACTION_MONITOR_REQUEST,
        body: data
    }),

    // clear data
    clearData: () => ({
        type: actions.ACTION_MONITOR_CLEAR_DATA
    }),
};
export default actions;