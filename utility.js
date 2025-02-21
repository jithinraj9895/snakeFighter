export const utility = {
    distance : (ball1,ball2)=>{
        let dis_x = ball1.x - ball2.x;
        let dis_y = ball1.y - ball2.y;
        let distance = Math.sqrt(dis_x*dis_x + dis_y*dis_y);
        return distance;
    },
    calculateAngle : (x, y, centerball)=>{
        return Math.atan2(y - centerball.y, x - centerball.x);
    }
}


