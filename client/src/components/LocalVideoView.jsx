import React , { useRef, useEffect } from 'react';

const styles = {
    videoContainer: {
        width: '170px',
        height: '170px',
        borderRadius: '6px',
        position: 'absolute',
        top: '5%',
        right: '20%',
        backgroundColor: 'var(--secondary-bg-color)'
    },
    videoElement: {
        width: '100%',
        height: '100%',
    }
}

const LocalVideoView = props => {
    const { localStream } = props;
    const localVideoRef = useRef();

    useEffect(() => {
        if(localStream) {
            const localVideo = localVideoRef.current;
            localVideo.srcObject = localStream;

            localVideo.onloadedmetadata = () => {
                localVideo.play();
            };
        }
    }, [localStream]);

    return (
        <div style={styles.videoContainer}>
            <video style={styles.videoElement} ref={localVideoRef} autoPlay muted></video>
        </div>
    );
};

export default LocalVideoView;