// Your variables go here

//variable to store the video element
let video; 

//a variable to store the bodypose model
let bodyPose;

//a varibale to store the results
let poses = [];

let chapeau;

function preload() {
    // Load ressources before setup
    bodyPose = ml5.bodyPose();
    //chapeau = loadImage("chapeau.png");
}

function setup() {
    // Code that runs once here
    createCanvas(500, 500).parent("sketch-container");
    frameRate(15);

    video = createCapture(VIDEO);
    video.hide();

    //start the model detection 
    bodyPose.detectStart(video, function(results){
        //console.log(results);
        //instead of only accessing the results in this scope (in the console), we store the results in a global variable
        poses = results;
    })
}

function draw() {
    // Code that runs repeatedly code here
    //background(200);

    image(video, 0, 0); //if you draw an image fast enough = video

    //make sure we detect at least one pose
    if(poses.length >0){
        //red nose
        let nose = poses[0].nose;
        console.log(nose);
        fill(255, 0, 0);
        circle(nose.x, nose.y, 20)
    }

}
