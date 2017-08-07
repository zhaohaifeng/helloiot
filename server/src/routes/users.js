var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource2sdfsd');

});

router.post('/login',function(req,res){
  res.send('{"code":20000,"data":{"token":"admin"}}')
});

router.post('/logout',function(req,res){
  res.send('{"code":20000,"data":"success"}')
});


router.get('/info',function(req,res){
  res.send('{"code":20000,"data":{"role":["admin"],"avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":"admin"}}')
});


module.exports = router;
