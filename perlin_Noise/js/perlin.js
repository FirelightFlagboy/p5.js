var rows, cols;
var scl = 20;
var swi = true;
var angle = 0;

function setup() {
    createCanvas(600, 600, WEBGL);
    pixelDensity(1);
    var w = 400;
    var h = 400;
    cols = w / scl;
    rows = h / scl;
    frameRate(5);
}

function myRect(x, y, w, h) {
    stroke(255);
    line(x, y, x + w, y);
    line(x, y, x, y + h);
    line(x, y + h, w + h, y + h);
    line(x + w, y, x + w, y + h);
}

function draw() {
    background(0);
    stroke(255);
    noFill();
    // beginShape(TRIANGLE_STRIP);
    // vertex(0, 0);
    // vertex(0, scl);
    // vertex(scl, 0);
    // vertex(0, 0);
    // endShape();
    translate(-width / 3, 0);
    rotateX(angle);
    angle += 0.03;
    for (y = 0; y < rows; y++) {
        beginShape(TRIANGLE_STRIP);
        for (x = 0; x < cols; x++) {
            var h1 = random(0, 10);
            var h2 = random(0, 10);
            vertex(x * scl, y * scl, h1);
            vertex(x * scl, (y + 1) * scl, h2);
            // vertex((x + 1) * scl, y * scl);
            // vertex(x * scl, y * scl, h);
        }
        endShape();
    }
}

function mousePressed() {
    if (swi) {
        swi = false;
        frameRate(0);
    } else {
        swi = true;
        frameRate(5);
    }
}