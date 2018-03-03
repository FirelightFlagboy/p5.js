let s;
let scl = 10;
let rows;
let cols;
let food;

function setup() {
    createCanvas(600, 600);

    rows = height / scl;
    cols = width / scl;

    s = new Snake(cols / 2, rows / 2, 1, 0);
    frameRate(10);
    pickLocation();
}

function pickLocation() {
    let x = floor(random(0, cols));
    let y = floor(random(0, rows));
    food = createVector(x, y);
}

function keyPressed() {
    switch (keyCode) {
        case UP_ARROW:
            console.log("up");
            s.dir(0, -1);
            break;
        case DOWN_ARROW:
            console.log("down");
            s.dir(0, 1);
            break;
        case LEFT_ARROW:
            console.log("left");
            s.dir(-1, 0);
            break;
        case RIGHT_ARROW:
            console.log("right");
            s.dir(1, 0);
            break;
    }

}

function checkFood() {
    if (s.x == food.x && s.y == food.y)
        return (true);
    return (false);
}

function draw() {
    background(0);
    s.update();
    s.show();
    if (checkFood() == true) {
        pickLocation();
    }
    fill(255, 0, 150);
    rect(food.x * scl, food.y * scl, scl, scl);
}