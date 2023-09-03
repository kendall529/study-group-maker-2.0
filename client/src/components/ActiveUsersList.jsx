import React, { useEffect } from 'react';
import ActiveUsersListItem from './ActiveUsersListItem';
import { connect } from 'react-redux';
import { requestActiveUsers } from '../utils/webSockConnection/webSockConnection';

const ActiveUsersList = ({ activeUsers, socket }) => {

    useEffect(() => {
        requestActiveUsers();
    }, []);

    if(!Array.isArray(activeUsers)) {
        return <div>No active users</div>
    }

    return (
        <div className='active-user-list-container'>
            {activeUsers.map((activeUser) => 
                <ActiveUsersListItem 
                    key={activeUser.socketId} 
                    activeUser={activeUser} 
                />)}
        </div>
    );
};

const mapStateToProps = ({ dashboard }) => ({

    ...dashboard
});

export default connect(mapStateToProps)(ActiveUsersList);