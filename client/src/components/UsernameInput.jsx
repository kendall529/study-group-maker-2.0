
import React from 'react';

const UsernameInput = (props) => {
    const { username, setUsername } = props;

    return (
        <div>
            <input 
                type="text" 
                value={username}
                onChange={(event) => { setUsername(event.target.value); }}
            />
        </div>
    );
};

export default UsernameInput;