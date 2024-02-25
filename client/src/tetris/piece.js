class Piece {
  static pieceMap = {
    I: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
    L: [
      [0, 2, 0],
      [0, 2, 0],
      [0, 2, 2],
    ],
    J: [
      [0, 3, 0],
      [0, 3, 0],
      [3, 3, 0],
    ],
    O: [
      [4, 4],
      [4, 4],
    ],
    Z: [
      [5, 5, 0],
      [0, 5, 5],
      [0, 0, 0],
    ],
    S: [
      [0, 6, 6],
      [6, 6, 0],
      [0, 0, 0],
    ],
    T: [
      [0, 7, 0],
      [7, 7, 7],
      [0, 0, 0],
    ],
  };

  static pieceKeys = Object.keys(Piece.pieceMap);

  constructor(x = 0, type = Piece.pieceKeys[Math.floor(Math.random() * Piece.pieceKeys.length)]) {
    // Pass by reference
    this.matrix = JSON.parse(JSON.stringify(Piece.pieceMap[type]));

    this.pos = {
      x: x - Math.floor(this.matrix[0].length / 2),
      y: 0,
    };
  }

  rotateMatrix(dir) {
    for (let y = 0; y < this.matrix.length; y += 1) {
      for (let x = 0; x < y; x += 1) {
        [this.matrix[x][y], this.matrix[y][x]] = [this.matrix[y][x], this.matrix[x][y]];
      }
    }

    if (dir > 0) {
      this.matrix.forEach((row) => row.reverse());
    } else {
      this.matrix.reverse();
    }
  }

  collide(arena) {
    const m = this.matrix;
    const o = this.pos;
    for (let y = 0; y < m.length; y += 1) {
      for (let x = 0; x < m[y].length; x += 1) {
        if (
          m[y][x] !== 0
          && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0
        ) {
          return true;
        }
      }
    }
    return false;
  }

  move(arena, offset) {
    this.pos.x += offset;
    if (this.collide(arena)) {
      this.pos.x -= offset;
    }
  }

  rotate(arena, dir) {
    const pos = this.pos.x;
    let offset = 1;
    this.rotateMatrix(dir);
    while (this.collide(arena)) {
      this.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > this.matrix[0].length) {
        this.rotateMatrix(-dir);
        this.pos.x = pos;
        return;
      }
    }
  }
}

export default Piece;
