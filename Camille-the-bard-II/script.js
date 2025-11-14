let synth;
let video;
let bodyPose;
let poses =[];

function preload() {
    // Load ressources before setup
    bodyPose = ml5.bodyPose();
}

function setup() {
    // Code that runs once here
    createCanvas(500, 500).parent("sketch-container");
    video = createCapture(VIDEO);
    video.hide();

    bodyPose.detectStart(video, function(results){
        poses = results;
    })

    //Create a new MonoSynth
    synth = new p5.MonoSynth();
}

function draw() {
    // Code that runs repeatedly code here
    //background(200);
    image(video, 0, 0);

    
    
    if(poses.length >0){
        //detect wrist 
        let wrist = poses[0].right_wrist;
        console.log(wrist);
       
        

        synth.play(wrist.y, 0.5, 0, 0.2);
        
    }
}
