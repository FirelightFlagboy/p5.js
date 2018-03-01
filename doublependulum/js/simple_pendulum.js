let l1 = 125;
let m1 = 20;
let s1;
let a1 = 0.0;
let a1_v = 0.0;
let a1_a = 0.0;
let cvs;
let swt = true;
let frame = 30;
let count = 0;
const G = 9.81;

function setup() {
    createCanvas(600, 600);
    cvs = createGraphics(600, 600);
    stroke(0);
    frameRate(frame);
    cvs.background(255);
    cvs.stroke(0);
    cvs.strokeWeight(1);
    fill(0);
    s1 = 10 * Math.log(m1);
    a1 = HALF_PI / 2;
}

function draw() {
    image(cvs, 0, 0);
    translate(width / 2, height / 2);
    let x1 = l1 * sin(a1);
    let y1 = l1 * cos(a1);

    a1_a = -((G / l1) * sin(a1));
    a1_v += a1_a;
    a1 += a1_v;
    line(0, 0, x1, y1);
    ellipse(x1, y1, s1);
    if (count == 255) {
        count = 0;
        console.log("a1 : " + a1 + " a1_v : " + a1_v + " a1_a : " + a1_a);
        cvs.background(255);
    }
    cvs.point(width / 2 + x1, height / 2 + y1);
    count++;
}

function mousePressed() {
    if (swt == true) {
        console.log("stop");
        swt = false;
        frameRate(0);
    } else {
        swt = true;
        frameRate(frame);
    }
}