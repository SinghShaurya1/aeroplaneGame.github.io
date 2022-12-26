var canvas;
var backgroundImage, backgroundImage2;
var database;
let aeroplane1Img, aeroplane2Img, aeroplane3Img;
var form, player;
var playerCount;
var gameState;
let allPlayers = [];
var aeroplane1, aeroplane2, aeroplane3, aeroplanes;
let obstacleImage;
let obstacles;
let obstacle
let crashSound, planeCrossedSound;
let boom;

function preload() {
  backgroundImage = loadImage("./assets/Untitled.png");
  aeroplane1Img = loadImage('./assets/Aeroplane1.png')
  aeroplane2Img = loadImage('./assets/Aeroplane2.png');
  aeroplane3Img = loadImage('./assets/Aeroplane3.png');
  obstacleImage = loadImage('./assets/bird.png')
  crashSound = loadSound('./assets/planeCrashSound.mp3')
  planeCrossedSound = loadSound('./assets/planeCrossPlaneSound.mp3')
  backgroundImage2 = loadImage('./assets/bg2img.png')
  boom = loadImage('./assets/boom.png')
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

}

function draw() {
  background(backgroundImage2);
  if (playerCount == 3) {
    game.update(1);
  }

  if (gameState == 1) {
    game.play();
  }

  if(gameState == 2){
    game.end();
  } 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
