import Vector from "./Vector.js";
import { drawLine } from './index.js'

export default class VectorField {
    angle = 0
    radius = 20;
    magniture = 0.5;
    showVec = true;
    field = null;

    constructor(width, height, scale, ctx) {
        this.width = width;
        this.height = height;
        this.scale = scale;
        this.ctx = ctx;

        this.#initField(this.width, this.height, this.scale)
    }

    setSize(width, height) {
        this.width = width;
        this.height = height;
        this.#initField(width, height, this.scale);
    }

    #initField(width, height, scale) {
        let sizeX = Math.round(width / scale);
        let sizeY = Math.round(height / scale);

        this.field = Array(sizeX);

        for (let x = 0; x < sizeX; x++) {
            this.field[x] = Array(sizeY)
            for (let y = 0; y < this.field[0].length; y++) {
                this.field[x][y] = new Vector(1, 0);
            }
        }
    }

    update(deltaTime) {
        this.angle += 1
        for (let x = 0; x < this.field.length; x++) {
            for (let y = 0; y < this.field[0].length; y++) {
                if (this.field[x][y] == null) {
                    this.field[x][y] = new Vector(1, 0);
                } else {
                    // Vector field formula
                    this.field[x][y].setAngle(Math.sin(x * 0.1) * Math.sin(y * 0.1 + y * 0.01) * 2 + this.angle * deltaTime);
                }
            }
        }
    }

    getVectorAtPos(pos) {
        let x = Math.floor(pos.x / this.scale);
        let y = Math.floor(pos.y / this.scale);
        return this.field[x][y];
    }

    draw() {
        if (this.field == null) {
            return;
        }

        this.ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        for (let x = 0; x < this.field.length; x++) {
            for (let y = 0; y < this.field[0].length; y++) {
                if (this.showVec) {
                    drawLine(x * this.scale, y * this.scale, this.field[x][y].angle(), this.radius);
                }
            }
        }
    }
}