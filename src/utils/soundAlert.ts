/**
 * Amoga Family Restaurant - Admin Order Notification Sound System
 * High-impact, loud commercial restaurant POS order buzzer synthesizer.
 * Emulates high-decibel commercial kitchen order buzzers / pagers using HTML5 Web Audio API.
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
 * Synthesizes a loud, high-impact restaurant order buzzer ("BZZT - BZZT - BZZZZT!").
 * Employs dual harmonic oscillators (sawtooth + square), 60Hz mechanical vibration LFO,
 * and a hardware dynamics compressor for high acoustic penetration and volume.
 */
export const playOrderNotificationSound = (volume: number = 0.9): boolean => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return false;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    // 1. Hardware-style Dynamics Compressor for maximum loud presence without clipping
    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-12, now);
    compressor.knee.setValueAtTime(6, now);
    compressor.ratio.setValueAtTime(20, now);
    compressor.attack.setValueAtTime(0.001, now);
    compressor.release.setValueAtTime(0.12, now);
    compressor.connect(ctx.destination);

    // 2. Master Gain
    const masterGain = ctx.createGain();
    const effectiveVol = Math.min(1.0, Math.max(0.2, volume));
    masterGain.gain.setValueAtTime(effectiveVol, now);
    masterGain.connect(compressor);

    /**
     * Generates a single high-impact electric buzzer pulse ("BZZT!")
     */
    const playBuzzBurst = (startTime: number, duration: number, freq: number) => {
      // Primary Oscillator: Harsh Sawtooth
      const oscSaw = ctx.createOscillator();
      oscSaw.type = 'sawtooth';
      oscSaw.frequency.setValueAtTime(freq, startTime);

      // Secondary Oscillator: Punchy Square wave
      const oscSq = ctx.createOscillator();
      oscSq.type = 'square';
      oscSq.frequency.setValueAtTime(freq * 1.5, startTime);

      // Sub-harmonic oscillator for deep kitchen alert punch
      const oscSub = ctx.createOscillator();
      oscSub.type = 'triangle';
      oscSub.frequency.setValueAtTime(freq * 0.5, startTime);

      // 60Hz Mechanical Buzzer Vibration LFO
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.type = 'square';
      lfo.frequency.setValueAtTime(60, startTime); // 60Hz electric buzz hum
      lfoGain.gain.setValueAtTime(75, startTime);   // +/- 75Hz vibrato rattle
      lfo.connect(lfoGain);
      lfoGain.connect(oscSaw.frequency);
      lfoGain.connect(oscSq.frequency);

      // Individual Burst Gain Envelope
      const burstGain = ctx.createGain();
      burstGain.gain.setValueAtTime(0.001, startTime);
      burstGain.gain.linearRampToValueAtTime(0.95, startTime + 0.01);
      burstGain.gain.setValueAtTime(0.9, startTime + duration - 0.02);
      burstGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      // Routing
      oscSaw.connect(burstGain);
      oscSq.connect(burstGain);
      oscSub.connect(burstGain);
      burstGain.connect(masterGain);

      // Start & Stop
      oscSaw.start(startTime);
      oscSq.start(startTime);
      oscSub.start(startTime);
      lfo.start(startTime);

      oscSaw.stop(startTime + duration);
      oscSq.stop(startTime + duration);
      oscSub.stop(startTime + duration);
      lfo.stop(startTime + duration);
    };

    // COMMERCIAL POS KITCHEN ORDER BUZZER PATTERN:
    // Round 1: Rapid Attention Grabber (BZZT! - BZZT! - BZZZZT!)
    playBuzzBurst(now + 0.00, 0.18, 580); // Pulse 1: 580Hz (BZZT)
    playBuzzBurst(now + 0.24, 0.18, 620); // Pulse 2: 620Hz (BZZT)
    playBuzzBurst(now + 0.48, 0.38, 700); // Pulse 3: 700Hz (BZZZZT - Long)

    // Round 2: High Urgency Follow-up (0.28s pause, then BZZT! - BZZZZT!)
    playBuzzBurst(now + 1.00, 0.18, 720); // Pulse 4: 720Hz (BZZT)
    playBuzzBurst(now + 1.24, 0.45, 820); // Pulse 5: 820Hz (BZZZZT - Piercing high finish)

    return true;
  } catch (error) {
    console.warn("Failed to play order buzzer notification:", error);
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
