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
// let customStepButton;
//let customFullButton;
let customTrainButton;
let customSelect = false;
let trainingStatus;
let gymDataButton;
// let episodesSlider;

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
    let topOfCanvas = 100;

    // setup instructions
    instructions = select('#instructions');

    // setup about section
    textAlign(CENTER);
    textSize(12);
    fill(0);
    noStroke();
    //text("hi\nhello", 50, 50)
    text("Q-learning is a reinforcement learning algorithm which trains an agent\nto take an action based on the environment it is in. This example uses\na simple q-learning implementation called The Frozen Lake Example.\nThe algorithm will use a grid environment (map) which consist of safe\nand unsafe tiles. The agent will try to move through the map starting at\nthe top left and aiming for the goal tile on the bottom right. While training\nthe agent will repeatedly try to move through the map.  If the agent\nreaches the goal it will get a point. If it falls on an unsafe tile it will get\nno points.  Eventually the agent will train itself to successfully complete\nthe map every time.", width/2, 60)

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
    customSubmitButton.size(100, 30);
    customSubmitButton.style('background-color', 'gray')
    customSubmitButton.style('border-style', 'none')
    customSubmitButton.style('font-size', '18pt')
    customSubmitButton.style('border-radius', '4px')
    customSubmitButton.position(windowWidth/2 - customSubmitButton.width/2, height + customSubmitButton.height + topOfCanvas);
    customSubmitButton.hide(); // start with submit hidden
    customSubmitButton.mousePressed(customSubmitButtonPressed)

    // setup custom run screen
    customRunButton = createButton("run");
    customRunButton.size(100, 30);
    customRunButton.style('background-color', 'gray')
    customRunButton.style('border-style', 'none')
    customRunButton.style('font-size', '18pt')
    customRunButton.style('border-radius', '4px')
    customRunButton.position(windowWidth/2 - customRunButton.width/2, height + customRunButton.height + topOfCanvas);
    customRunButton.hide(); // start hidden
    customRunButton.mousePressed(customRunButtonPressed)
    // customStepButton = createButton("step train");
    // customStepButton.position(windowWidth/2 - customRunButton.width - customStepButton.width, height + customStepButton.height + topOfCanvas )
    // customStepButton.hide(); // start hidden
    // customStepButton.mousePressed(customStepButtonPressed)
    customTrainButton = createButton("train");
    customTrainButton.size(100, 30);
    customTrainButton.style('background-color', 'gray')
    customTrainButton.style('border-style', 'none')
    customTrainButton.style('font-size', '18pt')
    customTrainButton.style('border-radius', '4px')
    customTrainButton.position(windowWidth/2 - customTrainButton.width/2, height + customTrainButton.height + topOfCanvas)
    customTrainButton.hide(); // start hidden
    customTrainButton.mousePressed(customTrainButtonPressed)
    trainingStatus = createButton("needs training...");
    trainingStatus.style('background-color', 'rgb(199, 130, 131)');
    trainingStatus.style('border-style', 'none')
    trainingStatus.style('font-size', '12pt')
    // trainingStatus.position(windowWidth/2 - 190, topOfCanvas + trainingStatus.height - 10);
    trainingStatus.position(windowWidth/2 - 190, windowHeight/2 - 150)
    trainingStatus.hide();
    // episodesSlider = createSlider(10, 1000, 1000)


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
    instructions.html('Click on a tile to make a custom map. Dark circles are dead spots and light spots are safe.<br>When you are ready, click submit.');
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
    background(255);
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
    customTrainButton.hide();
    trainingStatus.hide();
    customSelect = false;
    if(customLake){
        customLake.hideEnv(); // hide the previous page content
    }
    
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
    instructions.html('Click the train button to train the model with the Q-learning Algorithm')
    // show the training/run buttons
    // customRunButton.show();
    // customStepButton.show();
    customTrainButton.show();
    trainingStatus.show();

    // make custom select false
    customSelect = false;
    customLake.hideEnv(); // hide the previous page content

    // make a q table with the custom map
    //qtable = new QTable(5, customMap); 
    qtable = new QTable(customMap[0].length, customMap);
}

function mousePressed(){
    if(customSelect == true){ // if the custom selection screen is showing
        customMap = customLake.changeEnv(mouseX, mouseY);
        customLake.showEnv();
        //console.log(customMap);
    }    
}

// when the train button is pressed, train the model 
function customTrainButtonPressed(){
    
    customTrainButton.hide();
    
    // train q table till it runs successfully
    console.log("Training")
    trainingStatus.html("please wait, training...")
    qtable.train(1000);


    if(qtable.successful == false){
        console.log("hi")
        trainingStatus.html("This map is too complicated or<br>not possible for the agent to complete")
        customRunButton.hide();
    }else{
        trainingStatus.hide();
        customRunButton.show();
    }
    console.log("Trained")

    
}

// // when the step train button is pressed, train the model incrementally
// function customStepButtonPressed(){
//     // train q table till it runs successfully
//     console.log("Training")
//     trainingStatus.html('status: training, please wait....')
//     qtable.train(1000);
//     console.log("Trained")
//     trainingStatus.html('status: trained, try running the agent...')
// }

// when the run button is pressed, run the agent
function customRunButtonPressed(){
    console.log("Running!")
    qtable.run();
}

// when the gym data button is pressed, run the gym data q table
function gymDataButtonPressed(){
    // delete border
    background(255);

    instructions.html("This is a map of my gym data for five weeks.  The dark spots are days I did not go to the gym.<br>The light spots are the days I went to the gym. Train the agent to navigate my data.")

    // show calendar
    let calStart = 83;
    text("M", calStart, 20);
    text("T", 2*calStart, 20);
    text("W", 3*calStart, 20);
    text("Th", 4*calStart, 20);
    text("F", 5*calStart, 20);

    // add the gym data to this custom map
    customMap = [["S", "H", "H", "F", "H"], ["F", "F", "H", "F", "H"], ["F", "H", "F", "F", "F"], ["F", "H", "F", "H", "H"], ["F", "F", "F", "F", "G"]]
    //customMap = [["S", "H", "H", "H", "H"], ["F", "F", "F", "F", "F"], ["H", "H", "H", "H", "F"], ["H", "H", "H", "G", "F"], ["H", "H", "H", "F", "H"]];
    // make a q table with the custom map
    qtable = new QTable(5, customMap); 
    // hide data buttons
    gymDataButton.hide();
    // show the training/run buttons
    // customRunButton.show();
    // customStepButton.show();
    // customFullButton.show();
    // trainingStatus.show();
    customTrainButton.show();
    trainingStatus.html("needs training...");
    trainingStatus.show();

    // // make custom select false
    // customSelect = false;
    
}