let video;
let status;
let detectionModel;
let objects = [];
let flower1;
let flower2;
let flower3;
let flowerArray = [];

let randomMod1;
let randomMod2;
let randomMod3;



/*window.onload = () => {
  modelPromise = cocoSsd.load().then(m => {
    model = m;
    console.log("Model loaded");
  });
}; //when full page is loaded run model
*/

let cx = 0;
let cy = 0;
let radius = 10;
let zoneRadius;
let flowerRadius;

let yOffset = 150;
let flowerSize = 40;

let x = 0;
let y = 0;
let still;
let timeStill;
let start = Date.now(); //debut (premiere detection)

let lifetime = 3500; 


// Linear interpolation
const lerp = (value, target, damp) => value + (target - value) * damp

//did we move 
function pointInsideCircle(x, y, cx, cy, radius) {
    const distance =
        Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
    return distance < radius;
}

function randomPointInCircle(x, y, radius){
    const angle = random() * 2 * PI;
    const hypothenuse = sqrt(random() * radius);
    const adjacent = cos(angle) * hypothenuse;
    const opposite = sin(angle) * hypothenuse;
    return {x: x + adjacent, y: y + opposite};
}

function loadCocoModel() {
  cocoSsd.load({
    'base': "mobilenet_v2"
  }).then(modelReady);
}

function modelReady(model) {
  detectionModel = model;
  status.html("Model loaded!");
  detect();
}

function detect() {
  detectionModel.detect(video.elt).then(results => {
    //console.log(results);

    //if(results.class == 'person'){
        objects = results;
    //}
     //store detected objects in the array
    //filtrer les personnes seulements

    //baisser le seuil d'acceptabilite
    window.requestAnimationFrame(detect);
  });
}

function preload() {
    flower1 = loadImage("flower1.png");
    flower2 = loadImage("flower2.png");
    flower3 = loadImage("flower3.png");
}

function setup() {
    createCanvas(windowWidth , windowHeight - 100);
    frameRate(30);
    video = createCapture(VIDEO);
    video.size(windowWidth, windowHeight);
    video.elt.addEventListener("loadedmetadata", loadCocoModel);
    video.hide();
    status = select("#status");
    
  
}

function draw() {
        //image(video, 0, 0, width, height);
        fill(0, 0, 0);
        noStroke();
        rect(((windowWidth/2) + (windowWidth /4)) + 20, 0, 500, windowHeight);

    if (objects.length>0){
        background(255);
        fill(0, 0, 0);
        noStroke();
        rect(((windowWidth/2) + (windowWidth /4)) + 20, 0, 500, windowHeight);


        //cadre object detecte

        //image(video, 0, 0, width, height);

        
    
        const candidates = objects.filter( x => {
          return x.class == "person" && x.score > 0.2
        })
        console.log(candidates);
        if(candidates.length == 0) return;
        const person = objects[0];
        let objectX = person.bbox[0];
        let objectY = person.bbox[1];
        let objectWidth = person.bbox[2];
        let objectHeight = person.bbox[3];
        let objectClass = person.class;
        let objectScore = person.score;

        let centerX = objectX + (objectWidth/2);
        let centerY = objectY + (objectHeight/2);
        noStroke();
        fill(0, 0, 0);
        //text(objectClass, objectX, objectY - 5);
        noFill();
        strokeWeight(2);
        stroke(0, 255, 0);
        //rect(objectX, objectY, objectWidth, objectHeight);
        

        const currentTimeStamp = Date.now(); //info utilisée plus tard
        //background(20);
        x = lerp(x, centerX, 0.8)
        y = lerp(y, centerY, 0.4)
        
        //fill(255)
        circle(x, y, radius);


        //moved or not 
        if(pointInsideCircle(x, y, cx, cy, radius)){
            still = true;
        } else {
            still = false;
        } 
        circle(centerX, centerY, radius);
        cx = x;
        cy = y;

        //zone d'apparition
        if (still){
            timeStill = currentTimeStamp  - start; //milliseconds passées sans bouger (entre mnt et le debut = currentTimeStamp prit au debut)
            //fill(0, 0, 255); //blue circle that keeps growing 

            zoneRadius = timeStill / 1000; //pour que le perimetre grossise plus ou moins vite
            circle(x, y, radius * zoneRadius);
        
            const randomPoint = randomPointInCircle(x, y, zoneRadius * 500);
            
            //---------------- CREATE FLOWERS ----------------//
            // Offset flower position randomly
            const offset = 50;
            let randomOffsetX = random(-offset, offset);
            let randomOffsetY = random(-offset, offset);
            let randomMod1 = random(10, 70);
            let randomMod2 = random(10, 70);
            let randomMod3 = random(10, 70);

            //push them into the array and store creation time
            flowerArray.push({ 
                x: randomPoint.x + randomOffsetX,
                y: randomPoint.y + randomOffsetY, 
                createdAt: Date.now(),
                type: flower1,
                width: randomMod1,
                height: randomMod1
            });
            flowerArray.push({ 
                x: randomPoint.x + randomOffsetX,
                y: randomPoint.y + randomOffsetY, 
                createdAt: Date.now(),
                type: flower2,
                width: randomMod2,
                height: randomMod2 * 1.089
            });
            flowerArray.push({ 
                x: randomPoint.x + randomOffsetX,
                y: randomPoint.y + randomOffsetY, 
                createdAt: Date.now(),
                type: flower3,
                width: randomMod3 * 1.33,
                height: randomMod3
            });
        }else{
            start = currentTimeStamp; //c'est date.now du debut
            timeStill = 0;   
        } 
    }
    
    //remove when older than expected lifetime
    flowerArray = flowerArray.filter(f => (Date.now() - f.createdAt) < lifetime);

    //draw them
    for(let f of flowerArray){
        image(f.type, f.x, f.y, f.width, f.height);
    } 
}