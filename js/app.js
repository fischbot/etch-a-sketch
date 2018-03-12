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

  document.addEventListener("keydown", (e) => {game.keyHandler(e, true);}, false);
  document.addEventListener("keyup", (e) => {game.keyHandler(e, false);}, false);

  // set up erase button
  var eraseBtn = document.getElementById("clear-canvas");
  eraseBtn.addEventListener("click", function(canvasContext) {
    game.clear(canvasContext);
  }, false);

  game.render();
});

const game = {
  isUpKey : false,
  isDownKey : false,
  isLeftKey : false,
  isRightKey : false,
  leftDialAngle: 0,
  rightDialAngle: 0,
  keyHandler : (e, value) => {
    var keyID = e.keyCode || e.which;
    if (keyID === 75) {  // UP
      game.isUpKey = value;
      e.preventDefault();
    }
    if (keyID === 76) {  // DOWN
      game.isDownKey = value;
      e.preventDefault();
    }
    if (keyID === 65) {  // LEFT
      game.isLeftKey = value;
      e.preventDefault();
    }
    if (keyID === 83) {  // RIGHT
      game.isRightKey = value;
      e.preventDefault();
    }
    ink.move();
  },
  render : () => {
    draw.ink();
    requestAnimFrame(game.render);
  },
  turnDial : (direction) => {
    const leftDial = document.getElementById("left-dial");
    const rightDial = document.getElementById("right-dial");
    const angle = 10;
    if (direction === "left") {
      game.leftDialAngle -= angle;
      leftDial.style.transform = "rotate(" + game.leftDialAngle + "deg)";
    }
    if (direction === "right") {
      game.leftDialAngle += angle;
      leftDial.style.transform = "rotate(" + game.leftDialAngle + "deg)";
    }
    if (direction === "up") {
      game.rightDialAngle -= angle;
      rightDial.style.transform = "rotate(" + game.rightDialAngle + "deg)";
    }
    if (direction === "down") {
      game.rightDialAngle += angle;
      rightDial.style.transform = "rotate(" + game.rightDialAngle + "deg)";
    }
  },
  clear : () => {
    // clears previous image and leaves starting ink at last point before clearing
    draw.rect(0, 0, canvas.width, canvas.height, "#D1D2D1");
  }
};

const draw = {
  rect : (startX, startY, w, h, fillColor) => {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(startX, startY, w, h);
  },
  ink : () => {
    canvasContext.beginPath();
    canvasContext.fillStyle = "rgba(0, 0, 0, 0.8)";

    draw.rect(ink.posX, ink.posY, ink.SIZE, ink.SIZE, "rgba(0, 0, 0, 0.8)");
  }
};

const ink = {
  speed : 4,
  SIZE : 4,
  posX : 0,
  posY : 0,
  move : () => {
    if (game.isLeftKey && ink.posX + ink.SIZE > ink.SIZE) {
      ink.posX -= ink.speed;
      game.turnDial("left");
    }
    if (game.isRightKey && ink.posX + ink.SIZE < canvas.width) {
      ink.posX += ink.speed;
      game.turnDial("right");
    }
    if (game.isUpKey && ink.posY + ink.SIZE > ink.SIZE) {
      ink.posY -= ink.speed;
      game.turnDial("up");
    }
    if (game.isDownKey && ink.posY + ink.SIZE < canvas.height) {
      ink.posY += ink.speed;
      game.turnDial("down");
    }
    draw.ink();
  }
};
