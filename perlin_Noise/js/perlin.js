let rows, cols;
let angle = 0;
let scl = 25;
let mul = 200;
let noiseScl = 0.01;
let dcl = 5;
let cvs;
let sy = 0;
let sx = 0;
let swi = true;
const FRAME = 30;
const ONE_LOOP = false;

function setup() {
    createCanvas(600, 600, WEBGL);
    frameRate(FRAME);
    noStroke();
}

function draw() {
    background(0);
    rotateX(-PI / 8);
    pointLight(250, 250, 250, 191, -184, 100);
    for (y = 0; y < height + 77; y += scl) {
        for (x = 0; x < width; x += scl) {
            push();
            let h = floor(noise((sx + x) * noiseScl, (sy + y) * noiseScl) * mul);
            translate(x - width / 2, 0, y - height / 2);
            ambientMaterial(250);
            box(scl, h, scl);
            pop();
        }
    }
    if (ONE_LOOP)
        noLoop();
    sy -= scl;
}

function mousePressed() {
    if (swi == true) {
        swi = false
        console.log("stop");
        frameRate(0);
    } else {
        swi = true;
        frameRate(FRAME);
    }
}