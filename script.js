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

// control the paddle with keyboard
document.addEventListener("keydown", function(e) {
    if(e.key == 'ArrowLeft') {
        leftArrow = true;
    } else if(e.key == 'ArrowRight') {
        rightArrow = true;
    }
})
document.addEventListener("keyup", function(e) {
    if(e.key == 'ArrowLeft') {
        leftArrow = false;
    } else if(e.key == 'ArrowRight') {
        rightArrow = false;
    }
})

// control the paddle with mouse
document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e) {
    const relativeX = e.clientX - cvs.offsetLeft;
    if (relativeX > 0 && relativeX < cvs.width) {
        paddle.x = relativeX - paddle.width / 2;
    }
}

// Move  Paddle Function
function movePaddle() {
    if(rightArrow && paddle.x + paddle.width < cvs.width) {
        paddle.x += paddle.dx;
    } else if(leftArrow && paddle.x > 0) {
        paddle.x -= paddle.dx;
    }
}

// create the ball
const ball = {
    x: cvs.width/2,
    y: paddle.y - ballRadius,
    radius: ballRadius,
    speed: 7,
    dx: 3,
    dy: -3
}

// draw the ball function
function drawBall() {
    ctx.beginPath();

    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "#ff7043";
    ctx.fill();

    ctx.strokeStyle = "#fff8b6";
    ctx.stroke();

    ctx.closePath();
}

// move the ball
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}

// ball wall collision
function ballCollision() {
    if(ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0) {    
        ball.dx = - ball.dx;
    }
    if(ball.y - ball.radius < 0) {
        ball.dy = - ball.dy;
    }
    if(ball.y + ball.radius > cvs.height) {
        life--;
        failed.play();
        resetBall();
    }
}

//reset ball
function resetBall() {

    ball.x = cvs.width/2;
    
    ball.y = paddle.y - ballRadius;
    
    ball.dx = 3;
    
    ball.dy = -3;
}

// The Collision Between Paddle And The Ball
function blpaddleCollision() {
    if(ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y < paddle.y + paddle.height && ball.y > paddle.y) {
        
        let collidePoint = ball.x - (paddle.x + paddle.width/2);
        collidePoint = collidePoint / (paddle.width/2);
        let angle = collidePoint * Math.PI/3;
        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = - ball.speed * Math.cos(angle);
        wallHit.play();
    }
}


// collision of ball brick
function ballBrickCollision() {
    for(let row = 0; row < brick.row; row++) {
        for(let col = 0; col < brick.coulmn; col++) {
            let brk = bricks[row][col];
            // check if the brick is not broken
            if(brk.status) {
                if(ball.x + ball.radius > brk.x && ball.x - ball.radius < brk.x + brick.width &&
                    ball.y + ball.radius > brk.y && ball.y - ball.radius < brk.y + brick.height) {
                        brk.count++;
                        if(brk.count == 1) {
                            brickHit.play();
                            ball.dy = - ball.dy; // change the direction of ball
                            brk.status = true;
                        }
                        if(brk.count == 2) {
                            brickHit.play();
                            ball.dy = - ball.dy;
                            brk.status = false;
                            score += scoreUnite;
                        }
                }
            }
        }
    }
}

// ********************************************

// collision of ball brick
function ballBrickCollision() {
    for(let row = 0; row < brick.row; row++) {
        for(let col = 0; col < brick.coulmn; col++) {
            let brk = bricks[row][col];
            // check if the brick is not broken
            if(brk.status) {
                if(ball.x + ball.radius > brk.x && ball.x - ball.radius < brk.x + brick.width &&
                    ball.y + ball.radius > brk.y && ball.y - ball.radius < brk.y + brick.height) {
                        brk.count++;
                        if(brk.count == 1) {
                            brickHit.play();
                            ball.dy = - ball.dy; // change the direction of ball
                            brk.status = true;
                        }
                        if(brk.count == 2) {
                            brickHit.play();
                            ball.dy = - ball.dy;
                            brk.status = false;
                            score += scoreUnite;
                        }
                }
            }
        }
    }
}


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