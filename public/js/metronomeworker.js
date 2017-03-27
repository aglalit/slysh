'use strict';

var timerID = null;
var interval = 5;

self.onmessage = function (e) {
  var data = e.data;
  timerID = setInterval(function () {
    if (Math.abs(data[0] - Date.now() + data[1]) < 5) {
      clearInterval(timerID);
      postMessage('startMetronome');
      console.log(Date.now());
      // timerID = setInterval(function() {
      //   postMessage("tick");
      // }, interval)
    }
  }, 5);
  // } else if (data == "stop") {
  //   clearInterval(timerID);
  //   timerID = null;
  // }
};