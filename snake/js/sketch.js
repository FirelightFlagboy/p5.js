let s;
let scl = 10;
let life = 1;
let rows;
let cols;
let food;

function setup() {
	createCanvas(600, 600);

	rows = height / scl;
	cols = width / scl;

	s = new Snake(cols / 2, rows / 2, 1, 0);
	frameRate(10);
	food = s.pickFoodLocation();
}



function keyPressed() {
	switch (keyCode) {
		case UP_ARROW:
			s.dir(0, -1);
			break;
		case DOWN_ARROW:
			s.dir(0, 1);
			break;
		case LEFT_ARROW:
			s.dir(-1, 0);
			break;
		case RIGHT_ARROW:
			s.dir(1, 0);
			break;
		case ENTER:
			if (life == 0) {
				life = 1;
				draw();
				s = new Snake(cols / 2, rows / 2, 1, 0);
				frameRate(10);
			}
			break;
	}

}

function mousePressed() {
	s.grow();
}

function draw() {
	background(0);
	s.update();
	if (s.death()) {
		fill(0, 150, 250);
		textSize(32);
		textAlign(CENTER, CENTER);
		life = 0;
		text("You lose,\npress enter to continue", width / 2 - 17, height / 2);
		frameRate(0);
	}
	s.show();
	if (s.eat(food) == true) {
		s.grow();
		food = s.pickFoodLocation();
	}
	fill(255, 0, 150);
	rect(food.x, food.y, scl, scl);
}
