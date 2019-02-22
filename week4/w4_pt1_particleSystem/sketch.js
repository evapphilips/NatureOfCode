// Eva Philips
// February 21, 2019
// Nature of Code Week 4 Part 1: Practicing Particle Systems, waterfall

// variables
let system = [];


function setup() {
  // canvas setup
  createCanvas(800, 600);

}

function draw() {
  // canvas setup
  background(0); 
  
  // loop through each element in the system
  for(let i=system.length-1; i>=0; i--){
    system[i].addParticle();
    system[i].run();
  }

}

// when the mouse is pressed, add a particles array to the system
function mousePressed(){
  system.push(new ParticleSystem(createVector(mouseX,mouseY)));
}


