var mqtt = require('mqtt');
var mqttClient = mqtt.connect('mqtt://localhost:3000', {
  clientId: 'mqttClient' + Math.random()*1000,
  username: 'mc',
  password: 'mcpwd',
  clean: false
  // 重连间隔
  // reconnectPeriod: 5000
  password: 'mcpwd',
  commonTopic: 'homeiot'
});

mqttClient.start = function () {
  // mqttClient.subscribe('/hello/world')
  // mqttClient.publish('presence', 'Hello Ruff!');
};

mqttClient.doPublish = function (topic, msg) {
  console.log("@@@@@in mqtt pulish!!!!");
  mqttClient.publish(topic, msg);
};

mqttClient.on('connect', function () {
  console.log('mqtt connected');
  // mqttClient.subscribe('/channel/'+mqttClient.options.username,{qos:1});
  mqttClient.subscribe(mqttClient.options.commonTopic);
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

mqttClient.onMsgComes = function (msg) {
};

module.exports = mqttClient
