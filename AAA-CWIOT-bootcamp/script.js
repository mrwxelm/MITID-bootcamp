//most recent circle coordinates 
let cx ;
let cy ;

let x;
let y;

let radius ;
let inside;

function preload() {
    // Load ressources before setup

}

function setup() {
    // Code that runs once here
    createCanvas(500, 500).parent("sketch-container");
    // Given Coordinates 
    cx = 0;
    cy = 0;
    radius = 50;
    
}

function draw() {
    // Code that runs repeatedly code here
    //      background(200);
    //first circle
    x = mouseX;
    y = mouseY;

    inside = pointInsideCircle(x, y, cx, cy, radius);
    
    circle(x, y, radius * 2);

    if (inside == false){
        console.log(inside);
    }
    

    //new circle 
    cx = x;
    cy = y;
    
}

function pointInsideCircle(x, y, cx, cy, radius) {
  const distance = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
    return distance < radius;
}

