var ws = new WebSocket("ws://" +
"192.168.2.1" + ":8080");
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new window.AudioContext();
var pingCounter = 0;
var serverTimeDiff;

ws.onopen = function(e) {
  console.log('Connection to server opened');
}
ws.onerror = function(err) {
  console.log(err);
};

ws.onclose = function(e) {
  console.log("WebSocket Error: ", e);
};

ws.onmessage = function(e) {
  var data = e.data
  data = e.data;
  if (data.split('###').length == 3) {
    if (pingCounter < 50) {
      ws.send(e.data);
      pingCounter++;
    }
  } else if (data == "YeahBaby") {
    ws.send("PingMeNow");
  } else if (data > 100000) {
    serverTimeDiff = Date.now() - data;
    console.log(serverTimeDiff);
  }
}

document.querySelector('#play').addEventListener('click', function() {
  ws.send(Date.now() - Date.now() % 1000 + 6000);
})

document.onkeydown = function(e) {
  ws.send(e.keyCode);
}

document.onkeyup = function(e) {
  ws.send(-e.keyCode);
}

var midi; // global MIDIAccess object

function onMIDISuccess(midiAccess) {
  console.log("MIDI ready!");
  midi = midiAccess; // store in the global (in real usage, would probably keep in an object instance)
  // add each of the ports to a <select> box
  midi.inputs.forEach(function(port, key) {
    var opt = document.createElement("option");
    opt.text = port.name;
    document.getElementById("inputportselector").add(opt);
  });
  startLoggingMIDIInput(midi, 4);

  // midi.onstatechange =
  //     function midiConnectionStateChange( e ) {
  //         populateMIDIInSelect();
  //     };
}
function onMIDIFailure(msg) {
  console.log("Failed to get MIDI access - " + msg);
}
navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

function onMIDIMessage(event) {
  var data = event.data;
  var str = "MIDI message received at timestamp " + event.timeStamp + "[" + data.length + " bytes]: ";
  for (var i = 0; i < data.length; i++) {
    str += "0x" + data[i].toString(16) + " ";
  }
  console.log(str);
  var cmd = data[0] >> 4;
  var channel = data[0] & 0xf;
  var noteNumber = data[1];
  var velocity = 0;
  if (data.length > 2)
    velocity = data[2];

  // // MIDI noteon with velocity=0 is the same as noteoff
  // if ( cmd==8 || ((cmd==9)&&(velocity==0)) ) { // noteoff
  //   noteOff( noteNumber );
  // } else if (cmd == 9) { // note on
  //   noteOn( noteNumber, velocity);
  // } else if (cmd == 11) { // controller message
  //   controller( noteNumber, velocity);
  // } else {
  //   // probably sysex!
  // }

  ws.send(data[0] + ',' + noteNumber + ',' + velocity)
}

function startLoggingMIDIInput(midiAccess, indexOfPort) {
  midiAccess.inputs.forEach(function(entry) {
    entry.onmidimessage = onMIDIMessage;
  });
}

//     function midiMessageReceived( ev ) {
//         var cmd = ev.data[0] >> 4;
//         var channel = ev.data[0] & 0xf;
//         var noteNumber = ev.data[1];
//         var velocity = 0;
//         if (ev.data.length > 2)
//           velocity = ev.data[2];
//
//         // MIDI noteon with velocity=0 is the same as noteoff
//         if ( cmd==8 || ((cmd==9)&&(velocity==0)) ) { // noteoff
//           noteOff( noteNumber );
//         } else if (cmd == 9) { // note on
//           noteOn( noteNumber, velocity);
//         } else if (cmd == 11) { // controller message
//           controller( noteNumber, velocity);
//         } else {
//           // probably sysex!
//         }
//     }

// var now2;
// var now;
// function PingPong(){
//   now = Date.now();
//   ws.send("PING");
//   ws.onmessage = function(e){
//     if (!isNaN(e.data)) console.log(e.data-now);
//   }
// }
