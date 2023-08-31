const express = require("express");
const path = require("path");
const socketIO = require("socket.io");

// Apollo Server
const { ApolloServer } = require('@apollo/server');
const { typeDefs, resolvers } = require("./schemas");
const { expressMiddleware } = require('@apollo/server/express4');
const { authMiddleware } = require("./utils/auth");

// DB Connection
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});



const startApolloServer = async () => {
  await server.start();

  // Apply Apollo middleware
  // server.applyMiddleware({ app });

  // Middleware for parsing
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  app.use('/graphql', expressMiddleware(server));

  // if we're in production, serve client/dist as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  } 

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

    io.on("connection", (socket) => {
      socket.emit("connection", null);
      console.log("New user connected.");
      console.log(socket.id);  // uncomment if needed

      socket.on('register-new-user', (data) => {
        peers.push({
          username: data.username,
          socket: data.socketId
        });
        console.log('registered new user');
        console.log(peers);
      })
    });
  });
};

startApolloServer();
