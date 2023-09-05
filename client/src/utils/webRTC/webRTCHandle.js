import store from '../../store/store';
import { setLocalStreamId, setCallState, callStates, setCallerUsername, setCallingDialogVisible } from '../../store/actions/callActions';
import * as wss from '../webSockConnection/webSockConnection';

const defaultConstrains = {
    video: true,
    audio: true,
};

// An external storage for MediaStreams
export const mediaStreamStorage = {};

export const getLocalStream = () => {
    navigator.mediaDevices.getUserMedia(defaultConstrains)
    .then(stream => {
        // Store the MediaStream in external storage
        const streamId = stream.id;
        mediaStreamStorage[streamId] = stream;
        
        // Store the id in Redux
        store.dispatch(setLocalStreamId(streamId));
        store.dispatch(setCallState(callStates.CALL_AVAILABLE));
    })
    .catch(err => {
        console.log('error when trying to get access to local stream');
        console.log(err);
    });
};

let connectedUserSocketId;

export const callToOtherUser = (calleeDetails) => {
    connectedUserSocketId = calleeDetails.socketId
    store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
    store.dispatch(setCallingDialogVisible(true));
    wss.sendPreOffer({
        callee: calleeDetails,
        caller: {
            username: store.getState().dashboard.username
        }
    });
};

export const handlePreOffer = (data) => {
    connectedUserSocketId = data.callerSocketId
    store.dispatch(setCallerUsername(data.callerUsername));
    store.dispatch(setCallState(callStates.CALL_REQUESTED));
}