// Eva Philips
// April 18, 2019
// Description: This is a javascript implementation of a simple Q learning algorithm using a table
// References: (This code is based on reference code from the following links)
// 1. https://github.com/AidanNelson/reinforcement-learning-experiments/tree/master/simple-rl-tutorials/0-q-learning-agents
// 2. https://gist.github.com/awjuliani/9024166ca08c489a60994e529484f7fe#file-q-table-learning-clean-ipynb


// variable
// let mat;

let frozenLake;

let qtable;

function setup(){
    // setup canvas
    createCanvas(400, 400);
    background(255);

    // setup q table
    qtable = new QTable(5);


}

function draw(){
    if(keyIsPressed){
        // if t is pressed, train
        if(key == 't'){
            qtable.train();
            keyIsPressed = false;
            console.log("Trained")
        }
        // if r is pressed, run
        if(key == 'r'){
            qtable.run();
            keyIsPressed = false;
        }
    }
}


