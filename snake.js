export class Ballbody{
    x = -10
    y = -10
    constructor(radius,color,lineWidth = 0.2){
        this.radius = radius;
        this.color = color;
        this.lineWidth = lineWidth;
    }

    drawThis(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}






