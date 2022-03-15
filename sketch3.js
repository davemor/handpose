let handpose;
let video;
let hands = [];

function drawDigit(points) {
  for(let i = 0; i < points.length-1; ++i) {
    const x1 = points[i][0];
    const y1 = points[i][1];
    const x2 = points[i+1][0];
    const y2 = points[i+1][1];
    line(x1, y1, x2, y2);
  }
}

const digitColours = [
  '#6a4c93aa',
  '#1982c4aa',
  '#8ac926aa',
  '#ffca3aaa',
  '#ff595eaa'
];

function setup() {
  console.log('ml5 version:', ml5.version);

  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("hand", results => {
    hands = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  console.log("Model ready!");
}

let frameCount = 0;
function draw() {
  // if (frameCount%30 == 0) {
    // background('#f8edeb');
  // }
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();

  ++ frameCount;
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // console.log(hands.length);
  for (let i = 0; i < hands.length; ++i) {
    const hand = hands[i];
    /*
    for (let j = 0; j < hand.landmarks.length; j += 1) {
      const keypoint = hand.landmarks[j];
      fill(0, 255, 0);
      noStroke();
      ellipse(keypoint[0], keypoint[1], 10, 10);
    }
    */

    stroke(255, 0, 0);
    strokeWeight(20.0);
    let cidx = 0;
    for (let key in hand.annotations) {
      if (hand.annotations.hasOwnProperty(key)) {
        stroke(digitColours[cidx%digitColours.length]);
        drawDigit(hand.annotations[key]);
        ++cidx;
      }
    }
  }
}

// function windowResized() {
 // resizeCanvas(windowWidth, windowHeight);
// }