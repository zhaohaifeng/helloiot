var mqtt = require('mqtt');
var emitter = require('./utils/emitter');

var mqttClient = mqtt.connect('mqtt://localhost:1883', {
  clientId: 'deviceMqttClient',
  username: 'deviceMqttClient',
  password: 'deviceMqttClientPwd',
  clean: false
});

mqttClient.on('connect', function () {
  console.log('mqtt connected');
  mqttClient.subscribe('/channel/'+mqttClient.options.username,{qos:1});
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
  emitter.emit('message', message)

});

mqttClient.on('error', function (error) {
  console.log('error:', error);
});

mqttClient.on('close', function (close) {
  console.log('close');
});

console.log('mqttClient启动', mqttClient.options.clientId);
module.exports = mqttClient