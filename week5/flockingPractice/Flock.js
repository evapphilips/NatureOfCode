// Eva Philips
// March 1, 2019
// Nature of Code Week 5: Define the flock

class Flock{
    constructor(){
        // An array for all the boids
        this.bodies = []; // Initialize the array
    }

    run(){
        for (let body of this.bodies) {
            body.run(this.bodies); // Passing the entire list of boids to each boid individually
          }
    }

    addBoid(b) {
        this.bodies.push(b);
      }

}