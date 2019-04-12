// defining the Agent class

class Agent{
    constructor(x, y, tileSize){
      this.x = x;
      this.y = y;
      this.r = tileSize/2;
      this.tileSize = tileSize;
      this.col = 150;
    }
  
    display(){

        if(this.x == width-tileSize/2 && this.y == height-tileSize/2){
            this.col = 0;
        }else{
            this.col = 150;
        }
        
        noStroke();
        fill(this.col);
        ellipse(this.x, this.y, this.r)

      
  
    }

    moved(dir){
        if(dir == 0){  // move up
            this.y -= this.tileSize;
        }
        if(dir == 1){  // move right
            this.x += this.tileSize;
        }
        if(dir == 2){  // move down
            this.y += this.tileSize;
        }
        if(dir == 3){  // move left
            this.x -= this.tileSize;
        }
    }
  }