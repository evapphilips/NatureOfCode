// Eva Philips
// April 25, 2019
// Description: This is a javascript implementation of a simple Q learning algorithm using a table which visualizes binary data. 
// References: (This code is based on reference code from the following links)
// 1. https://github.com/AidanNelson/reinforcement-learning-experiments/tree/master/simple-rl-tutorials/0-q-learning-agents
// 2. https://gist.github.com/awjuliani/9024166ca08c489a60994e529484f7fe#file-q-table-learning-clean-ipynb

// DOM element variables
let instructions;
let makeCustomButton;
let useDataButton;
let menuButton;
let customSubmitButton;
let customRunButton;
let customStepButton;
let customFullButton;
let customSelect = false;
let trainingStatus;
let gymDataButton;

// custom lake variables
let customLake;
let customMap;


function setup(){
    // setup canvas and cetner on the screen
    createCanvas(500, 500).center('horizontal');
    // add a border to canvas
    stroke(0);
    fill(255);
    rect(0, 0, width-1, height-1);
    let topOfCanvas = 90;

    // setup instructions
    instructions = select('#instructions');

    // setup menu buttons
    makeCustomButton = createButton("Make a Custom Map");
    makeCustomButton.position(windowWidth/2-makeCustomButton.width/2, (height/2 + topOfCanvas) - (makeCustomButton.height));
    makeCustomButton.mousePressed(makeCustomButtonPressed);
    useDataButton = createButton("Use a Data Map");
    useDataButton.position(windowWidth/2-useDataButton.width/2, (height/2 + topOfCanvas) + (useDataButton.height));
    useDataButton.mousePressed(useDataButtonPressed);

    // setup custom screen
    menuButton = createButton("menu");
    menuButton.position(windowWidth/2 - width/2, menuButton.height+ topOfCanvas);
    menuButton.hide();  // start with menu hidden
    menuButton.mousePressed(menuButtonPressed);
    customSubmitButton = createButton("submit");
    customSubmitButton.position(windowWidth/2 - customSubmitButton.width/2, height + customSubmitButton.height + topOfCanvas);
    customSubmitButton.hide(); // start with submit hidden
    customSubmitButton.mousePressed(customSubmitButtonPressed)

    // setup custom run screen
    customRunButton = createButton("run");
    customRunButton.position(windowWidth/2 - customRunButton.width/2, height + customRunButton.height + topOfCanvas);
    customRunButton.hide(); // start hidden
    customRunButton.mousePressed(customRunButtonPressed)
    customStepButton = createButton("step train");
    customStepButton.position(windowWidth/2 - customRunButton.width - customStepButton.width, height + customStepButton.height + topOfCanvas )
    customStepButton.hide(); // start hidden
    customStepButton.mousePressed(customStepButtonPressed)
    customFullButton = createButton("fully train");
    customFullButton.position(windowWidth/2 + customFullButton.width/2, height + customFullButton.height + topOfCanvas )
    customFullButton.hide(); // start hidden
    customFullButton.mousePressed(customFullButtonPressed)
    trainingStatus = createP("status: needs training...");
    trainingStatus.position(windowWidth/2 - width/2 + 2*menuButton.width,topOfCanvas)
    trainingStatus.hide();

    // setup data map selection screen
    gymDataButton = createButton("my gym data");
    gymDataButton.position(windowWidth/2 - gymDataButton.width/2, height/2 + topOfCanvas);
    gymDataButton.hide(); // start hident
    gymDataButton.mousePressed(gymDataButtonPressed);

}

// when "make a custom map" is pressed, go to the custom screen
function makeCustomButtonPressed(){
    // hide the menu buttons
    makeCustomButton.hide();
    useDataButton.hide();
    // change instructions
    instructions.html('Click on a tile to make a custom map. When you are ready, click submit.');
    // show the back menu button and the submit button
    menuButton.show();
    customSubmitButton.show();

    // make and show custom lake
    customLake = new CustomEnv(5);
    customLake.showEnv();

    // make custom bool true
    customSelect = true;
    
}

// when "use a data map" is pressed, go to the data screen
function useDataButtonPressed(){
    // hide the menu buttons
    makeCustomButton.hide();
    useDataButton.hide();
    // show the back menu button
    menuButton.show();
    // show the data option buttons
    gymDataButton.show()
}

// when "menu" is pressed, go to the menu screen
function menuButtonPressed(){
    // change instructions
    instructions.html('select a map type...')
    // hide the none menu buttons
    menuButton.hide();
    customSubmitButton.hide();
    customRunButton.hide();
    customStepButton.hide();
    customFullButton.hide();
    trainingStatus.hide();
    customSelect = false;
    customLake.hideEnv(); // hide the previous page content
    gymDataButton.hide();
    //draw background
    stroke(0);
    fill(255);
    rectMode(CORNER)
    rect(0, 0, width-1, height-1);
    // show the menu buttons
    makeCustomButton.show();
    useDataButton.show();
    // clear q table and custom map if they exist
    setup();


}

// when custom "submit" is pressed, go to custom run screen
function customSubmitButtonPressed(){
    // hide the submit button
    customSubmitButton.hide();
    // change instructions
    instructions.html('step training will train the model in stages, full training will train the model automatically until the agent can move through the map successfully')
    // show the training/run buttons
    customRunButton.show();
    customStepButton.show();
    customFullButton.show();
    trainingStatus.show();

    // make custom select false
    customSelect = false;
    customLake.hideEnv(); // hide the previous page content

    // make a q table with the custom map
    qtable = new QTable(5, customMap); 
}

function mousePressed(){
    if(customSelect == true){ // if the custom selection screen is showing
        customMap = customLake.changeEnv(mouseX, mouseY);
        customLake.showEnv();
        //console.log(customMap);
    }    
}

// when the fully train button is pressed, train the model 
function customFullButtonPressed(){
    // train q table till it runs successfully
    console.log("Training")
    trainingStatus.html('status: training, please wait....')
    qtable.train();
    console.log("Trained")
    trainingStatus.html('status: trained, try running the agent...')
}

// when the step train button is pressed, train the model incrementally
function customStepButtonPressed(){
    // train q table till it runs successfully
    console.log("Training")
    trainingStatus.html('status: training, please wait....')
    qtable.train();
    console.log("Trained")
    trainingStatus.html('status: trained, try running the agent...')
}

// when the run button is pressed, run the agent
function customRunButtonPressed(){
    console.log("Running!")
    qtable.run();
}

// when the gym data button is pressed, run the gym data q table
function gymDataButtonPressed(){
    // delete border
    background(255);
    // add the gym data to this custom map
    customMap = [["S", "H", "H", "F", "H"], ["F", "F", "H", "F", "H"], ["F", "H", "F", "F", "F"], ["F", "H", "F", "H", "H"], ["F", "F", "F", "F", "G"]]
    //customMap = [["S", "H", "H", "H", "H"], ["F", "F", "F", "F", "F"], ["H", "H", "H", "H", "F"], ["H", "H", "H", "G", "F"], ["H", "H", "H", "F", "H"]];
    // make a q table with the custom map
    qtable = new QTable(5, customMap); 
    // hide data buttons
    gymDataButton.hide();
    // show the training/run buttons
    customRunButton.show();
    customStepButton.show();
    customFullButton.show();
    trainingStatus.show();
    
}