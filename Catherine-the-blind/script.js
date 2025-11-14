// Your variables go here
let video;
let led;
let bodyPose;
let poses = [];


function preload() {
    // Load ressources before setup
    bodyPose = ml5.bodyPose();
    loadBoard();
}

function setup() {
    // Code that runs once here
    createCanvas(500, 500).parent("sketch-container");
    led = new five.Led(3); 


    video = createCapture(VIDEO);
    video.hide();

    //start the model detection 
    bodyPose.detectStart(video, function(results){
        console.log(results);
        //instead of only accessing the results in this scope (in the console), we store the results in a global variable
        poses = results;
    })

}

function draw() {
    // Code that runs repeatedly code here
    //background(200);
    
    image(video, 0, 0);

    //get positions
    if(poses.length >0){
        let leftEye = poses[0].left_eye;
        let rightEye = poses[0].right_eye;
            
        let distance = dist(leftEye.x, leftEye.y, rightEye.x, rightEye.y); //coordinates of both eyes
        console.log(distance); //the bigger the distance the closer to the screen you are
        

        if(distance < 50){
            led.brightness(80);
        }else if(distance >= 50 && distance < 100){
            led.brightness(175);
        }else{
            led.brightness(255);
        }
    }
}