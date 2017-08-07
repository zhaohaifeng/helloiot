var mqtt = require('mqtt');
import store from '@/store/index.js'
var mqttClient = mqtt.connect('mqtt://localhost:3000', {
  clientId: 'mqttClient',
  username: 'mc',
  password: 'mcpwd',
  clean: false,
  // 重连间隔
  // reconnectPeriod: 5000
});

mqttClient.doPublish = function (client, msg) {
  console.log('client', client);
  console.log("@@@@@ in mqtt publish!!!!", client, msg);
  mqttClient.publish('/channel/'+client, msg,{qos: 1,retain: true});
};

mqttClient.on('connect', function () {
  console.log('mqtt connected');
  // mqttClient.subscribe('/channel/'+mqttClient.options.username,{qos:1});
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


export default mqttClient
