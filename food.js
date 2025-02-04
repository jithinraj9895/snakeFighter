import { utility } from "./utility.js";

export function spawnFood(gameState) {
    const newFood = {
        x: Math.floor(Math.random() * 60) * 10,
        y: Math.floor(Math.random() * 40) * 10,
        color : "grey"
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
            fd.color = "green";
            gameState.score+=1;
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

