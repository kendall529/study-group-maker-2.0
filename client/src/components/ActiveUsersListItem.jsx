import React from 'react';
import '../styling/ActiveUsersList.css';
import contactImg from '../assets/images/user_1946845.png'
import { callToOtherUser } from '../utils/webRTC/webRTCHandle';


const ActiveUsersListItem = (props) => {
    const { activeUser } = props;
    
    const handleListItemPressed = () => {
        // call to other user
        callToOtherUser(activeUser);
    };

    return (
        <div className='active-user-list-item' onClick={handleListItemPressed}>
            <div className='active-user-list-image-container'>
                <img className='active-user-list-image' src={contactImg} alt="Designed by Freepik www.freepik.com" />
            </div>
            <span className='active-user-list-text'>{activeUser.username}</span>
        </div>
    )
};

export default ActiveUsersListItem;