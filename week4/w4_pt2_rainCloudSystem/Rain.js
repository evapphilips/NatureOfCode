// Eva Philips
// February 22, 2019
// Nature of Code Week 3 Party 2: Defining the rain class

class Rain{
    constructor(position, gravity){
        this.origin = position.copy(); // define the origin of this rain system
        this.raindrops = [];  // define the array for the raindrops
        this.gravity = gravity; // include gravity

    }

    // add one raindrop to the array of raindrops
    addParticle(){
        this.raindrops.push(new Raindrop(this.origin.x, this.origin.y, random(-.5,.5), random(-1,1), 1));
    }

    // run the entire raindrop system
    run(){
        // run through the raindrops array
        for (let raindrop of this.raindrops) {
            raindrop.applyForce(this.gravity)
            raindrop.update();  // update each raindrop particle
            raindrop.display(); // show each raindrop particle
        }
    
        // filter out dead raindrops
        this.raindrops = this.raindrops.filter(raindrop => !raindrop.isDead());
    }

}


