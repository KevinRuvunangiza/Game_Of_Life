# Conway's Game of Life (Vanilla JS & HTML5 Canvas)

A zero-dependency, pure vanilla JavaScript implementation of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life). 

This project was built from scratch as an exercise in raw algorithmic logic, 2D state management, and performance optimization using the HTML5 `<canvas>` API. It steps away from modern component lifecycles to focus strictly on pure mathematics, Immediate Mode rendering, and double-buffering.

## 🚀 Features

* **Zero Dependencies:** Built entirely with vanilla JavaScript, HTML, and CSS. No libraries or frameworks.
* **High-Performance Rendering:** Utilizes the HTML5 `<canvas>` API for lightweight, Immediate Mode rendering, avoiding the layout thrashing of DOM-based grid solutions.
* **Toroidal Array Geometry:** Implements modulo arithmetic (`%`) to create a perfectly wrapping, seamless universe (the right edge connects to the left, top to bottom) without relying on heavy boundary `if/else` checks.
* **Double-Buffered State:** Strict separation of the current state and the next generation to prevent data mutation artifacts during neighbor calculation.
* **Native Game Loop:** Synchronized with the browser's display refresh rate using `requestAnimationFrame` for completely smooth execution.

## 🧠 The 4 Rules of Life

The simulation is a "zero-player game" that evolves based on its initial state. Every frame, the engine evaluates every cell against its 8 surrounding neighbors:

1. **Underpopulation:** A live cell with fewer than 2 live neighbors dies.
2. **Survival:** A live cell with 2 or 3 live neighbors lives on to the next generation.
3. **Overpopulation:** A live cell with more than 3 live neighbors dies of overcrowding.
4. **Reproduction:** A dead cell with exactly 3 live neighbors becomes a live cell.

## 💻 Technical Concepts Explored

* 2D Array (Matrix) construction and coordinate mapping.
* Frame-rate independent game loops.
* Mathematical neighbor scanning algorithms.
* Immediate Mode graphics rendering vs. Retained Mode (DOM).

## 🛠️ How to Run

Because this project has absolutely no dependencies, running it is incredibly simple:

1. Clone this repository to your local machine.
2. Open the `index.html` file directly in any modern web browser.
3. Watch the ecosystem evolve!

## Live Demo
[Live Demo](https://kevinruvunangiza.github.io/Game_Of_Life/)
## 👨‍💻 Author

**Kevin Ruvunangiza**
