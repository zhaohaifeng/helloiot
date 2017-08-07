console.log('开始启动mosca')

var mosca = require('mosca')

var ascoltatore = {
  type: 'redis',
  redis: require('redis'),
  port: 10090,
  db:9,
  return_buffers: true, // to handle binary payloads
  password: 'OTKFRMG8lhP2',
  host: "121.40.205.19"
};

// mosca使用websocket的配置参见bin/www,使用attachHttpServer的方式
// todo redis 持久化又问题，后续改进
var moscaSettings = {
  port: 1883,
  backend: ascoltatore,
  persistence: {
    factory: mosca.persistence.Redis,
    port: 10090,
    password: 'OTKFRMG8lhP2',
    host: "121.40.205.19",
    db:10
  }
};

// Accepts the connection if the username and password are valid
var authenticate = function (client, username, password, callback) {


  console.log('authorized ' + username + ':' + password);
  console.log(typeof(password));
  // var authorized = (username === 'alice' && password.toString() === 'secret');
  let authorized = username === password.toString().substring(0, password.length - 3);
  // let authorized = username ===password.toString().substring(3);
  console.log('authorized ' + username + ':' + password + ' ' + authorized);
  if (authorized) client.user = username;
  callback(null, authorized);
}

// In this case the client authorized as alice can publish to /users/alice taking
// the username from the topic and verifing it is the same of the authorized user
var authorizePublish = function (client, topic, payload, callback) {
  let authorized = client.user === topic.split('/')[2];
  callback(null, authorized);
}

// In this case the client authorized as alice can subscribe to /users/alice taking
// the username from the topic and verifing it is the same of the authorized user
var authorizeSubscribe = function (client, topic, callback) {
  let authorized = client.user === topic.split('/')[2];
  console.log('subcribe验证：' + client.user + ':' + topic + ' ' + authorized);
  callback(null, authorized);
}

var server = new mosca.Server(moscaSettings);
server.on('ready', setup);

server.on('clientConnected', function (client) {
  console.log('client connected', client.id);
});

server.on('subscribed', function (topic, client) {
  console.log('subscribed: ', topic);
});

server.on('unSubscribed', function (topic, client) {
  console.log('unSubscribed: ', topic);
})

server.on('clientDisConnected', function (client) {
  console.log('client disConnected: ' + client.id + " userNumber:" + usermap.keys.length);
});

// fired when a message is received
server.on('published', function (packet, client) {
  console.log('Published', packet.topic, packet.payload);
});

// fired when the mqtt server is ready
function setup() {
  server.authenticate = authenticate;
  server.authorizePublish = authorizePublish;
  server.authorizeSubscribe = authorizeSubscribe;
  console.log('Mosca server is up and running')
}

module.exports = server;
