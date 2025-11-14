// Your variables go here
let video;
let led;
let bodyPose;
let poses = [];


function preload() {
    // Load ressources before setup
    loadBoard();
}

function setup() {
    // Code that runs once here
    createCanvas(500, 500).parent("sketch-container");
}

function draw() {
    // Code that runs repeatedly code here
    //background(200);

    if(poses.length >0){
        //red nose
        let nose1 = poses[0].nose.y;
        let nose2 = poses[1].nose.y;
        let nose3 = poses[2].nose.y;
        console.log(nose1);
        console.log(nose2);
        console.log(nose3); 

        

    }



}