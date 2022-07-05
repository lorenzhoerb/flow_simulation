export default class Vector {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vec) {
        this.x += vec.x;
        this.y += vec.y;
    }

    angle() {
        return Math.atan2(this.y, this.x);
    }

    length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    norm() {
        return this.mult(1 / this.length());
    }

    setAngle(angle) {
        let length = this.length()
        this.x = length * Math.cos(angle);
        this.y = length * Math.sin(angle);
    }

    mult(factor) {
        this.x = this.x * factor;
        this.y = this.y * factor;
        return this;
    }
}