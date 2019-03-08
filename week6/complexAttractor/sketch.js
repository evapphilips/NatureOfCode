// Eva Philips 
// March 6, 2019
// Nature of Code Week 6 Simulation Project: Experimenting with complet attractors

// source: https://www.reddit.com/r/creativecoding/comments/awji8i/p5js_clifford_attractor/

// variables
// let a = -2;
// let b = -1.4;
// let c = 1.1;
// let d = -0.9;



// define sliders
let sliderA;
let sliderB;
let sliderC;
let sliderD;

// define button
let button;

function setup() {
  // setup canvas
  createCanvas(windowWidth, 800);
  background(255);

  // setup sliders
  sliderA = createSlider(-5, 5, -2);
  sliderA.position(20, height + 60);
  sliderB = createSlider(-5, 5, -2.4);
  sliderB.position(20, height + 80);
  sliderC = createSlider(-5, 5, 1.1);
  sliderC.position(20, height + 100);
  sliderD = createSlider(-5, 5, -0.9);
  sliderD.position(20, height + 120);

  // setup button
  button = createButton('reset background')
  button.position(25, height + 20)
  button.mousePressed(reset);
}

function draw() {
  // seup canvas
  //background(255);
  
  // create many instances of the attractor
  for (j = 0; j < 500; j++) {
    // set slider values to constants
    let a = sliderA.value();
    let b = sliderB.value();
    let c = sliderC.value();
    let d = sliderD.value();

    // define the initial positions of each element
    let x = random(-10, 10);
    let y = random(-10, 10);
    // cacluate and draw the attractor
    attractor(x, y, a, b, c, d, 5);


  }
}

function reset(){
  background(255);
}

// apply the clifford attractor equations
function attractor(x0, y0, a, b, c, d, iters) {
  // set initial x and y values
  let x = x0;
  let y = y0;
  
  // loop through the elements in the attractor and apply the function
  for (i = 0; i < iters; i++) {
    // set the change in time to current x
    var xt = x
    
    // calculate x and y based on clifford attractor formula
    x = sin(a*y) + c*cos(a*x);
    y = sin(b*xt) + d*cos(b*y)
  }
  // draw a point at the x an y
  //point(map(x, -2.5, 2.5, 0, width), map(y, -2.5, 2.5, height, 0));
  stroke(0, 20);
  fill(0, 20);
  ellipse(map(x, -2.5, 2.5, 0, width), map(y, -2.5, 2.5, height, 0), 2)
}