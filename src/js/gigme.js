window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext,
  // iosStartDiff,
  // startDelay = 5000,
  // pingCounter = 0,
  // serverTimeDiff,
  // isPlaying = false,
  // tempo = 120,
  // secondsPerBeat = 60.0 / tempo,
  // metronomeOsc,
  // metronomeStartStopGain,
  // started,
  // source,
  tuna,
  midinote,
  loadedSamples = {},
  midiMessageEventHandler,
  input,
  output,
  // noteOn,
  // noteOff,
  // player = document.querySelector('#player'),
  ws = new WebSocket("ws://" +
  "192.168.2.1" +
  ":8080");
  //timerWorker = new Worker("/metronomeworker.js");

ws.onopen = (e) => {
  console.log('Connection to server opened');
  //ws.send('CanYouPingMe');
}

ws.onerror = (e) => {
  console.log('Error:', e);
}

ws.onclose = (e) => {
  console.log('Connection closed');
}

ws.onmessage = (e) => {
  data = e.data;
  // if (data.split('###').length == 3) {
  //   if (pingCounter < 20) {
  //     ws.send(e.data);
  //     pingCounter++;
  //   }
  // } else if (data == "YeahBaby") {
  //   ws.send("PingMeNow");
  // } else if (data > 100000) {
  //   serverTimeDiff = Date.now() - data;
  //   console.log(serverTimeDiff);
  // } else if (data) {
    console.log(data);
    midinote = data.split(',');
    midiMessageEventHandler(midinote);
  //}
  // else if (data > 999) {
  //   playButton(parseInt(data))
  //   }
}

var samplesSrc = [
  36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,
  62,63,64,65,66,67,68,69,70,71,72
];

// var WIDTH = window.innerWidth;
// var HEIGHT = window.innerHeight;
//
// var xPos = Math.floor(WIDTH/2);
// var yPos = Math.floor(HEIGHT/2);
// var zPos = 295;

document.querySelector('#run').addEventListener('click', ()=>{
  audioContext = new AudioContext();
    // var trueDateClient = Date.now() - serverTimeDiff;
  // timerWorker.postMessage([
  //   (trueDateClient - trueDateClient % startDelay + startDelay),
  //   serverTimeDiff
  // ]);
  //console.log((trueDateClient - trueDateClient%startDelay + startDelay));
  //iosStartDiff = (startDelay - (Date.now() - serverTimeDiff)%startDelay)/1000;
  var iosOsc = audioContext.createOscillator();
  iosOsc.connect(audioContext.destination);
  iosOsc.start();
  iosOsc.stop(1);
   tunaInit();
   midiOscInit();
  var loadingSamples = samplesSrc.map((sample)=>{
          var request = new XMLHttpRequest();
          request.open('GET', 'moog/'+  sample + '....wav', true);
          request.responseType = 'arraybuffer';
          request.send();
          request.onload = ()=>{
            audioContext.decodeAudioData(request.response, (buffer)=>{
              loadedSamples[sample] = buffer;
            });
          };
          request.onerror = (e)=>{
            console.log(e);
          };
        });
        Promise.all(loadingSamples).then(()=>{
          console.log('All ' + loadingSamples.length + ' files ready');
        }).catch((e)=>{
          console.log('An error occurred while occurred while loading files');
          console.log(e);
        });


  // timerWorker.onmessage = function(e) {
  //   if (e.data == 'tick')
  //     scheduler();
  //   else {
  //     if (!started) {
  //       console.log((Date.now() - serverTimeDiff));
  //       //console.log((audioContext.currentTime - iosStartDiff));
  //       scheduleMetronome(tempo);
  //       playButton();
  //       midiOscInit();
  //
  //     }
  //     started = true;
  //   }
  // }

})

//var startTime; // The start time of the entire sequence.
//var current16thNote; // What note is currently last scheduled?
//var beatCounter = 0; // tempo (in beats per minute)
// var lookahead = 10; // How frequently to call scheduling function
// //(in milliseconds)
// var scheduleAheadTime = 0.01; // How far ahead to schedule audio (sec)
// // This is calculated from lookahead, and overlaps
// // with next interval (in case the timer is late)
// var nextNoteTime = 0.0; // when the next note is due.
// var noteResolution = 0; // 0 == 16th, 1 == 8th, 2 == quarter note
// var noteLength = 0.05; // length of "beep" (in seconds)
//var notesInQueue = []; // the notes that have been put into the web audio,
// and may or may not have played yet. {note, time}
//var quarterBeatLength = (60 / tempo).toFixed(3);

// function nextNote() {
//
//   nextNoteTime += secondsPerBeat; // Add beat length to last beat time
//
//   current16thNote++; // Advance the beat number, wrap to zero
//   if (current16thNote == 16) {
//     current16thNote = 0;
//   }
// }

// function scheduleMetronome(tempo) {
//   metronomeOsc = audioContext.createOscillator();
//   metronomeOsc.frequency.value = 200;
//   metronomeEnvelope = audioContext.createGain();
//   metronomeStartStopGain = audioContext.createGain();
//   metronomeEnvelope.gain.value = 0;
//   metronomeStartStopGain.gain.value = 0;
//   metronomeOsc.connect(metronomeStartStopGain);
//   metronomeStartStopGain.connect(metronomeEnvelope);
//   metronomeEnvelope.connect(audioContext.destination);
//   metronomeOsc.start();
//   iosStartDif = audioContext.currentTime;
//   for (i = 0; i < 1000; i++) {
//     var beatTime = (i * secondsPerBeat) + iosStartDif;
//     metronomeEnvelope.gain.setValueAtTime(1, beatTime);
//     metronomeEnvelope.gain.setValueAtTime(0, beatTime + 0.1);
//   }
  //console.log(audioContext.currentTime);
  //console.log((Date.now()%10000)/1000);
  // function playSynth(note, beat){
  //     source.disconnect(input);
  //     source = audioContext.createBufferSource();
  //     source.buffer = notes[note];
  //     source.connect(input);
  //     output.connect(audioContext.destination);
  //     source.start(time,0,secondsPerBeat);
  // }

  //     // push the note on the queue, even if we're not playing.
  //     notesInQueue.push( { note: beatNumber, time: time } );
  //     var secondsPerBeat = 60.0 / tempo;
  //     //play synth
  //     playSynth('g1', 0);
  //     playSynth('gb1', 4)
  //     playSynth('a1', 8)
  //     playSynth('e1', 12)
  //
  //
  //
  //     if ( (noteResolution==1) && (beatNumber%2))
  //         return; // we're not playing non-8th 16th notes
  //     if ( (noteResolution==2) && (beatNumber%4))
  //         return; // we're not playing non-quarter 8th notes
  //
  //     // create an oscillator
  //     var osc = audioContext.createOscillator();
  //     osc.connect( audioContext.destination );
  //     if (beatNumber % 16 === 0)    // beat 0 == high pitch
  //         osc.frequency.value = 220.0;
  //     // else if (beatNumber % 4 === 0 )    // quarter notes = medium pitch
  //     //     osc.frequency.value = 150.0;
  //     else                        // other 16th notes = low pitch
  //         osc.frequency.value = 70.0;
  //
  //     osc.start( time );
  //     osc.stop( time + noteLength );

//function scheduler() {
  // var bodyShimmer = document.getElementsByTagName('body')[0];
  // bodyShimmer.style.backgroundColor = 'green';
  // var truenow = Date.now() - serverTimeDiff;
  // if (truenow%1000 < 9) {
  //   console.log(truenow);
  //   console.log(currentTime - iosStartDif);
  //   if (bodyShimmer.style.backgroundColor == 'green')
  //bodyShimmer.style.backgroundColor = 'red';
  //   else bodyShimmer.style.backgroundColor = 'green';
  // }
  // if (midinote) {
  //   var currentTime = audioContext.currentTime;
  //   var beatOffset = (currentTime - iosStartDiff) % secondsPerBeat;
  //   //console.log(secondsPerBeat-beatOffset);
  //   if (beatOffset < 0.05) {
  //
  //     console.log('late');
  //   } else {
  //     MIDIMessageEventHandler(midinote, currentTime -
  //beatOffset + secondsPerBeat);
  //   }
  //   midinote = null;
  // }
//}

// function playButton() { //BUTTON FUNCTION
//   var buttonText = document.querySelector('.play');
//   isPlaying = !isPlaying;
//   if (isPlaying) { // start playing
//     metronomeStartStopGain.gain.value = 1;
//     buttonText.innerHTML = "stop";
//   } else {
//     timerWorker.postMessage("stop");
//     buttonText.innerHTML = "play";
//     metronomeStartStopGain.gain.value = 0;
//   }
// }

function tunaInit() {
  tuna = new Tuna(audioContext);
  var chorus = new tuna.Chorus({
    rate: 1.5, feedback: 0.2, delay: 0.0045, bypass: 0
  });
  var phaser = new tuna.Phaser({
    rate: 1.2, //0.01 to 8 is a decent range, but higher values are possible
    depth: 0.3, //0 to 1
    feedback: 0.2, //0 to 1+
    stereoPhase: 30, //0 to 180
    baseModulationFrequency: 700, //500 to 1500
    bypass: 0
  });
  var compressor = new tuna.Compressor({
    threshold: -1, //-100 to 0
    makeupGain: 20, //0 and up (in decibels)
    attack: 1, //0 to 1000
    release: 0, //0 to 3000
    ratio: 4, //1 to 20
    knee: 5, //0 to 40
    automakeup: false, //true/false
    bypass: 0
  });

  var moog = new tuna.MoogFilter({
    cutoff: 0.465, //0 to 1
    resonance: 2, //0 to 4
    bufferSize: 1024, //256 to 16384
  });
  var convolver = new tuna.Convolver({
    highCut: 22050, //20 to 22050
    lowCut: 20, //20 to 22050
    dryLevel: 1, //0 to 1+
    wetLevel: 1, //0 to 1+
    level: 1, //0 to 1+, adjusts total output of both wet and dry
    impulse: "impulses/ir_rev_short.wav", //the path to your impulse response
    bypass: 0
  });
  var pingPongDelay = new tuna.PingPongDelay({
    wetLevel: 1, //0 to 1
    feedback: 0.5, //0 to 1
    delayTimeLeft: 150, //1 to 10000 (milliseconds)
    delayTimeRight: 200 //1 to 10000 (milliseconds)
});
var delay = new tuna.Delay({
    feedback: 0.5,    //0 to 1+
    delayTime: 100,    //1 to 10000 milliseconds
    wetLevel: 1,    //0 to 1+
    dryLevel: 1,       //0 to 1+
    cutoff: 20000,
    //cutoff frequency of the built in lowpass-filter. 20 to 22050
    bypass: 0
});
  input = audioContext.createGain();
  output = audioContext.createGain();
  input.connect(chorus);
  // chorus.connect(compressor);
  // compressor.connect(moog);
  //chorus.connect(delay);
  chorus.connect(output);
  output.connect(audioContext.destination);
}

function midiOscInit() {
  var midioscillator;
  var envelope; // the envelope for the single oscillator
  var attack = 0.001; // attack speed
  var release = 0.05; // release speed
  var portamento = 0.001; // portamento/glide speed
  var activeNotes = []; // the stack of actively-pressed keys
  // midioscillator = audioContext.createOscillator();
  // midioscillator.frequency.value = 0;
  // envelope = audioContext.createGain();
  // midioscillator.connect(envelope);
  // envelope.connect(input);
  // envelope.gain.value = 0; // Mute the sound
  // midioscillator.start(0); // Go ahead and start up the oscillator
  function playSynth(note){
     if (loadedSamples[note[1]]) {
       if (note[0] == 144 ){
         window['source'+note[1]] = audioContext.createBufferSource();
         window['source'+note[1]].buffer = loadedSamples[note[1]];
         window['source'+note[1]].connect(input);
         window['source'+note[1]].start();
       }
       else if (note[0] == 128){window['source'+note[1]].stop()}
     }
   }
   

  midiMessageEventHandler = (data)=>{
      playSynth(data)
    // else {
    //   // Mask off the lower nibble (MIDI channel, which we don't care about)
    //   switch (data[0] & 0xf0) {
    //
    //     case 0x90:
    //       if (data[2] != 0) { // if velocity != 0, this is a note-on message
    //         noteOn(data[1]);
    //         //console.log('got midi on');
    //         return;
    //       }
    //       // if velocity == 0, fall thru: it's a note-off.  MIDI's weird, y'all.
    //     case 0x80:
    //       noteOff(data[1]);
    //       //console.log('got midi off');
    //       return;
    //   }
    // }
    }
  }
  //
  // function frequencyFromNoteNumber(note) {
  //   if (!note)
  //     return 0;
  //   else
  //     return 440 * Math.pow(2, (note - 69) / 12);
  //   }
  //
  // noteOn = function(noteNumber) {
  //   activeNotes.push(noteNumber);
  //   midioscillator.frequency.cancelScheduledValues(0);
  //   midioscillator.frequency.setTargetAtTime(frequencyFromNoteNumber(noteNumber), 0, portamento);
  //   envelope.gain.cancelScheduledValues(0);
  //   envelope.gain.setTargetAtTime(0.5, 0, attack);
  // }
  //
  // function noteOff(noteNumber) {
  //   function removeNote() {
  //     var position = activeNotes.indexOf(noteNumber);
  //     if (position != -1)
  //       activeNotes.splice(position, 1)
  //   }
  //   removeNote();
  //   removeNote();
  //   if (activeNotes.length == 0) { // shut off the envelope
  //     envelope.gain.cancelScheduledValues(0);
  //     envelope.gain.setTargetAtTime(0.0, 0, release);
  //   } else {
  //     midioscillator.frequency.cancelScheduledValues(0);
  //     midioscillator.frequency.setTargetAtTime(frequencyFromNoteNumber(activeNotes[activeNotes.length - 1]), 0, portamento);
  //   }
  // }
// var moog = {
//   "36": {
//     "start": 0,
//     "end": 12.039546485260772,
//     "loop": false
//   },
//   "37": {
//     "start": 14,
//     "end": 26.02793650793651,
//     "loop": false
//   },
//   "38": {
//     "start": 28,
//     "end": 38.86693877551021,
//     "loop": false
//   },
//   "39": {
//     "start": 40,
//     "end": 50.86693877551021,
//     "loop": false
//   },
//   "40": {
//     "start": 52,
//     "end": 62.86693877551021,
//     "loop": false
//   },
//   "41": {
//     "start": 64,
//     "end": 74.87854875283446,
//     "loop": false
//   },
//   "42": {
//     "start": 76,
//     "end": 86.87854875283446,
//     "loop": false
//   },
//   "43": {
//     "start": 88,
//     "end": 98.87854875283446,
//     "loop": false
//   },
//   "44": {
//     "start": 100,
//     "end": 110.87854875283446,
//     "loop": false
//   },
//   "45": {
//     "start": 112,
//     "end": 122.85532879818594,
//     "loop": false
//   },
//   "46": {
//     "start": 124,
//     "end": 134.87854875283446,
//     "loop": false
//   },
//   "47": {
//     "start": 136,
//     "end": 146.8669387755102,
//     "loop": false
//   },
//   "48": {
//     "start": 148,
//     "end": 158.8669387755102,
//     "loop": false
//   },
//   "49": {
//     "start": 160,
//     "end": 170.87854875283446,
//     "loop": false
//   },
//   "50": {
//     "start": 172,
//     "end": 182.87854875283446,
//     "loop": false
//   },
//   "51": {
//     "start": 184,
//     "end": 194.8669387755102,
//     "loop": false
//   },
//   "52": {
//     "start": 196,
//     "end": 206.87854875283446,
//     "loop": false
//   },
//   "53": {
//     "start": 208,
//     "end": 218.87854875283446,
//     "loop": false
//   },
//   "54": {
//     "start": 220,
//     "end": 230.8669387755102,
//     "loop": false
//   },
//   "55": {
//     "start": 232,
//     "end": 242.8669387755102,
//     "loop": false
//   },
//   "56": {
//     "start": 244,
//     "end": 254.87854875283446,
//     "loop": false
//   },
//   "57": {
//     "start": 256,
//     "end": 266.8785487528345,
//     "loop": false
//   },
//   "58": {
//     "start": 268,
//     "end": 278.8785487528345,
//     "loop": false
//   },
//   "59": {
//     "start": 280,
//     "end": 290.8785487528345,
//     "loop": false
//   },
//   "60": {
//     "start": 292,
//     "end": 302.8669387755102,
//     "loop": false
//   },
//   "61": {
//     "start": 304,
//     "end": 314.8785487528345,
//     "loop": false
//   },
//   "62": {
//     "start": 316,
//     "end": 326.8901587301587,
//     "loop": false
//   },
//   "63": {
//     "start": 328,
//     "end": 338.8669387755102,
//     "loop": false
//   },
//   "64": {
//     "start": 340,
//     "end": 350.8785487528345,
//     "loop": false
//   },
//   "65": {
//     "start": 352,
//     "end": 362.8785487528345,
//     "loop": false
//   },
//   "66": {
//     "start": 364,
//     "end": 374.8785487528345,
//     "loop": false
//   },
//   "67": {
//     "start": 376,
//     "end": 386.8669387755102,
//     "loop": false
//   },
//   "68": {
//     "start": 388,
//     "end": 398.8785487528345,
//     "loop": false
//   },
//   "69": {
//     "start": 400,
//     "end": 410.8785487528345,
//     "loop": false
//   },
//   "70": {
//     "start": 412,
//     "end": 422.8785487528345,
//     "loop": false
//   },
//   "71": {
//     "start": 424,
//     "end": 434.901768707483,
//     "loop": false
//   },
//   "72": {
//     "start": 436,
//     "end": 446.8669387755102,
//     "loop": false
//   }
// }
