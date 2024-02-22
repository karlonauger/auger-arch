const canvasDots = function () {
  const canvas = document.querySelector('canvas');
  const context = canvas.getContext('2d');

  canvas.width = document.body.scrollWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';

  context.lineWidth = 0.3;
  context.strokeStyle = 'rgb(81, 162, 233)';

  let mousePosition = {
    x: (30 * canvas.width) / 100,
    y: (30 * canvas.height) / 100,
  };
  
  let dots;
  const windowSize = window.innerWidth;
  if (windowSize > 1600) {
    dots = {
      nb: 600, // number of particles
      distance: 70, // max distance between particles for them to link
      d_radius: 300, // radius from mouse location that particles will link
      array: [],
    };
  } else if (windowSize > 1300) {
    dots = {
      nb: 575,
      distance: 60,
      d_radius: 280,
      array: [],
    };
  } else if (windowSize > 1100) {
    dots = {
      nb: 500,
      distance: 55,
      d_radius: 250,
      array: [],
    };
  } else if (windowSize > 800) {
    dots = {
      nb: 300,
      distance: 0,
      d_radius: 0,
      array: [],
    };
  } else if (windowSize > 600) {
    dots = {
      nb: 200,
      distance: 0,
      d_radius: 0,
      array: [],
    };
  } else {
    dots = {
      nb: 100,
      distance: 0,
      d_radius: 0,
      array: [],
    };
  }

  class Dot {
    // 80% of dots are blue. 20% pink
    static colors = [
      'rgb(81, 162, 233)',
      'rgb(81, 162, 233)',
      'rgb(81, 162, 233)',
      'rgb(81, 162, 233)',
      'rgb(255, 77, 90)',
    ];

    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;

      this.vx = -0.5 + Math.random();
      this.vy = -0.5 + Math.random();

      this.radius = Math.random() * 1.5;
      this.colour = Dot.colors[Math.floor(Math.random() * Dot.colors.length)];
    }

    draw() {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

      // make the dot colour fade out the further they are from the mouse
      const dotDistance = ((this.x - mousePosition.x) ** 2 + (this.y - mousePosition.y) ** 2) **
        0.5;
      const distanceRatio = dotDistance / (windowSize / 1.7);

      // this chops the bracket off the rgb colour and ads an opacity
      context.fillStyle = this.colour.slice(0, -1) + `,${1 - distanceRatio})`;

      context.fill();
    }

    animate() {
      // TODO: dont animate the first dot, it will follow mouse
      if (this.y < 0 || this.y > canvas.height) {
        this.vy = -this.vy;
      } else if (this.x < 0 || this.x > canvas.width) {
        this.vx = -this.vx;
      }
      this.x += this.vx;
      this.y += this.vy;
    }

    drawLines() {
      dots.array.forEach((otherDot) => {
        if (
          this.x - otherDot.x < dots.distance &&
          this.y - otherDot.y < dots.distance &&
          this.x - otherDot.x > -dots.distance &&
          this.y - otherDot.y > -dots.distance &&
          this.x - mousePosition.x < dots.d_radius &&
          this.y - mousePosition.y < dots.d_radius &&
          this.x - mousePosition.x > -dots.d_radius &&
          this.y - mousePosition.y > -dots.d_radius
        ) {
          context.beginPath();
          context.moveTo(this.x, this.y);
          context.lineTo(otherDot.x, otherDot.y);

          // make the fill colour fade out the further you are from the mouse
          const dotDistance = ((this.x - mousePosition.x) ** 2 +
            (this.y - mousePosition.y) ** 2) **
            0.5;
          let distanceRatio = dotDistance / dots.d_radius;

          // make it so it doesnt fade out completely
          distanceRatio -= 0.3;
          if (distanceRatio < 0) {
            distanceRatio = 0;
          }

          context.strokeStyle = `rgb(81, 162, 233, ${1 - distanceRatio})`;

          context.stroke();
          context.closePath();
        }
      });
    }
  }

  for (let i = 0; i < dots.nb; i++) {
    dots.array.push(new Dot());
  }

  function drawDots() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    dots.array.forEach((dot) => {
      dot.draw();
      dot.animate();
      dot.drawLines();
    });

    // Mouse dot is relativley large and blue
    dots.array[0].radius = 1.5;
    dots.array[0].colour = '#51a2e9';
  }

  function mouseMoveHandler(parameter) {
    mousePosition.x = parameter.clientX;
    mousePosition.y = parameter.clientY;

    try {
      // want the first dot to follow the mouse
      dots.array[0].x = parameter.clientX;
      dots.array[0].y = parameter.clientY;
    } catch {
      // Catch Mouse off screen on refresh issue
    }
  };

  window.addEventListener('mousemove', mouseMoveHandler); 

  mousePosition.x = window.innerWidth / 2;
  mousePosition.y = window.innerHeight / 2;

  const draw = setInterval(drawDots, 1000 / 30);

  window.onresize = function () {
    clearInterval(draw);
    window.removeEventListener('mousemove', mouseMoveHandler);

    canvasDots();
  };

  // Clear the interval on component unmount
  return function cleanup() {
    clearInterval(draw);
    window.removeEventListener('mousemove', mouseMoveHandler);
  };
};

export default canvasDots;
