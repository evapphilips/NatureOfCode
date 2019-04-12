// Eva Philips
// April 11, 2019
// Nature of Code, Week 10: Final Project Testing

//variables
let tiles = [];
let tileSize = 100;
let agent;

function setup() {
  // canvas setup
  createCanvas(500, 500);

  // create grid of tiles
  let y = tileSize/2;
  for(let j=0; j<height/(tileSize/2); j++){
    let x = tileSize/2;
    for(let i=0; i<width/(tileSize/2); i++){
        tiles.push(new Tile(x, y, tileSize));
        x += tileSize;
    }
    y += tileSize;
  }

  // create the agent
  agent = new Agent(tileSize/2, tileSize/2, tileSize);
}

function draw() {
  // canvas setup
  background(220);

  // show the tiles
  for(let i=0; i<tiles.length; i++){
      tiles[i].display();
  }

  // show the agent
  agent.display();
}

// trigger the clicked function inside the tiles class when the mouse is pressed
function mousePressed(){
  for(let i=0; i<tiles.length; i++){
    tiles[i].clicked(mouseX, mouseY);
  }
}

// trigger the moved function inside the agent class when an arrow is pressed
function keyPressed(){
  if(keyCode == UP_ARROW){  // move up with up arrow
    let dir = 0;
    agent.moved(dir)
  }
  if(keyCode == RIGHT_ARROW){  // move right with right arrow
    let dir = 1;
    agent.moved(dir)
  }
  if(keyCode == DOWN_ARROW){  // move down with down arrow
    let dir = 2;
    agent.moved(dir)
  }
  if(keyCode == LEFT_ARROW){  // move left with left arrow
    let dir = 3;
    agent.moved(dir)
  }
}

