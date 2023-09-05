import * as callActions from '../actions/callActions';

const initialState = {
    localStreamId: null,
    callState: callActions.callStates.CALL_UNAVAILABLE,
    callingDialogVisible: false,
    callerUsername: '',
    callRejected: {
        rejected: false,
        reason: ''
    },
    remoteStreamId: null,
};

const callReducer = (state = initialState, action) => {
    switch (action.type) {
        case callActions.CALL_SET_LOCAL_STREAM_ID:
            return {
                ...state,
                localStreamId: action.streamId
            };
        case callActions.CALL_SET_CALL_STATE:
            return {
                ...state,
                callState: action.callState
            };
        case callActions.CALL_SET_CALLING_DIALOG_VISIBLE:
            return {
                ...state,
                callingDialogVisible: action.visible
            };
        case callActions.CALL_SET_CALLER_USERNAME:
            return {
                ...state,
                callerUsername: action.callerUsername
            };
        case callActions.CALL_SET_CALL_REJECTED:
            return{
                ...state,
                callRejected: action.callRejected
            };
        case callActions.CALL_SET_REMOTE_STREAM:
            return {
                ...state,
                remoteStreamId: action.remoteStreamId
            };
            default:
                return state;
    };
};

export default callReducer;