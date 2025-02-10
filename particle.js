import { Ballbody } from "./snake.js";

export const postFx = {
    particles: [],
    
    particleEffect: function(hitFood) {
        let speed = 2; // Increased speed for visibility
        let lifeTime = 15; // Particle lifespan

        for (let i = 0; i < 3; i++) {
            let particle = new Ballbody(10, "green");
            let angle = Math.random() * 2 * Math.PI;

            // Set position
            particle.x = hitFood.x;
            particle.y = hitFood.y;

            // Velocity
            particle.vx = Math.cos(angle) * speed;
            particle.vy = Math.sin(angle) * speed;
            particle.life = lifeTime;

            this.particles.push(particle);
        }
    },

    updateParticles: function() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            let p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.radius-= 1;
            console.log("radius:"+p.radius);
            p.life--;

            // Remove particle if life is over
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    },
};
