class TetrisGame {
  constructor(canvasId) {
    this.colors = [
      null,
      '#FF0D72',
      '#0DC2FF',
      '#0DFF72',
      '#F538FF',
      '#FF8E0D',
      '#FFE138',
      '#3877FF',
    ];

    this.arena = this.createMatrix(12, 20);
    this.player = {
      pos: { x: 0, y: 0 },
      matrix: null,
      score: 0,
    };

    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');
    this.context.scale(20, 20);

    this.dropCounter = 0;
    this.dropInterval = 1000;

    this.lastTime = 0;

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  createMatrix(w, h) {
    const matrix = [];
    while (h--) {
      matrix.push(new Array(w).fill(0));
    }
    return matrix;
  }

  createPiece(type) {
    if (type === 'I') {
      return [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ];
    } else if (type === 'L') {
      return [
        [0, 2, 0],
        [0, 2, 0],
        [0, 2, 2],
      ];
    } else if (type === 'J') {
      return [
        [0, 3, 0],
        [0, 3, 0],
        [3, 3, 0],
      ];
    } else if (type === 'O') {
      return [
        [4, 4],
        [4, 4],
      ];
    } else if (type === 'Z') {
      return [
        [5, 5, 0],
        [0, 5, 5],
        [0, 0, 0],
      ];
    } else if (type === 'S') {
      return [
        [0, 6, 6],
        [6, 6, 0],
        [0, 0, 0],
      ];
    } else if (type === 'T') {
      return [
        [0, 7, 0],
        [7, 7, 7],
        [0, 0, 0],
      ];
    }
  }

  drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.context.fillStyle = this.colors[value];
          this.context.fillRect(x + offset.x, y + offset.y, 1, 1);
        }
      });
    });
  }

  draw() {
    this.context.fillStyle = '#000';
    this.context.fillRect(0, 0, this.canvas.width / 20, this.canvas.height / 20);

    this.drawMatrix(this.arena, { x: 0, y: 0 });
    this.drawMatrix(this.player.matrix, this.player.pos);
  }

  merge(arena, player) {
    player.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          arena[y + player.pos.y][x + player.pos.x] = value;
        }
      });
    });
  }

  rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
      }
    }

    if (dir > 0) {
      matrix.forEach(row => row.reverse());
    } else {
      matrix.reverse();
    }
  }

  playerDrop() {
    this.player.pos.y++;
    if (this.collide(this.arena, this.player)) {
      this.player.pos.y--;
      this.merge(this.arena, this.player);
      this.playerReset();
      this.arenaSweep();
      this.updateScore();
    }
    this.dropCounter = 0;
  }

  playerMove(offset) {
    this.player.pos.x += offset;
    if (this.collide(this.arena, this.player)) {
      this.player.pos.x -= offset;
    }
  }

  playerReset() {
    const pieces = 'TJLOSZI';
    this.player.matrix = this.createPiece(pieces[pieces.length * Math.random() | 0]);
    this.player.pos.y = 0;
    this.player.pos.x = (this.arena[0].length / 2 | 0) -
                        (this.player.matrix[0].length / 2 | 0);
    if (this.collide(this.arena, this.player)) {
      this.arena.forEach(row => row.fill(0));
      this.player.score = 0;
      this.updateScore();
    }
  }

  playerRotate(dir) {
    const pos = this.player.pos.x;
    let offset = 1;
    this.rotate(this.player.matrix, dir);
    while (this.collide(this.arena, this.player)) {
      this.player.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > this.player.matrix[0].length) {
        this.rotate(this.player.matrix, -dir);
        this.player.pos.x = pos;
        return;
      }
    }
  }

  collide(arena, player) {
    const m = player.matrix;
    const o = player.pos;
    for (let y = 0; y < m.length; ++y) {
      for (let x = 0; x < m[y].length; ++x) {
        if (
          m[y][x] !== 0 &&
          (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0
        ) {
          return true;
        }
      }
    }
    return false;
  }

  arenaSweep() {
    let rowCount = 1;
    outer: for (let y = this.arena.length - 1; y > 0; --y) {
      for (let x = 0; x < this.arena[y].length; ++x) {
        if (this.arena[y][x] === 0) {
          continue outer;
        }
      }

      const row = this.arena.splice(y, 1)[0].fill(0);
      this.arena.unshift(row);
      ++y;

      this.player.score += rowCount * 10;
      rowCount *= 2;
    }
  }

  updateScore() {
    document.getElementById('score').innerText = this.player.score;
  }

  handleKeyDown(event) {
    switch (event.keyCode) {
      case 37: // Left
        this.playerMove(-1);
        break;
      case 39: // Right
        this.playerMove(1);
        break;
      case 40: // Down
        this.playerDrop();
        break;
      case 81: // q
        this.playerRotate(-1);
        break;
      case 87: // w
        this.playerRotate(1);
        break;
      default:
        break;
    }
  }

  init() {
    document.addEventListener('keydown', this.handleKeyDown);
    this.playerReset();
    this.update();
  }

  update(time = 0) {
    const deltaTime = time - this.lastTime;

    this.dropCounter += deltaTime;
    if (this.dropCounter > this.dropInterval) {
      this.playerDrop();
    }

    this.lastTime = time;

    this.draw();
    requestAnimationFrame(this.update.bind(this));
  }
}

export default TetrisGame;
