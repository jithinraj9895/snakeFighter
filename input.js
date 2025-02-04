
export function trackMouse(canvas, gameState) {
    canvas.addEventListener("mousemove", (event) => {
        const rect = canvas.getBoundingClientRect();
        gameState.mouse = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    });
}