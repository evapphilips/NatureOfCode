// Eva Philips
// February 22, 2019
// Nature of Code Week 3 Party 2: Rain cloud

// variables
let skyColor = [135,206,250];
let rain = [];
let cloud = [];
let gravity;

function setup() {
  // setup canvas
  createCanvas(windowWidth, windowHeight);

  // define gravity
  gravity = createVector(0,0.025);
  
  // define the weather for the sky
  for(let i=0; i<10; i++){
    // set a position for the cloud/rain
    let pos = createVector(random(width), random(0,20));

    // add a rain system to the sky 
    rain[i] = new Rain(pos, gravity);
    
    // add a cloud system to the sky 
    cloud[i] = new Cloud(pos, gravity);
    
  }
  
}

function draw() {
  // setup canvas
  background(skyColor[0], skyColor[1], skyColor[2]);

  // loop through each element in the rain system
    for(let i=rain.length-1; i>=0; i--){
      rain[i].addParticle();
      rain[i].run();
    }

     // loop through each element in the cloud system
     for(let i=cloud.length-1; i>=0; i--){
      cloud[i].addParticle();
      cloud[i].run();
    }

  



}

