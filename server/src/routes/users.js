var express = require('express');
var mqttServer = require('../mqttServer')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  var message = {
    topic: '/hello/world',
    payload: 'abcde', // or a Buffer
    qos: 1, // 0, 1, or 2
    retain: true // or true
  };

  mqttServer.publish(message, function() {
    console.log('done!');
  });
  res.send('respond with a resource2sdfsd');
});

module.exports = router;
