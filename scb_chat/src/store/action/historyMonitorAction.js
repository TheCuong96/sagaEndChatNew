const name = 'GET_LIST_HISTORY_MONITOR';
const actions = {

    GET_LIST_HISTORY_MONITOR_REQUEST: name + '_REQUEST',
    GET_LIST_HISTORY_MONITOR_FAILURE: name + '_FAILURE',
    GET_LIST_HISTORY_MONITOR_SUCCESS: name + '_SUCCESS',

    getListHistoryMonitor: (params) => ({
        type: actions.GET_LIST_HISTORY_MONITOR_REQUEST,
        params: params
    }),
};
export default actions;