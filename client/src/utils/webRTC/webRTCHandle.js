import store from '../../store/store';
import { setLocalStreamId, setCallState, callStates, setCallerUsername, setCallingDialogVisible, setCallRejected, setRemoteStream } from '../../store/actions/callActions';
import * as wss from '../webSockConnection/webSockConnection';

const preOfferAnswers = {
    CALL_ACCEPTED: 'CALL_ACCEPTED',
    CALL_REJECTED: 'CALL_REJECTED',
    CALL_NOT_AVAILABLE: 'CALL_NOT_AVAILABLE',
};

const defaultConstrains = {
    video: true,
    audio: true,
};

const configuration = {
    iceServers: [{
        urls: 'stun:stun.l.google.com:19302'
    }]
}

let connectedUserSocketId;
let peerConnection;

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
    .then(() => createPeerConnection())
    .catch(err => {
        console.log('error when trying to get access to local stream');
        console.log(err);
    });
};

const createPeerConnection = () => {
    peerConnection = new RTCPeerConnection(configuration);

    peerConnection.onicegatheringstatechange = event => {
        console.log(`ICE gathering state: ${peerConnection.iceGatheringState}`);
      };
      
      peerConnection.oniceconnectionstatechange = event => {
        console.log(`ICE connection state: ${peerConnection.iceConnectionState}`);
      };
      
      peerConnection.onsignalingstatechange = event => {
        console.log(`Signaling state: ${peerConnection.signalingState}`);
      };
    
      peerConnection.onerror = (error) => {
        console.error(`RTCPeerConnection error: ${error}`);
      };
      

    const localStream = mediaStreamStorage[store.getState().call.localStreamId];
    console.log('localStream:>>', localStream);

    for(const track of localStream.getTracks()) {
        peerConnection.addTrack(track, localStream);
    };

    peerConnection.ontrack = ({ streams: [stream] }) => {
        // dispatch remote stream in our store
        store.dispatch(setRemoteStream(stream))
    }

    peerConnection.onicecandidate = (event) => {
        console.log('getting candidates from stun server');
        // send to connected user our ice candidates
        if(event.candidate) {
            wss.sendWebRTCCandidate({
                candidate: event.candidate,
                connectedUserSocketId: connectedUserSocketId
            });
            // console.log('connected user socket id:>>', connectedUserSocketId);
        }
    };

    peerConnection.oniceconnectionstatechange = (event) => {
        console.log('oniceconnectstatechange:>>' , peerConnection.iceConnectionState);
        if(peerConnection.iceConnectionState === 'connected') {
            console.log('successfully connected with other user');
        }
    };
};

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
    if(checkIfCallIsPossible()) {
        connectedUserSocketId = data.callerSocketId
        store.dispatch(setCallerUsername(data.callerUsername));
        store.dispatch(setCallState(callStates.CALL_REQUESTED));
    } else {
        wss.sendPreOfferAnswer({
            callerSocketId: data.callerSocketId,
            answer: preOfferAnswers.CALL_NOT_AVAILABLE
        });
    };
};

export const acceptIncomingCallRequest = () => {
    wss.sendPreOfferAnswer({
        callerSocketId: connectedUserSocketId,
        answer: preOfferAnswers.CALL_ACCEPTED
    });

    store.dispatch(setCallState(callStates.CALL_IN_PROGRESS));
};

export const rejectIncomingCallRequest = () => {
    wss.sendPreOfferAnswer({
        callerSocketId: connectedUserSocketId,
        answer: preOfferAnswers.CALL_REJECTED
    });
    resetCallData();
};

export const handlePreOfferAnswer = (data) => {
    store.dispatch(setCallingDialogVisible(false));
    let rejectionReason;

    if(data.answer === preOfferAnswers.CALL_ACCEPTED) {
        //send webRTC offer
        sendOffer();
    } else {

        if(data.answer === preOfferAnswers.CALL_NOT_AVAILABLE) {
            rejectionReason = 'Callee is not available at this time';
        } else {
            rejectionReason = 'Call rejected'
        }
        store.dispatch(setCallRejected({
            rejected: true,
            reason: rejectionReason
        }));

        resetCallData();
    }
};

let canAddIceCandidate = false;

const sendOffer = async () => {
    createPeerConnection(); // Ensure PeerConnection is ready
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    wss.sendWebRTCOffer({
        calleeSocketId: connectedUserSocketId,
        offer: offer
    });
};

export const handleOffer = async (data) => {
    createPeerConnection(); // Ensure PeerConnection is ready
    await peerConnection.setRemoteDescription(data.offer);
    canAddIceCandidate = true;
    const answer = await peerConnection.createAnswer();
    console.log('generated answer', answer);
    await peerConnection.setLocalDescription(answer);
    wss.sendWebRTCAnswer({
        callerSocketId: connectedUserSocketId,
        answer: answer
    });
    console.log('answer sent', answer);
};

export const handleAnswer = async (data) => {
    await peerConnection.setRemoteDescription(data.answer);
    console.log('data.answer:>>', data.answer);
    canAddIceCandidate = true;
    console.log('handleAnswer');
};

let pendingCandidates = [];

export const handleCandidate = async (data) => {
    try {
        if(canAddIceCandidate) {
            console.log('Ready to add ice candidates');
            await peerConnection.addIceCandidate(data.candidate);
            // Add pending candidates if any
            while (pendingCandidates.length) {
                await peerConnection.addIceCandidate(pendingCandidates.shift());
            }
        } else {
            console.log('Not ready to add ice candidates, queuing.');
            pendingCandidates.push(data.candidate);
        }
    } catch (err) {
        console.error('error at ice candidate', err);
    }
};

export const checkIfCallIsPossible = () => {
    if(store.getState().call.localStreamId === null ||
    store.getState().call.callState !== callStates.CALL_AVAILABLE) {
        return false;
    } else {
        return true;
    };
};

export const resetCallData = () => {
    connectedUserSocketId = null;
    store.dispatch(setCallState(callStates.CALL_AVAILABLE));
};