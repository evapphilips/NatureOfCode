// Eva Philips
// February 15, 2019
// Nature of Code Week 3: Oscilating Triangles

// variables
let squares = [];

let ctx;

function setup() {
  // canvas setup
  createCanvas(800, 600);
  rectMode(CENTER);
  ellipseMode(CENTER);

  for(let i=0; i<100; i++){
    squares[i] = new Square();
  }

  // setup gradient
  ctx = canvas.getContext("2d");


 
  
  
}

function draw() {

  // canvas setup
  background(0);

   // test gradient


  for(let i=0; i<squares.length; i++){
    squares[i].display();
    squares[i].oscillate();
    squares[i].spin();
  }
  

}




class Square{
  constructor(){
    this.r = 5;
    this.amp = random(200,400);
    this.period = 800;
    this.a = random(360);
    this.aVel = 0.0;
    this.aAcc = random(0.000001, 0.000005);
  }

  display(){
    rectMode(CENTER);
    push();
    translate(width/2, height/2);  // translate to the center of the screen
    rotate(this.a);  // apply rotation

    // gradient fill
    let gradient = ctx.createRadialGradient(0, 0, height/2, 0, 0, 10);
    gradient.addColorStop(0, "black");
    gradient.addColorStop(1, "white");
    ctx.fillStyle = gradient;
    ctx.globalAlpha = .1;  // apply alpha to the squares
    noStroke();
    // draw the rectangle
    rect(0,0, this.r, this.r); // draw rectangle
    pop();
  }

  oscillate(){
    this.r = this.amp * sin((frameCount/this.period)*TWO_PI); // define the size of the square
  }

  spin(){
    // update angular motion
    this.a += this.aVel;
    this.aVel += this.aAcc;
    
    constrain(this.aVel, 0, .00001) // constrain the velocity so it doesn't get too fast
  }
}