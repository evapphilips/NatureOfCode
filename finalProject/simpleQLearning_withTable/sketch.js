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

let customLake;
let customMap;

let makeCustomButton;
let submitCustomButton;
let runButton;

function setup(){
    // setup canvas
    createCanvas(400, 400);
    background(255);
    
    makeCustomButton = createButton('Make a custom environment');
    makeCustomButton.position(0, height);
    makeCustomButton.mousePressed(makeCustomPressed);

    submitCustomButton = createButton('Submit a custom environment');
    submitCustomButton.position(0, makeCustomButton.y + makeCustomButton.height);
    submitCustomButton.mousePressed(submitCustomPressed);

    runButton = createButton('Run Agent');
    runButton.position(0, submitCustomButton.y + submitCustomButton.height);
    runButton.mousePressed(runPressed)

    


    // make q table
    // qtable = new QTable(5); 

    // make and show custom lake
    // customLake = new CustomEnv(5);
    // customLake.showEnv();

}

function draw(){
    // if(keyIsPressed){    
    //     // if t is pressed, train
    //     if(key == 't'){
    //         qtable.train();
    //         keyIsPressed = false;
    //         console.log("Trained")
    //     }
    //     // if r is pressed, run
    //     if(key == 'r'){
    //         qtable.run();
    //         keyIsPressed = false;
    //     }
    // }
}

function mousePressed(){
    customMap = customLake.changeEnv(mouseX, mouseY);
    customLake.showEnv();
    //console.log(customMap);
}


function makeCustomPressed(){
    // make and show custom lake
    customLake = new CustomEnv(5);
    customLake.showEnv();
    //makeCustomButton.hide();
}

function submitCustomPressed(){
    //console.log(customMap)
    // make q table
    qtable = new QTable(5, customMap); 
    // train q table
    console.log("Training")
    qtable.train();
    console.log("Trained")
}

function runPressed(){
    console.log("Running!")
    qtable.run();
}



