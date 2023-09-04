import * as callActions from '../actions/callActions';

const initialState = {
    localStreamId: null,
    callState: callActions.callStates.CALL_UNAVAILABLE
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
            default:
                return state;
    };
};

export default callReducer;