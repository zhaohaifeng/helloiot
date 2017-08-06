var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  var message = {
    topic: '/hello/world',
    payload: 'abcde', // or a Buffer
    qos: 1, // 0, 1, or 2
    retain: true // or true
  };

  res.send('this is buttons');

});

router.get('/list',function(req,res){
    console.log("button list!");
    res.send('{"code":20000,"data":{"token":"admin"}}')
});


router.get('/buzzer',function(req,res){
    console.log("here is buzzer!");
    res.send('{"code":20000,"data":{"token":"admin"}}')
});

router.get('/triggerBuzzer',function(req,res){
  res.send('{"code":20000}')
});


module.exports = router;
