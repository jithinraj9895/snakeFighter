
import { trackMouse } from "./input.js";
import { initRender,renderGame, updateSnakeBodyForAllballs } from "./render.js";
import { spawnFood,updateFood } from "./food.js";
import { Ballbody } from "./snake.js";
import { checkCollisionWithHead } from "./gameManager.js";
import { postFx } from "./particle.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gameState = {
    snakeBody : [],
    food: [],
    foodTimeout : null,
    score: 0,
    isGameOver: false,
    mouse : {x:0,y:0},
    createBody : (color)=>{
        return new Ballbody(15,color,0.2);
    },
    audioContext : new (window.AudioContext || window.webkitAudioContext)()
};

function init() {
    initRender(canvas,gameState);
    spawnFood(gameState);
    requestAnimationFrame(gameLoop);
}

function gameLoop(timestamp) {
    if (gameState.isGameOver) {
        starterUI("red","Game Over !");
        return;
    }
    trackMouse(canvas,gameState);
    updateSnakeBodyForAllballs(gameState.mouse.x,gameState.mouse.y,gameState.snakeBody);
    updateFood(gameState);
    postFx.updateParticles();
    checkCollisionWithHead(gameState);
    renderGame(ctx, gameState);
    requestAnimationFrame(gameLoop);

    if (gameState.score <= 8) {
        starterUI("green","Try Catching the GREY ball using your MOUSE !!!");
    }
}

function starterUI(color,text){
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    
    // Calculate X (centered) and Y (above bottom border)
    const x = canvas.width / 2;
    const y = canvas.height - 20; // 20px above bottom border
    
    // Draw text
    ctx.fillText(text, x, y);
}

init();
