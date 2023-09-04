import React from 'react';
import { connect } from 'react-redux';
import LocalVideoView from './LocalVideoView';
import RemoteVideoView from './RemoteVideoView';
import { mediaStreamStorage } from '../utils/webRTC/webRTCHandle';

const DirectCall = (props) => {
    const { localStreamId, remoteStreamId } = props;
    const localStream = mediaStreamStorage[localStreamId];
    const remoteStream = mediaStreamStorage[remoteStreamId];

    return (
        <>
            <LocalVideoView localStream={localStream} />
            {remoteStream && <RemoteVideoView remoteStream={remoteStream} />}
        </>
    )
};

function mapStoreStateToProps ({call}) {
    return {
        ...call,
    }
};

export default connect(mapStoreStateToProps, null)(DirectCall);