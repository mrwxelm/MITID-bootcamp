// Your variables go here



function preload() {
}

function setup() {
    // Code that runs once here
    createCanvas(500, 500).parent("sketch-container");
    textSize(150);
    fill(229, 60, 45);
    textAlign(CENTER, CENTER);
    noStroke();
    textFont('Stardos Stencil');
}

function draw() {
    fill(229, 60, 45);
    circle(width/2, height/2, 500); //bigger circle

    fill(233, 223, 192); //beige
    circle(width/2, height/2, 200); //smaller circle 
    
    fill("black"); // red again for text
    text('17', width/ 2, height / 2 + 15);
    textStyle(BOLD);
}

