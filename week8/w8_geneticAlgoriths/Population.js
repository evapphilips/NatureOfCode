class Population{
  constructor(){
    this.particles = [];
    this.popSize = 20;
    // add particles to the population array
    for(let i=0; i<this.popSize; i++){
      this.particles[i] = new Particle();
    }
  }

  evaluate(){
      let maxfit = 0;
      for(let i=0; i<this.popSize; i++){
        this.particles[i].calcFitness();
        // get the heighest fitness out of all of the particles
        if(this.particles[i].fitness > maxfit){
            maxfit = this.particles[i].fitness;
        }
      }

      // normalize the fitness values between 0 and 1
      for(let i=0; i<this.popSize; i++){
          this.particles[i].fitness /= maxfit
      }
      this.matingpool = []
      for(let i=0; i<this.popSize; i++){
          let n = this.particles[i].fitness * 100;
          for(let j=0; j<n; j++){
              this.matingpool.push(this.particles[i]);
          }
      } 
  }

  selection(){
      let newParticles = [];
      for(let i=0; i<this.particles.length; i++){
        let parentA = random(this.matingpool).dna;
        let parentB = random(this.matingpool).dna;
        let child = parentA.crossover(parentB);
        child.mutation();
        newParticles[i] = new Particle(child)
      }
      this.particles = newParticles;
  }

  run(count){
    for(let i=0; i<this.popSize; i++){
      this.particles[i].update();
      this.particles[i].display();
    }

  }
}