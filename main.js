
import { trackMouse } from "./input.js";
import { initRender,renderGame, updateSnakeBodyForAllballs } from "./render.js";
import { spawnFood,updateFood } from "./food.js";
import { Ballbody } from "./snake.js";

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
    }
};

function init() {
    initRender(canvas,gameState);
    spawnFood(gameState);
    requestAnimationFrame(gameLoop);
}

function gameLoop() {
    if (gameState.isGameOver) return;
    trackMouse(canvas,gameState);
    gameState.snakeBody[0].x = 23;
    updateSnakeBodyForAllballs(gameState.mouse.x,gameState.mouse.y,gameState.snakeBody);
    updateFood(gameState);
    //checkCollisions(gameState);
    renderGame(ctx, gameState);
    
    requestAnimationFrame(gameLoop);
}

init();
