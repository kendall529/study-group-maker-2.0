import socketClient from 'socket.io-client';
import store from '../../store/store';
import * as dashboardActions from "../../store/actions/dashboardActions";
import AuthService from '../auth';  // Import AuthService to access JWT tokens
import * as webRTCHandler from '../webRTC/webRTCHandle';

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

        // listeners for direct calls
        socket.on('pre-offer', (data) => {
            webRTCHandler.handlePreOffer(data);
        });

        socket.on('pre-offer-answer', (data) => {
            webRTCHandler.handlePreOfferAnswer(data);
        });

        socket.on('webRTC-offer', (data) => {
            webRTCHandler.handleOffer(data);
            console.log('handling offer data:>>', data);
        });

        socket.on('webRTC-answer', (data) => {
            webRTCHandler.handleAnswer(data);
            console.log('received answer data:>>', data);
        });
        
        socket.on('webRTC-candidate', (data) => {
            webRTCHandler.handleCandidate(data);
        });
    };

    return socket;
};

export const registerNewUser = (username) => {
    if(socket && socket.connected) {
        socket.emit('register-new-user', {
            username: username,
            socketId: socket.id
        })
    } else {
        console.log('Socket not connected. Cannot register new user.');
    }
};

// emit events to server for direct call

export const sendPreOffer = (data) => {
    socket.emit('pre-offer', data);
};

export const sendPreOfferAnswer = (data) => {
    socket.emit('pre-offer-answer', data);
};

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

export const sendWebRTCOffer = (data) => {
    socket.emit('webRTC-offer', data);
    console.log('sendOffer to server', data);
};

export const sendWebRTCAnswer = (data) => {
    socket.emit('webRTC-answer', data);
    console.log('sendAnswer to server', data);
};

export const sendWebRTCCandidate = (data) => {
    socket.emit('webRTC-candidate', data);
};

const handleBroadcastEvents = (data) => {
    switch (data.event) {
        case broadcastEventTypes.ACTIVE_USERS:
            const activeUsers = data.activeUsers.filter(
              activeUser => activeUser.socketId !== socket.id
            );
            store.dispatch(dashboardActions.setActiveUsers(activeUsers));
            break;
        default:
            break;
    };
};

