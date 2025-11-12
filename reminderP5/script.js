// Your variables go here

let synth;

function preload() {
    // Load ressources before setup
}

function setup() {
    // Code that runs once here
    createCanvas(500, 500).parent("sketch-container");


    //Create a new MonoSynth
    synth = new p5.MonoSynth();
}

function draw() {
    // Code that runs repeatedly code here
    //background(200);

    synth.play(mouseY, 0.5, 0, 0.2);
    circle(mouseX, mouseY, 100); //param: center on x, center on y, size (width)
    
}

function mousePressed(){
    let red = random(0,255);
    let green = random(0, 255);
    let blue = random(0,255);
    fill(red, blue, green);


    //frequency =


    
}