let l1 = 125;
let l2 = 125;
let m1 = 20;
let m2 = 20;
let a1 = 0.0;
let a1_v = 0.0;
let a1_a = 0.0;
let a2 = 0.0;
let a2_v = 0.0;
let a2_a = 0.0;
const G = 0.5;
const SP = 30;
let canvas;
let count = 0;
let org;

var swtch = true;


function setup() {
    createCanvas(800, 800);
    frameRate(SP);

    org = createVector(width / 2, height / 2);
    a1 = PI / 2;
    a2 = PI / 8;
    canvas = createGraphics(800, 800);
    canvas.background(255);
    canvas.stroke(0);
    canvas.strokeWeight(2);
}

function recalA1() {
    let p1 = -G * (2 * m1 + m2) * sin(a1);
    let p2 = -m2 * G * sin(a1 - 2 * a2);
    let p3 = -2 * sin(a1 - a2) * m2;
    let p4 = a2_v * a2_v * l2 + a1_v * a1_v * l1 * cos(a1 - a2);
    let den = l1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
    a1_a = (p1 + p2 + p3 * p4) / den;
}

function clamp(val, vmin, vmax) {
    return (max(vmin, min(val, vmax)));
}

function recalA2() {
    let p1 = 2 * sin(a1 - a2);
    let p2 = a1_v * a1_v * l1 * (m1 + m2);
    let p3 = G * (m1 + m2) * cos(a1);
    let p4 = a2_v * a2_v * l2 * m2 * cos(a1 - a2);
    let den = l2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
    a2_a = (p1 * (p2 + p3 + p4)) / den;
}

function draw() {
    image(canvas, 0, 0);
    translate(org.x, org.y);
    fill(0);

    let x1 = l1 * sin(a1);
    let y1 = l1 * cos(a1);

    let x2 = x1 + (l2 * sin(a2));
    let y2 = y1 + (l2 * cos(a2));

    line(0, 0, x1, y1);
    ellipse(x1, y1, m1);

    line(x1, y1, x2, y2);
    ellipse(x2, y2, m2);

    recalA1();
    recalA2();

    a1_v += a1_a;
    a2_v += a2_a;

    a1 += a1_v;
    a2 += a2_v;

    a1_v = clamp(a1_v, -0.1, 0.1);
    a2_v = clamp(a2_v, -0.1, 0.1);
    if (count >= 500) {
        count = 0;
        canvas.background(255);
        console.log("temp :");
        console.log("a1 : " + a1 + " a1_v : " + a1_v + " a1_a : " + a1_a);
        console.log("a2 : " + a2 + " a2_v : " + a2_v + " a2_a : " + a2_a);
    }
    if (frameCount > 1)
        canvas.point(org.x + x2, org.y + y2);
    count++;
}

function mousePressed() {
    if (swtch == true) {
        swtch = false;
        frameRate(0);
    } else {
        swtch = true;
        frameRate(SP);
    }

}