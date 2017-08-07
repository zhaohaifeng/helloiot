var mqtt = require('mqtt');
var mqttClient = mqtt.connect('mqtt://localhost:3000', {
  clientId: 'mcClientId',
  username: 'mc',
  password: 'mcpwd',
  clean: false
  // 重连间隔
  // reconnectPeriod: 5000
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
});

mqttClient.on('error', function (error) {
  console.log('error:', error);
});

mqttClient.on('close', function (close) {
  console.log('close');
});
module.exports = mqttClient
