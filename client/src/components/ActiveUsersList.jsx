import React from 'react';
import ActiveUsersListItem from './ActiveUsersListItem';
import { connect } from 'react-redux';

// const activeUsers = [
//     {
//         socketId: 331,
//         username: 'Kendall529'
//     },
//     {
//         socketId: 341,
//         username: 'John316'
//     },
//     {
//         socketId: 361,
//         username: 'Tim223'
//     },
//     {
//         socketId: 431,
//         username: 'Tara973'
//     },
//     {
//         socketId: 621,
//         username: 'Vince720'
//     },
// ];

const ActiveUsersList = ({ activeUsers }) => {
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