// Select Canvas Element From Html
const cvs = document.getElementById('game');
const ctx = cvs.getContext("2d");

// To make Color Theck
ctx.lineWidth = 2;

// paddle 
const paddle_width = 100;
const paddle_margin_bottom = 50;
const paddle_height = 20;
const ballRadius = 8; //ahmed eisa
const scoreUnite = 10;

let leftArrow = false;
let rightArrow = false;
let life = 3;
let score = 0;
let level = 1;
let maxLevel = 3;
let gameEnd = false;

// start game
startTheGame();

// Create The Paddle
const paddle = {
    x: cvs.width/2 - paddle_width/2,
    y: cvs.height - paddle_margin_bottom - paddle_height,
    width: paddle_width,
    height: paddle_height,
    dx: 5
}
// Draw The Paddle
function drawPaddle() {
    ctx.fillStyle = "#f57f17";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.strokeStyle = "#ffffff";
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}