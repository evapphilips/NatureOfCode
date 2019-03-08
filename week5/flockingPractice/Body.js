// Eva Philips
// March 1, 2019
// Nature of Code Week 5: Define the body

class Body{
    constructor(x,y){
        this.acceleration = createVector(0,0);
        this.velocity = createVector(random(-1, 1), random(-1, 1));
        this.position = createVector(x,y);
        this.r = 5;
        this.maxspeed = 3; // max speed
        this.maxforce = 0.05 // max steering force
        this.col = [random(0,255), random(0,255), random(0,255)]
    }

    // run the body methods
    run(bodies){
        this.flock(bodies)
        this.update();
        this.border();
        this.render();
    }

    // flock: accumulate the new acceleration each time based on separation, allignment, cohesion
    flock(bodies){
        // define forces
        let sep = this.separation(bodies); // separation
        let ali = this.align(bodies); // allignment
        let coh = this.cohesion(bodies); // cohesion
        // Arbitrarily weight these forces
        sep.mult(1.5);
        ali.mult(1.0);
        coh.mult(0.5);
        // apply these forces
        this.applyForce(sep);
        this.applyForce(ali);
        this.applyForce(coh);

    }

    // Separation Method
    separation(bodies){
        let desiredSeparation = 20.0;
        let steer = createVector(0,0);
        let count = 0;
        // for each body in the system, check if it is too close
        for(let i=0; i<bodies.length; i++){
            let d = p5.Vector.dist(this.position, bodies[i].position);
            // if the distance is greater than 0 and less than an arbitrary amount (o when you are yourself)
            if((d>0) && (d< desiredSeparation)){
                // calculate vector pointing aray from neighbor
                let diff = p5.Vector.sub(this.position, bodies[i].position);
                // normalize the vector
                diff.normalize();
                // weight the vector by distance
                diff.div(d); 
                steer.add(diff);
                // keep track of how many
                count ++ 
            }
        }

        // divide by how many (average)
        if(count > 0){
            steer.div(count);
        }

        // when the vector is greater than 0
        if(steer.mag() > 0){
            // calculate steering = desired - velocity
            steer.normalize();
            steer.mult(this.maxspeed);
            steer.sub(this.velocity);
            steer.limit(this.maxforce);
        }
        return steer;
    }

    // Allignment Method
    // for each nearby body in the system, calculate the average velocity
    align(bodies){
        let neighborDist = 50;
        let sum = createVector(0, 0);
        let count = 0;
        for(let i = 0; i<bodies.length; i++){
            let d = p5.Vector.dist(this.position, bodies[i].position);
            if ((d > 0) && (d < neighborDist)) {
                sum.add(bodies[i].velocity); // add velocity
                count++;
            }
        }
        if(count > 0){
            sum.div(count);
            sum.normalize();
            sum.mult(this.maxspeed);
            let steer = p5.Vector.sub(sum, this.velocity);
            steer.limit(this.maxforce);
            return steer;
        } else{
            return createVector(0, 0);
        }
    }

    // Cohesion Method
    // calculate a steering vector towards the center of each body
    cohesion(bodies){
        let neighborDist = 50;
        let sum = createVector(0, 0);
        let count = 0;
        for(let i = 0; i<bodies.length; i++){
            let d = p5.Vector.dist(this.position, bodies[i].position);
            if ((d > 0) && (d < neighborDist)) {
                sum.add(bodies[i].position);  // add location
                count++;
            }
        }
        if(count > 0){
            sum.div(count);
            // steer towards the location
            return this.seek(sum);
        } else{
            return createVector(0, 0);
        }
    }

    // seek applies a steering force towards a target
    seek(target){
        // A vector pointing from the location to the target
        let desired = p5.Vector.sub(target, this.position)
        // normalize desired and scale to maximum speed
        desired.normalize();
        desired.mult(this.maxspeed);
        // steering force = desired - velocity
        let steer = p5.Vector.sub(desired, this.velocity);
        // limit to max steering force
        steer.limit(this.maxforce);
        return steer;
    }
    
    

    // apply force function
    applyForce(force){
        this.acceleration.add(force);
    }

    // method to update location
    update(){
        // update velocity
        this.velocity.add(this.acceleration);
        // limit speed
        this.velocity.limit(this.maxspeed);
        // update position
        this.position.add(this.velocity);
        // reset acceleration to 0 each cycle
        this.acceleration.mult(0);
    }

    // render the body
    render(){
        //fill(this.col[0], this.col[1], this.col[2], 25)
        fill(255);
        noStroke();
        ellipse(this.position.x, this.position.y, this.r)
    }

    // wrap around the boarders
    border(){
        if(this.position.x < -this.r){
            this.position.x = width + this.r;
        }
        if(this.position.y < -this.r){
            this.position.y = height + this.r;
        }
        if(this.position.x > width + this.r){
            this.position.x = -this.r;
        }
        if(this.position.y > height + this.r){
            this.position.y = -this.r;
        }
    }
}