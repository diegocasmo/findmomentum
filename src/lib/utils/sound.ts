export function playCompletionSound() {
  const audioContext = new window.AudioContext();

  const playNote = (frequency: number, startTime: number, duration: number) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    gainNode.gain.setValueAtTime(0.1, startTime);
    gainNode.gain.linearRampToValueAtTime(0.3, startTime + duration * 0.1);
    gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  };

  // Play a short, uplifting melody
  playNote(523.25, audioContext.currentTime, 0.1); // C5
  playNote(659.25, audioContext.currentTime + 0.1, 0.1); // E5
  playNote(783.99, audioContext.currentTime + 0.2, 0.2); // G5
}
