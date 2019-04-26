class QTable{
    constructor(envSize, customMap){
        this.numStates = envSize * envSize;
        this.numActions = 4; // up, down, left, right

        // initialize qTable with all 0's
        this.qTable = [];
        for (let i = 0; i < this.numStates; i++) {
            let row = [];
            for (let j = 0; j < this.numActions; j++) {
              row.push(2);
            }
            this.qTable.push(row);
          }
        // this.qTable = tf.tensor2d(this.qtArray, [this.numStates, envSize], 'int32');

        // initialize the environment
        this.env = new FrozenLake(envSize, customMap);
        this.env.showEnv();
        // this.env.stepAgent(3);
        // this.env.stepAgent(2);
        // let a = this.env.getCurrentState();
        // console.log("the current state:", a)

        // set hyperparameters (learning rate and y)
        this.lr = 0.8;
        this.y = 0.95;
        
        // for logging rewards at each training step
        this.rewardList = [];
    }

    train(){
        // variables for training
        let numEpisodes = 1000;
        
        
        

        // train for a certain numer of episodes
        for(let i=0; i<numEpisodes; i++){
            // reset the agent and get the first new observation (aka agents position)
            let currState = this.env.resetAgent();
            let rAll = 0;
            // Q Table algorithm
            for(let j=0; j<100; j++){
                // create a noisey copy of the row of qtable that represents the current state
                let noiseyRow = []
                for(let m=0; m<this.qTable[currState].length; m++){
                    // noise decreases each episode
                    let noise = randomGaussian() * (1.0 / (i + 1.0));
                    noiseyRow[m] = noise + this.qTable[currState][m];
                }
                // select the best action based on this noizey row
                let bestIndex = -1;
                let bestSoFar = -10000;
                for (let k = 0; k < this.numActions; k++) {
                    if (noiseyRow[k] > bestSoFar) {
                      bestSoFar = noiseyRow[k];
                      bestIndex = k;
                    }
                }
                // assign the action to the best choise
                let action = bestIndex;
                // Get new state and reward from environment
                let {nextState, reward, done} = this.env.stepAgent(action);

                // console.log('nextState: ', nextState);
                //console.log('reward: ', reward);
                // console.log('done: ', done);

                // update the Q table for the current state
                this.qTable[currState][action] += this.lr * (reward + this.y * (max(this.qTable[nextState])) - this.qTable[currState][action])
                rAll += reward; // update reward
                currState = nextState; // update the current state
                if(done){ // if game over or falls in H then end
                    break
                } 
            }

            this.rewardList.push(rAll);
            //console.log(this.rewardList)  
        }
        // show number of times completed
        let sum = 0;
        for(let i=0; i< this.rewardList.length; i++){
                sum += this.rewardList[i]
        }
        //console.log("Number of times completed: ", sum)
        // keep training until it learns the map
        if(sum<500){
            this.train();
        }
        
        //console.log("Episodes to run successfully: ", this.rewardList.length) 

        this.env.resetAgent();
        this.env.showEnv();

        //console.log("Trained!", "Required:", this.rewardList.length, "episodes to run successfully")
    }

    run(){
        // reset
        this.env.resetAgent()
        this.env.showEnv()
        this.showOneStep()

    }

    showOneStep(){
        setTimeout(() => { // take a half a second between steps
         // create a noisey copy of the row of qtable that represents the current state
         let noiseyRow = []
         for(let m=0; m<this.qTable[this.env.getCurrentState()].length; m++){
             // noise decreases each episode
             let noise = 0;
             noiseyRow[m] = noise + this.qTable[this.env.getCurrentState()][m];
         }
 
         // select the best action based on this noizey row
         let bestIndex = -1;
         let bestSoFar = -10000;
         for (let k = 0; k < this.numActions; k++) {
             if (noiseyRow[k] > bestSoFar) {
               bestSoFar = noiseyRow[k];
               bestIndex = k;
             }
         }
 
         // assign the action to the best choise
         let action = bestIndex;
         // Get new state and reward from environment
         let {nextState, reward, done} = this.env.stepAgent(action);
 
         // show updated environment
         this.env.showEnv();
 
         // if not done continue taking steps
         if (!done) {
             this.showOneStep();
        }
    }, 500);
        
    }

}