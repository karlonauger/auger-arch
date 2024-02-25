// Create a matrix with the given width and height
export function createMatrix(w, h) {
  const matrix = [];
  for (let i = 0; i < h; i += 1) {
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
}

// Load an image and return a Promise
export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);
    image.src = src;
  });
}
