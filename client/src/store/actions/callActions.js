export const callStates = {
    CALL_UNAVAILABLE: 'CALL_UNAVAILABLE',
    CALL_AVAILABLE: 'CALL_AVAILABLE',
    CALL_REQUESTED: 'CALL_REQUESTED',
    CALL_IN_PROGRESS: 'CALL_IN_PROGRESS'
}

export const CALL_SET_LOCAL_STREAM_ID = 'CALL.SET_LOCAL_STREAM_ID';
export const CALL_SET_CALL_STATE = 'CALL.SET_CALL_STATE';

export const setLocalStreamId = (streamId) => {
    return {
        type: CALL_SET_LOCAL_STREAM_ID,
        streamId
    };
};

export const setCallState = (callState) => {
    return {
        type: CALL_SET_CALL_STATE,
        callState
    };
};