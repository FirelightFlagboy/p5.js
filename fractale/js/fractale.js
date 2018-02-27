const ONE_OVER_LOG2 = 1.0 / Math.log(2.0);
var maxIter = 256;
var infi = 64.0;

var x1 = -2.5;
var x2 = 2.5;
var y1 = -2.0;
var y2 = 2.0;
var cwidth = x2 - x1;
var cheight = y2 - y1;

var count = 0;

var mapcolor = genMapColor();

function genMapColor() {
    var col = [];
    var r = 0;
    var v = 255;
    var b = 0;
    for (var i = 0; i < 255; i++) {
        col.push([r, v, b]);
        v--;
        b++;
    }
    for (var i = 0; i < 255; i++) {
        col.push([r, v, b]);
        b--;
        r++;
    }
    for (var i = 0; i < 255; i++) {
        col.push([r, v, b]);
        r--;
        v++;
    }
    col.push([0, 0, 0]);
    return (col);
}

function calculIter(x, y) {
    var Cr = cwidth * x / width + x1;
    var Ci = cheight * y / height + y1

    var Zr = 0.0;
    var Zi = 0.0;
    var Tr = 0.0;
    var Ti = 0.0;
    var i = 0;
    for (; i < maxIter && (Tr + Ti) <= infi; ++i) {
        Zi = 2 * Zr * Zi + Ci
        Zr = Tr - Ti + Cr;
        Tr = Zr * Zr;
        Ti = Zi * Zi;
    }
    return ([i, Tr, Ti]);
}

function getColor(iter) {
    if (iter[0] == maxIter)
        return ([0, 0, 0]);
    var c = Math.log(Math.log(Math.sqrt(iter[1] + iter[2])) * ONE_OVER_LOG2) * ONE_OVER_LOG2;
    if (isNaN(c))
        c = 0.0;
    c = (Math.sqrt(iter[0] + 1 - c) * 255) % mapcolor.length;
    return (mapcolor[Math.floor(c)]);
}

function renderFractal() {
    var offset = 0;
    var cl;
    loadPixels();
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var iteration = calculIter(x, y);
            cl = getColor(iteration);
            pixels[offset++] = cl[0];
            pixels[offset++] = cl[1];
            pixels[offset++] = cl[2];
            pixels[offset++] = 255;
        }
    }
    updatePixels();
    console.log("Done");
}

function mousePressed() {
    if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
        maxIter += 16;
        console.log(maxIter);
    } else {
        var mXCoord = (mouseX * 1.0 / width) * cwidth + x1;
        var mYCoord = (mouseY * 1.0 / height) * cheight + y1;
        x1 = mXCoord - cwidth / 8.0;
        x2 = mXCoord + cwidth / 8.0;
        y1 = mYCoord - cheight / 8.0;
        y2 = mYCoord + cheight / 8.0;
        cwidth /= 4.0;
        cheight /= 4.0;
        console.log("resize" + count);
        count += 1;
    }
    renderFractal();
}

function setup() {
    createCanvas(480, 480);
    pixelDensity(1);
    renderFractal();
}