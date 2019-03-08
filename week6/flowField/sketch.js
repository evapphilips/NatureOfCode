// Eva Philips
// March 6, 2019
// Nature of Code Week 6: Vector Field

let flowfield;
let particles = [];



function setup() {
  createCanvas(800, 800);
  background(0);

  flowfield = new FlowField(20);

  for(let i=0; i<200; i++){
    //particles.push(new Particle(random(width/2-100, width/2+100), random(height/2-100, height/2+100)));
    particles.push(new Particle(random(width/2, width), random(height)));
  }

}

function draw() {

  //background(0);
  
  //flowfield.display();
  //flowfield.init();

  for(let i=0; i<particles.length; i++){
    particles[i].run();
    particles[i].follow(flowfield);
  }


}








