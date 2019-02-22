// Eva Philips
// February 22, 2019
// Nature of Code Week 3 Party 2: Defining the particle class

class Particle{
    constructor(x, y, vx, vy, lsRate){
        this.acceleration = createVector(0,0);  // define acceleration
        this.velocity = createVector(vx, vy); // define velocity
        this.position = createVector(x,y); // define position
        this.alpha = 255; // initiate lifespan alpha value
        this.lifespanRate = lsRate; // the lifespan rate of each particle
    }

    // update the particle
    update(){
        // add the current speed to the position
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        // make acceleration 0 after updating
        this.acceleration.mult(0); 

        // lower the alpha to update the lifespan
        this.alpha -= this.lifespanRate;
    } 
    
    // display one particle
    display(){
        // change the color
        noStroke();
        fill(255, this.alpha);
        ellipse(this.position.x, this.position.y, 20);  // set the generic particle to be a while circle of radius 20
    }

    // apply forces
    applyForce(force){
        this.acceleration.add(force) // accumulate forces
    }

    // check the lifespan of the particle
    isDead(){
        return this.alpha < 0; // will be true if it is dead and false if it is still alive
    }

}