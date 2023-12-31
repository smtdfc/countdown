const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

// Socket.io connection event
io.on('connection', (socket) => {
  console.log('A user connected');
socket.join("room")
  // Listen for chat messages
  socket.on('sendMsg', (data) => {
    socket.to("room").emit('message', {
      id:socket.id,
      msg:data.msg
    }); // Broadcast the message to all connected clients
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
