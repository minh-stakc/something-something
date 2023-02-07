#include <Arduino.h>
#include <Hash.h>
#include <Wire.h>
#include <ArduinoJson.h>

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
ESP8266WiFiMulti WiFiMulti;

#include <WebSocketsClient.h>
#include <SocketIOclient.h>
SocketIOclient socketIO;

#include "MAX30100_PulseOximeter.h"
#define REPORTING_PERIOD_MS 2000
PulseOximeter pox;
uint32_t tsLastReport = 0;

#include <Adafruit_MLX90614.h>
Adafruit_MLX90614 mlx = Adafruit_MLX90614();

#include "DHT.h"
#define DHTPIN D5
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

#include "MQ135.h"
#define PIN_MQ135 A0
MQ135 mq135_sensor = MQ135(PIN_MQ135);

void socketIOEvent(socketIOmessageType_t type, uint8_t* payload, size_t length) {
  switch (type) {
    case sIOtype_DISCONNECT:
      Serial.printf("[IOc] Disconnected!\n");
      break;
    case sIOtype_CONNECT:
      Serial.printf("[IOc] Connected to url: %s\n", payload);

      // join default namespace (no auto join in Socket.IO V3)
      socketIO.send(sIOtype_CONNECT, "/");
      break;
    case sIOtype_EVENT:
      Serial.printf("[IOc] get event: %s\n", payload);
      break;
    case sIOtype_ACK:
      Serial.printf("[IOc] get ack: %u\n", length);
      hexdump(payload, length);
      break;
    case sIOtype_ERROR:
      Serial.printf("[IOc] get error: %u\n", length);
      hexdump(payload, length);
      break;
    case sIOtype_BINARY_EVENT:
      Serial.printf("[IOc] get binary: %u\n", length);
      hexdump(payload, length);
      break;
    case sIOtype_BINARY_ACK:
      Serial.printf("[IOc] get binary ack: %u\n", length);
      hexdump(payload, length);
      break;
  }
}

void setup() {
  Serial.begin(115200);
  Serial.setDebugOutput(true);
  Serial.println();
  Serial.println();
  Serial.println();

  Serial.printf("[SETUP] BOOT");
  if (WiFi.getMode() & WIFI_AP) {
    WiFi.softAPdisconnect(true);
  }
  WiFiMulti.addAP("AmericanStudy T1", "66668888");
  while (WiFiMulti.run() != WL_CONNECTED) {
    delay(100);
  }
  String ip = WiFi.localIP().toString();
  Serial.printf("[SETUP] WiFi Connected %s\n", ip.c_str());

  // server address, port and URL
  socketIO.begin("192.168.100.158", 4001, "/socket.io/?EIO=4");
  // event handler
  socketIO.onEvent(socketIOEvent);

  Serial.print("Initializing pulse oximeter..");
  if (!pox.begin()) {
    Serial.println("FAILED");
    for (;;)
      ;
  } else {
    Serial.println("SUCCESS");
  }
  pox.setIRLedCurrent(MAX30100_LED_CURR_7_6MA);
  // Register a callback for the beat detection
  // pox.setOnBeatDetectedCallback(onBeatDetected);
  mlx.begin(0x5A);

  Serial.println(F("DHTxx test!"));
  dht.begin();

  Wire.setClock(100000);
}

float h = 0;
// Read temperature as Celsius (the default)
float outer_temp = 0;
float correctedPPM = 0;
float inner_temp = 0;
unsigned int heart_rate = 0;
float spo2 = 0;
unsigned long messageTimestamp = 0;

void loop() {
  socketIO.loop();
  pox.update();
  inner_temp = mlx.readObjectTempC();
  heart_rate = pox.getHeartRate();
  spo2 = pox.getSpO2();
  // float rzero = mq135_sensor.getRZero();
  // float correctedRZero = mq135_sensor.getCorrectedRZero(temperature, humidity);
  // float resistance = mq135_sensor.getResistance();

  if (millis() - tsLastReport > REPORTING_PERIOD_MS) {
    h = dht.readHumidity();
    // Read temperature as Celsius (the default)
    outer_temp = dht.readTemperature();
    float ppm = mq135_sensor.getPPM();
    correctedPPM = mq135_sensor.getCorrectedPPM(outer_temp, h);

    Serial.print("Heart rate:");
    Serial.print(heart_rate);
    Serial.print("bpm / SpO2:");
    Serial.print(spo2);
    Serial.println("%");

    Serial.print(F("\nHumidity: "));
    Serial.print(h);
    Serial.print(F("%  Temperature: "));
    Serial.print(outer_temp);
    Serial.print(F("°C"));

    Serial.print("  Object = ");
    Serial.print(inner_temp);
    Serial.println("*C");

    Serial.print("\nPPM: ");
    Serial.print(ppm);
    Serial.print("ppm  Corrected PPM: ");
    Serial.print(correctedPPM);
    Serial.println("ppm");
    Serial.println('\n');
    // Serial.print("MQ135 RZero: ");
    // Serial.print(rzero);
    // Serial.print("\t Corrected RZero: ");
    // Serial.print(correctedRZero);
    // Serial.print("\t Resistance: ");
    // Serial.print(resistance);
    // Serial.print("Ambient = "); Serial.print(mlx.readAmbientTempF());
    // Serial.print("*F\tObject = "); Serial.print(mlx.readObjectTempF()); Serial.println("*F");
    tsLastReport = millis();
  }

  uint64_t now = millis();
  if (now - messageTimestamp > 5000) {
    messageTimestamp = now;

    // creat JSON message for Socket.IO (event)
    DynamicJsonDocument doc(1024);
    JsonArray array = doc.to<JsonArray>();
    // add event name
    // Hint: socket.on('event_name', ....
    array.add("data/sensor");

    // add payload (parameters) for the event
    JsonObject msg = array.createNestedObject();
    msg["heart_rate"] = heart_rate;
    msg["spo2"] = spo2;
    msg["inner_temp"] = String(inner_temp, 1);
    msg["outer_temp"] = String(outer_temp, 1);
    msg["co2"] = String(correctedPPM,1);
    msg["hum"] = h;

    // JSON to String (serializion)
    String output;
    serializeJson(doc, output);
    // Send event
    socketIO.sendEVENT(output);
    // Print JSON for debugging
    Serial.println(output);
  }
}
