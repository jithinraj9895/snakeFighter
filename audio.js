export const audioEffects = {
    audioCtx : new (window.AudioContext || window.webkitAudioContext)(),
    playBeep : function(frequency = 440, duration = 200){
        const oscillator = this.audioCtx.createOscillator();
        const gainNode = this.audioCtx.createGain();

        oscillator.type = 'square'; // Creates a retro bit-style sound
        oscillator.frequency.setValueAtTime(frequency, this.audioCtx.currentTime); // Set frequency (Hz)
        
        gainNode.gain.setValueAtTime(0.2, this.audioCtx.currentTime); // Volume control
        gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration / 1000);

        oscillator.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);
        
        oscillator.start();
        oscillator.stop(this.audioCtx.currentTime + duration / 1000);
    },

}




// Example: Play a 440Hz beep for 200ms