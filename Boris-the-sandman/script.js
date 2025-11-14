// Your variables go here

function preload() {
    // Load ressources before setup

    //we want to load the arduino board 
    loadBoard();
}

function setup() {
    // Code that runs once here
    createCanvas(500, 500).parent("sketch-container");
    //create a new led on pin 3

    led = new five.Led.RGB({
        pins: {
            red: 5,
            green: 9,
            blue: 10
        }
    });

    led.on();

}

function draw() {
    // Code that runs repeatedly code here
    //background(200);
    console.log(light);
    

}