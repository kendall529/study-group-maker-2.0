import React from 'react';

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
    },
    directCallingDialogBtnContainer: {
        marginTop: '20px',
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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
        color: '#dddddd',
        borderRadius: '50px',
        backgroundColor: '#2e333f'
    },
    directCallingDialogAcceptBtn: {
        fontSize: '16px',
        width: '120px',
        border: '1px solid #dddddd',
    }

}

const IncomingCallDialog = () => {
    return (
        <div style={styles.directCallingDialog}>
            <span>Calling</span>
        </div>
    );
};

export default IncomingCallDialog;