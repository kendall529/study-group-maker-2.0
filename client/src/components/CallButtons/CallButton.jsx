import React from 'react';

const styles = {
    button: {
        width: '50px',
        height: '50px',
        border: '2px solid #587B7F',
        borderRadius: '3rem',
        textDecoration: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '10px',
        boxShadow: 'none',
        outline: 'none',
        backgroundColor: '#d5dfe5'
    }
}

const CallButton = (props) => {
    const { onClickHandler } = props;
    return (
        <button style={styles.button} on={onClickHandler} >
            {props.children}
        </button>
    )
}