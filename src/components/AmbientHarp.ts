/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// A high-fidelity Web Audio API synthesizer that plays lush, atmospheric garden harp arpeggios and wind chords
// Completely synthesized in real-time, zero dependencies, works offline, safe on mobile/desktop.

let audioCtx: AudioContext | null = null;
let activeNodes: AudioScheduledSourceNode[] = [];
let gainNode: GainNode | null = null;
let gardenLoopInterval: number | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Generates a soft, physical-gilded physical harp pluck sound using additive synthesis
function playPluckNode(ctx: AudioContext, destination: AudioNode, freq: number, delay: number, velocity = 0.5) {
  const t = ctx.currentTime + delay;
  
  // Custom synth voice using standard oscillators with detailed envelope
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const pluckGain = ctx.createGain();
  
  // High-frequency pluck click simulator for natural string sound
  const clickOsc = ctx.createOscillator();
  const clickGain = ctx.createGain();
  
  osc1.type = 'triangle';
  osc2.type = 'sine'; // Pure base
  clickOsc.type = 'sine';
  
  // Fundamental and octave
  osc1.frequency.setValueAtTime(freq, t);
  osc2.frequency.setValueAtTime(freq * 2, t);
  clickOsc.frequency.setValueAtTime(freq * 8, t); // Metallic strike click
  
  // Detailed Pluck envelope: rapid attack, soft long decay
  pluckGain.gain.setValueAtTime(0, t);
  pluckGain.gain.linearRampToValueAtTime(velocity * 0.18, t + 0.008); // Prevents clipping
  pluckGain.gain.exponentialRampToValueAtTime(velocity * 0.08, t + 0.15);
  pluckGain.gain.exponentialRampToValueAtTime(0.0001, t + 3.2); // Elegant long ringing
  
  clickGain.gain.setValueAtTime(0, t);
  clickGain.gain.linearRampToValueAtTime(velocity * 0.06, t + 0.002);
  clickGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.03); // Instant decay click
  
  // Standard Lowpass Filter for warm woody resonance
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1400, t);
  filter.frequency.exponentialRampToValueAtTime(220, t + 1.2); // Warming over time
  
  // Connections
  osc1.connect(pluckGain);
  osc2.connect(pluckGain);
  clickOsc.connect(clickGain);
  
  pluckGain.connect(filter);
  clickGain.connect(filter);
  
  filter.connect(destination);
  
  // Start / Stop
  osc1.start(t);
  osc2.start(t);
  clickOsc.start(t);
  
  osc1.stop(t + 3.3);
  osc2.stop(t + 3.3);
  clickOsc.stop(t + 0.1);
  
  activeNodes.push(osc1, osc2, clickOsc);
}

// A beautiful cascading sparkling arpeggio - triggered when Wax Seal opens!
export function playWaxSealCrackHarp() {
  try {
    const ctx = getAudioContext();
    const dest = ctx.destination;
    
    // Core master gain for safety
    const master = ctx.createGain();
    master.gain.setValueAtTime(1.0, ctx.currentTime);
    master.connect(dest);
    
    // Naiposha Garden signature chord: Db major 9/11 (glistening, dreamlike)
    // Frequencies: Db4, F4, Ab4, C5, Eb5, Ab5, C6
    const freqs = [277.18, 349.23, 415.30, 523.25, 622.25, 830.61, 1046.50];
    
    freqs.forEach((freq, idx) => {
      // Cascading strum delay
      const strumDelay = idx * 0.065;
      const vel = 1.0 - idx * 0.06; // Soften higher strings
      playPluckNode(ctx, master, freq, strumDelay, vel);
    });
  } catch (err) {
    console.warn("AudioContext block or error ignored:", err);
  }
}

// A beautiful, slow-winding procedural peaceful tea garden loop (resembling wind-chime patterns)
export function startGardenAmbientMusic() {
  try {
    const ctx = getAudioContext();
    if (!gainNode) {
      gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.4, ctx.currentTime);
      gainNode.connect(ctx.destination);
    }
    
    // Peaceful G major pentatonic / Sage green melody structure
    // Frequencies to choose randomly for a gentle garden sound
    const notes = [196.00, 220.00, 246.94, 293.66, 329.63, 392.00, 440.00, 493.88, 587.33, 659.25];
    
    let step = 0;
    
    const playNextBar = () => {
      if (!gainNode) return;
      const now = ctx.currentTime;
      
      // Every step, play 1 to 3 soft notes resembling wind chimes/harp plucks
      const noteCount = Math.floor(Math.random() * 2) + 1;
      
      for (let i = 0; i < noteCount; i++) {
        // Pick elegant pentatonic frequency
        const rootIndex = Math.floor(Math.random() * notes.length);
        const freq = notes[rootIndex];
        const strumDelay = Math.random() * 0.4;
        const velocity = 0.15 + Math.random() * 0.2; // Soft background level
        
        playPluckNode(ctx, gainNode, freq, strumDelay, velocity);
      }
      
      step++;
    };
    
    // Play immediately and start beautiful interval
    playNextBar();
    gardenLoopInterval = window.setInterval(playNextBar, 3600);
    
  } catch (err) {
    console.warn("Garden ambient start error:", err);
  }
}

export function stopGardenAmbientMusic() {
  if (gardenLoopInterval) {
    clearInterval(gardenLoopInterval);
    gardenLoopInterval = null;
  }
  
  // Fade out current audio gracefully to avoid click static
  if (gainNode && audioCtx) {
    try {
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
    } catch {
      // safe bypass
    }
  }
  
  // Stop all active physical nodes
  activeNodes.forEach(node => {
    try {
      node.stop();
    } catch {
      // already stopped or bypassed
    }
  });
  activeNodes = [];
}
