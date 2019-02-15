// Eva Philips
// February 14, 2019
// Nature of Code Week 3 Part 1: Spiral Example

// variables
let r = 0;  // radius
let angle = 0; // angle
let size = 5;

function setup() {
  // set up canvas
  createCanvas(800, 600);
  background(0);
  
}

function draw() {
  // define x and y from polar coordinates
  let x = r * cos(angle);
  let y = r * sin(angle);

  // define color properties
  fill(255)
  stroke(255);

  // translate to make the center the orgin
  translate(width/2, height/2);
  
  // draw circle
  ellipse(x, y, size);

  // change perameters for next loop

  // figure 1
  angle += .1;
  r += .1;

  // figure 2
  // angle += .01;
  // r += 1000* sin(angle/.01);

  // // figure 3
  // angle += .01;
  // r += 100* sin(angle/.005);

  
}