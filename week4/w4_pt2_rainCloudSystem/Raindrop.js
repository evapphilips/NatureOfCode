// Eva Philips
// February 22, 2019
// Nature of Code Week 3 Party 2: Defining the raindrop class

class Raindrop extends Particle{  // particles is the parent class 
    constructor(x, y, vx, vy, lsRate){
        super(x, y, vx, vy, lsRate);
        this.r = random(.5, 2);  // size of raindrops
    }

    // display one raindrop
    display(){
        // change the color
        noStroke();
        fill(2,74,236, this.alpha);  // blue raindrop
        rect(this.position.x, this.position.y, this.r, 4*this.r);  
    }
}