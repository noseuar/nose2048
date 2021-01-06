values = [2, 4];

class Blocks {
  
  constructor() {
    this.blocks = [];
    this.columns = new Array(B_NUM_W).fill(0);
    this._columns = new Array(B_NUM_W).fill(0);
    this.colMax = 0;
    this.colMaxNum = 0;
    this.points = 0;
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
            this.blocks[idx].y = otherObject.y - BLOCKS_HEIGHT;
          } else {
            otherObject.val *= 2;
            this.blocks.splice(idx, 1);
          }
        }
      }
    }

    this._columns.fill(0);
    this.colMax = 0;
    let tempMax = 0;
    for (let b of this.blocks) {
      b.update();
      this._columns[b.getColumn()] += 1;
      if (this._columns[b.getColumn()] > tempMax) {
        tempMax = this._columns[b.getColumn()];
        this.colMax = b.getColumn();
      }
    }
    
    this.columns = this._columns;

    
    let focusCol = [];
    let tempColNumMax = 0;
    for (let idx = 0; idx < B_NUM_W; idx++) {
      focusCol = this.getColumnA(idx);
/*       console.log("shrink column: " + str(idx));
      console.log(focusCol[idx]); */
      if (focusCol.length >= 2) {
        for (let elementIdx = 0; elementIdx < focusCol.length - 1; elementIdx++) {
          if (focusCol[elementIdx].val == focusCol[elementIdx + 1].val) {
            focusCol[elementIdx + 1].val *= 2;
            this.blocks.splice(this.blocks.indexOf(focusCol[elementIdx]), 1);
          }
        }
      }
      if (focusCol.length > this.colMaxNum) {
        this.colMaxNum = focusCol.length;
      }
    }

    let needMore = true;
    for (let idx = 0; idx < this.blocks.length; idx++) {
      if (this.blocks[idx].active) {
        needMore = false;
      }
    }

    if (needMore) {
      this.addNew();
      this.points++;
    }
  }

  getColumnA(num) {
    let retList = [];
    if ((num >= 0) && (num < B_NUM_W)) {
      for (let b of this.blocks) {
        if (b.isActive() == false) {
          if (b.getColumn() == num) {
            retList.push(b);
            // if (retList.length < 1) {
            //   retList.push(b);
            // } else {
            //   if (retList[retList.length-1].y > b.y) {
            //     retList.push(b);
            //   } else {
            //     retList.unshift(b);
            //   }
            // }
          }
        }
      }
      retList.sort(function(a, b) {
        return a.y - b.y;
      });
    }
    return retList;
  }

  getColumnAHeadPosY(idx) {
    let tempList = [];
    tempList = this.getColumnA(idx);
    return (height - (tempList.length * BLOCKS_HEIGHT));
  }

  getActiveBlock() {
    for (let b of this.blocks) {
      if (b.isActive()) {
        return b
      }
    }
    return null;
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
         ((obj.y + BLOCKS_HEIGHT + SPEED) >= this.blocks[idx].y)){
            retObj = this.blocks[idx];
          }
      
    }
    return retObj;
  }

  moveLeft() {
    let b = this.getActiveBlock();
    if ((b.getColumn() > 0) && ((b.y + BLOCKS_HEIGHT) < this.getColumnAHeadPosY(b.getColumn() - 1))) {
      b.x -= BLOCKS_WIDTH;
    }
  }

  moveRight() {
    let b = this.getActiveBlock();
    if ((b.getColumn() < B_NUM_W-1) && (b.y + BLOCKS_HEIGHT < this.getColumnAHeadPosY(b.getColumn() + 1))) {
      b.x += BLOCKS_WIDTH;
    }
  }
}

class Block {
  constructor(x, y, val = null, active = true) {
    this.x = x * BLOCKS_WIDTH;
    this.y = y * BLOCKS_HEIGHT;
    this.column = x;
    this.val = val;
    this.active = active;
  }

  show() {
    strokeWeight(BLOCKS_WIDTH/30);
    stroke(200, 100, 30);
    //console.log(Math.log2(this.val));
    //fill(232, 131, 31, Math.log2(this.val)*20);
    fill(232, 131, 31, Math.log2(this.val)*20);
    rect(this.x, this.y, BLOCKS_WIDTH, BLOCKS_HEIGHT, BLOCKS_HEIGHT/5);
    textAlign(CENTER);
    fill(255);
    noStroke();
    textSize(BLOCKS_HEIGHT/5);
    text(str(this.val), this.x + BLOCKS_WIDTH / 2, this.y + BLOCKS_HEIGHT / 2 + 4);    
  }

  update() {
    if ((this.active == true)&&(this.y + BLOCKS_HEIGHT + SPEED) < height) {
      this.y = this.y + SPEED;
    } else {
      this.active = false;
    }
    this.column = floor(this.x/BLOCKS_WIDTH);
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

  getColumn() {
    return this.column;
  }

}

