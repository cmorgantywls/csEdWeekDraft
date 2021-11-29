/*

Remixed from The Coding Train Snake Game video tutorial:
https://www.youtube.com/watch?v=OMoVcohRgZA

*/

let snake;
let res = 20;
let food = [1,1,1,1,1,0,0,1,1,0,1];
let foodLoc;
let foodIndex = 0;
let finalCode = "";
let w;
let h;
let codeFont;
let winOverlay;
let loseOverlay;

let textInput;
let button;

function preload() {
  codeFont = loadFont('Hacked-font.ttf');
  winOverlay = loadImage('win.png');
  loseOverlay = loadImage('lose.png');
}

function setup() {
  let can = createCanvas(500, 500);
  can.parent("#canvas-holder");

  textInput = createInput('type the decoded message here','text');
  textInput.parent("#input-holder");
  textInput.style("background-color: #FFFFFF; color: #262626; padding-left: 10px;")

  button = createButton('submit!');
  button.parent("#input-holder");
  button.mousePressed(submitAnswer);

  w = floor(width / res);
  h = floor(height / res);
  frameRate(5);
  snake = new Snake();
  foodLocation();
}

function foodLocation(){
  let x = floor(random(w));
  let y = floor(random(2, h));
  foodLoc = createVector(x,y);
}

function keyPressed() {
  if (keyCode == 32){
    snake = new Snake();
    foodLocation();
    foodIndex = 0;
    finalCode = "";
    loop();
  }

  if (keyCode === LEFT_ARROW && snake.xdir != 1) {
    snake.setDir(-1,0);
  } else if (keyCode === RIGHT_ARROW && snake.xdir != -1){
    snake.setDir(1,0);
  } else if (keyCode === DOWN_ARROW && snake.ydir != -1) {
    snake.setDir(0,1);
  } else if (keyCode === UP_ARROW && snake.ydir != 1) {
    snake.setDir(0,-1);
  }

}

function submitAnswer() {
  let response = select('#final-answer');
  let val = textInput.value();
  if (val == "1997"){
    response.html("The Snake game was popularized on <a href= 'https://youtu.be/KcpRyIFU7Eg?t=11' target='_blank'>Nokia phones</a> in 1997, though the arcade version called <i>Blockade</i> was released almost 20 years earlier in 1976. <br><br> <p>Congratulations! You completed the 2021 CS Scavenger Hunt. YOUR FINAL CLUE IS: Neveah was believed to have used Ruby.</p> Make sure to fill out the final form <a href='https://docs.google.com/forms/d/e/1FAIpQLSfCKjGOnXoeiI13xa59rY-QgKVxo6dMEe3y-IgFWkU85uWFrg/viewform' target='_blank'>HERE</a>.")
  } else {
      response.html("Nope! Try again.")
    }
}

function draw() {

  background(0);
  scale(res);

  noStroke();
  fill(0,255,60);
  textSize(1);
  textAlign(LEFT,TOP);
  textFont("Arial");

  if (snake.eat(foodLoc)) {
    foodIndex += 1;
    finalCode += food[foodIndex - 1]
    foodLocation();
  }

  text(food[foodIndex],foodLoc.x,foodLoc.y);

  snake.update();
  snake.show();

  scale(1/res);
  fill(100);
  rect(0, 0, width, 40);
  textFont(codeFont);
  textSize(40);
  fill(255);
  text("SECRET NUMBER: " + finalCode, 0, 0);

  if (snake.endGame()){
    // print("end game");
    background(0);
    image(loseOverlay,-60,-50);
    fill(255,0,0);
    textFont("Arial");
    textSize(25);
    textAlign(CENTER,CENTER);
    text("You lost :( \n Hit the space bar to try again", width/2, 50);
    noLoop();
  }

  if (snake.winGame()){
    // print("win game");
    fill(0)
    rect(0, 40, width, height - 40);
    image(winOverlay,0,0);
    fill(0,255,60);
    textFont("Arial");
    textSize(25);
    textAlign(CENTER,CENTER);
    text("You won! \n Decode the number and enter it above", width/2, 80);
    noLoop();
  }


}
