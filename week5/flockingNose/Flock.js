// Eva Philips
// March 1, 2019
// Nature of Code Week 5: Define the flock

class Flock{
    constructor(){
        // An array for all the boids
        this.bodies = []; // Initialize the array
    }

    run(mx, my){
        for (let body of this.bodies) {
            let mouse = createVector(mx, my)
            body.run(this.bodies, mouse); // Passing the entire list of boids to each boid individually
          }
    }

    addBody(b) {
        this.bodies.push(b);
      }

}