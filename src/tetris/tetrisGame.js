import Piece from './piece';

class TetrisGame {
  constructor(canvasId, nextCanvasId, postScore) {
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

    this.arena = this.createMatrix(12, 20);
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
    this.dropInterval = 1000;
    this.lastTime = 0;

    this.postScore = postScore; // Callback to post score
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  init() {
    this.reset();

    // Wait for all images to be loaded before continuing
    this.loadBlocks().then(() => {
      //this.update();
    });
  }

  loadBlocks() {
    const imagePromises = this.blockNames.map((blockName, index) => {
      return this.loadImage(`/tetris/${blockName}.png`).then((image) => {
        this.blocks[index] = image;
      });
    });

    return Promise.all(imagePromises);
  }

  loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = (error) => reject(error);
      image.src = src;
    });
  }

  createMatrix(w, h) {
    const matrix = [];
    while (h--) { matrix.push(new Array(w).fill(0)); }
    return matrix;
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

  merge(arena, piece) {
    piece.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          arena[y + piece.pos.y][x + piece.pos.x] = value;
        }
      });
    });
  }

  drop(player) {
    this.piece.pos.y++;
    if (this.piece.collide(this.arena)) {
      this.piece.pos.y--;
      this.merge(this.arena, this.piece);
      this.reset();
      this.arenaSweep();
      this.updateStats();
    } else {
      if (player) {
        this.score++;
        this.updateStats();
      }
    }
    this.dropCounter = 0;
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

  calculateDropInterval(level) {
    // second data for each level
    const secondsToBottom = [
      15.974, 14.310, 12.646, 10.982, 9.318, 7.654, 5.990, 4.326, 2.662, 1.997, 1.664, 1.664,1.664,
      1.331, 1.331, 1.331, 0.998, 0.998, 0.998, 0.666, 0.666, 0.666, 0.666, 0.666, 0.666, 0.666,
      0.666, 0.666, 0.666, 0.333
    ];
    const cellsToBottom = 20;
  
    return (secondsToBottom[level] / cellsToBottom) * 1000;
  }

  arenaSweep() {
    let scoreMultiplier = [0, 40, 100, 300, 1200];
    let rowCount = 0;
    outer: for (let y = this.arena.length - 1; y > 0; --y) {
      for (let x = 0; x < this.arena[y].length; ++x) {
        if (this.arena[y][x] === 0) {
          continue outer;
        }
      }

      const row = this.arena.splice(y, 1)[0].fill(0);
      this.arena.unshift(row);
      ++y;

      rowCount++;
    }
    this.score += scoreMultiplier[rowCount] * (this.level + 1);
    this.lines += rowCount;
    this.level = Math.floor(this.lines / 10);
    this.dropInterval = this.calculateDropInterval(this.level);
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
        this.currentPiece = this.piece
        while(this.piece === this.currentPiece) {
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

  startGame(playerName) {
    document.addEventListener('keydown', this.handleKeyDown);
    this.playerName = playerName;
    this.arena.forEach(row => row.fill(0));
    this.score = 0;
    this.lines = 0;
    this.level = 0;
    this.gameOver = false;
    this.updateStats();
    this.update();
  }

  update(time = 0) {
    const deltaTime = time - this.lastTime;

    this.dropCounter += deltaTime;
    if (this.dropCounter > this.dropInterval) {
      this.drop(false);
    }

    this.lastTime = time;

    this.draw();

    if (this.gameOver) {
      this.postScore(this.playerName, this.score, this.level);
    } else {
      requestAnimationFrame(this.update.bind(this)); 
    }
  }
}

export default TetrisGame;
