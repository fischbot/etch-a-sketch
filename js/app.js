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
