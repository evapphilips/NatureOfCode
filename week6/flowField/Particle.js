// Eva Philips
// March 6, 2019
// Nature of Code Week 6: Define Particle

class Particle{
    constructor(x, y){
      this.position = createVector(x, y)
      this.acceleration = createVector(0, 0)
      this.velocity = createVector(0, 0)
      this.r = 4;
      this.maxspeed = 3;
      this.maxforce  = 0.1
    }
  
    // update and show the particles
    run(){
      this.update();
      this.borders();
      this.display();
    }
  
    // update locations
    update(){
      // change velocity
      this.velocity.add(this.acceleration);
      // limit speed
      this.velocity.limit(this.maxspeed);
      this.position.add(this.velocity);
      // reset acceleration 
      this.acceleration.mult(0);
  
    }
  
    // wrap particles around canvas
    borders(){
      if (this.position.x < -this.r) this.position.x = width + this.r;
      if (this.position.y < -this.r) this.position.y = height + this.r;
      if (this.position.x > width + this.r) this.position.x = -this.r;
      if (this.position.y > height + this.r) this.position.y = -this.r;
    }
  
    // show particles
    display(){
      fill(255, 5);
      noStroke();
      push();
      translate(this.position.x, this.position.y);
      //point(0,0)
      ellipse(0, 0, this.r)
      pop();
  
    }

    // apply forces
    applyForce(force){
      this.acceleration.add(force)
    }

    // steer along flow field
    follow(flow){
        // look up vector associated with at position in the flow field
        let desired = flow.lookup(this.position);
        // scale vector
        desired.mult(this.maxspeed);
        // calculate steering force
        let steer = p5.Vector.sub(desired, this.velocity);
        // limit the force
        steer.limit(this.maxforce);
        // apply the steering force
        this.applyForce(steer);
    }
  }
