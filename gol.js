const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

const CELL_SIZE = 10; // px
const UPDATE_RATE = 70; // update every this many frames

let frameCount = 0;
let grid = [];
let gridWidth = 0;
let gridHeight = 0;

function init() {
    gridWidth = canvas.clientWidth;
    gridHeight = canvas.clientHeight;

    // grid.length = gridHeight;
    for (let i = 0; i < gridHeight; i++) { // y
        grid[i] = [];
        for (let j = 0; j < gridWidth; j++) { // x
            if (i === j) {
                grid[i][j] = true;
            }
            else {
                grid[i][j] = false
            }
        }
    }

    console.log(grid);

    window.requestAnimationFrame(loop)
}

function loop() {
    if (frameCount % UPDATE_RATE === 0) {
        update();
        draw();
    }

    window.requestAnimationFrame(loop);
}

function update() {
    
}

function draw() {
    // console.log(gridHeight);
    // console.log(gridWidth);
    for (let i = 0; i < gridHeight; i++) {
        for (let j = 0; j < gridWidth; j++) {
            if (grid[i][j] === true) {

                ctx.fillStyle = 'white';
                let snappedX = Math.round(j / CELL_SIZE) * CELL_SIZE;
                let snappedY = Math.round(i / CELL_SIZE) * CELL_SIZE;
                ctx.fillRect(snappedX, snappedY, CELL_SIZE, CELL_SIZE);
            }
        }
    }
}


function resizeCanvas() {
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }
}


window.addEventListener('resize', resizeCanvas);
resizeCanvas();
init();