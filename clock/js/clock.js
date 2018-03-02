const rSec = 100;
const rMin = rSec / 1.5;
const rHour = rMin / 1.5;
const SMOOTH_SEC = false;
let mil = 0;
let prevs = 0;


function setup() {
    createCanvas(600, 600);
    angleMode(DEGREES);
    frameRate(30);
    noFill();
}

function drawTaglock(angle, rayon) {
    let x = rayon * cos(angle);
    let y = rayon * sin(angle);
    line(0, 0, x, y);
    prevs = second();
}

function draw() {
    background(0);
    strokeWeight(8);

    let s = second();
    let m = minute();
    let h = hour();
    if (SMOOTH_SEC === true) {
        if (prevs != s) {
            prevs = s;
            mil = 0;
        } else
            mil += 1 / frameRate();
    }
    translate(width / 2, height / 2);
    rotate(-90);

    stroke(255, 150, 255);
    let sa = map(s + mil, 0, 60, 0, 360);
    drawTaglock(sa, rSec);
    arc(0, 0, 500, 500, 0, sa);

    stroke(255, 255, 150);
    let ma = map(m + s / 60, 0, 60, 0, 360);
    drawTaglock(ma, rMin);
    arc(0, 0, 480, 480, 0, ma);

    stroke(150, 255, 255);
    let ha = map(h + m / 60, 0, 24, 0, 360);
    arc(0, 0, 460, 460, 0, ha);
    ha = map((h % 12) + m / 60, 0, 12, 0, 360);
    drawTaglock(ha, rHour);

    stroke(255);
    point(0, 0);
    strokeWeight(1);
}