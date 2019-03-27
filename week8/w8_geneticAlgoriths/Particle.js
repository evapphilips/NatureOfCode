class Particle{
  constructor(dna){
    // the physics
    this.position = createVector(width/2, height/2);
    this.velocity = createVector();
    this.acceleration = createVector();
    // dna
    if(dna){
        this.dna = dna;
    }else{
        this.dna = new DNA();
    }
    // fitness
    this.fitness = 0;
    this.completed = false;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }


  update(){
      // check if it has reached the target
      let d = dist(this.position.x, this.position.y, target.x, target.y);
      if(d<5){
          this.completed = true;
          this.position = target.copy();
      }
      // add dna
      this.applyForce(this.dna.genes[count])
      
      // update the physics
      if(!this.completed ){
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
      }
      
    }

  display(){
    // move and display the particle in the correct location and angled toward its heading
    push()
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());
    fill(255, 10);
    noStroke();
    rectMode(CENTER);
    //rect(0, 0, 10, 2);
    ellipse(0, 0, 3);
    pop()
  }

  calcFitness(){
      let d = dist(this.position.x, this.position.y, target.x, target.y)
      this.fitness = map(d, 0, width, width, 0);
      if(this.completed){
          this.fitness *= 10;
      }
  }
}