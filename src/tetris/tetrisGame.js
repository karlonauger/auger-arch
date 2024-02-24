import { loadImage, createMatrix } from './helpers';
import Piece from './piece';

class TetrisGame {
  constructor(canvasId, nextCanvasId, gameOverCB) {
    this.blockNames = [
      'Red',
      'Green',
      'Purple',
      'Blue',
      'DarkRed',
      'Orange',
      'LightBlue',
    ];
    this.blocks = [];

    this.menuArena = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 7, 4, 4, 0, 0, 0, 0, 1, 1, 0],
      [0, 0, 7, 4, 3, 3, 3, 2, 0, 1, 0, 0],
      [0, 0, 7, 4, 4, 3, 5, 5, 0, 1, 1, 0],
      [0, 0, 7, 4, 0, 3, 5, 2, 0, 0, 1, 0],
      [0, 0, 0, 4, 4, 3, 5, 2, 0, 1, 1, 0],
      [0, 0, 0, 0, 0, 3, 5, 2, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
      [4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
      [4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3],
      [3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 6, 6],
      [5, 5, 3, 0, 0, 0, 0, 0, 0, 6, 6, 1],
      [2, 5, 5, 4, 4, 0, 0, 0, 4, 4, 0, 1],
      [2, 5, 5, 4, 4, 7, 0, 0, 4, 4, 2, 1],
      [2, 2, 5, 5, 7, 7, 7, 0, 2, 2, 2, 1],
    ];

    this.arena = createMatrix(12, 20);
    this.score = 0;
    this.lines = 0;
    this.level = 1;
    this.gameOver = false;
    this.nextPiece = null;
    this.piece = null;

    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');
    this.context.scale(20, 20);

    this.nextCanvas = document.getElementById(nextCanvasId);
    this.nextContext = this.nextCanvas.getContext('2d');
    this.nextContext.scale(20, 20);

    this.dropCounter = 0;
    this.lastTime = 0;

    this.gameOverCB = gameOverCB; // Callback to post score
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  init() {
    this.reset();

    // Wait for all images to be loaded before continuing
    this.loadBlocks().then(() => {
      this.context.fillStyle = '#000';
      this.context.fillRect(0, 0, this.canvas.width / 20, this.canvas.height / 20);

      this.drawMatrix(this.context, this.menuArena, { x: 0, y: 0 });
    });
  }

  loadBlocks() {
    const imagePromises = this.blockNames
      .map((blockName, index) => loadImage(`/tetris/${blockName}.png`).then((image) => {
        this.blocks[index] = image;
      }));

    return Promise.all(imagePromises);
  }

  startGame(player) {
    document.addEventListener('keydown', this.handleKeyDown);
    this.player = player;

    this.restartGame();
  }

  restartGame() {
    this.arena.forEach((row) => row.fill(0));
    this.score = 0;
    this.lines = 0;
    this.level = 0;
    this.gameOver = false;
    this.updateStats();
    this.update();
  }

  drawMatrix(context, matrix, offset) {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          context.drawImage(this.blocks[value - 1], x + offset.x, y + offset.y, 1, 1);
        }
      });
    });
  }

  draw() {
    this.context.fillStyle = '#000';
    this.context.fillRect(0, 0, this.canvas.width / 20, this.canvas.height / 20);
    this.nextContext.fillRect(0, 0, this.nextCanvas.width / 20, this.nextCanvas.height / 20);

    this.drawMatrix(this.context, this.arena, { x: 0, y: 0 });
    this.drawMatrix(this.context, this.piece.matrix, this.piece.pos);
    this.drawMatrix(this.nextContext, this.nextPiece.matrix, { x: 0, y: 0 });
  }

  updateStats() {
    document.getElementById('score').innerText = this.score;
    document.getElementById('level').innerText = this.level;
    document.getElementById('lines').innerText = this.lines;
  }

  drop(player) {
    this.piece.pos.y += 1;
    if (this.piece.collide(this.arena)) {
      this.piece.pos.y -= 1;
      this.merge();
      this.reset();
      this.arenaSweep();
      this.updateStats();
    } else if (player) {
      this.score += 1;
      this.updateStats();
    }
    this.dropCounter = 0;
  }

  merge() {
    this.piece.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.arena[y + this.piece.pos.y][x + this.piece.pos.x] = value;
        }
      });
    });
  }

  reset() {
    const center = this.arena[0].length / 2;
    this.piece = this.nextPiece ? this.nextPiece : new Piece(center);
    this.nextPiece = new Piece(center);

    // Game Over - New piece already collides with arena
    if (this.piece.collide(this.arena)) {
      this.gameOver = true;
    }
  }

  dropInterval() {
    // second data for each level
    const secondsToBottom = [
      15.974, 14.310, 12.646, 10.982, 9.318, 7.654, 5.990, 4.326, 2.662, 1.997, 1.664, 1.664, 1.664,
      1.331, 1.331, 1.331, 0.998, 0.998, 0.998, 0.666, 0.666, 0.666, 0.666, 0.666, 0.666, 0.666,
      0.666, 0.666, 0.666, 0.333,
    ];
    const cellsToBottom = 20;

    return (secondsToBottom[this.level] / cellsToBottom) * 1000;
  }

  arenaSweep() {
    const scoreMultiplier = [0, 40, 100, 300, 1200];
    let rowCount = 0;

    for (let y = this.arena.length - 1; y > 0; y -= 1) {
      let rowComplete = true;

      for (let x = 0; x < this.arena[y].length; x += 1) {
        if (this.arena[y][x] === 0) {
          rowComplete = false;
          break;
        }
      }

      if (rowComplete) {
        const row = this.arena.splice(y, 1)[0].fill(0);
        this.arena.unshift(row);
        rowCount += 1;
        y += 1;
      }
    }

    this.score += scoreMultiplier[rowCount] * (this.level + 1);
    this.lines += rowCount;
    this.level = Math.floor(this.lines / 10);
  }

  handleKeyDown(event) {
    switch (event.key) {
      case 'ArrowLeft':
        this.piece.move(this.arena, -1);
        break;
      case 'ArrowRight':
        this.piece.move(this.arena, 1);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.drop(true);
        break;
      case ' ': // Spacebar
        event.preventDefault();
        this.currentPiece = this.piece;
        while (this.piece === this.currentPiece) {
          this.drop(true);
        }
        break;
      case 'z':
        this.piece.rotate(this.arena, -1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.piece.rotate(this.arena, -1);
        break;
      case 'x':
        this.piece.rotate(this.arena, 1);
        break;
      default:
        break;
    }
  }

  update(time = 0) {
    const deltaTime = time - this.lastTime;

    this.dropCounter += deltaTime;
    if (this.dropCounter > this.dropInterval()) {
      this.drop(false);
    }

    this.lastTime = time;

    this.draw();

    if (this.gameOver) {
      this.gameOverCB(this.player, this.score, this.level);
    } else {
      requestAnimationFrame(this.update.bind(this));
    }
  }
}

export default TetrisGame;
