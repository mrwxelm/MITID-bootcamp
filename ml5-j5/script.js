// Your variables go here

//variable to store the video
let video;

//variable to store the model
let bodyPose;

//a variable to store the results
let poses = [];

//a variable to store the LED 
let servo;

function preload() {
    // Load ressources before setup

    //load the bodyPose model
    bodyPose = ml5.bodyPose();

    //load the arduino board
    loadBoard();
}

function setup() {
    // Code that runs once here
    createCanvas(500, 500).parent("sketch-container");

    //start capturing video
    video = createCapture(VIDEO);

    //hide the video element
    video.hide();

    //start the bodyPose detection 
    bodyPose.detectStart(video, function(results){
        //make the results from the model globally accessible in the poses variable
        poses = results; 
    });

    //create the led object on pin 3 
    servo = new five.Servo(3);
}

function draw() {
    // Code that runs repeatedly code here
    //background(200);

    image(video, 0 , 0);

    //make sure that we have at least one pose detected
   if(poses.length > 0){


    let wrist  = poses[0].right_wrist.x;
    let angle = map(wrist, 0, 500, 0, 180);
    servo.to(angle);
    }
}