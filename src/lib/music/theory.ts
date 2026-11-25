export type ScaleId =
  | "major"
  | "natural-minor"
  | "harmonic-minor"
  | "melodic-minor"
  | "dorian"
  | "phrygian"
  | "lydian"
  | "mixolydian";

export type Quality =
  | "maj"
  | "min"
  | "dim"
  | "aug"
  | "dom7"
  | "maj7"
  | "min7"
  | "m7b5"
  | "dim7"
  | "sus2"
  | "sus4"
  | "add9";

export type QualityChoice = "auto" | Quality;

export type Spelling = "auto" | "sharp" | "flat";

export type Timbre = "guitar" | "nylon" | "piano" | "soft" | "organ" | "bass" | "strings";

export type Bars = 0.5 | 1 | 2;

export type Intensity = "soft" | "medium" | "loud";

export type DrumId = "off" | "ballad" | "pop" | "clap" | "shaker" | "shuffle" | "waltz" | "compound";

export type DrumVoice = "kick" | "snare" | "hat" | "clap";

export type MelodySound = "piano" | "soft" | "lead" | "flute" | "bit";

export type MelodyNote = {
  id: string;
  beat: number;
  midi: number;
  length: number;
};

export type Slot = {
  id: string;
  degree: number;
  accidental: -1 | 0 | 1;
  quality: QualityChoice;
  inversion: number;
  bars: Bars;
};

export type ScaleDef = {
  id: ScaleId;
  name: string;
  hint: string;
  intervals: number[];
};

const LETTERS = ["C", "D", "E", "F", "G", "A", "B"] as const;
const NATURAL_PC = [0, 2, 4, 5, 7, 9, 11];
const MAJOR_SCALE = [0, 2, 4, 5, 7, 9, 11];

export const SCALES: ScaleDef[] = [
  { id: "major", name: "Major", hint: "Ionian, bright and open", intervals: [0, 2, 4, 5, 7, 9, 11] },
  { id: "natural-minor", name: "Natural minor", hint: "Aeolian, the pop minor", intervals: [0, 2, 3, 5, 7, 8, 10] },
  { id: "harmonic-minor", name: "Harmonic minor", hint: "Raised 7, major V", intervals: [0, 2, 3, 5, 7, 8, 11] },
  { id: "melodic-minor", name: "Melodic minor", hint: "Jazz minor, raised 6 and 7", intervals: [0, 2, 3, 5, 7, 9, 11] },
  { id: "dorian", name: "Dorian", hint: "Minor with a bright 6", intervals: [0, 2, 3, 5, 7, 9, 10] },
  { id: "phrygian", name: "Phrygian", hint: "Flat 2, Spanish color", intervals: [0, 1, 3, 5, 7, 8, 10] },
  { id: "lydian", name: "Lydian", hint: "Raised 4, floating", intervals: [0, 2, 4, 6, 7, 9, 11] },
  { id: "mixolydian", name: "Mixolydian", hint: "Flat 7, rock and blues", intervals: [0, 2, 4, 5, 7, 9, 10] },
];

const SCALE_BY_ID: Record<ScaleId, ScaleDef> = Object.fromEntries(SCALES.map((s) => [s.id, s])) as Record<
  ScaleId,
  ScaleDef
>;

const PARENT_SHIFT: Record<ScaleId, number> = {
  major: 0,
  lydian: -5,
  mixolydian: -7,
  dorian: -2,
  phrygian: -4,
  "natural-minor": 3,
  "harmonic-minor": 3,
  "melodic-minor": 3,
};

const FLAT_PARENTS = new Set([5, 10, 3, 8, 1, 6]);

type Step = { letter: number; semi: number };

const SHAPES: Record<Quality, Step[]> = {
  maj: [
    { letter: 0, semi: 0 },
    { letter: 2, semi: 4 },
    { letter: 4, semi: 7 },
  ],
  min: [
    { letter: 0, semi: 0 },
    { letter: 2, semi: 3 },
    { letter: 4, semi: 7 },
  ],
  dim: [
    { letter: 0, semi: 0 },
    { letter: 2, semi: 3 },
    { letter: 4, semi: 6 },
  ],
  aug: [
    { letter: 0, semi: 0 },
    { letter: 2, semi: 4 },
    { letter: 4, semi: 8 },
  ],
  dom7: [
    { letter: 0, semi: 0 },
    { letter: 2, semi: 4 },
    { letter: 4, semi: 7 },
    { letter: 6, semi: 10 },
  ],
  maj7: [
    { letter: 0, semi: 0 },
    { letter: 2, semi: 4 },
    { letter: 4, semi: 7 },
    { letter: 6, semi: 11 },
  ],
  min7: [
    { letter: 0, semi: 0 },
    { letter: 2, semi: 3 },
    { letter: 4, semi: 7 },
    { letter: 6, semi: 10 },
  ],
  m7b5: [
    { letter: 0, semi: 0 },
    { letter: 2, semi: 3 },
    { letter: 4, semi: 6 },
    { letter: 6, semi: 10 },
  ],
  dim7: [
    { letter: 0, semi: 0 },
    { letter: 2, semi: 3 },
    { letter: 4, semi: 6 },
    { letter: 6, semi: 9 },
  ],
  sus2: [
    { letter: 0, semi: 0 },
    { letter: 1, semi: 2 },
    { letter: 4, semi: 7 },
  ],
  sus4: [
    { letter: 0, semi: 0 },
    { letter: 3, semi: 5 },
    { letter: 4, semi: 7 },
  ],
  add9: [
    { letter: 0, semi: 0 },
    { letter: 2, semi: 4 },
    { letter: 4, semi: 7 },
    { letter: 1, semi: 14 },
  ],
};

export const QUALITY_OPTIONS: { id: QualityChoice; label: string }[] = [
  { id: "auto", label: "Auto" },
  { id: "maj", label: "Maj" },
  { id: "min", label: "min" },
  { id: "dom7", label: "7" },
  { id: "maj7", label: "maj7" },
  { id: "min7", label: "m7" },
  { id: "m7b5", label: "m7♭5" },
  { id: "dim", label: "dim" },
  { id: "dim7", label: "dim7" },
  { id: "aug", label: "aug" },
  { id: "sus2", label: "sus2" },
  { id: "sus4", label: "sus4" },
  { id: "add9", label: "add9" },
];

export type Preset = {
  id: string;
  name: string;
  group: string;
  scale?: ScaleId;
  extensions?: boolean;
  slots: Omit<Slot, "id">[];
};

function bare(degree: number, quality: QualityChoice = "auto"): Omit<Slot, "id"> {
  return { degree, accidental: 0, quality, inversion: 0, bars: 1 };
}

export const PRESETS: Preset[] = [
  {
    id: "pop",
    name: "I–V–vi–IV",
    group: "Pop",
    slots: [0, 4, 5, 3].map((d) => bare(d)),
  },
  {
    id: "axis",
    name: "vi–IV–I–V",
    group: "Pop",
    slots: [5, 3, 0, 4].map((d) => bare(d)),
  },
  {
    id: "fifties",
    name: "I–vi–IV–V",
    group: "Pop",
    slots: [0, 5, 3, 4].map((d) => bare(d)),
  },
  {
    id: "canon",
    name: "Canon",
    group: "Pop",
    slots: [0, 4, 5, 2, 3, 0, 3, 4].map((d) => bare(d)),
  },
  {
    id: "one-four-five",
    name: "I–IV–V",
    group: "Pop",
    slots: [0, 3, 4, 0].map((d) => bare(d)),
  },
  {
    id: "two-five",
    name: "ii–V–I",
    group: "Jazz",
    scale: "major",
    extensions: true,
    slots: [bare(1, "min7"), bare(4, "dom7"), bare(0, "maj7"), bare(0, "maj7")],
  },
  {
    id: "turnaround",
    name: "I–VI–ii–V",
    group: "Jazz",
    scale: "major",
    extensions: true,
    slots: [bare(0, "maj7"), bare(5, "dom7"), bare(1, "min7"), bare(4, "dom7")],
  },
  {
    id: "blues",
    name: "12-bar blues",
    group: "Blues",
    scale: "mixolydian",
    slots: [0, 0, 0, 0, 3, 3, 0, 0, 4, 3, 0, 4].map((d) => bare(d, "dom7")),
  },
  {
    id: "andalusian",
    name: "Andalusian",
    group: "Minor",
    scale: "harmonic-minor",
    slots: [bare(0), { ...bare(6), accidental: -1 }, bare(5), bare(4)],
  },
  {
    id: "minor-pop",
    name: "i–♭VI–♭III–♭VII",
    group: "Minor",
    scale: "natural-minor",
    slots: [0, 5, 2, 6].map((d) => bare(d)),
  },
  {
    id: "aeolian",
    name: "i–♭VII–♭VI",
    group: "Minor",
    scale: "natural-minor",
    slots: [0, 6, 5, 6].map((d) => bare(d)),
  },
  {
    id: "creep",
    name: "I–III–IV–iv",
    group: "Color",
    scale: "major",
    slots: [bare(0), bare(2, "maj"), bare(3), bare(3, "min")],
  },
  {
    id: "mixo",
    name: "I–♭VII–IV",
    group: "Color",
    scale: "mixolydian",
    slots: [0, 6, 3, 0].map((d) => bare(d)),
  },
  {
    id: "dorian",
    name: "i–IV vamp",
    group: "Color",
    scale: "dorian",
    slots: [0, 3, 0, 3].map((d) => bare(d)),
  },
  {
    id: "phrygian",
    name: "i–♭II",
    group: "Color",
    scale: "phrygian",
    slots: [0, 1, 0, 1].map((d) => bare(d)),
  },
];

export const PRESET_GROUPS = ["Pop", "Jazz", "Blues", "Minor", "Color"] as const;

let seq = 0;
export function uid(): string {
  seq += 1;
  return `c${seq.toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

export function autoFlats(rootPc: number, scaleId: ScaleId): boolean {
  const parent = (rootPc + PARENT_SHIFT[scaleId] + 120) % 12;
  return FLAT_PARENTS.has(parent);
}

export function prefersFlats(rootPc: number, scaleId: ScaleId, spelling: Spelling): boolean {
  if (spelling === "flat") return true;
  if (spelling === "sharp") return false;
  return autoFlats(rootPc, scaleId);
}

function suffix(delta: number): string {
  if (delta === 0) return "";
  if (delta === 1) return "#";
  if (delta === 2) return "##";
  if (delta === -1) return "b";
  if (delta === -2) return "bb";
  if (delta > 2) return "#".repeat(delta);
  return "b".repeat(-delta);
}

export function pretty(name: string): string {
  return name.replaceAll("##", "𝄪").replaceAll("#", "♯").replaceAll("bb", "𝄫").replaceAll("b", "♭");
}

export function nameToPc(name: string): number {
  const letter = LETTERS.indexOf((name[0] ?? "C") as (typeof LETTERS)[number]);
  const acc = name.slice(1);
  const delta = acc === "#" ? 1 : acc === "##" ? 2 : acc === "b" ? -1 : acc === "bb" ? -2 : 0;
  return (NATURAL_PC[letter] + delta + 120) % 12;
}

export function spellRoot(pc: number, flats: boolean): string {
  const sharp = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const flat = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
  return flats ? flat[((pc % 12) + 12) % 12] : sharp[((pc % 12) + 12) % 12];
}

export function spellScale(rootPc: number, scaleId: ScaleId, flats: boolean): string[] {
  const intervals = SCALE_BY_ID[scaleId].intervals;
  const options: { letterIndex: number; delta: number }[] = [];
  NATURAL_PC.forEach((pc, letterIndex) => {
    let delta = (rootPc - pc + 12) % 12;
    if (delta > 6) delta -= 12;
    if (Math.abs(delta) <= 2) options.push({ letterIndex, delta });
  });
  const preferred = options.filter((o) => (flats ? o.delta <= 0 : o.delta >= 0));
  const pool = (preferred.length ? preferred : options)
    .slice()
    .sort((a, b) => Math.abs(a.delta) - Math.abs(b.delta));
  const start = pool[0]?.letterIndex ?? 0;
  return intervals.map((interval, degree) => {
    const pc = (rootPc + interval) % 12;
    const letterIndex = (start + degree) % 7;
    const natural = NATURAL_PC[letterIndex];
    let delta = (pc - natural + 12) % 12;
    if (delta > 6) delta -= 12;
    return LETTERS[letterIndex] + suffix(delta);
  });
}

function alterSpelling(name: string, accidental: -1 | 0 | 1): string {
  if (accidental === 0) return name;
  const letter = name[0] ?? "C";
  const acc = name.slice(1);
  const cur = acc === "#" ? 1 : acc === "##" ? 2 : acc === "b" ? -1 : acc === "bb" ? -2 : 0;
  return letter + suffix(cur + accidental);
}

export function diatonicQuality(intervals: number[], degree: number, sevenths: boolean): Quality {
  const root = intervals[degree % intervals.length];
  const third = intervals[(degree + 2) % intervals.length];
  const fifth = intervals[(degree + 4) % intervals.length];
  const seventh = intervals[(degree + 6) % intervals.length];
  const i3 = (third - root + 12) % 12;
  const i5 = (fifth - root + 12) % 12;
  const i7 = (seventh - root + 12) % 12;
  let triad: "maj" | "min" | "dim" | "aug";
  if (i3 === 3 && i5 === 6) triad = "dim";
  else if (i3 === 3) triad = "min";
  else if (i3 === 4 && i5 >= 8) triad = "aug";
  else triad = "maj";
  if (!sevenths) return triad;
  if (triad === "maj" && i7 === 11) return "maj7";
  if (triad === "maj" && i7 === 10) return "dom7";
  if (triad === "min" && i7 === 10) return "min7";
  if (triad === "dim" && i7 === 10) return "m7b5";
  if (triad === "dim" && i7 === 9) return "dim7";
  if (triad === "aug") return "maj7";
  return triad;
}

function resolveQuality(slot: Slot, intervals: number[], extensions: boolean): Quality {
  if (slot.quality !== "auto") return slot.quality;
  if (slot.accidental < 0) return extensions ? "maj7" : "maj";
  if (slot.accidental > 0) return extensions ? "min7" : "min";
  return diatonicQuality(intervals, slot.degree, extensions);
}

function spellChord(rootName: string, quality: Quality): { name: string; pc: number }[] {
  const rootLetter = Math.max(0, LETTERS.indexOf((rootName[0] ?? "C") as (typeof LETTERS)[number]));
  const rootPc = nameToPc(rootName);
  return SHAPES[quality].map((step) => {
    const letterIndex = (rootLetter + step.letter) % 7;
    const natural = NATURAL_PC[letterIndex];
    const target = (rootPc + (step.semi % 12)) % 12;
    let delta = (target - natural + 12) % 12;
    if (delta > 6) delta -= 12;
    return { name: LETTERS[letterIndex] + suffix(delta), pc: target };
  });
}

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII"];

function alterationPrefix(intervals: number[], degree: number, accidental: number): string {
  const actual = (intervals[degree] + accidental + 12) % 12;
  const expected = MAJOR_SCALE[degree];
  let delta = (actual - expected + 12) % 12;
  if (delta > 6) delta -= 12;
  if (delta <= -2) return "𝄫";
  if (delta === -1) return "♭";
  if (delta === 1) return "♯";
  if (delta >= 2) return "𝄪";
  return "";
}

function romanFor(degree: number, quality: Quality, prefix: string): string {
  const minorLike =
    quality === "min" || quality === "dim" || quality === "min7" || quality === "m7b5" || quality === "dim7";
  let body = minorLike ? ROMAN[degree].toLowerCase() : ROMAN[degree];
  if (quality === "dim" || quality === "dim7") body += "°";
  else if (quality === "m7b5") body += "ø";
  else if (quality === "aug") body += "+";
  if (quality === "dom7") body += "7";
  else if (quality === "maj7") body += "Δ";
  else if (quality === "min7" || quality === "dim7") body += "7";
  else if (quality === "sus2") body += "sus2";
  else if (quality === "sus4") body += "sus4";
  else if (quality === "add9") body += "add9";
  return prefix + body;
}

function symbolFor(root: string, quality: Quality, bass?: string): string {
  const head =
    quality === "maj"
      ? root
      : quality === "min"
        ? `${root}m`
        : quality === "dim"
          ? `${root}dim`
          : quality === "aug"
            ? `${root}aug`
            : quality === "dom7"
              ? `${root}7`
              : quality === "maj7"
                ? `${root}maj7`
                : quality === "min7"
                  ? `${root}m7`
                  : quality === "m7b5"
                    ? `${root}m7b5`
                    : quality === "dim7"
                      ? `${root}dim7`
                      : quality === "sus2"
                        ? `${root}sus2`
                        : quality === "sus4"
                          ? `${root}sus4`
                          : `${root}add9`;
  return bass && bass !== root ? `${head}/${bass}` : head;
}

function placeNear(pc: number, center: number): number {
  const pitch = ((pc % 12) + 12) % 12;
  const base = center - (center % 12) + pitch;
  const candidates = [base - 12, base, base + 12];
  candidates.sort((a, b) => Math.abs(a - center) - Math.abs(b - center));
  return candidates[0];
}

export function voiceMidis(pcs: number[], bassPc: number, timbre: Timbre): number[] {
  const unique = [...new Set(pcs.map((pc) => ((pc % 12) + 12) % 12))];
  if (!unique.length) return [];
  if (timbre === "guitar" || timbre === "nylon") {
    const bass = placeNear(bassPc, timbre === "nylon" ? 48 : 45);
    const notes = [bass];
    const span = timbre === "nylon" ? 22 : 28;
    const cap = timbre === "nylon" ? 5 : 6;
    for (let midi = bass + 1; midi <= bass + span && notes.length < cap; midi++) {
      if (unique.includes(midi % 12)) notes.push(midi);
    }
    return notes;
  }
  if (timbre === "bass") {
    const root = placeNear(bassPc, 40);
    const notes = [root];
    for (const pc of unique) {
      if (pc === root % 12 || notes.length >= 3) continue;
      const tone = placeNear(pc, root + 12);
      if (tone - root > 2 && tone - root < 19) notes.push(tone);
    }
    if (notes.length === 1) notes.push(root + 12);
    return notes;
  }
  if (timbre === "organ" || timbre === "strings") {
    const bass = placeNear(bassPc, 50);
    const notes = [bass];
    for (let midi = bass + 3; midi <= bass + 19 && notes.length < 4; midi++) {
      if (unique.includes(midi % 12)) notes.push(midi);
    }
    return notes;
  }
  const bass = placeNear(bassPc, 40);
  const upper: number[] = [];
  for (let midi = 60; midi < 72; midi++) {
    if (unique.includes(midi % 12)) upper.push(midi);
  }
  return [bass, ...upper.filter((n) => n - bass > 3)];
}

export type ResolvedChord = {
  id: string;
  roman: string;
  symbol: string;
  noteNames: string[];
  rootPc: number;
  bassPc: number;
  pcs: number[];
  midis: number[];
  quality: Quality;
  degree: number;
  bars: Bars;
};

export type TheoryContext = {
  rootPc: number;
  scaleId: ScaleId;
  spelling: Spelling;
  extensions: boolean;
  timbre: Timbre;
};

export function scalePcs(rootPc: number, scaleId: ScaleId): number[] {
  return SCALE_BY_ID[scaleId].intervals.map((i) => (rootPc + i) % 12);
}

export function keyTitle(rootPc: number, scaleId: ScaleId, spelling: Spelling): string {
  const flats = prefersFlats(rootPc, scaleId, spelling);
  return `${pretty(spellRoot(rootPc, flats))} ${SCALE_BY_ID[scaleId].name}`;
}

export function resolveSlot(slot: Slot, ctx: TheoryContext): ResolvedChord {
  const scale = SCALE_BY_ID[ctx.scaleId];
  const flats = prefersFlats(ctx.rootPc, ctx.scaleId, ctx.spelling);
  const names = spellScale(ctx.rootPc, ctx.scaleId, flats);
  const degree = ((slot.degree % 7) + 7) % 7;
  const rootName = alterSpelling(names[degree] ?? "C", slot.accidental);
  const quality = resolveQuality({ ...slot, degree }, scale.intervals, ctx.extensions);
  const tones = spellChord(rootName, quality);
  const inv = Math.max(0, Math.min(slot.inversion, tones.length - 1));
  const bass = tones[inv] ?? tones[0];
  const prefix = alterationPrefix(scale.intervals, degree, slot.accidental);
  const pcs = tones.map((t) => t.pc);
  return {
    id: slot.id,
    roman: romanFor(degree, quality, prefix),
    symbol: pretty(symbolFor(rootName, quality, inv > 0 ? bass?.name : undefined)),
    noteNames: tones.map((t) => pretty(t.name)),
    rootPc: tones[0]?.pc ?? 0,
    bassPc: bass?.pc ?? 0,
    pcs,
    midis: voiceMidis(pcs, bass?.pc ?? 0, ctx.timbre),
    quality,
    degree,
    bars: slot.bars,
  };
}

export function resolveAll(slots: Slot[], ctx: TheoryContext): ResolvedChord[] {
  return slots.map((slot) => resolveSlot(slot, ctx));
}

export function slotForPitch(rootPc: number, scaleId: ScaleId, targetPc: number, flats: boolean): {
  degree: number;
  accidental: -1 | 0 | 1;
} {
  const intervals = SCALE_BY_ID[scaleId].intervals;
  const rel = (targetPc - rootPc + 12) % 12;
  for (let degree = 0; degree < intervals.length; degree++) {
    if (intervals[degree] === rel) return { degree, accidental: 0 };
  }
  const found: { degree: number; accidental: -1 | 0 | 1 }[] = [];
  for (let degree = 0; degree < intervals.length; degree++) {
    if ((intervals[degree] + 1) % 12 === rel) found.push({ degree, accidental: 1 });
    if ((intervals[degree] + 11) % 12 === rel) found.push({ degree, accidental: -1 });
  }
  if (!found.length) return { degree: 0, accidental: 0 };
  const preferred = found.find((item) => (flats ? item.accidental < 0 : item.accidental > 0));
  return preferred ?? found[0];
}

export function rootChoices(flats: boolean): { pc: number; label: string }[] {
  return Array.from({ length: 12 }, (_, pc) => ({ pc, label: pretty(spellRoot(pc, flats)) }));
}
