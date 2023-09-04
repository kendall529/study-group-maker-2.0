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

    // Create a Map to keep track of active users
    const activeUsers = new Map();  // <-- New line

    const broadcastEventTypes = {
      ACTIVE_USERS: 'ACTIVE_USERS',
      GROUP_CALL_ROOMS: 'GROUP_CALL_ROOMS'
    };

    io.on("connection", (socket) => {
      console.log("New user connected.");
      console.log(socket.id);

      socket.on('refreshSocketId', (jwtToken) => {
        try {
          const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

          const username = decoded.data.user_name;

          if(activeUsers.has(username)) {
            activeUsers.set(username, {socketId: socket.id, user_name: username})
          }
          console.log(activeUsers);
        } catch (e) {
          console.error('Invalid JWT token received')
        }
      })
    
      socket.on('register-new-user', (data) => {
        // Check if user is already connected
        // console.log('register new user event received:', data);

        const usernameKey = data.user_name || data.username;
      
        if (activeUsers.has(usernameKey)) {
          // Update the socket ID only
          activeUsers.set(usernameKey, {  
            socketId: socket.id,
            user_name: usernameKey
          });

          const updatedPeers = Array.from(activeUsers.values());
          console.log('updated socket ID for existing user:>> ', updatedPeers); // log updated peers array
        } else {
          // Save the new socket and username, this is a new username
          activeUsers.set(usernameKey, { socketId: socket.id, user_name: usernameKey });
        }
      
        const peers = Array.from(activeUsers.values());
        console.log('registered new user or updated existing user');
        console.log(peers);
      
        // Broadcast to all connected clients
        io.sockets.emit('broadcast', {
          event: broadcastEventTypes.ACTIVE_USERS,
          activeUsers: peers
        });
      });

      // on dashboard useEffect for listening to path change
      // Handle user leaving the dashboard
      socket.on('user-leaving-dashboard', (data) => {
        console.log("Received user-leaving-dashboard", data); // Debug
        const usernameKey = data.user_name || data.username; // Define usernameKey

        if (activeUsers.has(usernameKey)) {  // Check if username exists
          console.log("Removing user", usernameKey); // Debug
          activeUsers.delete(usernameKey); // Remove user from activeUsers Map

          const updatedPeers = Array.from(activeUsers.values());
          io.sockets.emit('broadcast', {
            event: broadcastEventTypes.ACTIVE_USERS,
            activeUsers: updatedPeers
          });
        } else {
          console.log('user not found in activeUsers', usernameKey); //Debug
        }
      });
    });
  });
};

startApolloServer();