let scl = 360 / 10000;

let vector = [];
let circle = [];
let cvs;
let swi = true;
const FRAME = 60;

function Circle(rayon, speed, angle, parent) {
    this.rayon = rayon;
    this.speed = speed;
    this.angle = angle;
    this.parent = parent;
    this.x = 0;
    this.y = 0;
}

Circle.prototype.show = function() {
    let prevR = 0;
    if (this.parent != null) {
        this.x = this.parent.x;
        this.y = this.parent.y;
        prevR = this.parent.rayon;
        this.x += (this.rayon + prevR) * cos(this.angle) / 2;
        this.y += (this.rayon + prevR) * sin(this.angle) / 2;
        this.angle += scl * this.speed;
    }
    ellipse(this.x, this.y, this.rayon);
};

function setup() {
    createCanvas(600, 600);
    angleMode(DEGREES);
    frameRate(FRAME);

    cvs = createGraphics(600, 600);
    cvs.background(0);
    cvs.stroke(255);

    let r = 200;
    let speed;
    let prev = null;
    for (i = 0; i < 6; i++) {
        speed = pow(-4, i - 1);
        circle.push(new Circle(r, speed, -90, prev));
        r *= 0.5;
        prev = circle[circle.length - 1];
    }
    console.log(circle);
}

function draw() {
    image(cvs, 0, 0);
    stroke(255);
    noFill();

    translate(width / 2, height / 2);
    let stop = 0;
    for (i = 0; i < circle.length; i++) {
        circle[i].show();
        if (circle[i].angle % 360 == 0.0) {
            stop = stop;
        } else
            stop = 0;
    }
    let x = circle[circle.length - 1].x + width / 2;
    let y = circle[circle.length - 1].y + height / 2;
    vector.push(new p5.Vector(x, y));
    cvs.beginShape();
    cvs.noFill();
    vector.forEach(function(v) {
        vertex(v.x, v.y)
    })
    cvs.endShape();
    text(floor(frameRate()), (-width / 2) + 5, (height / 2) - 5);
    if (stop && frameCount > 0)
        noLoop();
}

// function draw() {
//     image(cvs, 0, 0);
//     stroke(255);
//     noFill();
//
//     translate(width / 2, height / 2);
//
//     ellipse(0, 0, r1);
//
//     let x2 = (r2 + r1) * cos(a1) / 2+0;
//     let y2 = (r2 + r1) * sin(a1) / 2+0;
//     ellipse(x2, y2, r2);
//
//     let x3 = (r3 + r2) * cos(a2) / 2 + x2;
//     let y3 = (r3 + r2) * sin(a2) / 2 + y2;
//     ellipse(x3, y3, r3);
//
//     let x4 = (r4 + r3) * cos(a3) / 2 + x3;
//     let y4 = (r4 + r3) * sin(a3) / 2 + y3;
//     ellipse(x4, y4, r4);
//     cvs.point(width / 2 + x4, height / 2 + y4);
//     a1 += scl;
//     a2 -= scl * m2;
//     a3 += scl * m3;
//     // if (a1 >= 270) {
//     //     a1 = -90;
//     //     a2 = -90;
//     //     cvs.background(0);
//     // }
//     text(floor(frameRate()), (-width / 2) + 5, (height / 2) - 5);
// }

function mousePressed() {
    if (swi == true) {
        swi = false;
        frameRate(0);
    } else {
        swi = true;
        frameRate(FRAME);
    }
}