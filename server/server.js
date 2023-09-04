const express = require("express");
const path = require("path");
const socketIO = require("socket.io");

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
          const username = decoded.user_name;

          if(activeUsers.has(username)) {
            activeUsers.set(username, {socketId: socket.id, user_name: username})
          }
        } catch (e) {
          console.error('Invalid JWT token received')
        }
      })
    
      socket.on('register-new-user', (data) => {
        // Check if user is already connected
        console.log('register new user event received:>> ', data);
        if (activeUsers.has(data.username)) {
          // Get the old socket ID
          const oldSocketId = activeUsers.get(data.username).socketId;
          
          // Disconnect the old socket
          io.sockets.sockets.get(oldSocketId).disconnect();
        }
    
        // Save the new socket and username
        activeUsers.set(data.username, { socketId: socket.id, user_name: data.username });
    
        const peers = Array.from(activeUsers.values());
        console.log('registered new user');
        console.log(peers);
    
        // Broadcast to all connected clients
        io.sockets.emit('broadcast', {
          event: broadcastEventTypes.ACTIVE_USERS,
          activeUsers: peers
        });
      });
    });
  });
};

startApolloServer();