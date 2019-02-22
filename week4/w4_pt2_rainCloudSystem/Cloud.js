// Eva Philips
// February 22, 2019
// Nature of Code Week 3 Party 2: Defining the cloud class

class Cloud{
    constructor(position, gravity){
        this.origin = position.copy(); // define the origin of this cloud system
        this.cloudparticles = [];  // define the array for the cloud particles
        this.gravity = gravity;  // include gravity

    }

    // add one cloud particle to the array of cloud particles
    addParticle(){
        this.cloudparticles.push(new CloudParticle(this.origin.x, this.origin.y, random(-2,2), random(-1,1), 5));
    }

    // run the entire cloud system
    run(){
        // run through the cloud particles array
        for (let cloudparticle of this.cloudparticles) {
            cloudparticle.applyForce(this.gravity)
            cloudparticle.update();  // update each cloud particle
            cloudparticle.display(); // show each cloud particle
        }
    
        // filter out dead cloud particles
        this.cloudparticles = this.cloudparticles.filter(cloudparticle => !cloudparticle.isDead());
    }

}
