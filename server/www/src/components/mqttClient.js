var mqtt = require('mqtt');
var mqttClient = mqtt.connect('ws://127.0.0.1:3000');

mqttClient.start = function() {
  console.log('mqtt.this', this.options.clientId);
  this.on('connect', function () {
    console.log('mqtt connected');
    this.subscribe('/hello/world');
    this.publish('presence', 'Hello Ruff!');
  });

  this.on('message', function (topic, message) {
    // message is Buffer
    console.log('topic:', topic);
    console.log('message:', message.toString());
  });
}
module.exports = mqttClient
