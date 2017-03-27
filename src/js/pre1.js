var coordsFactor = 1.5;
var gap = 4;
var framerate = 8;
var mouseChaos = 1;
var imgPool = {};
var imgSources = [
  "/B&F/parts/background_img.jpg",
  "/B&F/parts/fr_eye_left.png",
  "/B&F/parts/fr_eye_right.png",
  "/B&F/parts/fr_mouth.png",
  "/B&F/parts/fr_backgr1.png",
  "/B&F/parts/fr_backgr2.png",
  "/B&F/parts/fr_backgr3.png",
  "/B&F/parts/bubble_eye_left.png",
  "/B&F/parts/bubble_eye_right.png",
  "/B&F/parts/bubble_mouth.png",
  "/B&F/parts/bubble_backgr1.png",
  "/B&F/parts/bubble_backgr2.png",
  "/B&F/parts/bubble_backgr3.png",
  "/B&F/parts/bubble_backgr4.png",
  "/B&F/chars/comma.png",
  "/B&F/chars/dot.png",
  "/B&F/chars/ques.png",
  "/B&F/chars/excl.png",
  "/B&F/chars/dash.png",
  "/B&F/chars/quote-right.png",
  "/B&F/chars/quote-left.png",
  "/B&F/chars/1.png",
  "/B&F/chars/2.png",
  "/B&F/chars/3.png",
  "/B&F/chars/4.png",
  "/B&F/chars/5.png",
  "/B&F/chars/6.png",
  "/B&F/chars/7.png",
  "/B&F/chars/8.png",
  "/B&F/chars/9.png",
  "/B&F/chars/10.png",
  "/B&F/chars/11.png",
  "/B&F/chars/12.png",
  "/B&F/chars/13.png",
  "/B&F/chars/14.png",
  "/B&F/chars/15.png",
  "/B&F/chars/16.png",
  "/B&F/chars/17.png",
  "/B&F/chars/18.png",
  "/B&F/chars/19.png",
  "/B&F/chars/20.png",
  "/B&F/chars/21.png",
  "/B&F/chars/22.png",
  "/B&F/chars/23.png",
  "/B&F/chars/24.png",
  "/B&F/chars/25.png",
  "/B&F/chars/26.png",
  "/B&F/chars/27.png",
  "/B&F/chars/28.png",
  "/B&F/chars/29.png",
  "/B&F/chars/30.png",
  "/B&F/chars/31.png",
  "/B&F/chars/32.png",
  "/B&F/chars/33.png"
];
var dict = {
  "А": 1,
  "Б": 2,
  "В": 3,
  "Г": 4,
  "Д": 5,
  "Е": 6,
  "Ё": 7,
  "Ж": 8,
  "З": 9,
  "И": 10,
  "Й": 11,
  "К": 12,
  "Л": 13,
  "М": 14,
  "Н": 15,
  "О": 16,
  "П": 17,
  "Р": 18,
  "С": 19,
  "Т": 20,
  "У": 21,
  "Ф": 22,
  "Х": 23,
  "Ц": 24,
  "Ч": 25,
  "Ш": 26,
  "Щ": 27,
  "Ъ": 28,
  "Ы": 29,
  "Ь": 30,
  "Э": 31,
  "Ю": 32,
  "Я": 33,
  "!": "excl",
  "?": "ques",
  "—": "dash",
  "«": "quote-left",
  "»": "quote-right",
  ".": "dot",
  ",": "comma"
};

Frustration.prototype = new Character();
Bubble.prototype = new Character();
var frustr = new Frustration(5, [
  [350, 100],
  [10, 0],
  [10, 0],
  [10, 0],
  [10, 0],
  [10, 0],
  [10, 5],
  [10, 5],
  [10, 5],
  [10, 5],
  [10, 10],
  [5, 10],
  [5, 10],
  [0, 10],
  [-5, 10],
  [-5, 10],
  [-10, 10],
  [-10, 5],
  [-10, 5],
  [-10, 5],
  [-10, 5],
  [-10, 0],
  [-10, 0],
  [-10, 0],
  [-10, 0],
  [-10, 0],
  [-10, -5],
  [-10, -5],
  [-10, -5],
  [-10, -5],
  [-10, -10],
  [-5, -10],
  [-5, -10],
  [0, -10],
  [5, -10],
  [5, -10],
  [10, -10],
  [10, -5],
  [10, -5],
  [10, -5],
  [10, -5]
]);
var mainBubble = new Bubble(40, [
  [30, 225],
  [30, 0],
  [40, 0],
  [30, 0],
  [20, 0],
  [5, 2],
  [4, 4],
  [1, 4],
  [0, 30],
  [0, 30],
  [0, 30],
  [-2, 4],
  [-4, 4],
  [-4, 2],
  [-40, 0],
  [-30, 0],
  [-20, 0],
  [-26, 0],
  [-16, 17],
  [5, -17],
  [-4, 0],
  [-4, -2],
  [-4, -4],
  [-1, -4],
  [0, -25],
  [0, -35],
  [0, -30],
  [2, -4],
  [4, -4],
  [4, -2],
  [10, 0]
]);

SpeechBubble.prototype = mainBubble;

var bubbleTalks = new SpeechBubble(40, [
  [177, 117],
  [30, 0],
  [40, 0],
  [30, 0],
  [20, 0],
  [5, 2],
  [4, 4],
  [1, 4],
  [0, 10],
  [0, 40],
  [0, 20],
  [-2, 4],
  [-4, 4],
  [-4, 2],
  [-40, 0],
  [-20, 0],
  [-30, 0],
  [-26, 0],
  [-16, 17],
  [5, -17],
  [-4, 0],
  [-4, -2],
  [-4, -4],
  [-1, -4],
  [0, -46],
  [0, -10],
  [0, -15],
  [2, -4],
  [4, -4],
  [4, -2],
  [10, 0]
]);
var bubbleTalksTalks = new SpeechBubble(40, [
  [323, 35],
  [20, 0],
  [40, 0],
  [20, 0],
  [5, 2],
  [4, 4],
  [1, 4],
  [0, 30],
  [0, 10],
  [-2, 4],
  [-4, 4],
  [-4, 2],
  [-40, 0],
  [-10, 0],
  [-26, 0],
  [-16, 17],
  [5, -17],
  [-4, 0],
  [-4, -2],
  [-4, -4],
  [-1, -4],
  [0, -26],
  [0, -15],
  [2, -4],
  [4, -4],
  [4, -2],
  [10, 0]
]);

function preload() {
  for (var i = 0,len=imgSources.length; i < len ; i++) {
    imgPool[imgSources[i].split('/')[3].split('.')[0]] = loadImage(imgSources[i]);
  }
}

function setup() {
  createCanvas(650, windowHeight);
  frameRate(framerate);
  strokeCap(ROUND);
  imgPool.background_img.resize(655, windowHeight+5);
}

function draw() {
  var backgroundBuzzX = random(-5, 0);
  var backgroundBuzzY = random(-5, 0);
  translate(backgroundBuzzX, backgroundBuzzY);
  image(imgPool.background_img);
  translate(-backgroundBuzzX + lookup() * gap, -backgroundBuzzY + lookup() * gap);
  //scale(1.25, 1.25);
  //frustr.draw();
  //REWRITE AS SWITCH
  if (frameCount > 5) mainBubble.drawLines();
  if (frameCount < 20) {
    mainBubble.drawImages();
  } else if (frameCount < 25) {
    mainBubble.drawImages('left');
  } else if (frameCount < 30) {
    mainBubble.drawImages('right');
  } else {
    mainBubble.drawImages();
  }
  if (frameCount > 30) {
    bubbleTalks.drawLines();
    bubbleTalks.drawChars("Эй, есть тут\nкто вообще?");
  }
  if (frameCount > 50) {
    bubbleTalks.sweepChars = true;
    bubbleTalks.drawImages();
  }
  if (frameCount > 57) {
    bubbleTalksTalks.drawLines();
    bubbleTalksTalks.drawChars("Не думаю");
  }
  if (frameCount > 67) {
    mainBubble.drawImages("left");
  }
  mainBubble.drawLines();
  if (frameCount > 80) {
    mainBubble.chaosRate = 100;
    bubbleTalks.chaosRate = 100;
    bubbleTalksTalks.chaosRate = 100;
  }
  if (frameCount > 85) {
    translate(-2, -2);
    image(imgPool.background_img);
    bubbleTalks.sweepChars = false;
    bubbleTalks.chaosRate = 1;
    translate(-250, -200);
    scale(2, 2);
    bubbleTalks.drawChars("Конец");
  }
  if (frameCount > 100) {
    scale(0.5, 0.5);
    translate(235,280);
    bubbleTalks.drawChars("Нажмите для\nперезагрузки");
  }
  if (mouseChaos > 0) mouseChaos-=2;
  else mouseChaos = 1;
}

function mousePressed(){
  mouseChaos = 10;
  if (frameCount > 100) window.location.reload();
}

function Character() {
  this.bodypart = function(src, startX, startY, widthX, heightY) {
    image(
      imgPool[src],
      this.coords[0][0] + startX * coordsFactor + lookup() * gap * mouseChaos,
      this.coords[0][1] + startY * coordsFactor + lookup() * gap * mouseChaos,
      widthX * coordsFactor + lookup() * gap * mouseChaos,
      heightY * coordsFactor + lookup() * gap * mouseChaos
    );
  };
  this.framecounter = 1;
  this.changeImgFrames = function(template, number, coords) {
    image(imgPool[template + this.framecounter], coords[0], coords[1], coords[2], coords[3]);
    this.framecounter < number ? this.framecounter++ : this.framecounter = 1;
  }
}

function Frustration(chaosRate, coords) {
  this.chaosRate = chaosRate;
  this.step = chaosRate / framerate * 2;
  this.coords = scaleCoords(coords, coordsFactor);
  this.coords_countX = 0;
  this.coords_countY = 0;
  this.frustrLine = function() {
    stroke(0, 0, 50 + random(-50, 50));
    strokeWeight(0.25 + random(0, 0.5));
    beginShape();
    vertex(
      this.coords_countX + lookup() * gap * this.chaosRate * mouseChaos,
      this.coords_countY + lookup() * gap * this.chaosRate * mouseChaos);
    bezierVertex(
      this.coords_countX + lookup() * gap * this.chaosRate * mouseChaos,
      this.coords_countY + lookup() * gap * this.chaosRate * mouseChaos,
      this.coords_countX + lookup() * gap * this.chaosRate * mouseChaos,
      this.coords_countY + lookup() * gap * this.chaosRate * mouseChaos,
      this.coords_countX + this.coords[i + 1][0] + lookup() * gap * this.chaosRate * mouseChaos,
      this.coords_countY + this.coords[i + 1][1] + lookup() * gap * this.chaosRate * mouseChaos
    );
    endShape();
  };
  this.draw = function() {
    noFill();
    this.coords_countX = 0;
    this.coords_countY = 0;
    for (var i = 0, len=coords.length - 1; i < len; i++){
      this.coords_countX += this.coords[i][0];
      this.coords_countY += this.coords[i][1];
      this.frustrLine();
      this.frustrLine();
      this.frustrLine();
      this.frustrLine();
    }
    push();
    if (this.chaosRate > 1) {
      translate(-1000, -1000)
    }
    /*blendMode(HARD_LIGHT);
        changeImgFrames([imgPool.fr_backgr1, imgPool.fr_backgr2, imgPool.fr_backgr3],
        [coords[0][0]-95+lookup()*gap, coords[0][1]-60+lookup()*gap,
        175*coordsFactor+lookup()*gap, 175*coordsFactor+lookup()*gap],
        'fr_counter');
        blendMode(BLEND)*/
    this.bodypart('fr_eye_right', 40, 25, 35, 15);
    this.bodypart('fr_eye_left', -10, 25, 35, 15);
    this.bodypart('fr_mouth', 0, 65, 60, 20);
    translate(1000, 1000)
    pop();
    if (this.chaosRate > 1 + this.step) this.chaosRate -= this.step;
    else this.chaosRate = 1;
  };
}

function Bubble(chaosRate, coords) {
  this.chaosRate = chaosRate;
  this.step = chaosRate * 2 / framerate;
  this.coords = scaleCoords(coords, coordsFactor);
  this.coords_countX = 0;
  this.coords_countY = 0;
  this.eyesPosition = function(direction) {
    switch (direction) {
      case "right":
        translate(-350, 0);
        shearX(PI / 4.5);
        break;
      case "up":
        translate(500, 50);
        rotate(PI / 7)
        shearY(-PI / 7);
        shearX(-PI / 6);
        break;
      case "left":
        translate(320, 40);
        rotate(PI / 7)
        shearY(-PI / 7);
        shearX(-PI / 10);
        break;
      default:
        break;
    }
  }
  this.bubbleLine = function(i) {
    stroke(0, 0, 50 + random(-50, 50));
    strokeWeight(0.1 + random(0, 1.25));
    line(
      this.coords_countX + lookup() * gap * this.chaosRate * mouseChaos,
      this.coords_countY + lookup() * gap * this.chaosRate * mouseChaos,
      this.coords_countX + this.coords[i + 1][0] + lookup() * gap * this.chaosRate * mouseChaos,
      this.coords_countY + this.coords[i + 1][1] + lookup() * gap * this.chaosRate * mouseChaos
    );
  };

  this.drawImages = function(eyes) {
    noFill();
    push();
    if (this.chaosRate > 1) {
      translate(-1000, -1000);
    }
    this.changeImgFrames("bubble_backgr", 4, [coords[0][0] - 20 * coordsFactor, coords[0][1] - 2.5 * coordsFactor, 150 * coordsFactor, 130 * coordsFactor]);
    push();
    this.eyesPosition(eyes);
    this.bodypart('bubble_eye_right', 60, 25, 35, 15);
    this.bodypart('bubble_eye_left', 10, 25, 35, 15);
    pop();

    this.bodypart('bubble_mouth', 20, 70, 60, 20);
    translate(1000, 1000);
    pop();
  }
  this.drawLines = function() {
    this.coords_countX = 0;
    this.coords_countY = 0;
    for (var i = 0, len=this.coords.length - 1; i < len; i++) {
      this.coords_countX += this.coords[i][0];
      this.coords_countY += this.coords[i][1];
      this.bubbleLine(i);
      this.bubbleLine(i);
      this.bubbleLine(i);
    }
    if (this.chaosRate > 1 + this.step) this.chaosRate -= this.step;
    else this.chaosRate = 1;
  }
}

function SpeechBubble(chaosRate, coords) {
  this.chaosRate = chaosRate;
  this.step = chaosRate * 1.75 / framerate;
  this.coords = scaleCoords(coords, coordsFactor);
  this.sweepChars = false;
  this.drawChars = function(speech) {
    this.speech = speech.toUpperCase().split('');
    push();

    for (var lines_counter = 1, i = 0, len=this.speech.length; i < len; i++) {
      if (this.sweepChars) {
        if (this.speech[i] == '\n') {
          translate(-200, 0);
          lines_counter++;
        } else if (this.speech[i] != ' ') {
          rotate(lookup() / 300)
          image(imgPool[dict[this.speech[i]]],
            this.coords[0][0] - 20 + lookup() * gap * 10 * mouseChaos / 2 * this.chaosRate + i * 17,
            this.coords[0][1] + 100 + lookup() * gap * mouseChaos / 2 * this.chaosRate,
            15, 23);
        }
      } else {
        if (this.speech[i] == '\n') {
          translate(-200, 30);
          lines_counter++;
        } else if (this.speech[i] != ' ') {
          rotate(lookup() / 300)
          image(imgPool[dict[this.speech[i]]],
            this.coords[0][0] - 20 + lookup() * gap * mouseChaos / 2 * this.chaosRate + i * 17,
            this.coords[0][1] + 30 + lookup() * gap * mouseChaos / 2 * this.chaosRate,
            15, 23);
        }
      }
    }

    pop();
  }
  this.drawImages = function(eyes) {
    noFill();
    push();
    if (this.chaosRate > 1) {
      translate(-1000, -1000);
    }
    push();
    this.eyesPosition(eyes);
    this.bodypart('fr_eye_right', 65, 10, 30, 12);
    this.bodypart('fr_eye_left', 20, 10, 30, 12);
    pop();

    this.bodypart('bubble_mouth', 30, 45, 50, 17);
    translate(1000, 1000);
    pop();
  }
}
