const express = require("express");
const path = require("path");
const socketIO = require("socket.io");
const jwt = require('jsonwebtoken');

// Apollo Server
const { ApolloServer } = require('@apollo/server');
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const { expressMiddleware } = require('@apollo/server/express4');


// DB Connection
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// Apply Apollo middleware
// server.applyMiddleware({ app });

// Middleware for parsing

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));
  
  // Serve static assets
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
  }

  // Fallback route
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });

  // Initialize DB and then start the Express and Socket.io servers
  db.once("open", () => {
    const httpServer = app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });

    // Initialize Socket.io
    const io = socketIO(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    let peers = [];

    const broadcastEventTypes = {
      ACTIVE_USERS: 'ACTIVE_USERS',
      GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS'
    };

    io.on("connection", (socket) => {
      console.log("New user connected.");
      console.log(socket.id);
    
      socket.on('register-new-user', (data) => {
        peers.push({
          username: data.username,
          socketId: data.socketId
        });

        console.log('registered new user');
        console.log(peers);
      
        // Broadcast to all connected clients
        io.sockets.emit('broadcast', {
          event: broadcastEventTypes.ACTIVE_USERS,
          activeUsers: peers
        });
      });

      socket.on('disconnect', () => {
        console.log('user disconnected');
        peers = peers.filter(peer => peer.socketId !== socket.id);
        io.sockets.emit('broadcast', {
          event: broadcastEventTypes.ACTIVE_USERS,
          activeUsers: peers
        });
      });

      // listeners for direct calls

      socket.on('pre-offer', data => {
        console.log('pre-offer-data:>> ', data);
        io.to(data.callee.socketId).emit('pre-offer', {
          callerUsername: data.caller.username,
          callerSocketId: socket.id
        });
      });
    });
  });
};

startApolloServer();