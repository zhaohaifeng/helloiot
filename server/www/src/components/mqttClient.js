var mqtt = require('mqtt');
import store from '@/store/index.js'
var mqttClient = mqtt.connect('mqtt://localhost:3000', {
  clientId: 'mqttClient',
  username: 'mc',
  password: 'mcpwd',
  clean: false,
  // 重连间隔
  // reconnectPeriod: 5000
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
  mqttClient.subscribe('/channel/'+mqttClient.options.username,{qos:1});
  // mqttClient.subscribe(mqttClient.options.commonTopic);
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
  store.commit('pushReceiveMessages', message, {module: 'message'})
});

mqttClient.on('error', function (error) {
  console.log('error:', error);
});

mqttClient.on('close', function (close) {
  console.log('close');
});

mqttClient.onMsgComes = function (msg) {
};

export default mqttClient
