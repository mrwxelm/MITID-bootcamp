// Your variables go here
let video;
let bodyPose;
let poses = [];
let piezo;

function preload() {
    // Load ressources before setup
    bodyPose = ml5.bodyPose();
    loadBoard();
}

function setup() {
    // Code that runs once here
    createCanvas(500, 500).parent("sketch-container");
    piezo = new five.Piezo(3);

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
        

        if(distance > 120){
            piezo.frequency(3000, 300);
        }else if(distance <= 120 && distance > 100){
            piezo.frequency(2500, 300);   
        }else if(distance <= 100 && distance > 80){
            piezo.frequency(2000, 300);   
        }else if(distance <= 80 && distance > 60){
            piezo.frequency(1500, 300);   
        }else if(distance <= 60 && distance > 40){
            piezo.frequency(1000, 300);   
        }else{
            piezo.frequency(100, 100);   
        }
    }
}