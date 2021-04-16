import { chatAction } from "../action";
// import actions from "../action/chat";
const initialState = {
    newMessage: null,
    typingMessage: null,
    sendingFileMessage: null,
    readMessage: null,
    draftMessage: null,
    // editRoom: null,
    outRoom: null,
    newRoom: null,
    errorMessage: null,
    //Send event
    eventRabbit: [],
    eventReconnect: false,
    isConnected: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case chatAction.NEW_MESSAGE:
            return { ...state, newMessage: action.response };
        case chatAction.EDIT_MEMBER:
            return { ...state, editMember: action.response };
        case chatAction.OUT_ROOM:
            return { ...state, outRoom: action.response };
        case chatAction.NEW_ROOM:
            return { ...state, newRoom: action.response };
        case chatAction.SENDING_FILE_MESSAGE:
            return { ...state, sendingFileMessage: action.response };
        case chatAction.TYPING_MESSAGE:
            return { ...state, typingMessage: action.response };
        case chatAction.READ_MESSAGE:
            return { ...state, readMessage: action.response };
        case chatAction.DRAFT_MESSAGE:
            return { ...state, draftMessage: action.response };
        case chatAction.ERROR_MESSAGE:
            return { ...state, errorMessage: action.response };
        case chatAction.SEND_RECONNECT:
            return { ...state, eventReconnect: action.params }
        case chatAction.SEND_EVENT:
            let events = [].concat(state.eventRabbit);
            events.push(action.params);
            return { ...state, eventRabbit: events };
        case chatAction.CLEAR_SEND_DATA:
            let data = [].concat(state.eventRabbit).filter((item) => item != action.params)
            return { ...state, eventRabbit: data };
        case chatAction.CHAT_CONNENCTED:
            return { ...state, isConnected: action.params.isConnected }
        case chatAction.CLEAR_DATA:
            return {
                ...state,
                sendMessage: null,
                newMessage: null,
                seenMessage: null,
                typingMessage: null,
                readMessage: null,
                draftMessage: null,
                editMember: null,
                outMember: null,
                newRoom: null,
            };
        default:
            return state;
    }
}