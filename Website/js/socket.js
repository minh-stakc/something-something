const socket = io();

const model_sensors_data = {
  pad1: [],
  pad2: [],
  pad3: [],
  pad4: [],
  pad5: [],
  pad6: [],
  pad7: [],
  total: [],
};

const sensors_data = model_sensors_data;


const pad1canva = new Chart(document.getElementById("pad1_chart"), {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Current of pad 1",
        data: sensors_data.pad1,
        borderColor: "#FF0000",
        backgroundColor: "#FFCCCB",
        borderWidth: 1,
      },
    ],
  },
});
const pad1 = document.getElementById("pad1");
socket.on("data/sensor/pad1", (data) => {
  pad1.innerHTML = data;
  sensors_data.pad1.unshift(data);
  if (sensors_data.pad1.length > 13) {
    sensors_data.pad1.pop();
  }
  pad1canva.update();
});

const pad2canva = new Chart(document.getElementById("pad2_chart"), {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Current of pad 2",
        data: sensors_data.pad2,
        borderColor: "#FF0000",
        backgroundColor: "#FFCCCB",
        borderWidth: 1,
      },
    ],
  },
});
const pad2 = document.getElementById("pad2");
socket.on("data/sensor/pad2", (data) => {
  pad2.innerHTML = data;
  sensors_data.pad2.unshift(data);
  if (sensors_data.pad2.length > 13) {
    sensors_data.pad2.pop();
  }
  pad2canva.update();
});

const pad3canva = new Chart(document.getElementById("pad3_chart"), {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Current of pad 3",
        data: sensors_data.pad3,
        borderColor: "#FF0000",
        backgroundColor: "#FFCCCB",
        borderWidth: 1,
      },
    ],
  },
});
const pad3 = document.getElementById("pad3");
socket.on("data/sensor/pad3", (data) => {
  pad3.innerHTML = data;
  sensors_data.pad3.unshift(data);
  if (sensors_data.pad3.length > 13) {
    sensors_data.pad3.pop();
  }
  pad3canva.update();
});

const pad4canva = new Chart(document.getElementById("pad4_chart"), {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Current of pad 4",
        data: sensors_data.pad4,
        borderColor: "#FF0000",
        backgroundColor: "#FFCCCB",
        borderWidth: 1,
      },
    ],
  },
});
const pad4 = document.getElementById("pad4");
socket.on("data/sensor/pad4", (data) => {
  pad4.innerHTML = data;
  sensors_data.pad4.unshift(data);
  if (sensors_data.pad4.length > 13) {
    sensors_data.pad4.pop();
  }
  pad4canva.update();
});

const pad5canva = new Chart(document.getElementById("pad5_chart"), {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Current of pad 5",
        data: sensors_data.pad5,
        borderColor: "#FF0000",
        backgroundColor: "#FFCCCB",
        borderWidth: 1,
      },
    ],
  },
});
const pad5 = document.getElementById("pad5");
socket.on("data/sensor/pad5", (data) => {
  pad5.innerHTML = data;
  sensors_data.pad5.unshift(data);
  if (sensors_data.pad5.length > 13) {
    sensors_data.pad5.pop();
  }
  pad5canva.update();
});

const pad6canva = new Chart(document.getElementById("pad6_chart"), {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Current of pad 6",
        data: sensors_data.pad6,
        borderColor: "#FF0000",
        backgroundColor: "#FFCCCB",
        borderWidth: 1,
      },
    ],
  },
});
const pad6 = document.getElementById("pad6");
socket.on("data/sensor/pad6", (data) => {
  pad6.innerHTML = data;
  sensors_data.pad6.unshift(data);
  if (sensors_data.pad6.length > 13) {
    sensors_data.pad6.pop();
  }
  pad6canva.update();
});

const pad7canva = new Chart(document.getElementById("pad7_chart"), {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Current of pad 7",
        data: sensors_data.pad7,
        borderColor: "#FF0000",
        backgroundColor: "#FFCCCB",
        borderWidth: 1,
      },
    ],
  },
});
const pad7 = document.getElementById("pad7");
socket.on("data/sensor/pad7", (data) => {
  pad7.innerHTML = data;
  sensors_data.pad7.unshift(data);
  if (sensors_data.pad7.length > 13) {
    sensors_data.pad7.pop();
  }
  pad7canva.update();
});

const totalcanva = new Chart(document.getElementById("total_chart"), {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Current of total",
        data: sensors_data.total,
        borderColor: "#FF0000",
        backgroundColor: "#FFCCCB",
        borderWidth: 1,
      },
    ],
  },
});
const total = document.getElementById("total");
socket.on("data/sensor/total", (data) => {
  total.innerHTML = data;
  sensors_data.total.unshift(data);
  if (sensors_data.total.length > 13) {
    sensors_data.total.pop();
  }
  totalcanva.update();
});



