var len = 0;
var lenD = 0.70;
var rAngle;
var lAngle;
var tree = [];

function Branch(begin, end, id) {
    this.begin = begin;
    this.end = end;
    this.finished = false;
    this.id = id;

    this.show = function() {
        stroke(255, 255 - this.id * 16, 255 - this.id * 4);
        var size = floor(map(clamp(this.id, 0, 12), 0, 12, 5, 1));
        strokeWeight(size);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }

    this.branchR = function() {
        var dir = p5.Vector.sub(this.end, this.begin);
        dir.mult(lenD);
        dir.rotate(rAngle);
        var newEnd = p5.Vector.add(this.end, dir);
        var right = new Branch(this.end, newEnd, this.id + 1);
        return (right);
    }

    this.branchL = function() {
        this.finished = true;
        var dir = p5.Vector.sub(this.end, this.begin);
        dir.mult(lenD);
        dir.rotate(lAngle);
        var newEnd = p5.Vector.add(this.end, dir);
        var left = new Branch(this.end, newEnd, this.id + 1);
        return (left);
    }
}

function clamp(val, vmin, vmax) {
    return (max(vmin, min(val, vmax)));
}

function setup() {
    createCanvas(640, 640);
    len = height / 4;
    console.log(PI);
    rAngle = PI / 8
    lAngle = -PI / 8;
    var begin = createVector(width / 2, height);
    var end = createVector(width / 2, height - len);
    tree[0] = new Branch(begin, end, 0);
}

function draw() {
    background(64);
    var i
    for (i = 0; i < tree.length; i++) {
        tree[i].show();
    }
    console.log("gen : " + (tree[i - 1].id + 1));
    console.log("how much branch a the last stage : " + (i + 1) / 2);
    noLoop();
}

function mousePressed() {
    for (i = tree.length - 1; i >= 0; i--) {
        if (tree[i].finished == false) {
            tree.push(tree[i].branchR());
            tree.push(tree[i].branchL());
        }
    }
    draw();
}