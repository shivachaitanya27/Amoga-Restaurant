/**
 * Amoga Family Restaurant - Admin Order Notification Sound System
 * High-fidelity dual-tone POS restaurant order bell synthesizer using HTML5 Web Audio API.
 * Operates offline, zero external dependencies, zero network latency.
 */

let sharedAudioCtx: AudioContext | null = null;

export const getAudioContext = (): AudioContext | null => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
      sharedAudioCtx = new AudioContextClass();
    }
    if (sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume().catch(() => {});
    }
    return sharedAudioCtx;
  } catch (err) {
    console.warn("AudioContext initialization warning:", err);
    return null;
  }
};

/**
 * Synthesizes a distinctive, pleasant, high-clarity restaurant order bell chime.
 * Rising major chord arpeggio with rich bell harmonics and natural decay.
 */
export const playOrderNotificationSound = (volume: number = 0.5): boolean => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return false;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    // Helper to play a single bell note with fundamental + harmonic overtone
    const playBellNote = (freq: number, startTime: number, duration: number, gainLevel: number) => {
      // Fundamental oscillator
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, startTime);

      // Harmonic overtone oscillator for authentic metallic chime bell texture
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2.01, startTime);

      // Master gain for this note with exponential decay envelope
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(gainLevel * volume, startTime);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      gain1.gain.setValueAtTime(0.75, startTime);
      gain2.gain.setValueAtTime(0.25, startTime);

      osc1.connect(gain1);
      gain1.connect(masterGain);

      osc2.connect(gain2);
      gain2.connect(masterGain);

      masterGain.connect(ctx.destination);

      osc1.start(startTime);
      osc2.start(startTime);

      osc1.stop(startTime + duration);
      osc2.stop(startTime + duration);
    };

    // SEQUENCE 1: Rising POS Alert (C5 -> E5 -> G5 -> C6)
    playBellNote(523.25, now + 0.00, 0.40, 0.45); // C5
    playBellNote(659.25, now + 0.12, 0.40, 0.50); // E5
    playBellNote(783.99, now + 0.24, 0.50, 0.55); // G5
    playBellNote(1046.5, now + 0.36, 0.85, 0.65); // C6 (Bright bell peak)

    // SEQUENCE 2: Repeating High Confirmation Chime (0.75s later)
    playBellNote(659.25, now + 0.75, 0.40, 0.50); // E5
    playBellNote(783.99, now + 0.87, 0.45, 0.55); // G5
    playBellNote(1046.5, now + 0.99, 0.50, 0.60); // C6
    playBellNote(1318.5, now + 1.12, 1.20, 0.70); // E6 (Sustained restaurant order chime)

    return true;
  } catch (error) {
    console.warn("Failed to play order notification sound:", error);
    return false;
  }
};

/**
 * Returns whether order notification audio is enabled in user preferences.
 */
export const isOrderSoundEnabled = (): boolean => {
  try {
    return localStorage.getItem('amoga_admin_order_sound') !== 'false';
  } catch {
    return true;
  }
};

/**
 * Sets order notification audio preference.
 */
export const setOrderSoundEnabled = (enabled: boolean): void => {
  try {
    localStorage.setItem('amoga_admin_order_sound', enabled ? 'true' : 'false');
  } catch (e) {}
};
