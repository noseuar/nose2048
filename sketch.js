B_NUM_H = 6;
B_NUM_W = 6;
B_NUM = B_NUM_H * B_NUM_W
CANVAS_HEIGHT = 600
CANVAS_WIDTH = 800
BLOCKS_HEIGHT = CANVAS_HEIGHT / B_NUM_H ;
BLOCKS_WIDTH =  CANVAS_WIDTH / B_NUM_W;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  frameRate(2);
  blocks = new Blocks(B_NUM_W, B_NUM_H);
  blocks.addNew();
}

function draw() {
  background(0);
  blocks.show();
  blocks.update();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    blocks.moveLeft();
  } else if (keyCode === RIGHT_ARROW) {
    blocks.moveRight();
  }
}