var mqtt = require("mqtt");
const initMqttUrl = "m1/miage/dc"; //dc pour Dekeyser & Curinga

var options = {
  hostname: "broker.hivemq.com",
  port: 8000,
  path: "/mqtt",
  clientId: "iot-m1miage-dc",
  connectTimeout: 5000
};

var client = mqtt.connect(options);

module.exports = {
  /** TOPIC FORMAT **/
  // /building_identifier/room_identifier/sensor_name
  topics: {
    base_url: initMqttUrl,
    all: initMqttUrl + "/#",
    building_room_sensor: initMqttUrl + "/+/+/temperatures"
  },
  publish: (topic, message) => {
    client.publish(topic, JSON.stringify(message));
  },
  subscribe: (topic, options = {}) => {
    client.subscribe(topic, options);
  },
  receive: callback => {
    client.on("message", function(topic, message) {
      callback(topic, JSON.parse(message.toString()));
    });
  }
};
