const socket = io();

const model_sensors_data = {
  heart_rate: [98, 90, 99, 100, 101, 102, 103, 104, 105, 106, 120, 70, 80],
  spo2: [96, 98, 99, 100, 80, 97, 95, 90, 100, 100, 96, 96, 95, 94],
  temp: [36, 36, 36, 36, 35, 34, 40, 43, 32, 34, 43, 30, 36],
};

const sensors_data = model_sensors_data;

//chart update every 5 sec of the last minute
const hrc = new Chart(document.getElementById("heart_rate_chart"), {
  type: "line",
  data: {
    labels: [0, " ", 10, " ", 20, " ", 30, " ", 40, " ", 50, " ", 60],
    datasets: [
      {
        label: "# of Heart Beats Per Minutes",
        data: sensors_data.heart_rate,
        borderColor: "#FF0000",
        backgroundColor: "#FFCCCB",
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        suggestedMax: 300,
        suggestedMin: 50,
      },
    },
  },
});

const o2c = new Chart(document.getElementById("spo2_chart"), {
  type: "line",
  data: {
    labels: [0, " ", 10, " ", 20, " ", 30, " ", 40, " ", 50, " ", 60],
    datasets: [
      {
        label: "% of Oxygen Saturation",
        data: sensors_data.spo2,
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        suggestedMax: 100,
        suggestedMin: 85,
      },
    },
  },
});

const tc = new Chart(document.getElementById("temp_chart"), {
  type: "line",
  data: {
    labels: [0, " ", 10, " ", 20, " ", 30, " ", 40, " ", 50, " ", 60],
    datasets: [
      {
        label: "# of °C",
        data: sensors_data.temp,
        borderColor: "#fdb44e",
        backgroundColor: "#fcd298",
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        suggestedMax: 60,
        suggestedMin: 20,
      },
    },
  },
});

const heart_rate = document.getElementById("heart_rate");
const spo2 = document.getElementById("spo2");
const inner_temp = document.getElementById("inner_temp");
const hum = document.getElementById("hum");
const outer_temp = document.getElementById("outer_temp");
const co2 = document.getElementById("co2");

socket.on("data/sensor/heart_rate", (data) => {
  heart_rate.innerHTML = data;
  sensors_data.heart_rate.unshift(data);
  if (sensors_data.heart_rate.length > 13) {
    sensors_data.heart_rate.pop();
  }
  hrc.update();
});

socket.on("data/sensor/spo2", (data) => {
  spo2.innerHTML = data;
  sensors_data.spo2.unshift(data);
  if (sensors_data.spo2.length > 13) {
    sensors_data.spo2.pop();
  }
  o2c.update();
});
socket.on("data/sensor/inner_temp", (data) => {
  inner_temp.innerHTML = data;
  sensors_data.temp.unshift(data);
  if (sensors_data.temp.length > 13) {
    sensors_data.temp.pop();
  }
  tc.update();
});
socket.on("data/sensor/hum", (data) => {
  hum.innerHTML = data;
});
socket.on("data/sensor/outer_temp", (data) => {
  outer_temp.innerHTML = data;
});

socket.on("data/sensor/co2", (data) => {
  co2.innerHTML = data;
});
