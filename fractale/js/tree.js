var len = 64;

function Branch() {
    this.begin = createVector(0, 0);
    this.end = createVector(0, 0);
}

Branch.prototype.init = function(begin, angle) {
    this.begin = begin;
    var x = len * cos(angle) + this.begin.x;
    var y = -len * sin(angle) + this.begin.y;
    this.end = createVector(x, y);
    len *= 1 / 4;
};

Branch.prototype.displayVal = function() {
    console.log(this.begin);
    console.log(this.end);
};

Branch.prototype.drawLine = function() {
    stroke(255);
    line(this.begin.x, this.begin.y, this.end.x, this.end.y);
};

function setup() {
    createCanvas(480, 480);
}

function draw() {
    background(128);
    var v1 = createVector(width / 2, height);
    var b = new Branch();
    b.init(v1, 2 * PI / 6);
    b.displayVal();
    b.drawLine();
    noLoop();
}