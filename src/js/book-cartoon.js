var bookCoords = [
  [150, 100, 200, 100, 150, 100, 150, 50, 150, 100, 100, 100, 'move', 'curve'],
  [100, 50, 150, 50, 100, 50, 110, 10, 100, 50, 50, 50, 'move', 'curve'],
  [150, 50, 200, 100, 110, 10, 150, 50, 50, 50, 100, 100, 'move', 'line'],
  [150, 100, 200, 100, 'curve'],
  [100, 50, 150, 50, 'curve'],
  [150, 50, 200, 100, 'line'],
  [50, 50, 100, 100],
  [50, 50, 100, 100],
  [100, 100, 150, 100, 'curve'],
  [100, 100, 150, 100, 'curve'],
  [50, 50, 100, 50, 'curve'],
  [50, 50, 100, 50, 'curve'],
  [100, 50, 150, 100, "c"],
  [50, 50, 50, 60],
  [50, 60, 100, 110],
  [100, 100, 100, 110],
  [100, 110, 150, 110, 'curve'],
  [150, 110, 200, 110, 'curve'],
  [200, 110, 200, 100],
  [150, 100, 150, 110],
  [50, 53, 100, 103],
  [50, 56, 100, 106],
  [50, 58, 100, 108],
  [100, 103, 150, 103, 'curve'],
  [150, 103, 200, 103, 'curve'],
  [100, 106, 150, 106, 'curve'],
  [150, 106, 200, 106, 'curve'],
  [100, 108, 150, 108, 'curve'],
  [150, 108, 200, 108, 'curve']
];
var framesPerSec = 8;
var turnPageCounter = 0;
var turnPageCoords = [];
for (var i = 0; i < bookCoords.length; i++) {
  turnPageCoords.push(bookCoords[i].concat([]));
}

var img;

function preload() {
  img = loadImage("/B&F/parts/background_img.jpg", 100, 100);
}

/*function grid(){
    background(255);
    stroke(0,150,240,20);
    for(i=25;i<width;i+=25){
      line(i,0,i,height);
    }
    for(j=25;j<height;j+=25){
        line(0,j,width,j);
      }
    stroke(0,0,150);
}*/
function book() {
  noFill();
  if (turnPageCounter === 0) {
    bookCoords.forEach(function(lineCoords) {
      if (lineCoords[lineCoords.length - 1] === 'curve') {
        curve(
          lineCoords[0] + Math.floor((Math.random() * 2) + 1) + 30,
          lineCoords[1] + Math.floor((Math.random() * 2) + 1) + 30,
          lineCoords[0] + Math.floor((Math.random() * 2) + 1),
          lineCoords[1] + Math.floor((Math.random() * 2) + 1),
          lineCoords[2] + Math.floor((Math.random() * 2) + 1),
          lineCoords[3] + Math.floor((Math.random() * 2) + 1),
          lineCoords[2] + Math.floor((Math.random() * 2) + 1) + 30,
          lineCoords[3] + Math.floor((Math.random() * 2) + 1) + 30)
      } else {
        line(
          lineCoords[0] + Math.floor((Math.random() * 2) + 1),
          lineCoords[1] + Math.floor((Math.random() * 2) + 1),
          lineCoords[2] + Math.floor((Math.random() * 2) + 1),
          lineCoords[3] + Math.floor((Math.random() * 2) + 1));
      }
    })
  } else {
    turnPage();
    turnPageCounter--;
  }
}

function turnPage() {
  for (i = 0; i < turnPageCoords.length; i++) {
    var lineCoords = turnPageCoords[i];
    if (lineCoords[lineCoords.length - 2] === "move") {
      if (turnPageCounter < 5) {
        lineCoords[0] -= (lineCoords[0] - lineCoords[8]) / 2;
        lineCoords[1] -= (lineCoords[1] - lineCoords[9]) / 2;
        lineCoords[2] -= (lineCoords[2] - lineCoords[10]) / 2;
        lineCoords[3] -= (lineCoords[3] - lineCoords[11]) / 2;
      } else {
        lineCoords[0] -= (lineCoords[0] - lineCoords[4]) / 3;
        lineCoords[1] -= (lineCoords[1] - lineCoords[5]) / 3;
        lineCoords[2] -= (lineCoords[2] - lineCoords[6]) / 3;
        lineCoords[3] -= (lineCoords[3] - lineCoords[7]) / 3;
      }
    }

    if (lineCoords[lineCoords.length - 1] === 'curve') {
      if (turnPageCounter > 4 && i != 4) {
        curve(
          lineCoords[0] + Math.floor((Math.random() * 2) + 1) + 30,
          lineCoords[1] + Math.floor((Math.random() * 2) + 1) + 30,
          lineCoords[0] + Math.floor((Math.random() * 2) + 1),
          lineCoords[1] + Math.floor((Math.random() * 2) + 1),
          lineCoords[2] + Math.floor((Math.random() * 2) + 1),
          lineCoords[3] + Math.floor((Math.random() * 2) + 1),
          lineCoords[2] + Math.floor((Math.random() * 2) + 1) + 30,
          lineCoords[3] + Math.floor((Math.random() * 2) + 1) + 30)
      } else if (turnPageCounter <= 4) {
        curve(
          lineCoords[0] + Math.floor((Math.random() * 2) + 1) + 30,
          lineCoords[1] + Math.floor((Math.random() * 2) + 1) + 30,
          lineCoords[0] + Math.floor((Math.random() * 2) + 1),
          lineCoords[1] + Math.floor((Math.random() * 2) + 1),
          lineCoords[2] + Math.floor((Math.random() * 2) + 1),
          lineCoords[3] + Math.floor((Math.random() * 2) + 1),
          lineCoords[2] + Math.floor((Math.random() * 2) + 1) + 30,
          lineCoords[3] + Math.floor((Math.random() * 2) + 1) + 30)
      }
    } else {
      line(
        lineCoords[0] + Math.floor((Math.random() * 2) + 1),
        lineCoords[1] + Math.floor((Math.random() * 2) + 1),
        lineCoords[2] + Math.floor((Math.random() * 2) + 1),
        lineCoords[3] + Math.floor((Math.random() * 2) + 1));
    }
  }
  if (turnPageCounter === 1) {
    turnPageCoords = [];
    for (i = 0; i < bookCoords.length; i++) {
      turnPageCoords.push(bookCoords[i].concat([]));
    }
  }
}

function mousePressed() {

  if (turnPageCounter === 0) turnPageCounter = 7;
  return false;
}

function setup() {
  img.resize(windowWidth, windowHeight);
  image(img);
  createCanvas(windowWidth,windowHeight);
  frameRate(framesPerSec);

}

function draw() {
  scale(1.5, 1.5);
  strokeWeight(0.8);
  stroke(0, 0, 150);
  image(img);
  translate(-200);
  book();
}
