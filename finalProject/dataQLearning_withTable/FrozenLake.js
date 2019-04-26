class FrozenLake{
    constructor(envSize, customMap){
        this.size = [envSize, envSize];
        //this.map = [["S", "H", "H", "H"], ["F", "F", "F", "F"], ["H", "H", "H", "F"], ["H", "H", "H", "G"]];
        //this.map = [["S", "H", "H", "H", "H"], ["F", "F", "F", "F", "F"], ["H", "H", "H", "H", "F"], ["H", "H", "H", "G", "F"], ["H", "H", "H", "F", "H"]];
        this.map = customMap;
        //this.environment = tf.tensor2d(this.map, this.size, 'string')
        this.numTilesAcross = this.size[0] // get the demensions of the table
        //this.pos = createVector((width/this.numTilesAcross)/2, (height/this.numTilesAcross)/2); // start the agent at the center of the start tile
        this.pos = createVector(0, 0);
    }

    showEnv(){
        // show the environment in the canvas
        let border = width/6;
        let tileSize = (width - border)/this.numTilesAcross

        for (let i = 0; i < this.map[0].length; i++){
            for (let j = 0; j < this.map.length; j++){
                // set color of tile based on the map
                noStroke();
                fill(255);
                rect(border+(i*tileSize), border+(j*tileSize), tileSize, tileSize); 
                
                let tileCode = this.map[j][i]
                if(tileCode == "S"){
                    //fill(0, 255, 0); // if at the start, make the tile green
                    fill(180, 235, 202);
                }else if(tileCode == "H"){
                    //fill(0); // if a hole, make the tile black
                    fill(79, 98, 114);
                }else if(tileCode == "F"){
                    //fill(255); // if frozen, make the tile white
                    fill(180, 235, 202);
                }else if (tileCode == "G"){
                    //fill(255, 0, 0); // if at the goal, mae the tile red
                    fill(199, 130, 131);
                }
                // draw the tile
                rectMode(CENTER);
                //ellipse(border+(i*tileSize), border+(j*tileSize), tileSize/4, tileSize/4);  
                rect(border+(i*tileSize), border+(j*tileSize), tileSize/2, tileSize/2);           
            }
        }
        // show agent
        fill(255,255,153);
        noStroke(); 
        ellipse(border+(this.pos.x * tileSize), border+(this.pos.y * tileSize), tileSize/4);
    }


    stepAgent(action){
        // move the agent (step code: 0 - Left, 1 - Up, 2 - Right, 3 - Down)
        if(action == 0){
            this.pos.x = Math.max(this.pos.x - 1, 0);// move left
        }else if(action == 1){
            this.pos.y = Math.max(this.pos.y - 1, 0); // move up
        }else if(action == 2){
            this.pos.x = Math.min(this.pos.x + 1, this.numTilesAcross-1); // move right
        }else if(action == 3){
            this.pos.y = Math.min(this.pos.y + 1, this.numTilesAcross-1); // move down
        }

        // calculate reward based on movement
        let reward = 0;
        let done = false;
        
        if(this.map[this.pos.y][this.pos.x] == "H"){ // dont give a reward if you hit a hole
            done = true; // set is done if there is a hole
        }
        if(this.map[this.pos.y][this.pos.x] == "G"){ // give a reward of 1 if you hit the goal
            reward = 1;
            done = true;  // set is done if reach the goal
        }
    
        return{ // return next state, reward, and if done
            nextState: this.getCurrentState(),
            reward: reward,
            done: done
        }
    }

    //Reset the environment's state. Returns observation.
    resetAgent(){
        this.pos.x = 0; 
        this.pos.y = 0;
        return this.getCurrentState();
    }

    // return a number from 0-15 (or number of states that you have) for current state of player
    getCurrentState(){
        // return ((this.pos.y * this.size[0]) + this.pos.x)/(width/this.size[0]);
        return ((this.pos.y * this.size[0]) + this.pos.x);
    }

}

