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

export const registerNewUser = () => {
    socket.emit('register-new-user', {
        username: username,
        socketId: socket,id
    });
};