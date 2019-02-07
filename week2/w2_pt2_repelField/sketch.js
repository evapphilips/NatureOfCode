// Eva Philips
// February 6, 2019
// Nature of Code Week 2 Part 2: Magnetic force

// variable
let mover = []; 


function setup() {
  // setup canvas
  createCanvas(600, 400);
  
  // create mover
  for(let i=0; i<1000; i++){
    mover[i] = new Mover(random(width), random(height), random(0,3));
  }

}

function draw() {
  // setup canvas
  background(0);

  // apply funcitons to objects
  for(let i=0; i<mover.length; i++){
  let dis = dist(mouseX, mouseY, mover[i].position.x, mover[i].position.y);
  if(dis<80){ // distance from the mouse that each circle will start to repel
    let repel = mover[i].calculateForce();
    repel.mult(mover[i].mass);
    mover[i].applyForce(repel);
  }else{
    mover[i].stop();
  }
  
  mover[i].update();
  mover[i].display();
}

}


class Mover{
  constructor(x, y, mass){
    this.position = createVector(x,y);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.mass = mass;
  }

  applyForce(force){
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  display(){
    noStroke();
    fill(255, 20);
    ellipse(this.position.x, this.position.y, this.mass *20); 
  }

  calculateForce(){
    let mouse = createVector(mouseX, mouseY);
    let dist = mouse.sub(this.position);
    dist.mult(-.01); // how much it repels
    return dist
  }

  stop(){
    this.velocity.mult(0);
  }
}
