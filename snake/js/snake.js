function constrainSnake(n, low, high) {
	if (n < low) {
		return (high);
	} else if (n > high) {
		return (low);
	}
	return (n);
}

function Snake(x, y, xSpeed, ySpeed) {
	this.x = x;
	this.y = y;
	this.len = 1;
	this.s = [createVector(x, y)];
	this.xSpeed = xSpeed;
	this.ySpeed = ySpeed;

	this.pickFoodLocation = function() {
		let x = floor(random(0, cols));
		let y = floor(random(0, rows));
		return (createVector(x * scl, y * scl));
	}

	this.eat = function(food) {
		if (s.x == food.x && s.y == food.y)
			return (true);
		return (false);
	}

	this.dir = function(xSpeed, ySpeed) {
		if (this.s.length > 1) {
			if (this.ySpeed == -1 && ySpeed == 1) //0,-1	up
				return;
			else if (this.ySpeed == 1 && ySpeed == -1) //0,1	down
				return;
			else if (this.xSpeed == 1 && xSpeed == -1) //-1,0	left
				return;
			else if (this.xSpeed == -1 && xSpeed == 1) //1,0	right
				return;
		}
		this.ySpeed = ySpeed;
		this.xSpeed = xSpeed;
	}

	this.grow = function() {
		this.len++;
	}

	this.death = function() {
		for (var i = 0; i < this.s.length - 1; i++) {
			if (this.s[i].x == this.x && this.s[i].y == this.y) {
				console.log(i + ": :" + this.s[i]);
				return (true);
			}
		}
		return (false);
	}
	this.update = function() {
		if (this.len == this.s.length) {
			for (let i = 0; i < this.s.length - 1; i++) {
				this.s[i] = this.s[i + 1];
			}
		}
		this.s[this.len - 1] = createVector(this.x, this.y);
		this.x += this.xSpeed * scl;
		this.y += this.ySpeed * scl;

		this.x = constrainSnake(this.x, 0, width - scl);
		this.y = constrainSnake(this.y, 0, height - scl);

	}

	this.show = function() {
		for (var i = 0; i < this.s.length; i++) {
			fill(255 - i * 4, 92 + i * 4, 255);
			let vec = this.s[i];
			rect(vec.x, vec.y, scl, scl);
		}
	}
}
