// src/lib/mqttClient.ts
import mqtt from "mqtt";

export const mqttClient = mqtt.connect(
  "wss://broker.hivemq.com:8884/mqtt"   // ← URL baru
);

mqttClient.on("connect", () => {
  console.log("✅ MQTT Connected (HiveMQ WS)");
  mqttClient.subscribe("agv/raenaldiAS/#");
});