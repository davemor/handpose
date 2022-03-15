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

function setup() {
    createCanvas(640, 480);
    console.log('ml5 version:', ml5.version);

    video = createCapture(VIDEO);
    video.size(width, height);

    handpose = ml5.handpose(video, () => {
        console.log("model loaded.");
    });

    handpose.on("hand", results => {
        // console.log(results);
        hands = results;
    });

    video.hide(); 
}

function draw() {
    image(video, 0, 0, width, height);
    
    for (let i = 0; i < hands.length; ++i) {
        const hand = hands[i];
        for (let key in hand.annotations) {
            if (hand.annotations.hasOwnProperty(key)) {
                drawDigit(hand.annotations[key]);
            }
        }
    }
}
