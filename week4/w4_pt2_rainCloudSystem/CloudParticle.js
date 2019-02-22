// Eva Philips
// February 22, 2019
// Nature of Code Week 3 Party 2: Defining the cloud particle class

class CloudParticle extends Particle{
    constructor(x, y, vx, vy, lsRate){
        super(x, y, vx, vy, lsRate);
        this.r = random(90,100); // size of cloud particle
    }

    // display one cloud particle
    display(){
        // change the color
        noStroke();
        fill(255, this.alpha);  // white cloud particle
        ellipse(this.position.x, this.position.y, this.r, this.r);  
    }
}