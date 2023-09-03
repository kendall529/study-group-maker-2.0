import React from 'react';

const ActiveUsersListItem = (props) => {
    const { activeUser } = props;
    
    const handleListItemPressed = () => {
        // call to other user
    };

    return (
        <div className='active-user-list-item' onClick={handleListItemPressed}>
            <div className='active-user-list-image-container'>
                <img className='active-user-list-image' src="userAvatar" alt="" />
            </div>
            <span className='active-user-list-text'>{activeUser.user_name}</span>
        </div>
    )
};

export default ActiveUsersListItem;