// Eva Philips
// March 27, 2019
// Nature of Code Week 8: Practicing with Genetic Algorithms


// variables
let population;
let lifespan = 200;
let count = 0;
let target;

function setup() {
  //createCanvas(windowWidth, windowHeight);
  createCanvas(300,300);
  background(0);

  particles = new Particle();
  population = new Population();

  target = createVector(width/2, 50)
}

function draw() {
  //background(0);

  population.run();
  count++
  if(count == lifespan){
    count = 0;
    //population = new Population();
    population.evaluate();
    population.selection();
  }

  //ellipse(target.x, target.y, 20, 20)
}


