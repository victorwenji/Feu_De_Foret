const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start');
const stepBtn = document.getElementById('step');
const resetBtn = document.getElementById('reset');

let n, h, p, grid, running = false, timer;
let hauteur;
let longueur;

function init() {
    hauteur = 9;
    longueur = 10;
    p = 1;
    grid = Array.from({ length: hauteur }, () => Array(longueur).fill(0));
    grid[Math.floor(hauteur / 2)][Math.floor(longueur / 2)] = 1;
    draw();

}
function spread(i, j) {
    const direction = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    return direction;
}

function nextStep() {
    const ng = grid.map(row => row.slice());
    for (let i = 0; i < hauteur; i++) {
        for (let j = 0; j < longueur; j++) {
            if (grid[i][j] !== 1) continue;
            ng[i][j] = 2;
            for (const [dx, dy] of spread(i, j)) {
                const x = i + dx, y = j + dy;
                if (x < 0 || y < 0 || x >= hauteur || y >= longueur) continue;
                if (grid[x][y] === 0 && Math.random() < p) ng[x][y] = 1;
            }
        }
    }
    grid = ng;
    draw();
}

function hasFire() {
    for (let i = 0; i < hauteur; i++)
        for (let j = 0; j < longueur; j++)
            if (grid[i][j] === 1) return true;
    return false;
}

function draw() {
    const sizew = canvas.width;
    const sizeh = canvas.height;

    const cellw = Math.floor(sizew / longueur);
    const cellh = Math.floor(sizeh / hauteur);

    ctx.clearRect(0, 0, sizew, sizeh);
    for (let i = 0; i < hauteur; i++) {
        for (let j = 0; j < longueur; j++) {
            const v = grid[i][j];
            if (v === 0) ctx.fillStyle = '#3cb371';   // vert
            else if (v === 1) ctx.fillStyle = '#d7263d'; // rouge
            else ctx.fillStyle = '#808080';           // gris
            ctx.fillRect(j * cellw, i * cellh, cellw - 1, cellh - 1);
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





