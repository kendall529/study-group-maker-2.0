import store from '../../store/store';
import { setLocalStreamId, setCallState, callStates } from '../../store/actions/callActions';

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

