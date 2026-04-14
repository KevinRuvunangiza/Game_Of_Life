let res = 20; // Size of cells
let cols; // Size of columns
let rows; // Size of rows
let width = 500;
let height = 500;
let isRunning = false;
let animationFrameId = null;
let speed = 30; // controls frame skip

const canvas = document.getElementById("main");
const context2D = canvas.getContext("2d");
const speedSlider = document.getElementById("speed-slider");
const gridSlider = document.getElementById("grid-slider");
const speedValue = document.getElementById("speed-value");
const gridValue = document.getElementById("grid-value");
const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const clearBtn = document.getElementById("clear-btn");

function setupCanvas() {
  canvas.width = width;
  canvas.height = height;

  cols = width / res;
  rows = height / res;
}

function buildGrid() {
  let grid = [];

  for (let i = 0; i < cols; i++) {
    let colArray = new Array(rows).fill(0);
    grid.push(colArray);
  }

  return grid;
}

function initializeGrid(grid) {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (Math.random() > 0.5) {
        grid[i][j] = 1;
      } else {
        grid[i][j] = 0;
      }
    }
  }

  return grid;
}

function renderGrid(grid) {
  let xPos;
  let yPos;

  // Clear canvas with white background
  context2D.fillStyle = "white";
  context2D.fillRect(0, 0, width, height);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      xPos = i * res;
      yPos = j * res;

      if (grid[i][j] == 1) {
        context2D.fillStyle = "#667eea"; // Live cells are purple-blue
        context2D.fillRect(xPos, yPos, res - 1, res - 1);
      }
      // Dead cells are just white (background)
      context2D.strokeStyle = "#e9ecef";
      context2D.strokeRect(xPos, yPos, res, res);
    }
  }
  return grid;
}

// Checks the 8 cells surrounding ours
function countNeighbors(grid, x, y) {
  let sum = 0;

  // X axis
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      // Y axis
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];

  return sum;
}

function computeNextGen(grid) {
  let nextGen = buildGrid();

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let neighbors = countNeighbors(grid, i, j);

      if (grid[i][j] == 1 && (neighbors == 2 || neighbors == 3)) {
        // If the cell is alive and has 2 or 3 neighbors, it stays alive
        nextGen[i][j] = 1;
      } else if (grid[i][j] == 0 && neighbors == 3) {
        // If the cell is dead and has exactly 3 neighbors, it becomes alive
        nextGen[i][j] = 1;
      } else {
        nextGen[i][j] = 0; // In all other cases, the cell dies or remains dead
      }
    }
  }

  return nextGen;
}

let frameCount = 0;
let mainGrid;

function update() {
  frameCount++;

  // Update grid based on speed setting
  if (frameCount >= 101 - speed) {
    mainGrid = computeNextGen(mainGrid);
    frameCount = 0;
  }

  renderGrid(mainGrid);

  if (isRunning) {
    animationFrameId = requestAnimationFrame(update);
  }
}

function startSimulation() {
  if (!isRunning) {
    isRunning = true;
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline-block";
    update();
  }
}

function pauseSimulation() {
  if (isRunning) {
    isRunning = false;
    playBtn.style.display = "inline-block";
    pauseBtn.style.display = "none";
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  }
}

function resetSimulation() {
  pauseSimulation();
  frameCount = 0;
  mainGrid = buildGrid();
  mainGrid = initializeGrid(mainGrid);
  renderGrid(mainGrid);
}

function updateGridSize() {
  pauseSimulation();
  const gridDimensions = parseInt(gridSlider.value);
  gridValue.textContent = gridDimensions;
  res = width / gridDimensions;
  cols = gridDimensions;
  rows = gridDimensions;
  mainGrid = buildGrid();
  mainGrid = initializeGrid(mainGrid);
  renderGrid(mainGrid);
}

function updateSpeed() {
  speed = parseInt(speedSlider.value);
  speedValue.textContent = speed;
}

function clearGrid() {
  pauseSimulation();
  mainGrid = buildGrid();
  renderGrid(mainGrid);
}

function handleCanvasClick(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const col = Math.floor(x / res);
  const row = Math.floor(y / res);

  // Toggle the cell
  if (col >= 0 && col < cols && row >= 0 && row < rows) {
    mainGrid[col][row] = mainGrid[col][row] === 1 ? 0 : 1;
    renderGrid(mainGrid);
  }
}

// Event listeners
playBtn.addEventListener("click", startSimulation);
pauseBtn.addEventListener("click", pauseSimulation);
resetBtn.addEventListener("click", resetSimulation);
clearBtn.addEventListener("click", clearGrid);
speedSlider.addEventListener("input", updateSpeed);
gridSlider.addEventListener("input", updateGridSize);
canvas.addEventListener("click", handleCanvasClick);

// Initialize
setupCanvas();
mainGrid = buildGrid();
mainGrid = initializeGrid(mainGrid);
renderGrid(mainGrid);
pauseBtn.style.display = "none";
