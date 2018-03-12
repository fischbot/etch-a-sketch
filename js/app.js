var canvas = null,
    canvasContext;
var requestAnimFrame = window.requestAnimationFrame ||
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
  canvasContext.fillRect(0, 0, 400, 300, "rgb(210, 210, 210)");

});
