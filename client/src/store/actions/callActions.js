import { mediaStreamStorage } from "../../utils/webRTC/webRTCHandle";

export const callStates = {
    CALL_UNAVAILABLE: 'CALL_UNAVAILABLE',
    CALL_AVAILABLE: 'CALL_AVAILABLE',
    CALL_REQUESTED: 'CALL_REQUESTED',
    CALL_IN_PROGRESS: 'CALL_IN_PROGRESS'
};

export const CALL_SET_LOCAL_STREAM_ID = 'CALL.SET_LOCAL_STREAM_ID';
export const CALL_SET_CALL_STATE = 'CALL.SET_CALL_STATE';
export const CALL_SET_CALLING_DIALOG_VISIBLE = 'CALL.SET_CALLING_DIALOG_VISIBLE';
export const CALL_SET_CALLER_USERNAME = 'CALL.SET_CALLER_USERNAME';
export const CALL_SET_CALL_REJECTED = 'CALL.SET_CALL_REJECTED';
export const CALL_SET_REMOTE_STREAM = 'CALL.SET_REMOTE_STREAM';

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

export const setCallingDialogVisible = (visible) => {
    return {
        type: CALL_SET_CALLING_DIALOG_VISIBLE,
        visible
    };
};

export const setCallerUsername = (callerUsername) => {
    return {
        type: CALL_SET_CALLER_USERNAME,
        callerUsername
    };
};

export const setCallRejected = (callRejectedDetails) => {
    return {
        type: CALL_SET_CALL_REJECTED,
        callRejected: {
            rejected: callRejectedDetails.rejected,
            reason: callRejectedDetails.reason
        }
    };
};

export const setRemoteStream = (remoteStream) => {
    // storing MediaStream object in external storage
    const remoteStreamId = remoteStream.id;
    mediaStreamStorage[remoteStreamId] = remoteStream;

    return {
        type:  CALL_SET_REMOTE_STREAM,
        remoteStreamId
    };
};
