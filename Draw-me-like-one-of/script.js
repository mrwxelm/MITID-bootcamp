// Your variables go here
let video; 
let bodyPose;
let poses = [];
let line = []; 
let button;
let width;
let colorRed;
let colorGreen;
let colorBlue;

function preload() {
    // Load ressources before setup
    bodyPose = ml5.bodyPose();
    loadBoard();
}

function setup() {
    // Code that runs once here
    createCanvas(500, 500).parent("sketch-container");
    frameRate(30);
    button = new five.Button({
        pin: 8,
        isPullup: true,
    });

//initiate the sensors 
    sensor1 = new five.Sensor({
        pin: "A0",
        //freq: 250,
        threshold: 5
    });
        
    sensor2 = new five.Sensor({
            pin: "A1",
            //freq: 250,
            threshold: 5
        });

    video = createCapture(VIDEO);
    video.hide();
 
    bodyPose.detectStart(video, function(results){
        poses = results;
    });

    //check the button works
    button.on("down", function(value) {
        console.log("Button pressed")

        line = [];
        clear();
    });

    button.on("up", function() {
        console.log( "Button released" );
    });

    sensor1.on("change", function (){
        let value1 = this.scaleTo(10,50);
        width = value1;
    });

    sensor2.on("change", function (){
        let value2 = this.scaleTo(0, 255);
        colorRed = value2;

    });
}

//draw the line
function draw() {
    // Code that runs repeatedly code here
    //background(200);
    image(video, 0, 0);
    
    if(poses.length >0){
        let wrist = poses[0].right_wrist;

        line.push({ x: wrist.x, y: wrist.y });

        noStroke();
        for (let p of line) {
            circle(p.x, p.y, width);
            fill(colorRed, colorRed, colorRed);
        }

    }

}