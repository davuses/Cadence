import type { Bars, DrumId, DrumVoice, Timbre } from "./theory";

export type NoteHit = {
  midi: number;
  delay: number;
  velocity: number;
  decay: number;
  timbre?: Timbre;
};

export type Hit = {
  beat: number;
  notes: NoteHit[];
  click?: boolean;
};

export type PatternDef = {
  id: string;
  name: string;
  blurb: string;
  meter: 3 | 4;
  signature: string;
  family: "strum" | "arp";
};

export const PATTERNS: PatternDef[] = [
  { id: "folk", name: "Folk strum", blurb: "Down, down-up, up-down-up", meter: 4, signature: "4/4", family: "strum" },
  { id: "eighths", name: "Eighths", blurb: "Steady down-up pulse", meter: 4, signature: "4/4", family: "strum" },
  { id: "shuffle", name: "Shuffle", blurb: "Swung eighths, blues and soul", meter: 4, signature: "4/4", family: "strum" },
  { id: "downs", name: "Downstrums", blurb: "Four broad downstrokes", meter: 4, signature: "4/4", family: "strum" },
  { id: "pulse", name: "Pulse", blurb: "Short chords, four to the bar", meter: 4, signature: "4/4", family: "strum" },
  { id: "block", name: "Sustain", blurb: "One chord, let it ring", meter: 4, signature: "4/4", family: "strum" },
  { id: "ballad", name: "Ballad", blurb: "Bass then chord, piano feel", meter: 4, signature: "4/4", family: "strum" },
  { id: "waltz", name: "Waltz", blurb: "Bass-chord-chord in 3/4", meter: 3, signature: "3/4", family: "strum" },
  { id: "compound", name: "6/8", blurb: "A lilt on one and four", meter: 3, signature: "6/8", family: "strum" },
  { id: "offbeat", name: "Offbeat", blurb: "Short chords on the ands", meter: 4, signature: "4/4", family: "strum" },
  { id: "arp", name: "Arpeggio", blurb: "Notes climbing one by one", meter: 4, signature: "4/4", family: "arp" },
  { id: "rolling", name: "Rolling", blurb: "Up and back down", meter: 4, signature: "4/4", family: "arp" },
  { id: "travis", name: "Fingerpick", blurb: "Alternating bass and fingers", meter: 4, signature: "4/4", family: "arp" },
  { id: "alberti", name: "Alberti", blurb: "Low, high, middle, high", meter: 4, signature: "4/4", family: "arp" },
];

export function patternById(id: string): PatternDef {
  return PATTERNS.find((p) => p.id === id) ?? PATTERNS[0];
}

type Built = { hits: Hit[]; lengthBeats: number; meter: 3 | 4 };

function decayFor(bpm: number, timbre: Timbre, feel: "ring" | "short" | "medium"): number {
  const beat = 60 / bpm;
  if (timbre === "organ" || timbre === "strings") {
    if (feel === "short") return Math.min(0.7, Math.max(0.32, beat * 0.85));
    if (feel === "medium") return Math.min(2.2, Math.max(0.7, beat * 1.8));
    return Math.min(4.4, Math.max(1.3, beat * (timbre === "strings" ? 3.4 : 3)));
  }
  if (timbre === "bass") {
    if (feel === "short") return Math.min(0.28, Math.max(0.12, beat * 0.45));
    if (feel === "medium") return Math.min(0.9, Math.max(0.22, beat * 0.8));
    return Math.min(1.6, Math.max(0.4, beat * 1.4));
  }
  if (feel === "short") return Math.min(0.18, Math.max(0.09, beat * 0.35));
  if (feel === "medium") return Math.max(0.25, Math.min(1.4, beat * 1.2));
  const mul = timbre === "guitar" ? 2 : timbre === "nylon" ? 2.6 : timbre === "soft" ? 2.6 : 2.2;
  return Math.min(3.4, Math.max(0.5, beat * mul));
}

function strum(midis: number[], direction: "down" | "up" | "block", velocity: number, decay: number): NoteHit[] {
  if (!midis.length) return [];
  const ordered = direction === "up" ? [...midis].reverse() : [...midis];
  const stagger = direction === "block" ? 0 : 0.014;
  return ordered.map((midi, i) => ({
    midi,
    delay: i * stagger,
    velocity: Math.max(0.2, velocity * (direction === "block" ? 1 : 0.96 - i * 0.035)),
    decay,
  }));
}

function pick(midis: number[], target: "all" | "bass" | "upper"): number[] {
  if (!midis.length) return [];
  if (target === "bass") return [midis[0]];
  if (target === "upper") return midis.length > 1 ? midis.slice(1) : midis;
  return midis;
}

function strumHits(
  events: { beat: number; target: "all" | "bass" | "upper"; direction: "down" | "up" | "block"; velocity: number; feel: "ring" | "short" | "medium" }[],
  midis: number[],
  bpm: number,
  timbre: Timbre,
): Hit[] {
  return events.map((event) => ({
    beat: event.beat,
    notes: strum(pick(midis, event.target), event.direction, event.velocity, decayFor(bpm, timbre, event.feel)),
  }));
}

function cycleHits(midis: number[], cycle: number[], steps: number, bpm: number, timbre: Timbre, step = 0.5): Hit[] {
  if (!cycle.length) return [];
  const decay = decayFor(bpm, timbre, "ring");
  return Array.from({ length: steps }, (_, i) => ({
    beat: i * step,
    notes: [
      {
        midi: cycle[i % cycle.length],
        delay: 0,
        velocity: i % cycle.length === 0 ? 0.9 : 0.72,
        decay,
      },
    ],
  }));
}

function once(patternId: string, midis: number[], bpm: number, timbre: Timbre): { hits: Hit[]; lengthBeats: number; meter: 3 | 4 } {
  const meter = patternById(patternId).meter;
  const safe = midis.length ? midis : [60];
  if (patternId === "folk") {
    return {
      meter,
      lengthBeats: 4,
      hits: strumHits(
        [
          { beat: 0, target: "all", direction: "down", velocity: 0.92, feel: "ring" },
          { beat: 1, target: "all", direction: "down", velocity: 0.74, feel: "medium" },
          { beat: 1.5, target: "upper", direction: "up", velocity: 0.52, feel: "medium" },
          { beat: 2, target: "upper", direction: "up", velocity: 0.6, feel: "medium" },
          { beat: 2.5, target: "all", direction: "down", velocity: 0.7, feel: "medium" },
          { beat: 3, target: "upper", direction: "up", velocity: 0.55, feel: "medium" },
        ],
        safe,
        bpm,
        timbre,
      ),
    };
  }
  if (patternId === "eighths") {
    const events = Array.from({ length: 8 }, (_, i) => ({
      beat: i * 0.5,
      target: (i % 2 === 0 ? "all" : "upper") as "all" | "upper",
      direction: (i % 2 === 0 ? "down" : "up") as "down" | "up",
      velocity: i % 2 === 0 ? 0.78 : 0.5,
      feel: "medium" as const,
    }));
    return { meter, lengthBeats: 4, hits: strumHits(events, safe, bpm, timbre) };
  }
  if (patternId === "shuffle") {
    const beats = [0, 2 / 3, 1, 1 + 2 / 3, 2, 2 + 2 / 3, 3, 3 + 2 / 3];
    return {
      meter,
      lengthBeats: 4,
      hits: strumHits(
        beats.map((beat, i) => ({
          beat,
          target: (i % 2 === 0 ? "all" : "upper") as "all" | "upper",
          direction: (i % 2 === 0 ? "down" : "up") as "down" | "up",
          velocity: i % 2 === 0 ? 0.84 : 0.46,
          feel: "short" as const,
        })),
        safe,
        bpm,
        timbre,
      ),
    };
  }
  if (patternId === "downs") {
    return {
      meter,
      lengthBeats: 4,
      hits: strumHits(
        [0, 1, 2, 3].map((beat, i) => ({
          beat,
          target: "all" as const,
          direction: "down" as const,
          velocity: i % 2 === 0 ? 0.88 : 0.7,
          feel: "medium" as const,
        })),
        safe,
        bpm,
        timbre,
      ),
    };
  }
  if (patternId === "pulse") {
    return {
      meter,
      lengthBeats: 4,
      hits: strumHits(
        [0, 1, 2, 3].map((beat, i) => ({
          beat,
          target: "all" as const,
          direction: "down" as const,
          velocity: i % 2 === 0 ? 0.84 : 0.58,
          feel: "short" as const,
        })),
        safe,
        bpm,
        timbre,
      ),
    };
  }
  if (patternId === "block") {
    return {
      meter,
      lengthBeats: 4,
      hits: strumHits([{ beat: 0, target: "all", direction: "block", velocity: 0.9, feel: "ring" }], safe, bpm, timbre),
    };
  }
  if (patternId === "ballad") {
    return {
      meter,
      lengthBeats: 4,
      hits: strumHits(
        [
          { beat: 0, target: "bass", direction: "block", velocity: 0.95, feel: "ring" },
          { beat: 1, target: "upper", direction: "block", velocity: 0.7, feel: "ring" },
          { beat: 2, target: "bass", direction: "block", velocity: 0.8, feel: "ring" },
          { beat: 3, target: "upper", direction: "block", velocity: 0.66, feel: "ring" },
        ],
        safe,
        bpm,
        timbre,
      ),
    };
  }
  if (patternId === "waltz") {
    return {
      meter: 3,
      lengthBeats: 3,
      hits: strumHits(
        [
          { beat: 0, target: "all", direction: "down", velocity: 0.9, feel: "ring" },
          { beat: 1, target: "upper", direction: "block", velocity: 0.58, feel: "medium" },
          { beat: 2, target: "upper", direction: "block", velocity: 0.58, feel: "medium" },
        ],
        safe,
        bpm,
        timbre,
      ),
    };
  }
  if (patternId === "compound") {
    return {
      meter: 3,
      lengthBeats: 3,
      hits: strumHits(
        [
          { beat: 0, target: "all", direction: "down", velocity: 0.9, feel: "ring" },
          { beat: 1, target: "upper", direction: "up", velocity: 0.48, feel: "short" },
          { beat: 1.5, target: "all", direction: "down", velocity: 0.78, feel: "medium" },
          { beat: 2.5, target: "upper", direction: "up", velocity: 0.46, feel: "short" },
        ],
        safe,
        bpm,
        timbre,
      ),
    };
  }
  if (patternId === "offbeat") {
    return {
      meter,
      lengthBeats: 4,
      hits: strumHits(
        [0.5, 1.5, 2.5, 3.5].map((beat) => ({
          beat,
          target: "upper" as const,
          direction: "block" as const,
          velocity: 0.72,
          feel: "short" as const,
        })),
        safe,
        bpm,
        timbre,
      ),
    };
  }
  if (patternId === "arp") {
    return { meter, lengthBeats: 4, hits: cycleHits(safe, safe, 8, bpm, timbre) };
  }
  if (patternId === "rolling") {
    const down = safe.length > 1 ? [...safe].slice(0, -1).reverse() : [];
    const cycle = [...safe, ...down];
    return { meter, lengthBeats: 4, hits: cycleHits(safe, cycle, 8, bpm, timbre) };
  }
  if (patternId === "travis") {
    const bass = safe[0];
    const upper = safe.slice(1);
    const u = (i: number) => upper[i % Math.max(1, upper.length)] ?? bass;
    const seq = [bass, u(0), u(1), u(2), bass, u(2), u(1), u(0)];
    return { meter, lengthBeats: 4, hits: cycleHits(safe, seq, 8, bpm, timbre) };
  }
  const pool = safe.slice(1);
  const low = pool[0] ?? safe[0];
  const high = pool[pool.length - 1] ?? safe[0];
  const mid = pool[Math.min(1, Math.max(0, pool.length - 1))] ?? low;
  return { meter, lengthBeats: 4, hits: cycleHits(safe, [low, high, mid, high], 8, bpm, timbre) };
}

function addClicks(hits: Hit[], lengthBeats: number, enabled: boolean): Hit[] {
  const out = hits.map((h) => ({ ...h, notes: h.notes.map((n) => ({ ...n })) }));
  if (!enabled) return out.sort((a, b) => a.beat - b.beat);
  for (let beat = 0; beat < lengthBeats; beat++) {
    const existing = out.find((h) => Math.abs(h.beat - beat) < 0.001);
    if (existing) existing.click = true;
    else out.push({ beat, notes: [], click: true });
  }
  return out.sort((a, b) => a.beat - b.beat);
}

export function durationBeats(patternId: string, bars: Bars): number {
  return patternById(patternId).meter * bars;
}

export function buildHits(
  patternId: string,
  midis: number[],
  opts: { bpm: number; timbre: Timbre; bars: Bars; metronome: boolean },
): Built {
  const base = once(patternId, midis, opts.bpm, opts.timbre);
  let hits = base.hits;
  let lengthBeats = base.lengthBeats;
  if (opts.bars === 2) {
    const shift = lengthBeats;
    hits = [
      ...hits,
      ...hits.map((h) => ({
        ...h,
        beat: h.beat + shift,
        notes: h.notes.map((n) => ({ ...n })),
      })),
    ];
    lengthBeats = shift * 2;
  } else if (opts.bars === 0.5) {
    const half = lengthBeats / 2;
    hits = hits.filter((h) => h.beat < half - 0.001).map((h) => ({ ...h, notes: h.notes.map((n) => ({ ...n })) }));
    lengthBeats = half;
  }
  return { hits: addClicks(hits, lengthBeats, opts.metronome), lengthBeats, meter: base.meter };
}

export function countInHits(meter: 3 | 4): Hit[] {
  return Array.from({ length: meter }, (_, beat) => ({ beat, notes: [], click: true }));
}

export type DrumHit = { beat: number; voice: DrumVoice; velocity: number };

const DRUM_BARS: Record<Exclude<DrumId, "off">, { bar: number; hits: DrumHit[] }> = {
  ballad: {
    bar: 4,
    hits: [
      { beat: 0, voice: "kick", velocity: 0.7 },
      { beat: 2, voice: "snare", velocity: 0.42 },
      { beat: 0, voice: "hat", velocity: 0.2 },
      { beat: 1, voice: "hat", velocity: 0.16 },
      { beat: 2, voice: "hat", velocity: 0.2 },
      { beat: 3, voice: "hat", velocity: 0.16 },
    ],
  },
  pop: {
    bar: 4,
    hits: [
      { beat: 0, voice: "kick", velocity: 0.86 },
      { beat: 2.5, voice: "kick", velocity: 0.5 },
      { beat: 1, voice: "snare", velocity: 0.68 },
      { beat: 3, voice: "snare", velocity: 0.68 },
      ...[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5].map((beat) => ({ beat, voice: "hat" as const, velocity: beat % 1 === 0 ? 0.32 : 0.2 })),
    ],
  },
  clap: {
    bar: 4,
    hits: [
      { beat: 0, voice: "kick", velocity: 0.55 },
      { beat: 1, voice: "clap", velocity: 0.74 },
      { beat: 3, voice: "clap", velocity: 0.74 },
      { beat: 0.5, voice: "hat", velocity: 0.18 },
      { beat: 1.5, voice: "hat", velocity: 0.18 },
      { beat: 2.5, voice: "hat", velocity: 0.18 },
      { beat: 3.5, voice: "hat", velocity: 0.18 },
    ],
  },
  shaker: {
    bar: 4,
    hits: [
      { beat: 0, voice: "kick", velocity: 0.4 },
      ...[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5].map((beat) => ({ beat, voice: "hat" as const, velocity: beat % 1 === 0 ? 0.38 : 0.22 })),
    ],
  },
  shuffle: {
    bar: 4,
    hits: [
      { beat: 0, voice: "kick", velocity: 0.8 },
      { beat: 2, voice: "kick", velocity: 0.62 },
      { beat: 1, voice: "snare", velocity: 0.66 },
      { beat: 3, voice: "snare", velocity: 0.66 },
      ...[0, 2 / 3, 1, 1 + 2 / 3, 2, 2 + 2 / 3, 3, 3 + 2 / 3].map((beat) => ({
        beat,
        voice: "hat" as const,
        velocity: Math.abs(beat - Math.round(beat)) < 0.05 ? 0.34 : 0.18,
      })),
    ],
  },
  waltz: {
    bar: 3,
    hits: [
      { beat: 0, voice: "kick", velocity: 0.78 },
      { beat: 1, voice: "hat", velocity: 0.32 },
      { beat: 2, voice: "hat", velocity: 0.26 },
    ],
  },
  compound: {
    bar: 3,
    hits: [
      { beat: 0, voice: "kick", velocity: 0.8 },
      { beat: 1.5, voice: "snare", velocity: 0.6 },
      ...[0, 0.5, 1, 1.5, 2, 2.5].map((beat) => ({ beat, voice: "hat" as const, velocity: 0.22 })),
    ],
  },
};

export function drumEvents(id: DrumId, lengthBeats: number): DrumHit[] {
  if (id === "off" || lengthBeats <= 0) return [];
  const pattern = DRUM_BARS[id];
  const out: DrumHit[] = [];
  for (let origin = 0; origin < lengthBeats - 0.001; origin += pattern.bar) {
    for (const hit of pattern.hits) {
      const beat = origin + hit.beat;
      if (beat < lengthBeats - 0.001) out.push({ ...hit, beat });
    }
  }
  return out;
}
