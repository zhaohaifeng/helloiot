var mqtt = require('mqtt');
var mqttClient = mqtt.connect('mqtt://localhost:3000', {
  clientId: 'mqttClient1',
  username: 'mc',
  password: 'mcpwd'
});


mqttClient.start = function () {
  // mqttClient.subscribe('/hello/world')
  // mqttClient.publish('presence', 'Hello Ruff!');
};

mqttClient.on('connect', function () {
  console.log('mqtt connected');
  mqttClient.subscribe('/hello/world');
});

mqttClient.on('reconnect', function () {
  console.log('mqtt reconnect');
});

mqttClient.on('offline', function () {
  console.log('mqtt offline');
});


mqttClient.on('message', function (topic, message) {
  // message is Buffer
  console.log('topic:', topic);
  console.log('message:', message.toString());
});

mqttClient.on('error', function (error) {
  console.log('error:', error);
});

mqttClient.on('close', function (close) {
  console.log('close');
});
module.exports = mqttClient
