// Eva Philips
// March 6, 2019
// Nature of Code Week 6: Define Flow Field

class FlowField{
    constructor(r){
      // size of each "cell" of the flow field
      this.resolution = r;
      // number of col and rows 
      this.cols = width/ this.resolution;
      this.rows = height/ this.resolution;
      // flow field array
      this.field = this.make2Darray(this.cols);
      this.init();
    }
  
    // makes a 2D array for the flow field grid
    make2Darray(n){
      let array = [];
      for(let i=0; i<n; i++){
        array[i] = [];
      }
      return array;
    }
  
    // define the field
    init(){
    //     let xoff = 0;
    //     for(let i=0; i<this.cols; i++){
    //         let yoff = 0;
    //     for(let j=0; j<this.rows; j++){
    //       let theta = map(noise(xoff, yoff), 0, 1, 0, TWO_PI);
    //       // convert polar to cartesian coordinate transform then add to field
    //       this.field[i][j] = createVector(cos(theta), sin(theta));
    //       yoff += 0.1;
    //     }
    //     xoff += 0.1;  
    //   }
    let theta;
    let prevTU = 0;
    let prevTL = 0;
    for(let i=0; i<this.cols; i++){
        for(let j=0; j<this.rows; j++){
            if(i<this.rows/2 && j<this.cols/2){
                theta = prevTU + PI/2;
            } else if(i>=this.rows/2 && j<this.cols/2){
                //theta = prevT - PI/2;
                theta = prevTU - PI - PI/2;
                //theta = PI;
            }else if(i<this.rows/2 && j>=this.cols/2){
                theta = prevTL - PI/2;
            }else if(i>=this.rows/2 && j>=this.cols/2){
                //theta = prevTL + PI/2
                theta = prevTL + PI/2 + PI;
                //theta = PI;
            }else{
                theta = 0;
            }

            this.field[i][j] = createVector(cos(theta), sin(theta));
        } 
        prevTU += TWO_PI/this.cols/2;   
        prevTL -= TWO_PI/this.cols/2;      
    }
    
    }

    // lookup vector associated with "lookup" position
    lookup(lookup){
        let col = Math.floor(constrain(lookup.x / this.resolution, 0, this.cols - 1));
        let row = Math.floor(constrain(lookup.y / this.resolution, 0, this.rows - 1));
        return this.field[col][row].copy();
    }
  
    // display every vector in the field array
    display(){
      for(let i=0; i< this.cols; i++){
        for(let j=0; j< this.rows; j++){
          this.drawVector(this.field[i][j], i*this.resolution, j*this.resolution, this.resolution - 2);
        }
      }
    }
  
    // draw every vector
    drawVector(v, x, y, scale){
      push();
      let arrowsize = 4;
      // translate to vector location
      translate(x, y);
      stroke(255);
      // rotate with the direction function
      rotate(v.heading());
      // calculate length of vector
      let len = v.mag() * scale;
      // draw line to make the arrow
      line(0, 0, len, 0);
      pop();
  
    }

  }