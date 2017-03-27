'use strict';

var tracks = [{
  name: '1solodowhiskey',
  detune: -400
}, {
  name: 'Весна',
  detune: -400
}, {
  name: '1995',
  detune: -400
}, {
  name: 'Love Fade',
  detune: -300
}, {
  name: 'Leopard Flowers',
  detune: -400
}, {
  name: 'Let Me Go',
  detune: -500
}, {
  name: 'Keep Slipping Away',
  detune: -500
}, {
  name: 'Low Tide',
  detune: -200
}, {
  name: 'Midnight',
  detune: -500
}, {
  name: 'Rat Race',
  detune: -500
}, {
  name: 'Real Hero',
  detune: -500
}, {
  name: 'Potion',
  detune: -400
}, {
  name: 'Low Rider',
  detune: -600
}, {
  name: 'Lovers Who Uncover',
  detune: -400
}, {
  name: 'Malibu Gas Station',
  detune: -500
}, {
  name: 'Ride Into The Sun',
  detune: -400
}, {
  name: 'SEJCHAS',
  detune: -400
}, {
  name: 'SHIT',
  detune: -400
}, {
  name: 'Moor',
  detune: -400
}, {
  name: 'No Life For Me',
  detune: -200
}, {
  name: 'NRA Reprise',
  detune: -300
}, {
  name: 'Sunday',
  detune: -300
}, {
  name: 'Thursday',
  detune: -300
}, {
  name: 'Intro',
  detune: -400
}, {
  name: 'Inside Out',
  detune: -400
}, {
  name: 'How It\'s Gonna Go',
  detune: -200
}, {
  name: 'Depersonalisation',
  detune: -300
}, {
  name: 'Frost',
  detune: -400
}, {
  name: 'Crockett\'s theme',
  detune: -500
}, {
  name: 'Crying shame',
  detune: -400
}, {
  name: 'Аутсайдер',
  detune: -400
}, {
  name: 'КДИМБ - Лунные Девицы',
  detune: -400
}, {
  name: 'Гудбай, Америка',
  detune: -400
}, {
  name: 'What is love',
  detune: -600
}, {
  name: 'When I\'m Small',
  detune: -400
}, {
  name: 'Winter Beats',
  detune: -400
}, {
  name: 'Would You',
  detune: -500
}, {
  name: 'Африка',
  detune: -300
}, {
  name: 'Без Тебя Пиздец',
  detune: -300
}, {
  name: 'Дыхание',
  detune: -400
}, {
  name: 'Лунные Девицы',
  detune: -400
}, {
  name: 'Последний Метод',
  detune: -300
}, {
  name: 'Семь Планет',
  detune: -400
}, {
  name: 'Терминатор',
  detune: -400
}, {
  name: 'эй, цветок!',
  detune: -300
}, {
  name: 'Юные Волны',
  detune: -400
}, {
  name: 'Twin Peaks',
  detune: -500
}, {
  name: 'All I Want For Christmas',
  detune: -200
}, {
  name: 'Baby\'s Arms',
  detune: -400
}, {
  name: 'Bad Love',
  detune: -300
}, {
  name: 'Birds For The Mind',
  detune: -500
}, {
  name: 'Black Cab',
  detune: -400
}, {
  name: 'Dead Man',
  detune: -400
}, {
  name: 'Dreamer To The Dawn',
  detune: -400
}, {
  name: 'Dub Of Fire',
  detune: -400
}, {
  name: 'Electricity',
  detune: -500
}, {
  name: 'Endless Lakes',
  detune: -400
}, {
  name: 'Fade To Grey',
  detune: -400
}, {
  name: 'Get Up, Action!',
  detune: -600
}, {
  name: 'Ghostbusters',
  detune: -600
}, {
  name: 'Girls Just Want to Have Fun',
  detune: -500
}, {
  name: 'Go Go Yellow Screen',
  detune: -600
}, {
  name: 'Goin\' Out West',
  detune: -300
}, {
  name: 'Golden Brown',
  detune: -300
}, {
  name: 'Goodbye Horses',
  detune: -400
}, {
  name: 'Great Flood',
  detune: -300
}, {
  name: 'Heart To Heart',
  detune: -300
}, {
  name: 'Heavy Eyes',
  detune: -400
}, {
  name: 'Hey Hey Guy',
  detune: -500
}];

var index = 0,
    gainNode = null,
    context = void 0,
    source = void 0,
    sampleBuffer = null,
    playstop = document.querySelector('.play-stop'),
    originalaudio = document.querySelector('.original-player audio'),
    originalsrc = document.querySelector('.original-player audio source'),
    originalplayer = document.querySelector('.original-player'),
    display_span = document.querySelector('.original-player .display span'),
    wasPlaying = false;
window.addEventListener('load', init, false);
function init() {
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
  } catch (e) {
    alert('Web Audio API is not supported in this browser');
  }
  display_span.innerHTML = tracks[index].name;
  loadSound('assets/romantic-collection-samples/' + tracks[index].name + '.wav');
  originalaudio.src = 'assets/romantic-collection-samples/' + tracks[index].name + '.wav';
  originalaudio.load();
}

function loadSound(url) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';
  // Decode asynchronously
  request.onload = function () {
    context.decodeAudioData(request.response, function (buffer) {
      sampleBuffer = buffer;
      // originalaudio.src = tracks[index].original;
      display_span.innerHTML = tracks[index].name;
      if (playstop.classList.contains('stop')) {
        if (source) {
          stop();
        }
        play();
      }
    }, function err() {
      alert('Error');
    });
  };
  request.send();
  document.querySelector('#speed').value = tracks[index].detune;
}

var play = function play() {
  if (!context.createGain) context.createGain = context.createGainNode;
  gainNode = context.createGain();
  source = context.createBufferSource();
  source.buffer = sampleBuffer;
  // Connect source to a gain node
  source.connect(gainNode);
  // Connect gain node to destination
  gainNode.connect(context.destination);
  // Start playback in a loop
  changeVolume(document.querySelector('#volume'));
  source.detune.value = document.querySelector('#speed').value;
  source.loop = true;
  if (!source.start) source.start = source.noteOn;
  source.start(0);
};

var changeVolume = function changeVolume(element) {
  var volume = element.value;
  var fraction = parseInt(element.value) / parseInt(element.max);
  // Let's use an x*x curve (x-squared) since simple linear (x) does not
  // sound as good.
  gainNode.gain.value = fraction * fraction;
};

var changeSpeed = function changeSpeed(element) {
  source.detune.value = element.value;
};

var stop = function stop() {
  if (!source.stop) {
    source.stop = source.noteOff;
  }
  source.stop(0);
};

var preventMultiple = function preventMultiple() {
  playstop.classList.remove('stop');
  if (source) stop();
};

playstop.addEventListener('click', function () {
  if (!playstop.classList.contains('stop')) {
    playstop.classList.add('stop');
    if (originalaudio.currentTime > 0) {
      originalaudio.pause();
    }
    play();
    // loadSound('romantic-collection-samples/' + tracks[index].name + '.wav');
  } else {
    playstop.classList.remove('stop');
    stop();
  }
});

document.querySelector('.toggle-original').addEventListener('click', function () {
  if (originalplayer.style.display == 'flex') {
    originalplayer.setAttribute('style', 'display:none');
  } else {
    originalplayer.setAttribute('style', 'display:flex');
  }
});

function switchTrack() {
  if (originalaudio.currentTime > 0 && !playstop.classList.contains('stop') && !originalaudio.paused) {
    originalaudio.src = 'assets/romantic-collection-samples/' + tracks[index].name + '.wav';
    originalaudio.play();
    display_span.innerHTML = tracks[index].name;
    loadSound('assets/romantic-collection-samples/' + tracks[index].name + '.wav');
    return;
  } else {
    originalaudio.src = 'assets/romantic-collection-samples/' + tracks[index].name + '.wav';
  }
  if (source) stop();
  loadSound('assets/romantic-collection-samples/' + tracks[index].name + '.wav');
}

document.querySelector('.next-track').addEventListener('click', function () {
  if (index < tracks.length - 1) {
    index += 1;
  } else {
    index = 0;
  }
  switchTrack();
});

document.querySelector('.prev-track').addEventListener('click', function () {
  if (index > 0) {
    index -= 1;
  } else {
    index = tracks.length - 1;
  }
  switchTrack();
});