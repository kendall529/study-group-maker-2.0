import socketClient from 'socket.io-client';
import store from '../../store/store';
import * as dashboardActions from "../../store/actions/dashboardActions";
import AuthService from '../auth';  // Import AuthService to access JWT tokens

const SERVER = 'http://localhost:3001';

const broadcastEventTypes = {
    ACTIVE_USERS: 'ACTIVE_USERS',
    GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS'
  }

let socket;

export const connectWithWebSocket = () => {
    const idToken = AuthService.getToken();  // Get JWT token
    const existingToken = localStorage.getItem('id_token');

    // Check if the token has changed or if the socket is not already connected
    if (!socket || idToken !== existingToken) {
        socket = socketClient(SERVER);

        socket.on('connection', () => {
            console.log('Successfully connected with the websocket server');
            localStorage.setItem('id_token', idToken);  // Store the token
            socket.emit('register-new-user', { token: idToken });  // Use the token to register the new user
        });

        // // Add this to listen for username updates
        // socket.on('update-username', (data) => {
        //     console.log('Updated username:', data.username);
        // });

        socket.on('broadcast', (data) => {
            handleBroadcastEvents(data);
        });

    }

    return socket;
};

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



// export const refreshSocketId = () => {
//     const jwtToken = AuthService.getToken();

//     setTimeout(() => {
//         if(socket && socket.connected && jwtToken) {
//             socket.emit('refreshSocketId', jwtToken);
//             console.log('emitted refreshSocketId with token:>> ', jwtToken);
//         } else {
//             console.log('socket not init or not connected');
//         }
//     }, 1000);
// };

export const requestActiveUsers = () => {
    setTimeout(() => {
        if (socket && socket.connected) {
            socket.emit('request-active-users');
            // console.log('Emitting request for active users.');
        } else {
            console.log('Socket not connected. Cannot request active users.');
        }
    }, 1000); // Delay of 1 second so socket connection happens first
};


const handleBroadcastEvents = (data) => {
    console.log("Received data:", data);
    switch (data.event) {
        case broadcastEventTypes.ACTIVE_USERS:
            console.log("Before filtering:", data.activeUsers);
            const activeUsers = data.activeUsers.filter(
              activeUser => activeUser.socketId !== socket.id
            );
            console.log("After filtering:", activeUsers);
            store.dispatch(dashboardActions.setActiveUsers(activeUsers));
            break;
        default:
            break;
    };
};

