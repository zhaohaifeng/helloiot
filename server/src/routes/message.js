var express = require('express');
var mqttServer = require('../mqttServer')
var router = express.Router();

router.get('/send', function(req, res, next) {

  var message = {
    topic: '/channel/' + req.query.channel,
    payload: req.query.message, // or a Buffer
    qos: 1, // 0, 1, or 2
    retain: true // or true
  };

  mqttServer.publish(message, function() {
    console.log('done!');
  });
  res.send('sendDone');

});

module.exports = router;