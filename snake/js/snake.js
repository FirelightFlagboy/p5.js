function Snake(x, y, xSpeed, ySpeed) {
    this.x = x;
    this.y = y;
    this.len = 0
    this.s = [];
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;

    this.dir = function(xSpeed, ySpeed) {
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
    }

    this.update = function() {
        this.x += this.xSpeed * scl;
        this.y += this.ySpeed * scl;

        this.x = constrain(this.x, 0, width - scl);
        this.y = constrain(this.y, 0, height - scl);
    }

    this.show = function() {
        fill(255);
        rect(this.x, this.y, scl, scl);
    }
}