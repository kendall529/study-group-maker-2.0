import socketClient from 'socket.io-client';
import store from '../../store/store';
import * as dashboardActions from "../../store/actions/dashboardActions";

const SERVER = 'http://localhost:3001';

const broadcastEventTypes = {
    ACTIVE_USERS: 'ACTIVE_USERS',
    GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS'
  }

let socket;

export const connectWithWebSocket = () => {
    socket = socketClient(SERVER);

    socket.on('connection', () => {
        console.log('Successfully connected with websocket server');
        console.log(socket.id);
    });

    socket.on('broadcast', (data) => {
        handleBroadcastEvents(data);
    })
}

export const registerNewUser = (user_name) => {
    if(socket && socket.connected) {
        socket.emit('register-new-user', {
            username: user_name,
            socketId: socket.id
        });
        console.log(`Emitting register-new-user for username: ${user_name}`);
    } else {
        console.log('Socket not connected. Cannot register new user.');
    }
};

export const requestActiveUsers = () => {
    setTimeout(() => {
        if (socket && socket.connected) {
            socket.emit('request-active-users');
            console.log('Emitting request for active users.');
        } else {
            console.log('Socket not connected. Cannot request active users.');
        }
    }, 1000); // Delay of 1 second so socket connection happens first
};


const handleBroadcastEvents = (data) => {
    switch (data.event) {
        case broadcastEventTypes.ACTIVE_USERS:
            const activeUsers = data.activeUsers.filter(activeUser => activeUser.socket.Id !== socket.id);
            store.dispatch(dashboardActions.setActiveUsers(activeUsers));
            break;
        default:
            break;
    };
};