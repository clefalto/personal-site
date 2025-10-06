const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let particlePool = [];

const numParticles = 50;
const CELL_SIZE = 4; // 4px

function Particle(x, y, xVel, yVel) {
    this.x = x;
    this.y = y;
    this.xVel = (-1 + Math.random() * 2);
    this.yVel = (-1 + Math.random() * 2);
}

function init() {
    particlePool = [];
    
    for (let i = 0; i < numParticles; i++) {
        let p = new Particle(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0);
        particlePool.push(p);
    }
    
    window.requestAnimationFrame(draw);
}

function drawParticle(p, size) {
    ctx.fillStyle = 'white';
    // snap particle's position to the grid
    let snappedX = Math.round(p.x / CELL_SIZE) * CELL_SIZE;
    let snappedY = Math.round(p.y / CELL_SIZE) * CELL_SIZE;
    ctx.fillRect(snappedX, snappedY, size, size);
}

function resizeCanvas() {
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }
}

function draw() {
    // draw background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw each particle
    for (let i = 0; i < particlePool.length; i++) {
        let p = particlePool.at(i);
        drawParticle(p, CELL_SIZE);
    }

    
    window.requestAnimationFrame(draw);

    updateParticlePositions();
}

function updateParticlePositions() {
    for (let i = 0; i < particlePool.length; i++) {
        let p = particlePool.at(i);

        // add constant wind force to all velocities


        p.x += p.xVel + 1;
        p.y += p.yVel + 0.25 + Math.sin(0.001 * Date.now() + Math.PI/4 * i);

        // boundary checks
        if (p.x > canvas.width) {
            p.x = 0;
        }
        if (p.y > canvas.height) {
            p.y = 0;
        }
        if (p.x < 0) {
            p.x = canvas.width - 1;
        }
        if (p.y < 0) {
            p.y = canvas.height - 1;
        }
    }
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
init();