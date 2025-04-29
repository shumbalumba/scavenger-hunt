import { RefObject } from "react";

export const playTypingSound = (audioContextRef: RefObject<AudioContext | null>, type: OscillatorType = 'triangle') => {
  if (!audioContextRef.current) {
    // Create audio context on first use (must be triggered by user interaction)
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
  }
  
  const context = audioContextRef.current;
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();
  
  // Configure sound
  oscillator.type = type;
  oscillator.frequency.value = 600 + Math.random() * 400; // Random frequency for variation
  gainNode.gain.value = 0.05; // Low volume
  
  // Connect nodes
  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
  
  // Play a short sound
  oscillator.start();
  gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.08);
  oscillator.stop(context.currentTime + 0.1);
};