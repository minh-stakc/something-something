//Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

// Import the express library here
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
// Instantiate the app here
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static("./Website"));

const PORT = process.env.PORT || 4001;

const sensorsRouter = require("./sensors.js");
app.use("/sensors", sensorsRouter);

io.on("connection", (socket) => {
  console.log("lol");
  socket.on("event", (data) => {
    console.log(data);
  });

  socket.on("data/sensor", (data) => {
    console.log(data);
    if (data.pad1) {
      socket.broadcast.emit("data/sensor/pad1", data.pad1);
    }
    if (data.pad1) {
      socket.broadcast.emit("data/sensor/pad1", data.pad1);
    }
    if (data.pad2) {
      socket.broadcast.emit("data/sensor/pad2", data.pad1);
    }
    if (data.pad3) {
      socket.broadcast.emit("data/sensor/pad3", data.pad1);
    }
    if (data.pad4) {
      socket.broadcast.emit("data/sensor/pad4", data.pad1);
    }
    if (data.pad5) {
      socket.broadcast.emit("data/sensor/pad5", data.pad1);
    }
    if (data.pad6) {
      socket.broadcast.emit("data/sensor/pad6", data.pad1);
    }
    if (data.pad7) {
      socket.broadcast.emit("data/sensor/pad7", data.pad1);
    }
    if (data.total) {
      socket.broadcast.emit("data/sensor/total", data.pad1);
    }
  });

  socket.on("disconnect", () => {
    console.log("bye");
  });
});

app.use(bodyParser.json());

// Invoke the app's `.listen()` method below:
server.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
