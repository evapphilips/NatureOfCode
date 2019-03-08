// Eva Philips
// March 1, 2019
// Nature of Code Week 5: Steering Behavior Practice

// varaibles
let flock;

let video;
let poseNet;
let poses = [];

function setup() {
  // canvas setup
  //createCanvas(windowWidth , windowHeight);
  createCanvas(600, 400)
  //background(0);

  // setup posenet
  video = createCapture(VIDEO);
  video.size(width, height);
  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function (results) {
     poses = results;
   });
  // Hide the video element, and just show the canvas
  video.hide();

  // start a new flock
  flock = new Flock();

  // create some new bodies at the beginning
  for(let i=0; i<300; i++){
    let b = new Body(random(0,width), random(0, height));
    flock.addBody(b);
  }
  

}

function draw() {
  // canvas setup
  background(0);

  // find poseNet point
  let point = nosePoint();


  // run the flock
  if(point){
    flock.run(point[0], point[1]);
  }
  

  // //draw points from poseNet
  // drawNose();




}

function nosePoint(){
  for(let i=0; i<poses.length; i++){
    let keypoint = poses[i].pose.keypoints[0];
    if(keypoint.score >0.2){
      return [keypoint.position.x, keypoint.position.y]
  }
  }
}

// function drawNose(){
//   // Loop through all the poses detected
//   for (let i = 0; i < poses.length; i++) {
//     let keypoint = poses[i].pose.keypoints[0];
//       // Only draw an ellipse is the pose probability is bigger than 0.2
//       if (keypoint.score > 0.2) {
//         fill(255, 0, 0);
//         noStroke();
//         ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
//       }
//   }
// }
