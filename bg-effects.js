const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let particlePool = [];
let bigParticlePool = [];
let frameCount = 0;

const numParticles = 50;
const CELL_SIZE = 4; // 4px

function Particle(x, y, xVel, yVel) {
    this.x = x;
    this.y = y;
    this.xVel = (-1 + Math.random() * 2);
    this.yVel = (-1 + Math.random() * 2);
}

function BigParticle(x, y, xVel, yVel, omega) {
    this.x = x;
    this.y = y;
    this.xVel = xVel;
    this.yVel = yVel;
    this.omega = omega;
    this.rot = 0; // ROTATION IN RADIANS
    this.trails = []; 
}

function BigParticleTrail(x, y, rot) {
    this.x = x;
    this.y = y;
    this.rot = rot;
    this.transp = 1;
}

function init() {
    particlePool = [];
    
    for (let i = 0; i < numParticles; i++) {
        let p = new Particle(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0);
        particlePool.push(p);
    }

    // let bp = new BigParticle(10, 5, 2, 1, 0.05);
    // bigParticlePool.push(bp);
    
    window.requestAnimationFrame(draw);
}

function drawParticle(p, size) {
    ctx.fillStyle = 'white';
    // snap particle's position to the grid
    let snappedX = Math.round(p.x / CELL_SIZE) * CELL_SIZE;
    let snappedY = Math.round(p.y / CELL_SIZE) * CELL_SIZE;
    ctx.fillRect(snappedX, snappedY, size, size);
}

function drawBigParticle(p) {
    ctx.fillStyle = 'white';
    let size = 20;
    // don't snappies?

    // x, y      x + sz, y    x + sz, y + sz        x, y + sz
    let topLeftX = p.x - size / 2;
    let topLeftY = p.y - size / 2;
    let topRightX = p.x + size / 2;
    let topRightY = p.y - size / 2;
    let bottomRightX = p.x + size / 2;
    let bottomRightY = p.y + size / 2;
    let bottomLeftX = p.x - size / 2;
    let bottomLeftY = p.y + size / 2;

    ctx.beginPath();
    let RtopLeft = transformPoint(topLeftX, topLeftY, p.x, p.y, p.rot);
    ctx.moveTo(RtopLeft.x, RtopLeft.y);
    let RtopRight = transformPoint(topRightX, topRightY, p.x, p.y, p.rot);
    ctx.lineTo(RtopRight.x, RtopRight.y);
    let RbottomRight = transformPoint(bottomRightX, bottomRightY, p.x, p.y, p.rot);
    ctx.lineTo(RbottomRight.x, RbottomRight.y);
    let RbottomLeft = transformPoint(bottomLeftX, bottomLeftY, p.x, p.y, p.rot);
    ctx.lineTo(RbottomLeft.x, RbottomLeft.y);
    ctx.closePath();
    ctx.fill();
}

function handleBigParticleTrails(trailArray) {
    for (let i = 0; i < trailArray.length; i++) {
        let p = trailArray.at(i);
        // finish later
    }
}

function transformPoint(x, y, translateX, translateY, rotation) {
    let p = {};
    let translatedX = translateX - x;
    let translatedY = translateY - y;
    p.x = translatedX * Math.cos(rotation) - translatedY * Math.sin(rotation) + translateX;
    p.y = translatedX * Math.sin(rotation) + translatedY * Math.cos(rotation) + translateY;
    return p;
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

    for (let i = 0; i < bigParticlePool.length; i++) {
        let bp = bigParticlePool.at(i);
        drawBigParticle(bp);
    }

    // spawn big particle every 10 seconds
    if (frameCount % 900 == 0) {
        spawnBigParticle();
    }

    
    window.requestAnimationFrame(draw);
    frameCount += 1;

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

    for (let i = 0; i < bigParticlePool.length; i++) {
        let p = bigParticlePool.at(i);

        p.rot += p.omega;
        p.x += p.xVel;
        p.y += p.yVel;

        // boundary checks
        if (p.x > canvas.width || p.y > canvas.height || p.x < 0 || p.y < 0) {
            bigParticlePool.splice(i, i);
        }
    }
}

function spawnBigParticle() {
    // position it somewhere on the left or top side of the screen, going somewhere to the right and down
    let x = 0;
    let y = 0;
    if (Math.random() > 0.5) {
        x = Math.random() * canvas.width / 2;
    }
    else {
        y = Math.random() * canvas.height / 2;
    }

    // OldRange = (OldMax - OldMin)  
    // NewRange = (NewMax - NewMin)  
    // NewValue = (((OldValue - OldMin) * NewRange) / OldRange) + NewMin

    // let xVel = Math.random() * 4 - 2;
    let xVel = Math.random() + 1;
    let yVel = Math.random() + 1;
    
    let bp = new BigParticle(x, y, xVel, yVel, 0.1 * Math.random() + 0.025);
    bigParticlePool.push(bp);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
init();