var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./src/routes/index');
var users = require('./src/routes/users');
var table = require('./src/routes/table');
var buttons = require('./src/routes/buttons');
// var mosca = require('./src/mqttServer');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use( express.static(path.join(__dirname, 'dist')));
console.log('__dirname', __dirname);
// app.use(express.static(path.join(__dirname, 'public')));

// 添加Access-Control-Allow-Origin，支持跨域
app.all("*", function (req, res, next) {
  console.log('middle before')

  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,X-Token");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  next();
});

app.use('/', index);
app.use('/user', users);
app.use('/table', table);
app.use('/btn', buttons);

app.use(function(req, res, next) {
  console.log('mid 404')
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
