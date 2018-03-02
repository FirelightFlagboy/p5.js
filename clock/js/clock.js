const rSec = 100;
const rMin = rSec / 1.5;
const rHour = rMin / 1.5;


function setup() {
    createCanvas(600, 600);
    angleMode(DEGREES);
    frameRate(30);
    noFill();
    console.log(rSec);
    console.log(rMin);
    console.log(rHour);
}

function drawTaglock(angle, rayon) {
    let x = rayon * cos(angle);
    let y = rayon * sin(angle);
    line(0, 0, x, y);
}

function draw() {
    background(0);
    strokeWeight(8);

    let s = second();
    let m = minute();
    let h = hour();

    translate(width / 2, height / 2);
    rotate(-90);

    stroke(255, 150, 255);
    let sa = map(s, 0, 60, 0, 360);
    drawTaglock(sa, rSec);
    arc(0, 0, 500, 500, 0, sa);

    stroke(255, 255, 150);
    let ma = map(m + s / 60, 0, 60, 0, 360);
    drawTaglock(ma, rMin);
    if (m + s != 0 || s == 0)
        arc(0, 0, 480, 480, 0, ma);

    stroke(150, 255, 255);
    let ha = map(h + m / 60 + s / 3600, 0, 24, 0, 360);
    if (h != 0 || s == 0)
        arc(0, 0, 460, 460, 0, ha);
    ha = map(h % 12, 0, 12, 0, 360);
    drawTaglock(ha, rHour);

    stroke(255);
    point(0, 0);
    strokeWeight(1);
}