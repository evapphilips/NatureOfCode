// Eva Philips
// February 21, 2019
// define the particle system class

class ParticleSystem{
    constructor(position){
        this.origin = position.copy(); // define the origin of this system
        this.particles = [];  // the array for the particles

    }
    
    // add one particle to the particles array
    addParticle(){
        this.particles.push(new Particle(this.origin.x, this.origin.y));
    }

    // run a system
    run(){
        // run through the particles array
        for (let particle of this.particles) {
            let gravity = createVector(0,.1);
            particle.applyForce(gravity)
            particle.update();  // update each particle
            particle.display(); // show each particle
        }

        // filter out dead particles
        this.particles = this.particles.filter(particle => !particle.isDead());

    }



}