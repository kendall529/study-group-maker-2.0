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
        handleBroadcastEvents(data)
    })
}

export const registerNewUser = (user_name) => {
    if (socket && socket.connected) {
        socket.emit('register-new-user', {
            username: user_name,
            socketId: socket.id
        });
        console.log(`Emitting register-new-user for username: ${user_name}`);
    } else {
        console.log('Socket not connected. Cannot register new user.');
    }
};

const handleBroadcastEvents = (data) => {
    switch (data.event) {
        case broadcastEventTypes.ACTIVE_USERS:
            store.dispatch(dashboardActions.setActiveUsers(data.ACTIVE_USERS));
            break;
        default:
            break;
    };
};