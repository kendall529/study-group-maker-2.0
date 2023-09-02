import socketClient from 'socket.io-client';

const SERVER = 'http://localhost:3001';

let socket;

export const connectWithWebSocket = () => {
    socket = socketClient(SERVER);

    socket.on('connection', () => {
        console.log('Successfully connected with websocket server');
        console.log(socket.id);
    });
}

export const registerNewUser = (user_name) => {
    if (socket && socket.connected) {
        console.log("Emitting register-new-user event for user: ", user_name);  // Debug line
        socket.emit('register-new-user', {
            username: user_name,
            socketId: socket.id
        });
        console.log(`Emitting register-new-user for username: ${user_name}`);
    } else {
        console.log('Socket not connected. Cannot register new user.');
    }
};