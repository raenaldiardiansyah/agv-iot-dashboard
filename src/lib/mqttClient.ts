import mqtt from "mqtt";

export const mqttClient = mqtt.connect(
  "wss://broker.mqttdashboard.com:8000/mqtt"
);

mqttClient.on("connect", () => {
  console.log("✅ MQTT Connected (Cloud WS)");
  mqttClient.subscribe("agv/raenaldiAS/#");
});

mqttClient.on("error", (err) => {
  console.error("MQTT error", err);
});
