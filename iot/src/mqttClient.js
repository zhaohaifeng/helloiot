var mqtt = require('mqtt');
var mqttClient = mqtt.connect('mqtt://localhost:1883');

mqttClient.start = function() {
  console.log('mqtt.this', this.options.clientId);
  this.on('connect', function () {
    console.log('mqtt connected');
    this.subscribe('presence');
    this.publish('presence', 'Hello Ruff!');
  });

  this.on('message', function (topic, message) {
    // message is Buffer
    console.log('topic:', topic);
    console.log('message:', message.toString());
  });
}
console.log('mqttClient启动', mqttClient.options.clientId);
module.exports = mqttClient