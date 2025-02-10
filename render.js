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



export function updateSnakeBodyForAllballs(mouseX,mouseY,BALLS){
        const angle = utility.calculateAngle(mouseX, mouseY,BALLS[1]);
        BALLS[0].x = BALLS[1].x + BALLS[1].radius * Math.cos(angle);
        BALLS[0].y = BALLS[1].y + BALLS[1].radius * Math.sin(angle);
        let i = 0,j = 1; //jth ball with be the center and the other moves
        while(j<BALLS.length){
            if(utility.distance(BALLS[i],BALLS[j])>BALLS[j].radius){
                if(i==0){
                    BALLS[0].x = mouseX;
                    BALLS[0].y = mouseY;
                }
                const dx = BALLS[j].x - BALLS[i].x;
                const dy = BALLS[j].y - BALLS[i].y;
                const angle = Math.atan2(dy, dx);
                // Calculate new position relative to the moving ball to the center
                BALLS[j].x = BALLS[i].x + BALLS[i].radius * Math.cos(angle);
                BALLS[j].y = BALLS[i].y + BALLS[i].radius * Math.sin(angle);
            }
            i = j;
            j++;
        }
        
}


// Function to update the position and angle of the circleBall along the circumference


