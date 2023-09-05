import React, { useState } from 'react';

const styles = {
    directCallingDialog: {
        position: 'absolute',
        width: '400px',
        height: '300px',
        top: 'calc(50% - 150px)',
        left: 'calc(50% - 200px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        backgroundColor: 'var(--secondary-bg-color)'
    },
    directCallingDialogCallerName: {
        fontSize: '30px',
        marginBottom: '50px',
    },
    directCallingDialogBtnContainer: {
        marginTop: '20px',
        width: '400px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: '8px',
        // backgroundColor: 'var(--secondary-bg-color)'
    },
    directCallingDialogAcceptBtn: {
        fontSize: '16px',
        width: '120px',
        border: '1px solid #dddddd',
        outline: 'none',
        padding: '10px 10px',
        transition: '0.3s',
        borderRadius: '50px',
    },
    directCallingDialogRejectBtn: {
        fontSize: '16px',
        width: '120px',
        border: '1px solid #dddddd',
        outline: 'none',
        padding: '10px 10px',
        transition: '0.3s',
        borderRadius: '50px',
    },

}


const IncomingCallDialog = () => {
    // Initialize hover state as an object
    const [hover, setHover] = useState({ accept: false, reject: false });

    const handleMouseEnter = (buttonType) => {
        setHover({ ...hover, [buttonType]: true });
    };

    const handleMouseLeave = (buttonType) => {
        setHover({ ...hover, [buttonType]: false });
    };

    const handleRejectBtnPress = () => {
        // reject call
    }

    const handleAcceptBtnPress = () => {
        // accept call
    }

    // Computed styles based on hover state for each button
    const acceptBtnStyle = {
        ...styles.directCallingDialogAcceptBtn,
        color: hover.accept ? '#dddddd' : 'rgb(119, 113, 113)',
        backgroundColor: hover.accept ? '#2e333f' : '#1a264c',
        opacity: hover.accept ? '0.5' : '1',
    };

    const rejectBtnStyle = {
        ...styles.directCallingDialogRejectBtn,
        color: hover.reject ? '#dddddd' : 'rgb(119, 113, 113)',
        backgroundColor: hover.reject ? '#2e333f' : '#1a264c',
        opacity: hover.reject ? '0.5' : '1',
    };

    return (
        <div style={styles.directCallingDialog}>
            <span style={styles.directCallingDialogCallerName}>Calling</span>
            <div style={styles.directCallingDialogBtnContainer}>
                <button 
                    style={acceptBtnStyle}
                    onMouseEnter={() => handleMouseEnter('accept')}
                    onMouseLeave={() => handleMouseLeave('accept')}
                    onClick={handleAcceptBtnPress}>
                    Accept
                </button>
                <button 
                    style={rejectBtnStyle}
                    onMouseEnter={() => handleMouseEnter('reject')}
                    onMouseLeave={() => handleMouseLeave('reject')}
                    onClick={handleRejectBtnPress}>
                    Reject
                </button>
            </div>
        </div>
    );
};

export default IncomingCallDialog;