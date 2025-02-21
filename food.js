import { utility } from "./utility.js";
import { audioEffects } from "./audio.js";
import { Ballbody } from "./snake.js";
import { postFx } from "./particle.js";


export function spawnFood(gameState) {
    const newFood = {
        x: Math.floor(Math.random() * (window.innerWidth-100)/10) * 10,
        y: Math.floor(Math.random() * (window.innerHeight-100)/10) * 10,
        color : "grey",
        radius : 15
    };
    gameState.food.push(newFood);
}

export function updateFood(gameState) {
    let snakeHead = gameState.snakeBody[0];

    if (!gameState.foodTimeout) { // Prevent multiple timeouts
        gameState.foodTimeout = setTimeout(() => {
            gameState.food.length = 0; // Clear the array
            gameState.foodTimeout = null; // Reset timeout tracker
        }, 2000);
    }

    gameState.food.forEach(fd => {
        if(utility.distance(fd,snakeHead)<=snakeHead.radius){
            gameState.score+=1;
            postFx.particleEffect(fd);
            audioEffects.playBeep();
            let snakebody = null;
            if(gameState.score%2==0)
                snakebody = gameState.createBody("black");
            else
                snakebody = gameState.createBody("grey");
            gameState.snakeBody.push(snakebody);
            gameState.food.length = 0;
        }
    });

    if (gameState.food.length === 0) {
        spawnFood(gameState);
    }
}




