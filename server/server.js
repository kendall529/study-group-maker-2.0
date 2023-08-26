const express = require("express");
const path = require("path");
const socketIO = require("socket.io");

// Apollo Server
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");

// DB Connection
const db = require("./config/connection");

const PORT = process.env.PORT || 5000;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// Apply Apollo middleware
server.applyMiddleware({ app });

// Middleware for parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// Fallback route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Initialize DB and then start the Express and Socket.io servers
db.once("open", () => {
  const httpServer = app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });

  // Initialize Socket.io
  const io = socketIO(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.emit("connection", null);
    console.log("New user connected.");
    console.log(socket.io);  // uncomment if needed
  });
});
