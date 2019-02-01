// Eva Philips
// January 31, 2019
// Week 1 Nature of Code Part 1: Random Walk

// variables
let walker;

function setup() {
	// canvas setup
	createCanvas(600, 400);
	background(255);

	// initialize walker
	walker = new Walker(random((width/4), (3*(width/4))), height/2, random(0,3), random(8));

}

function draw() {
	walker.display();
	walker.step();

}


// Define the walker class
class Walker {
	constructor(x, y, r, stp){
		this.x = x;
		this.y = y;
		this.r = r;
		this.stp = stp;
	}

	display(){  // display the walker
		fill(0);
		ellipse(this.x, this.y, this.r);
	}

	step(){
		let dir = int(random(4)); // direction variables
		//let stp = 5; // step variable


		// move based on direction variable
		if(dir == 0){ //move right
			this.x = this.x + this.stp;
		}else if(dir == 1){  // move left
			this.x = this.x - this.stp;
		}else if(dir == 2){ // move up
			this.y = this.y - this.stp;
		}else{ // move down
			this.y = this.y + this.stp;
		}
		constrain(this.x,0,width-1);
		constrain(this.y, 0, height-1);
	}

}