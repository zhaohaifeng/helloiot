'use strict';

var interval = null;
var mqttClient = require('./mqttClient.js');
console.log('index.mqttClient启动', mqttClient.options.clientId);

$.ready(function (error) {

  var buzzerCount = 0;
  if (error) {
    console.log(error);
    return;
  }

  // 在 `#button` 按下时点亮 `#led-r`.
  $('#button').on('push', function () {
    console.log('Button pushed.');
    $('#led-r').turnOn();
  });
  // 在 `#button` 释放时熄灭 `#led-r`.
  $('#button').on('release', function () {
    console.log('Button released.');
    $('#led-r').turnOff();


    console.log('buzzerCount', buzzerCount);
    if (buzzerCount === 0) {
      buzzerAlert(0);
    } else if (buzzerCount === 1) {
      buzzerAlert(500);
    } else if (buzzerCount === 2) {
      buzzerAlert(200);
    } else if (buzzerCount === 3) {
      buzzerAlert(0,false);
    } else {
      buzzerCount = 0;
      buzzerAlert(0);
    }
    buzzerCount++;
  });

  setTimeout(function(){
    console.log('timeOut');
  },300000)
});

var buzzerAlert = function (frequency, open) {
  if(open === undefined) {
    open = true;
  }
  clearInterval(interval);

  if (!open) {
    $('#buzzer').turnOff(errorCall);
    return;
  }

  if (frequency === 0) {
    $('#buzzer').turnOn(errorCall);
    return;
  } else {
    $('#buzzer').turnOff(errorCall);
  }

  interval = setInterval(function () {
      $('#buzzer').isOn(function (error, on) {
        if (error) {
          console.error(error);
          return;
        }
        if (on) {
          $('#buzzer').turnOff(errorCall);
        } else {
          $('#buzzer').turnOn(errorCall);
        }
      });

    }
    , frequency)
};

var errorCall = function (error) {
  if (error) {
    console.error(error);
    return;
  }
}

$.end(function () {
  $('#buzzer').turnOff(errorCall);
  $('#led-r').turnOff();
});
