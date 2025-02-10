import { utility } from "./utility.js";

export function checkCollisionWithHead(gameState){
    let head = gameState.snakeBody[0];
    //need to start atleas from 2nd because the first two is default and at same position
    for(let i = 5;i<gameState.snakeBody.length;i++){
        if(utility.distance(gameState.snakeBody[i],head)<(head.radius/2)){
            gameState.isGameOver = true;
        }
    }
}