import Vector from './Vector.js';

export default class Particle {
    pos = new Vector(0, 0);
    color = 'red';
    radius = 4;
    maxSpeed = 100

    constructor(x, y, ctx) {
        this.pos = new Vector(x, y);
        this.vel = new Vector(0, 0);
        this.acc = new Vector(0, 0);
        this.ctx = ctx;
    }

    addForce(force) {
        this.acc.add(force);
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
        this.ctx.fill();
    }

    update(deltaTime) {
        if (Math.abs(this.vel.x) > this.maxSpeed) {
            this.vel.x = this.maxSpeed * Math.sign(this.vel.x);
        }

        if (Math.abs(this.vel.y) > this.maxSpeed) {
            this.vel.y = this.maxSpeed * Math.sign(this.vel.y);
        }

        this.vel.add(this.acc);
        this.pos.add(new Vector(this.vel.x * deltaTime, this.vel.y * deltaTime));
        this.acc.mult(0);
    }

    isOutOfWindow() {
        if (this.pos.x < 0) return true;
        if (this.pos.x > window.innerWidth - 10) return true;
        if (this.pos.y < 0) return true;
        if (this.pos.y > window.innerHeight - 10) return true;
    }
}