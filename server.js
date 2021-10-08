require("dotenv").config({ path: "./.env" });
const http = require("http");
const next = require("next");
const connectDB = require("./server-utils/connectDb");
const express = require("express");
const app = express();
app.use(express.json());
const server = http.Server(app);
const io = require("socket.io")(server);
const dev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 3000;

const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

connectDB();

const {
  addUser,
  removeUser,
  findConnectedUser,
} = require("./server-utils/socket");
const {
  loadMessages,
  sendMessage,
  setMessageToUnread,
  setMessageToRead,
} = require("./server-utils/chat");

io.on("connection", (socket) => {
  socket.on("join", async ({ userId }) => {
    const users = await addUser(userId, socket.id);
    await setMessageToRead(userId);
    setInterval(() => {
      socket.emit("connectedUsers", {
        users: users.filter((user) => user.userId !== userId),
      });
    }, 10000);
  });

  socket.on("loadMessages", async ({ userId, messagesWith }) => {
    const { chat, error } = await loadMessages(userId, messagesWith);
    if (!error) {
      socket.emit("messagesLoaded", { chat });
    } else {
      socket.emit("noChatFound");
    }
  });

  socket.on("newMessage", async ({ userId, receiver, message }) => {
    const { newMessage, error } = await sendMessage(userId, receiver, message);
    const receiverSocket = await findConnectedUser(receiver);
    if (receiverSocket) {
      io.to(receiverSocket.socketId).emit("newMessageReceived", { newMessage });
    } else {
      await setMessageToUnread(receiver);
    }
    if (!error) {
      socket.emit("messageSent", { newMessage });
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

nextApp.prepare().then(() => {
  app.use("/api/search", require("./api/search.api"));
  app.use("/api/signup", require("./api/signup.api"));
  app.use("/api/auth", require("./api/auth.api"));
  app.use("/api/profile", require("./api/profile.api"));
  app.use("/api/chats", require("./api/chat.api"));
  app.all("*", (req, res) => handle(req, res));

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Express server running on port ${PORT}`);
  });
});
