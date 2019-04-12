// defining the Tile class


class Tile{
    constructor(x, y, tileSize){
      this.x = x;
      this.y = y;
      this.s = tileSize;
      this.col = 255;
    }
  
    // display the tile
    display(){
        rectMode(CENTER);
        fill(this.col);
        stroke(100);
        rect(this.x, this.y, this.s, this.s);
    }
  
    // actions when the mouse is clicked
    clicked(posX, posY){
      // when the mouse was clicked inside the tile
      if(posX>this.x-this.s/2 && posX<this.x+this.s/2){
        if(posY>this.y-this.s/2 && posY<this.y+this.s/2){
          if(this.col == 255){ // when the tile is white, make it black
            this.col = 0;
          }else{ // when the tile is black, make it white
            this.col = 255;
          }
        }
      }
  
    }
  
  }