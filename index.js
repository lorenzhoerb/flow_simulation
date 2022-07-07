"use strict";

import Particle from './Particle.js';
import VectorField from './VectorField.js';

let canvas;
let ctx;
let lastRender = 0;
let vectorField;
let mousePos = { x: 0, y: 0 };
let cc = 0;

const clearCanvas = false;

const PART_AMOUNT = 2000;
let particles = [];

window.onload = init;

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    window.addEventListener('resize', resizeCanvas, false);
    canvas.addEventListener('mousemove', evt => getMousePos(canvas, evt));


    vectorField = new VectorField(window.innerWidth, window.innerHeight, 25, ctx);
    vectorField.showVec = false;

    for (let i = 0; i < PART_AMOUNT; i++) {
        particles[i] = new Particle(Math.random() * window.innerWidth, Math.random() * window.innerHeight, ctx);
        particles[i].maxSpeen = 300;
        particles[i].color = 'rgba(255,255,255,0.2)';
        particles[i].radius = 0.1;
    }

    resizeCanvas();

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    window.requestAnimationFrame(loop);
}

function update(deltaTime) {
    cc += 2;
    vectorField.update(deltaTime);

    for (let i = 0; i < particles.length; i++) {

        if (particles[i].isOutOfWindow()) {
            particles.splice(i, 1);
            continue;
        }

        // particles[i].color = 'hsl(' + cc % 360 + ',100%,50%)'; // colors particles as rainbow

        let force = vectorField.getVectorAtPos(particles[i].pos);
        particles[i].addForce(force);
        particles[i].update(deltaTime);
    }
}

function draw() {

    if (clearCanvas)
        clearFrame();

    vectorField.draw();
    particles.forEach(p => {
        p.draw();
    });
}

function clearFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function drawLine(x, y, angle, radius) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);
    ctx.stroke();
}

function loop(timeStamp) {
    let deltaTime = (timeStamp - lastRender);
    lastRender = timeStamp;

    update(deltaTime / 1000);
    draw();

    window.requestAnimationFrame(loop);
}


function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    vectorField.setSize(window.innerWidth, window.innerHeight);
}

function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    mousePos = {
        x: ((evt.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
        y: ((evt.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
    };
};