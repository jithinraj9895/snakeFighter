import { postFx } from "./particle.js";
import { Ballbody } from "./snake.js";
import { utility } from "./utility.js";

export function initRender(canvas,gameState) {
    canvas.width = window.innerWidth - 50;
    canvas.height = window.innerHeight -50;
    //canvas created.
    let circleBall = new Ballbody(15,"red");
    let centerBall = new Ballbody(15,"black");

    //initial two balls head and tail
    gameState.snakeBody[0] = circleBall; 
    gameState.snakeBody[1] = centerBall;
    console.log("snake created")
}



export function renderGame(ctx, gameState) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Draw snake
    renderSnakeBody(gameState.snakeBody,ctx.canvas,ctx);
    // Draw food
    renderObject(gameState.food,ctx);
    // Draw score
    renderObject(postFx.particles,ctx);
    ctx.fillStyle = "black";
    ctx.fillText(`Score: ${gameState.score}`, 10, 20);
}


function renderSnakeBody(SNAKES,canvas,ctx){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0;i<SNAKES.length;i++){
        SNAKES[i].drawThis(ctx);
    }
}

function renderObject(food,ctx){
    for(let i = 0;i<food.length;i++){
        ctx.beginPath();
        ctx.arc(food[i].x, food[i].y, 10, 0, Math.PI * 2);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 0.2;
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(food[i].x, food[i].y, 5, 0, Math.PI * 2);
        ctx.fillStyle = food[i].color;
        ctx.fill();
        ctx.closePath();
    }
}


export function updateSnakeBodyForAllballs(mouseX, mouseY, BALLS) {
    let dp = new Array(BALLS.length).fill(null).map(() => ({ x: 0, y: 0 }));

    let smoothVar = 1;
    // First ball follows the mouse with smoothing
    BALLS[0].x += (mouseX - BALLS[0].x) * smoothVar;
    BALLS[0].y += (mouseY - BALLS[0].y) * smoothVar;

    dp[0].x = BALLS[0].x;
    dp[0].y = BALLS[0].y;

    for (let j = 1; j < BALLS.length; j++) {
        const dx = BALLS[j - 1].x - BALLS[j].x;
        const dy = BALLS[j - 1].y - BALLS[j].y;
        const angle = Math.atan2(dy, dx);

        // Cached new position using DP (smoother transition)
        dp[j].x = BALLS[j - 1].x - BALLS[j].radius * Math.cos(angle);
        dp[j].y = BALLS[j - 1].y - BALLS[j].radius * Math.sin(angle);

        // Apply smooth interpolation
        BALLS[j].x += (dp[j].x - BALLS[j].x) * smoothVar;
        BALLS[j].y += (dp[j].y - BALLS[j].y) * smoothVar;
    }
}


// Function to update the position and angle of the circleBall along the circumference


