// Eva Philips
// March 1, 2019
// Nature of Code Week 5: Steering Behavior Practice

// varaibles
let flock;

function setup() {
  // canvas setup
  //createCanvas(windowWidth , windowHeight);
  createCanvas(800, 600)
  //background(0);

  // start a new flock
  flock = new Flock();

  // create some new bodies at the beginning
  for(let i=0; i<300; i++){
    let b = new Body(random(0,width), random(0, height));
    flock.addBoid(b);
  }
  

}

function draw() {
  // canvas setup
  background(0);

  // run the flock
  flock.run();
  




}