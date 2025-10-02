
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start');
const stepBtn = document.getElementById('step');
const resetBtn = document.getElementById('reset');

let n, p, grid, running = false, timer;

function init() {
    n = 9;
    p = 1;
    grid = Array.from({ length: n }, () => Array(n).fill(0));
    grid[Math.floor(n / 2)][Math.floor(n / 2)] = 1;
    draw();

}
function spread(i, j) {
    const direction = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    return direction;
}

function nextStep() {
    const ng = grid.map(row => row.slice());
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] !== 1) continue;
            ng[i][j] = 2;
            for (const [dx, dy] of spread(i, j)) {
                const x = i + dx, y = j + dy;
                if (x < 0 || y < 0 || x >= n || y >= n) continue;
                if (grid[x][y] === 0 && Math.random() < p) ng[x][y] = 1;
            }
        }
    }
    grid = ng;
    draw();
}

function hasFire() {
    for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++)
            if (grid[i][j] === 1) return true;
    return false;
}

function draw() {
    const size = canvas.width;
    const cell = Math.floor(size / n);
    ctx.clearRect(0, 0, size, size);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const v = grid[i][j];
            if (v === 0) ctx.fillStyle = '#3cb371';   // vert
            else if (v === 1) ctx.fillStyle = '#d7263d'; // rouge
            else ctx.fillStyle = '#808080';           // gris
            ctx.fillRect(j * cell, i * cell, cell - 1, cell - 1);
        }
    }
}

function start() {
    if (running) return;
    running = true;
    timer = setInterval(nextStep, 120); // vitesse de propagation du feu.
}
function stop(msg) {
    running = false;
    clearInterval(timer);
    if (msg) statusEl.textContent = msg;

}

startBtn.onclick = () => running ? stop() : start();
stepBtn.onclick = () => { if (!running) nextStep(); };
resetBtn.onclick = () => { stop(); init(); };
init();





