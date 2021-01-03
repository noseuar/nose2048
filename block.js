values = [2, 4];

class Blocks {
  
  constructor() {
    this.blocks = [];
  }

  show() {
    this.blocks.forEach(e => e.show());
  }

  update() {
    let otherObject = null;
    for (let idx = 0; idx < this.blocks.length; idx++) {
      if (this.blocks[idx].isActive()) {
        otherObject = this.landedOn(this.blocks[idx]);
        if (otherObject != null) {
          if (otherObject.val != this.blocks[idx].val) {
            this.blocks[idx].stopp();
          } else {
            console.log(otherObject);
            console.log("oben y: " + str(this.blocks[idx].y) + " unten " + str(otherObject.y) );
            otherObject.val *= 2;
            this.blocks.splice(idx, 1);
          }
        }
      }
    }

    for (let b of this.blocks) {
      b.update();
    }

    let needMore = true;
    for (let idx = 0; idx < this.blocks.length; idx++) {
      if (this.blocks[idx].active) {
        needMore = false;
      }
    }

    if (needMore) {
      this.addNew();
    }
  }

  addNew() {
    let newRow = floor(random(B_NUM_W));
    this.blocks.push(new Block(newRow, 0, random(values), true));
  }

  landedOn(obj) {
    let retObj = null;
    for (let idx = 0; idx < this.blocks.length; idx++) {

      if ((this.blocks[idx].isActive() != true) &&
         ((obj.x + BLOCKS_WIDTH/2) > this.blocks[idx].x ) && 
         ((obj.x + BLOCKS_WIDTH/2) < (this.blocks[idx].x + BLOCKS_WIDTH)) && 
         ((obj.y + BLOCKS_HEIGHT) >= this.blocks[idx].y)){
            retObj = this.blocks[idx];
          }
      
    }
    return retObj;
  }
}

class Block {
  constructor(x, y, val = null, active = true) {
    this.x = x * BLOCKS_WIDTH;
    this.y = y * BLOCKS_HEIGHT;
    this.val = val;
    this.active = active;
  }

  show() {
    
    fill(232, 131, 31, map(this.val, 2, 248, 50, 255));
    rect(this.x, this.y, BLOCKS_WIDTH, BLOCKS_HEIGHT, BLOCKS_HEIGHT/5);
    textAlign(CENTER);
    fill(255);
    textSize(32);
    text(str(this.val), this.x + BLOCKS_WIDTH / 2, this.y + BLOCKS_HEIGHT / 2 + 4);
    console.log("show() " + this);
    
  }

  update() {
    if ((this.active == true)&&(this.y + BLOCKS_HEIGHT) < height) {
      this.y = this.y + 2;
    } else {
      this.active = false;
    }
  }

  isActive() {
    return (this.active);
  }

  setActive(val) {
    this.active = true;
    this.val = val;
    this.justMoved = true;
  }

  stopp() {
    this.active = false;
  }

  justMvd() {
    return this.justMoved;
  }

  moveDone() {
    this.justMoved = false;
  }

}

