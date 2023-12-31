import React , { useRef, useEffect } from 'react';

import '../styling/RemoteVideoView.css';

const styles = {
    videoContainer: {
        width: '100%',
        height: '100%',
    },
    videoElement: {
        width: '100%',
        height: '100%',
    }
}

const RemoteVideoView = props => {
    const { remoteStream } = props;
    const remoteVideoRef = useRef();

    useEffect(() => {
        if(remoteStream) {
            const remoteVideo = remoteVideoRef.current;
            remoteVideo.srcObject = remoteStream;

            remoteVideo.onloadedmetadata = () => {
                remoteVideo.play();
            };
        }
    }, [remoteStream]);

    return (
        <div style={styles.videoContainer}>
            <video style={styles.videoElement} ref={remoteVideoRef} autoPlay></video>
        </div>
    );
};

export default RemoteVideoView;