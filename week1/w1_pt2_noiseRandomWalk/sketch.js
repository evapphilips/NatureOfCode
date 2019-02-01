// Eva Philips
// January 31, 2019
// Nature of Code Week 1 Part 2: Perlin Noise Walker

// variables
let walker = [];
let toggle = 0;

function setup() {
	// canvas setup
	createCanvas(600, 400);
}

function draw() {
	background(0);

	for(let i=0; i<walker.length; i++){
		walker[i].display();
		walker[i].step();
		walker[i].changeColor();
	}

	if(toggle == 0){
			toggle = 1;
		}else{
			toggle = 0;
		}

}

function mousePressed(){
	walker.push(new Walker(mouseX, mouseY));
}

class Walker{
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.t = 0;
		this.r = 0;
		//this.g = 0;
		//this.b = 0;
		this.alpha = 100;
	}

	display(){
		rectMode(CENTER);
		fill(this.r, this.alpha);
		noStroke();
		//ellipse(this.x, this.y, 30);
		rect(this.x, this.y, 200, 5);
	}

	step(){  // changes using perlin noise
		let ns = noise(this.t);

		if(toggle == 0){
			this.x = map(ns, 0,1,width,0);
		}else if(toggle == 1 ){
			this.x = map(ns, 0, 1,0, width);
		}
		
		this.y = map(ns, 0,1,0,height);
		this.t = this.t + 0.02; // increment time
	}

	changeColor(){  // changes using random walk
		let stp = 5;

		// changing r color
		let dirR = int(random(2));
		if(dirR == 0){ // increase alpha
			this.r = this.r + stp;
		}else{  // decrease alpha
			this.r = this.r - stp;
		}
		constrain(this.r, 0, 255);

		// changing g color
		// let dirG = int(random(2));
		// if(dirG == 0){ // increase alpha
		// 	this.g = this.g + stp;
		// }else{  // decrease alpha
		// 	this.g = this.g - stp;
		// }
		// constrain(this.g, 0, 255);

		// changing b color
		// let dirB = int(random(2));
		// if(dirB == 0){ // increase alpha
		// 	this.b = this.b + stp;
		// }else{  // decrease alpha
		// 	this.b = this.b - stp;
		// }
		// constrain(this.b, 0, 255);

		// changing alpha color
		let dirA = int(random(2));
		if(dirA == 0){ // increase alpha
			this.alpha = this.alpha + stp;
		}else{  // decrease alpha
			this.alpha = this.alpha - stp;
		}
		constrain(this.b, 200, 255);
	}
}