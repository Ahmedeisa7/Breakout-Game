// Select Canvas Element From Html
const cvs = document.getElementById('game');
const ctx = cvs.getContext("2d");

// To make Color Theck
ctx.lineWidth = 2;

// paddle 
const paddle_width = 100;
const paddle_margin_bottom = 50;
const paddle_height = 20;
const ballRadius = 8;
const scoreUnite = 10;

let leftArrow = false;
let rightArrow = false;
let life = 3;
let score = 0;
let level = 1;
let maxLevel = 3;
let gameEnd = false;











// have paddle and ball draw functions
function draw() {
    drawPaddle()
    drawBall()
    drawBricks()
    //Show Score
    gameStatus(score, 35, 25, scoreImg, 5, 5);
    //show Life
    gameStatus(life, cvs.width - 25, 25, lifeImg, cvs.width-55, 5);
    //Show Level
    gameStatus(level, cvs.width/2, 25, levelImg, cvs.width/2 - 30, 5);
}


// update function 
function update() {
    movePaddle()

    moveBall()

    ballCollision()

    blpaddleCollision()

    ballBrickCollision()
    
    gameOver()
    
    levelsUp()
}
// repeate functions
function loop() {
    ctx.drawImage(bg, 0, 0);
    
    draw()

    update()
    if(!gameEnd) {
        requestAnimationFrame(loop);
    }
}