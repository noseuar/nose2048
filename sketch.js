B_NUM_H = 4;
B_NUM_W = 5;
B_NUM = B_NUM_H * B_NUM_W
CANVAS_HEIGHT = 600
CANVAS_WIDTH = 800
BLOCKS_HEIGHT = CANVAS_HEIGHT / B_NUM_H ;
BLOCKS_WIDTH =  CANVAS_WIDTH / B_NUM_W;
SPEED = 4;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  blocks = new Blocks();
  blocks.addNew();
}

function draw() {
  background(0);
  blocks.show();
  blocks.update();
  noStroke();
  fill(255);
  textAlign(RIGHT);
  text("Punkte: " + str(blocks.points), width-BLOCKS_WIDTH/2, BLOCKS_HEIGHT/2)
  if ((blocks.blocks.length >= (B_NUM - B_NUM_W)) ||
      ((blocks.colMaxNum) >= B_NUM_H)) {
    stroke(200, 100, 30);
    textSize(62);
    text("END", width/2, height/2);
    noLoop();
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    blocks.moveLeft();
  } else if (keyCode === RIGHT_ARROW) {
    blocks.moveRight();
  }
}