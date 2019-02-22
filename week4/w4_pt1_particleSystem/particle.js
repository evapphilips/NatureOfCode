// Eva Philips
// February 21, 2019
// define the particle class


class Particle {
    constructor(x,y){
        this.acceleration = createVector(0,0);
        this.velocity = createVector(random(-2,2), random(-3,-1)); // !! hard coded !!
        this.position = createVector(x, y); // !! hard coded !!
        this.r = 30; // !! hard coded !!
        this.alpha = 255; // !! hard coded !!
    }

    // update the particle
    update(){
        // add the current speed to the position
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        
        // make acceleration 0 after updating
        this.acceleration.mult(0); 

        // lower the alpha
        this.alpha -= 3;  // !! hard coded !!
    } 

    // display one particle
    display(){
        // change the color
        noStroke(); // !! hard coded !!
        fill(255, this.alpha); // !! hard coded !!
        ellipse(this.position.x, this.position.y, this.r)
    }

    // apply forces
    applyForce(force){
        this.acceleration.add(force)  // accumulate forces
    }

    // is the particle "dead"
    isDead(){
        return this.alpha < 0 // will be true if it is dead and false if is still alive
    }
  }