import { buildHits, countInHits, drumEvents, patternById, type Hit } from "./patterns";
import type { Bars, DrumId, DrumVoice, MelodySound, Timbre } from "./theory";

export type VisualEvent = {
  time: number;
  chordIndex: number;
  sectionId: string;
  patternId: string;
  eighth: number;
  countIn: boolean;
};

export type Playhead = {
  chordIndex: number;
  sectionId: string;
  patternId: string;
  eighth: number;
  countIn: boolean;
  playing: boolean;
};

type LayerHit = Hit & {
  drum?: { voice: DrumVoice; velocity: number };
  melody?: { midi: number; sound: MelodySound; velocity: number; decay: number };
};

export type EngineSnapshot = {
  midis: number[][];
  bars: Bars[];
  patternIds: string[];
  sectionAt: string[];
  localAt: number[];
  timbres: Timbre[];
  levels: number[];
  autoBass: boolean[];
  bassMidi: number[];
  drumIds: DrumId[];
  drumsOn: boolean[];
  drumGain: number[];
  melody: { beat: number; midi: number; length: number }[][];
  melodySound: MelodySound[];
  melodyGain: number[];
  startIndex: number;
  bpm: number;
  volume: number;
  loop: boolean;
  metronome: boolean;
  countIn: boolean;
};

function midiToFreq(midi: number): number {
  return 440 * 2 ** ((midi - 69) / 12);
}

function holdFor(timbre: Timbre): number {
  if (timbre === "bass") return 1.05;
  if (timbre === "guitar" || timbre === "nylon") return 1.8;
  if (timbre === "organ" || timbre === "strings") return 2.6;
  return 2;
}

export function pluckSamples(freq: number, decay: number, kind: "steel" | "nylon", sr: number): Float32Array {
  const nylon = kind === "nylon";
  const dur = Math.min(nylon ? 3.4 : 2.9, Math.max(0.4, decay));
  const len = Math.max(8, Math.floor(sr * dur));
  const data = new Float32Array(len);
  const f = Math.max(70, Math.min(1400, freq));
  const blend = nylon ? 0.58 : 0.2;
  const delay = Math.max(2.2, sr / f - blend / (1 - blend));
  const iDelay = Math.floor(delay);
  const frac = delay - iDelay;
  const exciteLen = Math.min(len, iDelay + 2);
  const burst = Math.max(8, Math.floor(sr * (nylon ? 0.008 : 0.003)));
  const color = nylon ? 0.16 : 0.48;
  let colored = 0;
  for (let i = 0; i < exciteLen; i++) {
    const env = i < burst ? Math.sin((Math.PI * i) / burst) : 0;
    const white = Math.random() * 2 - 1;
    colored += color * (white - colored);
    const thump = Math.sin((2 * Math.PI * (nylon ? 126 : 172) * i) / sr) * Math.exp(-i / (sr * (nylon ? 0.014 : 0.008)));
    data[i] = colored * env * (nylon ? 0.7 : 1) + thump * (nylon ? 0.7 : 0.32);
  }
  if (!nylon) {
    const tick = Math.min(exciteLen, Math.floor(sr * 0.0016));
    for (let i = 0; i < tick; i++) data[i] += (Math.random() * 2 - 1) * (1 - i / tick) * 0.18;
  }
  const tail = Math.floor(exciteLen * 0.18);
  for (let i = 0; i < tail; i++) data[exciteLen - 1 - i] *= i / Math.max(1, tail);
  const loss = (nylon ? 0.9962 : 0.998) - (nylon ? 0.0009 : 0.00028) * (f / 220);
  let state = data[exciteLen - 1] ?? 0;
  for (let i = exciteLen; i < len; i++) {
    const s0 = data[i - iDelay] ?? 0;
    const s1 = data[i - iDelay - 1] ?? s0;
    const delayed = s0 * (1 - frac) + s1 * frac;
    state = loss * ((1 - blend) * delayed + blend * state);
    data[i] = state;
  }
  let prevIn = 0;
  let prevOut = 0;
  for (let i = 0; i < len; i++) {
    const x = data[i] ?? 0;
    const y = 0.996 * (prevOut + x - prevIn);
    prevIn = x;
    prevOut = y;
    data[i] = y;
  }
  const attack = Math.min(18, len);
  for (let i = 0; i < attack; i++) data[i] *= i / attack;
  const fade = Math.min(len, Math.floor(sr * 0.03));
  for (let i = 0; i < fade; i++) data[len - 1 - i] *= i / fade;
  let peak = 0.0001;
  for (let i = 0; i < len; i++) peak = Math.max(peak, Math.abs(data[i] ?? 0));
  const norm = 0.85 / peak;
  for (let i = 0; i < len; i++) data[i] *= norm;
  return data;
}

export class CadenceEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private voiceBus: GainNode | null = null;
  private previewBus: GainNode | null = null;
  private timer: number | null = null;
  private cache = new Map<string, AudioBuffer>();
  private visuals: VisualEvent[] = [];
  private hits: LayerHit[] = [];
  private hitIndex = 0;
  private phase: "hits" | "boundary" = "hits";
  private origin = 0;
  private spb = 0.6;
  private lengthBeats = 4;
  private chordIndex = 0;
  private pendingIndex = 0;
  private view = { chordIndex: -1, sectionId: "", patternId: "folk" };
  private countInPhase = false;
  private nextTime = Infinity;
  private playing = false;
  private volume = 0.8;
  private getSnap: () => EngineSnapshot = () => ({
    midis: [[60, 64, 67]],
    bars: [1],
    patternIds: ["folk"],
    sectionAt: [""],
    localAt: [0],
    timbres: ["guitar"],
    levels: [1],
    autoBass: [false],
    bassMidi: [36],
    drumIds: ["off"],
    drumsOn: [false],
    drumGain: [0.7],
    melody: [[]],
    melodySound: ["piano"],
    melodyGain: [0],
    startIndex: 0,
    bpm: 92,
    volume: 0.8,
    loop: true,
    metronome: false,
    countIn: false,
  });
  private onVisual: ((head: Playhead) => void) | null = null;

  setSnapshotGetter(fn: () => EngineSnapshot) {
    this.getSnap = fn;
  }

  setOnVisual(fn: (head: Playhead) => void) {
    this.onVisual = fn;
  }

  setVolume(volume: number) {
    this.volume = volume;
    if (this.master && this.ctx && this.playing) {
      this.master.gain.setTargetAtTime(volume, this.ctx.currentTime, 0.03);
    }
  }

  setTempo(bpm: number) {
    const next = Math.min(200, Math.max(40, bpm));
    if (!this.playing || !this.ctx) return;
    const now = this.ctx.currentTime;
    const elapsedBeats = (now - this.origin) / this.spb;
    this.spb = 60 / next;
    this.origin = now - elapsedBeats * this.spb;
    this.syncNext();
    this.refreshVisuals();
  }

  async start() {
    await this.ensure();
    if (!this.ctx || !this.master) return;
    this.halt(false);
    this.playing = true;
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.volume, now);
    const snap = this.getSnap();
    this.spb = 60 / snap.bpm;
    this.origin = now + 0.05;
    this.visuals = [];
    const start = this.clampIndex(snap, snap.startIndex);
    this.pendingIndex = start;
    if (snap.countIn) this.beginCountIn();
    else this.enterChord(start, false);
    this.tick();
  }

  stop() {
    this.halt(true);
  }

  preview(midis: number[], timbre: Timbre, bassMidi?: number) {
    if (this.playing) return;
    void this.ensure().then(() => {
      if (!this.ctx || !this.master || !this.previewBus || this.playing) return;
      const now = this.ctx.currentTime;
      this.master.gain.cancelScheduledValues(now);
      this.master.gain.setValueAtTime(this.volume, now);
      this.previewBus.gain.cancelScheduledValues(now);
      this.previewBus.gain.setValueAtTime(0.0001, now);
      this.previewBus.gain.setValueAtTime(1, now + 0.012);
      const ordered = [...midis];
      ordered.forEach((midi, i) => {
        this.playNote(
          midi,
          now + 0.012 + i * 0.016,
          Math.max(0.35, 0.86 - i * 0.04),
          holdFor(timbre),
          timbre,
          this.previewBus!,
        );
      });
      if (typeof bassMidi === "number" && bassMidi >= 28) {
        this.playNote(bassMidi, now + 0.012, 0.8, 1.1, "bass", this.previewBus!);
      }
    });
  }

  seek(index: number) {
    if (!this.playing || !this.ctx) return;
    const snap = this.getSnap();
    if (!snap.midis.length) return;
    this.cutVoices();
    this.origin = this.ctx.currentTime + 0.04;
    this.enterChord(this.clampIndex(snap, index), false);
  }

  rebuild() {
    if (!this.playing || !this.ctx || this.countInPhase) return;
    const snap = this.getSnap();
    const n = snap.midis.length;
    if (!n) {
      this.halt(true);
      return;
    }
    this.cutVoices();
    if (this.chordIndex >= n) this.chordIndex = n - 1;
    if (this.chordIndex < 0) this.chordIndex = 0;
    const elapsed = (this.ctx.currentTime - this.origin) / this.spb;
    const built = this.compose(this.chordIndex);
    this.hits = built.hits;
    this.lengthBeats = built.lengthBeats;
    this.rememberView(snap, this.chordIndex);
    if (elapsed >= this.lengthBeats - 0.001) {
      this.onBoundary();
      return;
    }
    const idx = this.hits.findIndex((h) => h.beat > elapsed + 0.03);
    if (idx === -1) this.phase = "boundary";
    else {
      this.phase = "hits";
      this.hitIndex = idx;
    }
    this.syncNext();
    this.refreshVisuals();
  }

  dispose() {
    this.halt(false);
    void this.ctx?.close();
    this.ctx = null;
    this.master = null;
    this.voiceBus = null;
    this.previewBus = null;
  }

  private async ensure() {
    if (typeof window === "undefined") return;
    if (!this.ctx) {
      const ctx = new AudioContext();
      const master = ctx.createGain();
      master.gain.value = this.volume;
      const previewBus = ctx.createGain();
      previewBus.gain.value = 1;
      const voiceBus = ctx.createGain();
      voiceBus.gain.value = 1;
      voiceBus.connect(master);
      previewBus.connect(master);
      const highpass = ctx.createBiquadFilter();
      highpass.type = "highpass";
      highpass.frequency.value = 32;
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -14;
      comp.knee.value = 16;
      comp.ratio.value = 3;
      comp.attack.value = 0.004;
      comp.release.value = 0.18;
      master.connect(highpass);
      highpass.connect(comp);
      comp.connect(ctx.destination);
      this.ctx = ctx;
      this.master = master;
      this.voiceBus = voiceBus;
      this.previewBus = previewBus;
    }
    if (this.ctx.state === "suspended") await this.ctx.resume();
  }

  private halt(fade: boolean) {
    const was = this.playing;
    this.playing = false;
    if (this.timer !== null) window.clearTimeout(this.timer);
    this.timer = null;
    this.nextTime = Infinity;
    this.visuals = [];
    this.countInPhase = false;
    this.cutVoices();
    if (fade && was && this.ctx && this.master) {
      const now = this.ctx.currentTime;
      const current = this.master.gain.value;
      this.master.gain.cancelScheduledValues(now);
      this.master.gain.setValueAtTime(Math.max(0.0001, current), now);
      this.master.gain.linearRampToValueAtTime(0.0001, now + 0.05);
    }
    if (was) {
      this.onVisual?.({ chordIndex: -1, sectionId: "", patternId: "", eighth: -1, countIn: false, playing: false });
    }
  }

  private patternAt(snap: EngineSnapshot, index: number): string {
    return snap.patternIds[index] || snap.patternIds[0] || "folk";
  }

  private clampIndex(snap: EngineSnapshot, index: number): number {
    const n = snap.midis.length;
    if (!n) return 0;
    return ((index % n) + n) % n;
  }

  private rememberView(snap: EngineSnapshot, index: number) {
    const safe = index >= 0 && index < snap.midis.length ? index : 0;
    this.view = {
      chordIndex: snap.localAt[safe] ?? 0,
      sectionId: snap.sectionAt[safe] ?? "",
      patternId: this.patternAt(snap, safe),
    };
  }

  private beginCountIn() {
    const snap = this.getSnap();
    const start = this.clampIndex(snap, this.pendingIndex);
    const patternId = this.patternAt(snap, start);
    const meter = patternById(patternId).meter;
    this.countInPhase = true;
    this.chordIndex = -1;
    this.view = { chordIndex: -1, sectionId: snap.sectionAt[start] ?? "", patternId };
    this.lengthBeats = meter;
    this.hits = countInHits(meter);
    this.hitIndex = 0;
    this.phase = "hits";
    this.syncNext();
    this.refreshVisuals();
  }

  private enterChord(index: number, advanceOrigin: boolean) {
    const snap = this.getSnap();
    const n = snap.midis.length;
    if (!n) {
      this.halt(true);
      return;
    }
    if (advanceOrigin) this.origin += this.lengthBeats * this.spb;
    this.countInPhase = false;
    this.chordIndex = this.clampIndex(snap, index);
    this.spb = 60 / snap.bpm;
    this.rememberView(snap, this.chordIndex);
    const built = this.compose(this.chordIndex);
    this.hits = built.hits;
    this.lengthBeats = built.lengthBeats;
    this.hitIndex = 0;
    this.phase = this.hits.length ? "hits" : "boundary";
    this.syncNext();
    this.refreshVisuals();
  }

  private onBoundary() {
    if (this.countInPhase) {
      this.enterChord(this.pendingIndex, true);
      return;
    }
    const snap = this.getSnap();
    const n = snap.midis.length;
    if (!n) {
      this.halt(true);
      return;
    }
    const next = this.chordIndex + 1;
    if (next >= n) {
      if (!snap.loop) {
        this.halt(true);
        return;
      }
      this.enterChord(0, true);
      return;
    }
    this.enterChord(next, true);
  }

  private syncNext() {
    if (!this.playing) {
      this.nextTime = Infinity;
      return;
    }
    if (this.phase === "hits" && this.hitIndex < this.hits.length) {
      this.nextTime = this.origin + this.hits[this.hitIndex].beat * this.spb;
      return;
    }
    this.phase = "boundary";
    this.nextTime = this.origin + this.lengthBeats * this.spb;
  }

  private refreshVisuals() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    this.visuals = this.visuals.filter((v) => v.time <= now);
    const steps = Math.max(1, Math.round(this.lengthBeats * 2));
    for (let i = 0; i < steps; i++) {
      const time = this.origin + (i / 2) * this.spb;
      if (time >= now - 0.02) {
        this.visuals.push({
          time,
          chordIndex: this.view.chordIndex,
          sectionId: this.view.sectionId,
          patternId: this.view.patternId,
          eighth: i,
          countIn: this.countInPhase,
        });
      }
    }
    this.visuals.sort((a, b) => a.time - b.time);
  }

  private tick = () => {
    if (!this.playing || !this.ctx) return;
    const horizon = this.ctx.currentTime + 0.18;
    let guard = 0;
    while (this.playing && this.nextTime < horizon && guard < 48) {
      guard += 1;
      if (this.nextTime < this.ctx.currentTime - 0.3) {
        this.origin = this.ctx.currentTime + 0.05;
        this.countInPhase = false;
        this.enterChord(Math.max(0, this.chordIndex), false);
        break;
      }
      this.dispatchNext();
    }
    this.flushVisuals();
    if (this.playing) this.timer = window.setTimeout(this.tick, 25);
  };

  private dispatchNext() {
    if (this.phase === "boundary") {
      this.onBoundary();
      return;
    }
    const hit = this.hits[this.hitIndex];
    if (!hit) {
      this.phase = "boundary";
      this.syncNext();
      return;
    }
    const when = this.origin + hit.beat * this.spb;
    const snap = this.getSnap();
    const timbre = snap.timbres[this.chordIndex] ?? "guitar";
    if (hit.click && (snap.metronome || this.countInPhase)) {
      this.playClick(when, Math.abs(hit.beat) < 0.001);
    }
    for (const note of hit.notes) {
      this.playNote(note.midi, when + note.delay, note.velocity, note.decay, note.timbre ?? timbre);
    }
    if (hit.drum) this.playDrum(hit.drum.voice, when, hit.drum.velocity);
    if (hit.melody) this.playMelody(hit.melody.midi, when, hit.melody.velocity, hit.melody.decay, hit.melody.sound);
    this.hitIndex += 1;
    if (this.hitIndex >= this.hits.length) this.phase = "boundary";
    this.syncNext();
  }

  private flushVisuals() {
    if (!this.ctx || !this.onVisual) return;
    const t = this.ctx.currentTime + 0.02;
    let last: VisualEvent | null = null;
    while (this.visuals.length && this.visuals[0].time <= t) {
      last = this.visuals.shift() ?? null;
    }
    if (last) {
      this.onVisual({
        chordIndex: last.chordIndex,
        sectionId: last.sectionId,
        patternId: last.patternId,
        eighth: last.eighth,
        countIn: last.countIn,
        playing: true,
      });
    }
  }

  private playClick(when: number, accent: boolean) {
    if (!this.ctx || !this.master) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(accent ? 1560 : 1040, when);
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.exponentialRampToValueAtTime(accent ? 0.16 : 0.08, when + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + 0.04);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start(when);
    osc.stop(when + 0.05);
  }

  private compose(index: number): { hits: LayerHit[]; lengthBeats: number } {
    const snap = this.getSnap();
    const i = this.clampIndex(snap, index);
    const timbre = snap.timbres[i] ?? "guitar";
    const built = buildHits(this.patternAt(snap, i), snap.midis[i] ?? [], {
      bpm: snap.bpm,
      timbre,
      bars: snap.bars[i] ?? 1,
      metronome: snap.metronome,
    });
    const level = snap.levels[i] ?? 1;
    const hits: LayerHit[] = built.hits.map((hit) => ({
      ...hit,
      notes: hit.notes.map((note) => ({ ...note, velocity: note.velocity * level })),
    }));
    if (snap.autoBass[i]) {
      const midi = snap.bassMidi[i] ?? 0;
      if (midi >= 28) {
        hits.push({
          beat: 0,
          notes: [
            {
              midi,
              delay: 0,
              velocity: 0.82 * level,
              decay: Math.min(1.7, built.lengthBeats * (60 / snap.bpm) * 0.9),
              timbre: "bass",
            },
          ],
        });
      }
    }
    if (snap.drumsOn[i] && snap.drumIds[i] && snap.drumIds[i] !== "off") {
      const gain = (snap.drumGain[i] ?? 0.7) * (0.55 + 0.45 * level);
      for (const drum of drumEvents(snap.drumIds[i], built.lengthBeats)) {
        hits.push({ beat: drum.beat, notes: [], drum: { voice: drum.voice, velocity: drum.velocity * gain } });
      }
    }
    const melodyGain = snap.melodyGain[i] ?? 0;
    if (melodyGain > 0.001) {
      const sound = snap.melodySound[i] ?? "piano";
      const spb = 60 / snap.bpm;
      for (const note of snap.melody[i] ?? []) {
        if (note.beat < -0.001 || note.beat >= built.lengthBeats - 0.001) continue;
        hits.push({
          beat: note.beat,
          notes: [],
          melody: {
            midi: note.midi,
            sound,
            velocity: 0.8 * melodyGain,
            decay: Math.max(0.08, Math.min(4, note.length * spb)),
          },
        });
      }
    }
    hits.sort((a, b) => a.beat - b.beat);
    return { hits, lengthBeats: built.lengthBeats };
  }

  private cutVoices() {
    if (!this.ctx || !this.master || !this.voiceBus) return;
    const old = this.voiceBus;
    const now = this.ctx.currentTime;
    old.gain.cancelScheduledValues(now);
    old.gain.setValueAtTime(Math.max(0.0001, old.gain.value), now);
    old.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
    const fresh = this.ctx.createGain();
    fresh.gain.setValueAtTime(1, now);
    fresh.connect(this.master);
    this.voiceBus = fresh;
    window.setTimeout(() => old.disconnect(), 120);
  }

  private playNote(midi: number, when: number, velocity: number, decay: number, timbre: Timbre, dest?: AudioNode) {
    if (!this.ctx || !this.master) return;
    const target = dest ?? this.voiceBus ?? this.master;
    const freq = midiToFreq(midi);
    if (timbre === "guitar") this.playPluck(freq, when, velocity, decay, "steel", target);
    else if (timbre === "nylon") this.playPluck(freq, when, velocity, decay, "nylon", target);
    else if (timbre === "organ") this.playOrgan(freq, when, velocity, decay, target);
    else if (timbre === "strings") this.playStrings(freq, when, velocity, decay, target);
    else if (timbre === "bass") this.playBass(freq, when, velocity, decay, target);
    else this.playPiano(freq, when, velocity, decay, timbre === "soft", target);
  }

  private playPluck(freq: number, when: number, velocity: number, decay: number, kind: "steel" | "nylon", dest: AudioNode) {
    if (!this.ctx || !this.master) return;
    const ctx = this.ctx;
    const nylon = kind === "nylon";
    const dur = Math.min(nylon ? 3.4 : 2.9, Math.max(0.35, decay));
    const input = ctx.createGain();
    input.gain.value = 1;
    const air = ctx.createBiquadFilter();
    air.type = "peaking";
    air.frequency.setValueAtTime(nylon ? 94 : 104, when);
    air.Q.value = 1.05;
    air.gain.value = nylon ? 6 : 4;
    const top = ctx.createBiquadFilter();
    top.type = "peaking";
    top.frequency.setValueAtTime(nylon ? 188 : 216, when);
    top.Q.value = 1.3;
    top.gain.value = nylon ? 5 : 7;
    const box = ctx.createBiquadFilter();
    box.type = "peaking";
    box.frequency.setValueAtTime(nylon ? 370 : 430, when);
    box.Q.value = 1.4;
    box.gain.value = 2.4;
    const presence = ctx.createBiquadFilter();
    presence.type = "peaking";
    presence.frequency.setValueAtTime(nylon ? 1500 : 2500, when);
    presence.Q.value = 0.7;
    presence.gain.value = nylon ? -3.5 : 1.2;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.Q.value = 0.55;
    lp.frequency.setValueAtTime((nylon ? 2100 : 3900) + velocity * (nylon ? 500 : 1200), when);
    input.connect(air);
    air.connect(top);
    top.connect(box);
    box.connect(presence);
    presence.connect(lp);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(Math.max(0.05, velocity) * (nylon ? 0.8 : 0.68), when);
    lp.connect(gain);
    gain.connect(dest);
    const voice = (ratio: number, level: number) => {
      const src = ctx.createBufferSource();
      src.buffer = this.stringBuffer(freq * ratio, decay, kind);
      const amp = ctx.createGain();
      amp.gain.value = level;
      src.connect(amp);
      amp.connect(input);
      src.start(when);
      src.stop(when + dur + 0.02);
    };
    voice(1, 1);
    if (!nylon) voice(1.0035, 0.36);
  }

  private playBass(freq: number, when: number, velocity: number, decay: number, dest: AudioNode) {
    if (!this.ctx || !this.master) return;
    const release = Math.min(1.7, Math.max(0.16, decay));
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.Q.value = 0.7;
    filter.frequency.setValueAtTime(280 + velocity * 420, when);
    filter.frequency.exponentialRampToValueAtTime(180, when + release);
    const mix = this.ctx.createGain();
    mix.gain.value = 0.34;
    const partials: [number, number][] = [
      [1, 1],
      [2, 0.32],
      [3, 0.1],
      [4, 0.04],
    ];
    for (const [harmonic, amp] of partials) {
      const osc = this.ctx.createOscillator();
      osc.type = "sine";
      const f = Math.max(30, freq * harmonic);
      osc.frequency.setValueAtTime(f * 1.01, when);
      osc.frequency.exponentialRampToValueAtTime(f, when + 0.045);
      const gain = this.ctx.createGain();
      const peak = Math.max(0.0002, velocity * amp * 0.7);
      gain.gain.setValueAtTime(0.0001, when);
      gain.gain.exponentialRampToValueAtTime(peak, when + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, when + Math.max(0.08, release / (1 + (harmonic - 1) * 0.45)));
      osc.connect(gain);
      gain.connect(filter);
      osc.start(when);
      osc.stop(when + release + 0.04);
    }
    filter.connect(mix);
    mix.connect(dest);
  }

  private playStrings(freq: number, when: number, velocity: number, decay: number, dest: AudioNode) {
    if (!this.ctx || !this.master) return;
    const release = Math.min(4.8, Math.max(0.6, decay));
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.Q.value = 0.5;
    filter.frequency.setValueAtTime(900, when);
    filter.frequency.exponentialRampToValueAtTime(1600, when + 0.35);
    const mix = this.ctx.createGain();
    mix.gain.value = 0.16;
    const partials: [number, number, number][] = [
      [1, 0.72, -0.006],
      [1, 0.72, 0.006],
      [2, 0.26, -0.004],
      [2, 0.26, 0.004],
      [3, 0.08, 0],
    ];
    for (const [harmonic, amp, detune] of partials) {
      const osc = this.ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq * harmonic * (1 + detune), when);
      const gain = this.ctx.createGain();
      const peak = Math.max(0.0002, velocity * amp * 0.42);
      const holdAt = when + Math.max(0.22, release * 0.55);
      gain.gain.setValueAtTime(0.0001, when);
      gain.gain.exponentialRampToValueAtTime(peak, when + 0.16);
      gain.gain.setValueAtTime(peak * 0.85, holdAt);
      gain.gain.exponentialRampToValueAtTime(0.0001, when + release);
      osc.connect(gain);
      gain.connect(filter);
      osc.start(when);
      osc.stop(when + release + 0.05);
    }
    filter.connect(mix);
    mix.connect(dest);
  }

  private playDrum(voice: DrumVoice, when: number, velocity: number) {
    if (!this.ctx || !this.voiceBus) return;
    const ctx = this.ctx;
    const dest = this.voiceBus;
    const v = Math.max(0.04, Math.min(1, velocity));
    if (voice === "kick") {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(168, when);
      osc.frequency.exponentialRampToValueAtTime(46, when + 0.09);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, when);
      gain.gain.exponentialRampToValueAtTime(v * 0.95, when + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, when + 0.2);
      osc.connect(gain);
      gain.connect(dest);
      osc.start(when);
      osc.stop(when + 0.22);
      return;
    }
    if (voice === "snare") {
      this.noiseBurst(when, 0.16, 1000, v * 0.5, dest);
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(186, when);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, when);
      gain.gain.exponentialRampToValueAtTime(v * 0.28, when + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, when + 0.1);
      osc.connect(gain);
      gain.connect(dest);
      osc.start(when);
      osc.stop(when + 0.12);
      return;
    }
    if (voice === "clap") {
      this.noiseBurst(when, 0.07, 1200, v * 0.38, dest);
      this.noiseBurst(when + 0.012, 0.08, 1200, v * 0.32, dest);
      return;
    }
    this.noiseBurst(when, 0.04, 6200, v * 0.22, dest);
  }

  private noiseBurst(when: number, dur: number, highpass: number, peak: number, dest: AudioNode) {
    if (!this.ctx) return;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer();
    const filter = this.ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.setValueAtTime(highpass, when);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), when + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(dest);
    src.start(when);
    src.stop(when + dur + 0.02);
  }

  private noiseBuffer(): AudioBuffer {
    const cached = this.cache.get("noise");
    if (cached) return cached;
    const ctx = this.ctx!;
    const len = Math.floor(ctx.sampleRate * 0.35);
    const data = new Float32Array(len);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    buffer.getChannelData(0).set(data);
    this.cache.set("noise", buffer);
    return buffer;
  }

  private playMelody(midi: number, when: number, velocity: number, decay: number, sound: MelodySound) {
    if (!this.ctx || !this.voiceBus) return;
    const dest = this.voiceBus;
    const freq = midiToFreq(midi);
    const dur = Math.max(0.08, Math.min(4, decay));
    if (sound === "piano") this.playPiano(freq, when, velocity, dur, false, dest);
    else if (sound === "soft") this.playPiano(freq, when, velocity * 0.9, dur, true, dest);
    else if (sound === "flute") this.playTone(freq, when, velocity * 0.7, dur, dest, "flute");
    else if (sound === "bit") this.playTone(freq, when, velocity * 0.45, dur, dest, "bit");
    else this.playTone(freq, when, velocity * 0.55, dur, dest, "lead");
  }

  private playTone(freq: number, when: number, velocity: number, decay: number, dest: AudioNode, kind: "lead" | "flute" | "bit") {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(kind === "bit" ? 1800 : kind === "flute" ? 1400 : 1600, when);
    const mix = ctx.createGain();
    mix.gain.value = kind === "bit" ? 0.18 : 0.16;
    const voices: [OscillatorType, number, number][] =
      kind === "bit"
        ? [["square", 1, 0]]
        : kind === "flute"
          ? [
              ["sine", 1, 0],
              ["sine", 0.18, 0.002],
            ]
          : [
              ["sawtooth", 0.55, -0.004],
              ["sawtooth", 0.4, 0.006],
            ];
    const attack = kind === "flute" ? 0.07 : kind === "lead" ? 0.03 : 0.004;
    for (const [type, amp, detune] of voices) {
      const osc = ctx.createOscillator();
      osc.type = type;
      osc.frequency.setValueAtTime(freq * (1 + detune), when);
      const gain = ctx.createGain();
      const peak = Math.max(0.0002, velocity * amp);
      const noteEnd = when + decay;
      gain.gain.setValueAtTime(0.0001, when);
      gain.gain.exponentialRampToValueAtTime(peak, when + attack);
      if (decay > attack + 0.05) gain.gain.setValueAtTime(peak * 0.9, when + attack + (decay - attack) * 0.55);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteEnd);
      osc.connect(gain);
      gain.connect(filter);
      osc.start(when);
      osc.stop(when + decay + 0.04);
    }
    if (kind === "flute") this.noiseBurst(when, Math.min(0.12, decay), 2000, velocity * 0.04, filter);
    filter.connect(mix);
    mix.connect(dest);
  }

  private stringBuffer(freq: number, decay: number, kind: "steel" | "nylon"): AudioBuffer {
    const ctx = this.ctx!;
    const sr = ctx.sampleRate;
    const dur = Math.min(kind === "nylon" ? 3.4 : 2.9, Math.max(0.4, decay));
    const key = `${kind}:${sr}:${freq.toFixed(1)}:${dur.toFixed(1)}`;
    const cached = this.cache.get(key);
    if (cached) return cached;
    const data = pluckSamples(freq, decay, kind, sr);
    const buffer = ctx.createBuffer(1, data.length, sr);
    buffer.getChannelData(0).set(data);
    this.cache.set(key, buffer);
    if (this.cache.size > 140) {
      const first = this.cache.keys().next().value;
      if (first) this.cache.delete(first);
    }
    return buffer;
  }

  private playOrgan(freq: number, when: number, velocity: number, decay: number, dest: AudioNode) {
    if (!this.ctx || !this.master) return;
    const release = Math.min(4.6, Math.max(0.5, decay));
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.Q.value = 0.6;
    filter.frequency.setValueAtTime(980, when);
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(1.7, when);
    lfoGain.gain.setValueAtTime(320, when);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    const mix = this.ctx.createGain();
    mix.gain.value = 0.2;
    const partials: [number, number, number][] = [
      [1, 0.66, -0.0035],
      [1, 0.66, 0.0035],
      [2, 0.48, 0],
      [3, 0.2, 0],
      [4, 0.12, 0],
      [6, 0.06, 0],
    ];
    for (const [harmonic, amp, detune] of partials) {
      const osc = this.ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq * harmonic * (1 + detune), when);
      const gain = this.ctx.createGain();
      const peak = Math.max(0.0002, velocity * amp * 0.5);
      const holdAt = when + Math.max(0.07, release * 0.62);
      gain.gain.setValueAtTime(0.0001, when);
      gain.gain.exponentialRampToValueAtTime(peak, when + 0.045);
      gain.gain.setValueAtTime(peak, holdAt);
      gain.gain.exponentialRampToValueAtTime(0.0001, when + release);
      osc.connect(gain);
      gain.connect(filter);
      osc.start(when);
      osc.stop(when + release + 0.06);
    }
    filter.connect(mix);
    mix.connect(dest);
    lfo.start(when);
    lfo.stop(when + release + 0.06);
  }

  private playPiano(freq: number, when: number, velocity: number, decay: number, soft: boolean, dest: AudioNode) {
    if (!this.ctx || !this.master) return;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(soft ? 1500 : 2800, when);
    const mix = this.ctx.createGain();
    mix.gain.value = soft ? 0.22 : 0.2;
    const partials: [number, number][] = soft
      ? [
          [1, 1],
          [2, 0.38],
          [3, 0.14],
          [4, 0.05],
        ]
      : [
          [1, 1],
          [2, 0.5],
          [3, 0.24],
          [4, 0.12],
          [5, 0.06],
          [6, 0.03],
        ];
    for (const [harmonic, amp] of partials) {
      const osc = this.ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq * harmonic * (1 + 0.00012 * harmonic * harmonic), when);
      const gain = this.ctx.createGain();
      const peak = Math.max(0.0002, velocity * amp);
      const partialDecay = Math.max(0.12, decay / (1 + (harmonic - 1) * 0.55));
      const attack = soft ? 0.028 : 0.008;
      gain.gain.setValueAtTime(0.0001, when);
      gain.gain.exponentialRampToValueAtTime(peak, when + attack);
      gain.gain.exponentialRampToValueAtTime(0.0001, when + Math.max(attack + 0.06, partialDecay));
      osc.connect(gain);
      gain.connect(filter);
      osc.start(when);
      osc.stop(when + partialDecay + 0.03);
    }
    filter.connect(mix);
    mix.connect(dest);
  }
}
