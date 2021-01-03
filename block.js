values = [2, 4];

class Blocks {
  
  constructor(w, h) {
    this.blocks = [];
    this.nBlocks = w * h;

    for (let y = 0; y < B_NUM_H; y++) {
      for (let x = 0; x < B_NUM_W; x++) {
        this.blocks.push(new Block(x, y, null, false));
      }
    }
  }

  show() {
    for (let b of this.blocks) {
      b.show();
    }
  }

  update() {
    let noMove = true;
    for (let x = 0; x < B_NUM; x++) {
      if (   this.blocks[x].isActive() && 
          !(this.blocks[x].justMvd()) && 
          x < ((B_NUM) - B_NUM_W) &&
          this.noBlockBelow(x)) {
        
            this.blocks[x+B_NUM_W].setActive(this.blocks[x].val);
            this.blocks[x].deactivate();
            noMove = false;
      }
    }
    for (let b of this.blocks) {
      b.moveDone();
    }
    
    for (let idx = 0; idx < this.blocks.length - B_NUM_W; idx++) {
      if (this.blocks[idx].val == this.blocks[idx+B_NUM_W].val) {
        this.blocks[idx].deactivate();
        this.blocks[idx].val = null;
        this.blocks[idx+B_NUM_W].val *= 2;
      }
    }
    
    if (noMove) {
      this.addNew();
    }
  }

  moveRight() {
    for (let idx = this.blocks.length - B_NUM_W - 1; idx >= 0; idx--) {
      if (this.blocks[idx].val != null) {
        
        this.blocks[idx+1] = this.blocks[idx];
        this.blocks[idx].val = null;
        this.blocks[idx].active = false;
        this.blocks[idx].justMoved = false;
      }
    }
  }

  moveLeft() {
    for (let idx = 0; idx < this.length - B_NUM_W; idx++) {
      if ((idx > 0) && this.blocks[idx].val != null) {
        this.blocks[idx-1] = this.blocks[idx];
        this.blocks[idx].val = null;
        this.blocks[idx].active = false;
        this.blocks[idx].justMoved = false;
      }
    }
  }

  noBlockBelow(pos) {
    if (this.blocks[pos+B_NUM_W].isActive()) {
      return false;
    } else {
      return true;
    }
  }

  addNew() {
    let newRow = floor(random(B_NUM_W));
    this.blocks[newRow] = new Block(newRow, 0, random(values), true);
  }
}

class Block {
  constructor(x, y, val = null, active = true) {
    this.x = x;
    this.y = y;
    this.val = val;
    this.active = active;
    this.justMoved = false;
  }

  show() {
    if (this.active) {
      fill(232, 131, 31, map(this.val, 2, 248, 50, 255));
      rect(this.x * BLOCKS_WIDTH, this.y * BLOCKS_HEIGHT, BLOCKS_WIDTH, BLOCKS_HEIGHT, BLOCKS_HEIGHT/5);
      textAlign(CENTER);
      fill(255);
      textSize(32);
      text(str(this.val), this.x * BLOCKS_WIDTH + BLOCKS_WIDTH / 2, this.y * BLOCKS_HEIGHT + BLOCKS_HEIGHT / 2 + 4);
      console.log("show() " + this);
    }
  }

  isActive() {
    return this.active;
  }

  setActive(val) {
    this.active = true;
    this.val = val;
    this.justMoved = true;
  }

  deactivate() {
    this.active = false;
    this.val = null;
  }

  justMvd() {
    return this.justMoved;
  }

  moveDone() {
    this.justMoved = false;
  }

}

