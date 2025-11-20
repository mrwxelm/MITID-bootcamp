let video; 
let bodyPose;
let poses = [];
let helmet;
let sword;
let shield;
let torso;
let rightFoot;
let leftFoot;
let piezo;


function preload() {
    // Load ressources before setup
    bodyPose = ml5.bodyPose();
    helmet = loadImage("helmet.png");
    sword = loadImage("sword.png");
    shield = loadImage("shield.png");
    torso = loadImage("torso.png");
    rightFoot = loadImage("rightFoot.png");
    leftFoot = loadImage("leftFoot.png");
    //loadBoard();

}

function setup() {
    // Code that runs once here
    createCanvas(500, 500).parent("sketch-container");
    //piezo = new five.Piezo(3);

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

    image(video, 0, 0);

    //get positions

    if(poses.length >0){

        //helmet, then cancel out 
        let leftEye = poses[0].left_eye;
        let rightEye = poses[0].right_eye;

        //sword
        let wrist = poses[0].right_wrist;
        
        //shield 
        let elbow = poses[0].left_elbow;

        //torso
        let Rshoulder = poses[0].right_shoulder;
        let Lshoulder = poses[0].left_shoulder;

        //feet
        let Rfoot = poses[0].right_ankle;
        let Lfoot = poses[0].left_ankle;

        let distance = dist(wrist.x, wrist.y, Lfoot.x, Lfoot.y);
        console.log("the distance is :" + distance);
        //put the images on
        //helmet
        image(helmet, leftEye.x -95, leftEye.y -120, 200, 200);
        image(sword, wrist.x - 180, wrist.y - 160, 200, 200);
        image(shield, elbow.x - 50, elbow.y - 80, 200, 200);
        image(torso, Rshoulder.x - 85, Rshoulder.y - 75, 250, 250);
        image(leftFoot, Rfoot.x - 95, Rfoot.y - 100, 150, 150);
        image(rightFoot, Lfoot.x - 50, Lfoot.y - 100, 150, 150);


       // if(distance > 400){
       //     piezo.frequency(3000, 500);
       // }

    }
}