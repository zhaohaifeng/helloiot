var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(__dirname)
  res.sendFile(path.join(__dirname,'index.html'))
  // res.render('index', { title: 'Express' });
});

module.exports = router;
