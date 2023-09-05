import React from 'react';
import { connect } from 'react-redux';
import LocalVideoView from './LocalVideoView';
import RemoteVideoView from './RemoteVideoView';
import { mediaStreamStorage } from '../utils/webRTC/webRTCHandle';
import RejectedCallDialog from './RejectedCallDialog';
import CallingDialog from './CallingDialog';
import IncomingCallDialog from './IncomingCallDialog';
import { callStates, setCallRejected } from '../store/actions/callActions';

const DirectCall = (props) => {
    const { 
        localStreamId, 
        remoteStreamId, 
        callState, 
        callerUsername, 
        callingDialogVisible, 
        callRejected, 
        hideRejectedCallDialog 
    } = props;

    const localStream = mediaStreamStorage[localStreamId];
    const remoteStream = mediaStreamStorage[remoteStreamId];

    return (
        <>
            <LocalVideoView localStream={localStream} />
            {remoteStream && <RemoteVideoView remoteStream={remoteStream} />}
            {callRejected.rejected && <RejectedCallDialog 
                reason={callRejected.reason}
                hideRejectedCallDialog={hideRejectedCallDialog}
            />}
            {callState === callStates.CALL_REQUESTED && <IncomingCallDialog callerUsername={callerUsername} />}
            {callingDialogVisible && <CallingDialog />}
        </>
    )
};

function mapStoreStateToProps ({call}) {
    return {
        ...call,
    }
};

function mapDispatchToProps (dispatch) {
    return {
        hideRejectedCallDialog: (callRejectedDetails) => dispatch(setCallRejected(callRejectedDetails))
    };
};

export default connect(mapStoreStateToProps, mapDispatchToProps)(DirectCall);