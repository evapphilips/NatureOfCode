// Eva Philips
// February 6, 2019
// Nature of Code Week 2 Part 1: Experimenting with Vectors

// Variables
let ball;

function setup() {
  // setup canvas
  createCanvas(600, 400);

  // setup ball
  ball = new Ball();

}

function draw() {
  // setup canvas
  background(220);

  // make and apply forces
  let gravity = createVector(0,1);
  gravity.mult(ball.mass);
  let wind = createVector(.1, 0);

  ball.applyForce(gravity);
  if(mouseIsPressed){
    ball.applyForce(wind);
  }


  // move ball
  ball.update();
  ball.display();

}

// ball class
class Ball{
  constructor(){
    // setup vectors
    this.position = new createVector(width/2, 0);
    this.velocity = new createVector(0,0);
    this.acceleration = new createVector(0,0);
    this.mass = 20;
  }

  update(){
    // add the current speed to the position
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);


    // constrain to boundries
    if(this.position.y > height || this.position.y < 0){
    this.velocity.y = this.velocity.y * (-1);
    }

    if(this.position.x > width || this.position.x < 0){
      this.velocity.x = this.velocity.x * (-1);
      }

      this.acceleration.mult(0); // make acceleration 0 after updating
  }

  display(){
    // display the circle
    noStroke();
    fill(0);
    ellipse(this.position.x, this.position.y, 50);
  }

  applyForce(force){
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }
}