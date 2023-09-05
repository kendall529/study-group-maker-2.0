import React from 'react';

const styles = {
    rejectedCallDialog: {
        position: 'absolute',
        width: '400px',
        height: '300px',
        top: 'calc(50% - 150px)',
        left: 'calc(50% - 200px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '9px',
        backgroundColor: 'var(--secondary-bg-color)'
    }
}

const RejectedCallDialog = () => {
    return (
        <div style={styles.rejectedCallDialog}>
            <span>Call rejected</span>
        </div>
    )
}

export default RejectedCallDialog;