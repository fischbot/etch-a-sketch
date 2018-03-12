let canvas = null,
    canvasContext;
const requestAnimFrame = window.requestAnimationFrame ||
                       window.webkitRequestAnimationFrame ||
                       window.mozRequestAnimationFrame ||
                       window.oRequestAnimationFrame ||
                       window.msRequestAnimationFrame ||
                       // if older browser doesnt support RequestAnimationFrame
                       function(callback) {window.setTimeout(callback, 1000/60)};

window.addEventListener("load", () => {
  canvas = document.getElementById("canvas");
  canvasContext = canvas.getContext("2d");
  // draw background
  draw.rect(0, 0, canvas.width, canvas.height, "rgb(210, 210, 210)");

  document.addEventListener("keydown", function(e) {game.keyHandler(e, true);}, false);
  document.addEventListener("keyup", function(e) {game.keyHandler(e, false);}, false);
});

const draw = {
  rect : (startX, startY, w, h, fillColor) => {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(startX, startY, w, h);
  },
  ink : () => {
    canvasContext.beginPath();
    canvasContext.fillStyle = "rgba(0, 0, 0, 0.8)";

    this.rect(ink.posX, ink.posY, ink.SIZE, ink.SIZE, "rgba(0, 0, 0, 0.8)");
  }
};

const game = {
  isUpKey : false,
  isDownKey : false,
  isLeftKey : false,
  isRightKey : false,
  leftDialAngle: 0,
  rightDialAngle: 0,
  keyHandler : function(e, value) {
    var keyID = e.keyCode || e.which;
    if (keyID === 75) {  // UP
      this.isUpKey = value;
      e.preventDefault();
    }
    if (keyID === 76) {  // DOWN
      this.isDownKey = value;
      e.preventDefault();
    }
    if (keyID === 65) {  // LEFT
      this.isLeftKey = value;
      e.preventDefault();
    }
    if (keyID === 83) {  // RIGHT
      this.isRightKey = value;
      e.preventDefault();
    }
  },
  },
};
