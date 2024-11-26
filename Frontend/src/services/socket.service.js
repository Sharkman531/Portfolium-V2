import io from 'socket.io-client';
const socketIO = io("http://localhost:2025")
export default socketIO