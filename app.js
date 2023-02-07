//Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

// Import the express library here
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const {
  getElementById,
  createElement,
  updateElement,
  getIndexById,
  randomSensorData,
  createErr,
} = require("./utilsFunctions.js");
// Instantiate the app here
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static("./Website"));

const PORT = process.env.PORT || 4001;

const userRouter = require("./users.js");
app.use("/users", userRouter);

const petsRouter = require("./pets");
app.use("/pets", petsRouter);
// const bodyParser = (req, res, next) => {
//   let queryData = "";
//   req.on("data", (data) => {
//     data = data.toString();
//     queryData += data;
//   });
//   req.on("end", () => {
//     if (queryData) {
//       req.body = JSON.parse(queryData);
//     }
//     next();
//   });
// };

io.on("connection", (socket) => {
  console.log("lol");
  socket.on("event", (data) => {
    console.log(data);
  });

  socket.on("data/sensor/start", (data) => {
    console.log(data);
    setInterval(() => {
      socket.broadcast.emit(
        "data/sensor/heart_rate",
        randomSensorData("heart")
      );
      socket.broadcast.emit("data/sensor/spo2", randomSensorData("spo2"));
      socket.broadcast.emit("data/sensor/inner_temp", randomSensorData("temp"));
      socket.broadcast.emit("data/sensor/outer_temp", randomSensorData("temp"));
      socket.broadcast.emit("data/sensor/co2", randomSensorData("co2"));
      socket.broadcast.emit("data/sensor/hum", randomSensorData("hum"));
      console.log("hello");
    }, 5000);
  });

  socket.on("data/sensor", (data) => {
    console.log(data);
    if (data.heart_rate > 0 && data.heart_rate < 300) {
      socket.broadcast.emit("data/sensor/heart_rate", data.heart_rate);
    }
    if (data.spo2 && data.spo2 > 0 && data.spo2 < 100) {
      socket.broadcast.emit("data/sensor/spo2", data.spo2);
    }
    if (data.inner_temp > 0 && data.inner_temp < 60) {
      socket.broadcast.emit("data/sensor/inner_temp", data.inner_temp);
    }
    if (data.outer_temp > -50 && data.outer_temp < 100) {
      socket.broadcast.emit("data/sensor/outer_temp", data.outer_temp);
    }
    if (data.co2 && data.co2 > 0 && data.co2 < 20000) {
      socket.broadcast.emit("data/sensor/co2", data.co2);
    }
    if (data.hum && data.hum > 0 && data.hum < 100) {
      socket.broadcast.emit("data/sensor/hum", data.hum);
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
