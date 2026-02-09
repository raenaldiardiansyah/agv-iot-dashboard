// src/lib/mqttClient.ts
import mqtt from "mqtt";

// Konfigurasi MQTT
const MQTT_BROKER = "wss://broker.hivemq.com:8884/mqtt";
const MQTT_OPTIONS: mqtt.IClientOptions = {
  clientId: `agv_dashboard_${Math.random().toString(16).slice(2, 8)}`,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
  keepalive: 60,
};

// Buat koneksi MQTT
export const mqttClient = mqtt.connect(MQTT_BROKER, MQTT_OPTIONS);

// Event: Connected
mqttClient.on("connect", () => {
  console.log("✅ MQTT Connected (HiveMQ WS)");
  console.log(`📡 Client ID: ${MQTT_OPTIONS.clientId}`);
  
  // Subscribe ke topic-topic AGV
  const topics = [
    "agv/raenaldiAS/vpin/V1", // Load
    "agv/raenaldiAS/vpin/V2", // Light
    "agv/raenaldiAS/vpin/V3", // Battery
    "agv/raenaldiAS/vpin/V4", // Status
  ];

  topics.forEach((topic) => {
    mqttClient.subscribe(topic, { qos: 1 }, (err) => {
      if (err) {
        console.error(`❌ Failed to subscribe to ${topic}:`, err);
      } else {
        console.log(`✅ Subscribed to ${topic}`);
      }
    });
  });
});

// Event: Error
mqttClient.on("error", (err) => {
  console.error("❌ MQTT Connection Error:", err);
});

// Event: Offline
mqttClient.on("offline", () => {
  console.warn("⚠️ MQTT Client is offline");
});

// Event: Reconnect
mqttClient.on("reconnect", () => {
  console.log("🔄 MQTT Reconnecting...");
});

// Event: Close
mqttClient.on("close", () => {
  console.log("🔌 MQTT Connection closed");
});

// Event: Message (untuk debugging)
mqttClient.on("message", (topic, message) => {
  console.log(`📩 [${topic}] ${message.toString()}`);
});

// Cleanup function (optional, untuk unmount)
export const disconnectMQTT = () => {
  if (mqttClient.connected) {
    mqttClient.end(false, {}, () => {
      console.log("👋 MQTT Disconnected");
    });
  }
};