var express = require("express");
var socket = require("socket.io");

var app = express();

const server = app.listen("4000", () => {
  console.log("server started and listening on port 4000");
});

// static file from public directory
app.use(express.static("public"));

// socket setup
const io = new socket(server);

io.on("connection", socket => {
  console.log("Made connection , id : ", socket.id);
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });
});
