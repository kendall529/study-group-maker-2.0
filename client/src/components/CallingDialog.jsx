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
    }
}

const CallingDialog = () => {
    return (
        <div style={styles.directCallingDialog}>
            <span>Calling</span>
        </div>
    );
};

export default CallingDialog;