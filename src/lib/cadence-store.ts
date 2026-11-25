import { create } from "zustand";
import {
  PRESETS,
  SCALES,
  prefersFlats,
  resolveSlot,
  slotForPitch,
  uid,
  type Bars,
  type DrumId,
  type Intensity,
  type MelodyNote,
  type MelodySound,
  type QualityChoice,
  type ScaleId,
  type Slot,
  type Spelling,
  type Timbre,
} from "./music/theory";
import { patternById } from "./music/patterns";

const STORAGE_KEY = "cadence.v2";
const LEGACY_KEY = "cadence.v1";
const SCALE_IDS = new Set(SCALES.map((scale) => scale.id));
const TIMBRES = new Set<Timbre>(["guitar", "nylon", "piano", "soft", "organ", "bass", "strings"]);
const DRUMS = new Set<DrumId>(["off", "ballad", "pop", "clap", "shaker", "shuffle", "waltz", "compound"]);
const MELODY_SOUNDS = new Set<MelodySound>(["piano", "soft", "lead", "flute", "bit"]);
const QUALITIES = new Set<QualityChoice>([
  "auto",
  "maj",
  "min",
  "dim",
  "aug",
  "dom7",
  "maj7",
  "min7",
  "m7b5",
  "dim7",
  "sus2",
  "sus4",
  "add9",
]);
const SECTION_NAMES = ["Verse", "Chorus", "Pre-chorus", "Bridge", "Tag"];

export type Section = {
  id: string;
  name: string;
  lyric: string;
  patternId: string;
  timbre: Timbre;
  intensity: Intensity;
  autoBass: boolean;
  drumId: DrumId;
  drumsOn: boolean;
  drumVolume: number;
  melody: MelodyNote[];
  melodySound: MelodySound;
  melodyVolume: number;
  melodyMute: boolean;
  melodyStep: 0.25 | 0.5;
  slots: Slot[];
  selectedId: string;
  activePreset: string | null;
};

export type Song = {
  id: string;
  title: string;
  rootPc: number;
  scaleId: ScaleId;
  spelling: Spelling;
  extensions: boolean;
  bpm: number;
  timbre: Timbre;
  sections: Section[];
  activeSectionId: string;
};

export type CadenceState = {
  songs: Song[];
  activeSongId: string;
  volume: number;
  loop: boolean;
  playForm: boolean;
  metronome: boolean;
  countIn: boolean;
  hydrated: boolean;
  renameSong: (title: string) => void;
  selectSong: (id: string) => void;
  newSong: () => void;
  duplicateSong: () => void;
  deleteSong: () => void;
  focusSection: (id: string) => void;
  renameSection: (name: string) => void;
  setLyric: (lyric: string) => void;
  addSection: () => void;
  duplicateSection: () => void;
  removeSection: () => void;
  moveSection: (dir: -1 | 1) => void;
  setRoot: (pc: number) => void;
  transpose: (delta: number) => void;
  setScale: (id: ScaleId) => void;
  setSpelling: (spelling: Spelling) => void;
  setExtensions: (on: boolean) => void;
  applyPreset: (id: string) => void;
  select: (id: string) => void;
  updateSelected: (patch: Partial<Omit<Slot, "id">>) => void;
  addChord: () => void;
  duplicateSelected: () => void;
  removeSelected: () => void;
  moveSelected: (dir: -1 | 1) => void;
  setPattern: (id: string) => void;
  setBpm: (bpm: number) => void;
  setVolume: (volume: number) => void;
  setTimbre: (timbre: Timbre) => void;
  setIntensity: (intensity: Intensity) => void;
  setAutoBass: (on: boolean) => void;
  setDrum: (id: DrumId) => void;
  setDrumsOn: (on: boolean) => void;
  setDrumVolume: (volume: number) => void;
  setMelodySound: (sound: MelodySound) => void;
  setMelodyVolume: (volume: number) => void;
  setMelodyMute: (on: boolean) => void;
  setMelodyStep: (step: 0.25 | 0.5) => void;
  setMelody: (notes: MelodyNote[]) => void;
  setLoop: (on: boolean) => void;
  setPlayForm: (on: boolean) => void;
  setMetronome: (on: boolean) => void;
  setCountIn: (on: boolean) => void;
  hydrate: () => void;
};

function clampBpm(bpm: number): number {
  return Math.min(200, Math.max(40, Math.round(bpm)));
}

function freshSlots(defs: Omit<Slot, "id">[]): Slot[] {
  return defs.map((slot) => ({ ...slot, id: uid() }));
}

function groove(section: Omit<Section, "timbre" | "intensity" | "autoBass" | "drumId" | "drumsOn" | "drumVolume" | "melody" | "melodySound" | "melodyVolume" | "melodyMute" | "melodyStep"> & Partial<Section>, timbre: Timbre): Section {
  return {
    intensity: "medium",
    autoBass: false,
    drumId: "off",
    drumsOn: false,
    drumVolume: 0.7,
    melody: [],
    melodySound: "piano",
    melodyVolume: 0.75,
    melodyMute: false,
    melodyStep: 0.5,
    ...section,
    timbre: section.timbre ?? timbre,
  };
}

function sectionFromPreset(name: string, presetId: string, patternId: string, timbre: Timbre = "guitar"): Section {
  const preset = PRESETS.find((item) => item.id === presetId) ?? PRESETS[0];
  const slots = freshSlots(preset.slots);
  return groove(
    {
      id: uid(),
      name,
      lyric: "",
      patternId,
      slots,
      selectedId: slots[0].id,
      activePreset: preset.id,
    },
    timbre,
  );
}

function makeSong(title: string): Song {
  const verse = sectionFromPreset("Verse", "pop", "folk");
  const chorus = sectionFromPreset("Chorus", "axis", "eighths");
  return {
    id: uid(),
    title,
    rootPc: 0,
    scaleId: "major",
    spelling: "auto",
    extensions: false,
    bpm: 92,
    timbre: "guitar",
    sections: [verse, chorus],
    activeSectionId: verse.id,
  };
}

function nextSectionName(sections: Section[]): string {
  const taken = new Set(sections.map((section) => section.name));
  return SECTION_NAMES.find((name) => !taken.has(name)) ?? `Section ${sections.length + 1}`;
}

function uniqueTitle(songs: Song[], base: string): string {
  const taken = new Set(songs.map((song) => song.title));
  if (!taken.has(base)) return base;
  let n = 2;
  while (taken.has(`${base} ${n}`)) n += 1;
  return `${base} ${n}`;
}

function sanitizeSlot(value: unknown): Slot | null {
  if (!value || typeof value !== "object") return null;
  const slot = value as Partial<Slot>;
  if (typeof slot.degree !== "number" || slot.degree < 0 || slot.degree > 6) return null;
  const accidental = slot.accidental === -1 || slot.accidental === 1 ? slot.accidental : 0;
  const inversion = typeof slot.inversion === "number" ? Math.max(0, Math.min(3, Math.round(slot.inversion))) : 0;
  const bars: Bars = slot.bars === 0.5 || slot.bars === 2 ? slot.bars : 1;
  const quality: QualityChoice = typeof slot.quality === "string" && QUALITIES.has(slot.quality as QualityChoice) ? (slot.quality as QualityChoice) : "auto";
  return { id: typeof slot.id === "string" ? slot.id : uid(), degree: slot.degree, accidental, quality, inversion, bars };
}

function sanitizeMelody(value: unknown): MelodyNote[] {
  if (!Array.isArray(value)) return [];
  const notes: MelodyNote[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const note = item as Partial<MelodyNote>;
    if (typeof note.midi !== "number" || typeof note.beat !== "number" || typeof note.length !== "number") continue;
    const midi = Math.max(48, Math.min(84, Math.round(note.midi)));
    const beat = Math.max(0, Math.round(note.beat * 4) / 4);
    const length = Math.max(0.25, Math.round(note.length * 4) / 4);
    notes.push({ id: typeof note.id === "string" ? note.id : uid(), beat, midi, length });
    if (notes.length >= 192) break;
  }
  return notes;
}

function sanitizeSection(value: unknown, fallbackTimbre: Timbre): Section | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Partial<Section>;
  const slots = Array.isArray(raw.slots) ? raw.slots.map(sanitizeSlot).filter((slot): slot is Slot => !!slot).slice(0, 32) : [];
  if (!slots.length) return null;
  const selectedId = slots.some((slot) => slot.id === raw.selectedId) ? String(raw.selectedId) : slots[0].id;
  const timbre = typeof raw.timbre === "string" && TIMBRES.has(raw.timbre as Timbre) ? (raw.timbre as Timbre) : fallbackTimbre;
  const drumId = typeof raw.drumId === "string" && DRUMS.has(raw.drumId as DrumId) ? (raw.drumId as DrumId) : "off";
  const intensity: Intensity = raw.intensity === "soft" || raw.intensity === "loud" ? raw.intensity : "medium";
  return groove(
    {
      id: typeof raw.id === "string" ? raw.id : uid(),
      name: typeof raw.name === "string" && raw.name.trim() ? raw.name.slice(0, 24) : "Verse",
      lyric: typeof raw.lyric === "string" ? raw.lyric.slice(0, 160) : "",
      patternId: typeof raw.patternId === "string" ? raw.patternId : "folk",
      slots,
      selectedId,
      activePreset: typeof raw.activePreset === "string" ? raw.activePreset : null,
      timbre,
      intensity,
      autoBass: Boolean(raw.autoBass),
      drumId,
      drumsOn: typeof raw.drumsOn === "boolean" ? raw.drumsOn : drumId !== "off",
      drumVolume: typeof raw.drumVolume === "number" ? Math.min(1, Math.max(0, raw.drumVolume)) : 0.7,
      melody: sanitizeMelody(raw.melody),
      melodySound: typeof raw.melodySound === "string" && MELODY_SOUNDS.has(raw.melodySound as MelodySound) ? (raw.melodySound as MelodySound) : "piano",
      melodyVolume: typeof raw.melodyVolume === "number" ? Math.min(1, Math.max(0, raw.melodyVolume)) : 0.75,
      melodyMute: Boolean(raw.melodyMute),
      melodyStep: raw.melodyStep === 0.25 ? 0.25 : 0.5,
    },
    timbre,
  );
}

function sanitizeSong(value: unknown): Song | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Partial<Song>;
  const fallback = typeof raw.timbre === "string" && TIMBRES.has(raw.timbre as Timbre) ? (raw.timbre as Timbre) : "guitar";
  const sections = Array.isArray(raw.sections) ? raw.sections.map((section) => sanitizeSection(section, fallback)).filter((section): section is Section => !!section).slice(0, 12) : [];
  if (!sections.length) return null;
  const activeSectionId = sections.some((section) => section.id === raw.activeSectionId) ? String(raw.activeSectionId) : sections[0].id;
  const scaleId = typeof raw.scaleId === "string" && SCALE_IDS.has(raw.scaleId as ScaleId) ? (raw.scaleId as ScaleId) : "major";
  return {
    id: typeof raw.id === "string" ? raw.id : uid(),
    title: typeof raw.title === "string" ? raw.title.slice(0, 48) : "Untitled",
    rootPc: typeof raw.rootPc === "number" ? (Math.round(raw.rootPc) + 12) % 12 : 0,
    scaleId,
    spelling: raw.spelling === "sharp" || raw.spelling === "flat" ? raw.spelling : "auto",
    extensions: Boolean(raw.extensions),
    bpm: clampBpm(typeof raw.bpm === "number" ? raw.bpm : 92),
    timbre: typeof raw.timbre === "string" && TIMBRES.has(raw.timbre as Timbre) ? (raw.timbre as Timbre) : "guitar",
    sections,
    activeSectionId,
  };
}

function songFromLegacy(data: { slots?: unknown[]; selectedId?: string; patternId?: unknown; rootPc?: unknown; scaleId?: unknown; spelling?: unknown; extensions?: unknown; bpm?: unknown; timbre?: unknown; activePreset?: unknown }): Song | null {
  const slots = Array.isArray(data.slots) ? data.slots.map(sanitizeSlot).filter((slot): slot is Slot => !!slot) : [];
  if (!slots.length) return null;
  const section = groove(
    {
      id: uid(),
      name: "Verse",
      lyric: "",
      patternId: typeof data.patternId === "string" ? data.patternId : "folk",
      slots,
      selectedId: slots.some((slot) => slot.id === data.selectedId) ? String(data.selectedId) : slots[0].id,
      activePreset: typeof data.activePreset === "string" ? data.activePreset : null,
    },
    typeof data.timbre === "string" && TIMBRES.has(data.timbre as Timbre) ? (data.timbre as Timbre) : "guitar",
  );
  const scaleId = typeof data.scaleId === "string" && SCALE_IDS.has(data.scaleId as ScaleId) ? (data.scaleId as ScaleId) : "major";
  return {
    id: uid(),
    title: "Untitled",
    rootPc: typeof data.rootPc === "number" ? (Math.round(data.rootPc) + 12) % 12 : 0,
    scaleId,
    spelling: data.spelling === "sharp" || data.spelling === "flat" ? data.spelling : "auto",
    extensions: Boolean(data.extensions),
    bpm: clampBpm(typeof data.bpm === "number" ? data.bpm : 92),
    timbre: typeof data.timbre === "string" && TIMBRES.has(data.timbre as Timbre) ? (data.timbre as Timbre) : "guitar",
    sections: [section],
    activeSectionId: section.id,
  };
}

type Saved = {
  songs: Song[];
  activeSongId: string;
  volume: number;
  loop: boolean;
  playForm: boolean;
  metronome: boolean;
  countIn: boolean;
};

function readSaved(): Saved | null {
  if (typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw) as Partial<Saved>;
      const songs = Array.isArray(data.songs) ? data.songs.map(sanitizeSong).filter((song): song is Song => !!song).slice(0, 24) : [];
      if (songs.length) {
        return {
          songs,
          activeSongId: songs.some((song) => song.id === data.activeSongId) ? String(data.activeSongId) : songs[0].id,
          volume: typeof data.volume === "number" ? Math.min(1, Math.max(0, data.volume)) : 0.82,
          loop: data.loop !== false,
          playForm: Boolean(data.playForm),
          metronome: Boolean(data.metronome),
          countIn: Boolean(data.countIn),
        };
      }
    }
  } catch {
    /* fall through to the older board */
  }
  try {
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (!legacy) return null;
    const data = JSON.parse(legacy) as Parameters<typeof songFromLegacy>[0] & { volume?: unknown; loop?: unknown; metronome?: unknown; countIn?: unknown };
    const song = songFromLegacy(data);
    if (!song) return null;
    return {
      songs: [song],
      activeSongId: song.id,
      volume: typeof data.volume === "number" ? Math.min(1, Math.max(0, data.volume)) : 0.82,
      loop: data.loop !== false,
      playForm: false,
      metronome: Boolean(data.metronome),
      countIn: Boolean(data.countIn),
    };
  } catch {
    return null;
  }
}

const starter = makeSong("First song");

function currentSong(state: CadenceState): Song {
  return state.songs.find((song) => song.id === state.activeSongId) ?? state.songs[0];
}

function currentSection(song: Song): Section {
  return song.sections.find((section) => section.id === song.activeSectionId) ?? song.sections[0];
}

function writeSong(state: CadenceState, song: Song): Pick<CadenceState, "songs"> {
  return { songs: state.songs.map((item) => (item.id === song.id ? song : item)) };
}

function writeSection(song: Song, section: Section): Song {
  return {
    ...song,
    sections: song.sections.map((item) => (item.id === section.id ? section : item)),
  };
}

export const useCadence = create<CadenceState>((set, get) => ({
  songs: [starter],
  activeSongId: starter.id,
  volume: 0.82,
  loop: true,
  playForm: false,
  metronome: false,
  countIn: false,
  hydrated: false,
  renameSong: (title) => {
    const song = currentSong(get());
    set(writeSong(get(), { ...song, title: title.slice(0, 48) }));
  },
  selectSong: (id) => {
    if (!get().songs.some((song) => song.id === id)) return;
    set({ activeSongId: id });
  },
  newSong: () => {
    const song = makeSong(uniqueTitle(get().songs, "Untitled"));
    set({ songs: [...get().songs, song].slice(-24), activeSongId: song.id });
  },
  duplicateSong: () => {
    const song = currentSong(get());
    const sections = song.sections.map((section) => {
      const slots = section.slots.map((slot) => ({ ...slot, id: uid() }));
      return { ...section, id: uid(), slots, selectedId: slots[0].id };
    });
    const copy: Song = {
      ...song,
      id: uid(),
      title: uniqueTitle(get().songs, `${song.title.trim() || "Untitled"} copy`).slice(0, 48),
      sections,
      activeSectionId: sections[0].id,
    };
    set({ songs: [...get().songs, copy].slice(-24), activeSongId: copy.id });
  },
  deleteSong: () => {
    const { songs, activeSongId } = get();
    if (songs.length <= 1) return;
    const index = songs.findIndex((song) => song.id === activeSongId);
    const next = songs.filter((song) => song.id !== activeSongId);
    set({ songs: next, activeSongId: (next[Math.max(0, index - 1)] ?? next[0]).id });
  },
  focusSection: (id) => {
    const song = currentSong(get());
    if (!song.sections.some((section) => section.id === id)) return;
    set(writeSong(get(), { ...song, activeSectionId: id }));
  },
  renameSection: (name) => {
    const song = currentSong(get());
    const section = currentSection(song);
    set(writeSong(get(), writeSection(song, { ...section, name: name.slice(0, 24) })));
  },
  setLyric: (lyric) => {
    const song = currentSong(get());
    const section = currentSection(song);
    set(writeSong(get(), writeSection(song, { ...section, lyric: lyric.slice(0, 160) })));
  },
  addSection: () => {
    const song = currentSong(get());
    if (song.sections.length >= 12) return;
    const current = currentSection(song);
    const section = {
      ...sectionFromPreset(nextSectionName(song.sections), "pop", current.patternId, current.timbre),
      intensity: current.intensity,
      autoBass: current.autoBass,
      drumId: current.drumId,
      drumsOn: current.drumsOn,
      drumVolume: current.drumVolume,
      melodySound: current.melodySound,
      melodyVolume: current.melodyVolume,
      melodyStep: current.melodyStep,
    };
    const index = song.sections.findIndex((item) => item.id === song.activeSectionId);
    const sections = song.sections.slice();
    sections.splice(index + 1, 0, section);
    set(writeSong(get(), { ...song, sections, activeSectionId: section.id }));
  },
  duplicateSection: () => {
    const song = currentSong(get());
    if (song.sections.length >= 12) return;
    const section = currentSection(song);
    const index = song.sections.findIndex((item) => item.id === section.id);
    const slots = section.slots.map((slot) => ({ ...slot, id: uid() }));
    const copy: Section = {
      ...section,
      id: uid(),
      name: nextSectionName(song.sections),
      slots,
      selectedId: slots[Math.max(0, section.slots.findIndex((slot) => slot.id === section.selectedId))]?.id ?? slots[0].id,
      melody: section.melody.map((note) => ({ ...note, id: uid() })),
    };
    const sections = song.sections.slice();
    sections.splice(index + 1, 0, copy);
    set(writeSong(get(), { ...song, sections, activeSectionId: copy.id }));
  },
  removeSection: () => {
    const song = currentSong(get());
    if (song.sections.length <= 1) return;
    const index = song.sections.findIndex((section) => section.id === song.activeSectionId);
    const sections = song.sections.filter((section) => section.id !== song.activeSectionId);
    const next = sections[Math.max(0, index - 1)] ?? sections[0];
    set(writeSong(get(), { ...song, sections, activeSectionId: next.id }));
  },
  moveSection: (dir) => {
    const song = currentSong(get());
    const index = song.sections.findIndex((section) => section.id === song.activeSectionId);
    const target = index + dir;
    if (index < 0 || target < 0 || target >= song.sections.length) return;
    const sections = song.sections.slice();
    const [item] = sections.splice(index, 1);
    sections.splice(target, 0, item);
    set(writeSong(get(), { ...song, sections }));
  },
  setRoot: (pc) => {
    const song = currentSong(get());
    set(writeSong(get(), { ...song, rootPc: (pc + 12) % 12 }));
  },
  transpose: (delta) => {
    const song = currentSong(get());
    set(writeSong(get(), { ...song, rootPc: (song.rootPc + delta + 120) % 12 }));
  },
  setScale: (scaleId) => {
    const song = currentSong(get());
    const section = currentSection(song);
    set(writeSong(get(), writeSection({ ...song, scaleId }, { ...section, activePreset: null })));
  },
  setSpelling: (spelling) => {
    const song = currentSong(get());
    set(writeSong(get(), { ...song, spelling }));
  },
  setExtensions: (extensions) => {
    const song = currentSong(get());
    set(writeSong(get(), { ...song, extensions }));
  },
  applyPreset: (id) => {
    const preset = PRESETS.find((item) => item.id === id);
    if (!preset) return;
    const song = currentSong(get());
    const section = currentSection(song);
    const slots =
      !preset.scale || preset.scale === song.scaleId
        ? freshSlots(preset.slots)
        : preset.slots.map((slot) => {
            const heard = resolveSlot(
              { ...slot, id: "preset" },
              {
                rootPc: song.rootPc,
                scaleId: preset.scale ?? song.scaleId,
                spelling: song.spelling,
                extensions: preset.extensions ?? false,
                timbre: section.timbre,
              },
            );
            const place = slotForPitch(
              song.rootPc,
              song.scaleId,
              heard.rootPc,
              prefersFlats(song.rootPc, preset.scale ?? song.scaleId, song.spelling),
            );
            return {
              id: uid(),
              degree: place.degree,
              accidental: place.accidental,
              quality: heard.quality,
              inversion: slot.inversion,
              bars: slot.bars,
            };
          });
    set(writeSong(get(), writeSection(song, { ...section, slots, selectedId: slots[0].id, activePreset: id })));
  },
  select: (selectedId) => {
    const song = currentSong(get());
    const section = currentSection(song);
    if (!section.slots.some((slot) => slot.id === selectedId)) return;
    set(writeSong(get(), writeSection(song, { ...section, selectedId })));
  },
  updateSelected: (patch) => {
    const song = currentSong(get());
    const section = currentSection(song);
    set(
      writeSong(
        get(),
        writeSection(song, {
          ...section,
          activePreset: null,
          slots: section.slots.map((slot) => (slot.id === section.selectedId ? { ...slot, ...patch } : slot)),
        }),
      ),
    );
  },
  addChord: () => {
    const song = currentSong(get());
    const section = currentSection(song);
    if (section.slots.length >= 32) return;
    const current = section.slots.find((slot) => slot.id === section.selectedId) ?? section.slots[section.slots.length - 1];
    const next: Slot = {
      id: uid(),
      degree: ((current?.degree ?? 0) + 1) % 7,
      accidental: 0,
      quality: "auto",
      inversion: 0,
      bars: 1,
    };
    const index = section.slots.findIndex((slot) => slot.id === section.selectedId);
    const slots = section.slots.slice();
    slots.splice(index >= 0 ? index + 1 : slots.length, 0, next);
    set(writeSong(get(), writeSection(song, { ...section, slots, selectedId: next.id, activePreset: null })));
  },
  duplicateSelected: () => {
    const song = currentSong(get());
    const section = currentSection(song);
    if (section.slots.length >= 32) return;
    const index = section.slots.findIndex((slot) => slot.id === section.selectedId);
    if (index < 0) return;
    const copySlot: Slot = { ...section.slots[index], id: uid() };
    const slots = section.slots.slice();
    slots.splice(index + 1, 0, copySlot);
    set(writeSong(get(), writeSection(song, { ...section, slots, selectedId: copySlot.id, activePreset: null })));
  },
  removeSelected: () => {
    const song = currentSong(get());
    const section = currentSection(song);
    if (section.slots.length <= 1) return;
    const index = section.slots.findIndex((slot) => slot.id === section.selectedId);
    const slots = section.slots.filter((slot) => slot.id !== section.selectedId);
    const next = slots[Math.max(0, index - 1)] ?? slots[0];
    set(writeSong(get(), writeSection(song, { ...section, slots, selectedId: next.id, activePreset: null })));
  },
  moveSelected: (dir) => {
    const song = currentSong(get());
    const section = currentSection(song);
    const index = section.slots.findIndex((slot) => slot.id === section.selectedId);
    const target = index + dir;
    if (index < 0 || target < 0 || target >= section.slots.length) return;
    const slots = section.slots.slice();
    const [item] = slots.splice(index, 1);
    slots.splice(target, 0, item);
    set(writeSong(get(), writeSection(song, { ...section, slots, activePreset: null })));
  },
  setPattern: (patternId) => {
    const song = currentSong(get());
    const section = currentSection(song);
    set(writeSong(get(), writeSection(song, { ...section, patternId })));
  },
  setBpm: (bpm) => {
    const song = currentSong(get());
    set(writeSong(get(), { ...song, bpm: clampBpm(bpm) }));
  },
  setVolume: (volume) => set({ volume: Math.min(1, Math.max(0, volume)) }),
  setTimbre: (timbre) => {
    const song = currentSong(get());
    const section = currentSection(song);
    set(writeSong(get(), writeSection(song, { ...section, timbre })));
  },
  setIntensity: (intensity) => {
    const song = currentSong(get());
    const section = currentSection(song);
    set(writeSong(get(), writeSection(song, { ...section, intensity })));
  },
  setAutoBass: (autoBass) => {
    const song = currentSong(get());
    const section = currentSection(song);
    set(writeSong(get(), writeSection(song, { ...section, autoBass })));
  },
  setDrum: (drumId) => {
    const song = currentSong(get());
    const section = currentSection(song);
    set(writeSong(get(), writeSection(song, { ...section, drumId, drumsOn: drumId !== "off" })));
  },
  setDrumsOn: (drumsOn) => {
    const song = currentSong(get());
    const section = currentSection(song);
    const drumId = drumsOn && section.drumId === "off" ? (patternById(section.patternId).meter === 3 ? "waltz" : "pop") : section.drumId;
    set(writeSong(get(), writeSection(song, { ...section, drumsOn, drumId })));
  },
  setDrumVolume: (drumVolume) => {
    const song = currentSong(get());
    const section = currentSection(song);
    set(writeSong(get(), writeSection(song, { ...section, drumVolume: Math.min(1, Math.max(0, drumVolume)) })));
  },
  setMelodySound: (melodySound) => {
    const song = currentSong(get());
    const section = currentSection(song);
    set(writeSong(get(), writeSection(song, { ...section, melodySound })));
  },
  setMelodyVolume: (melodyVolume) => {
    const song = currentSong(get());
    const section = currentSection(song);
    set(writeSong(get(), writeSection(song, { ...section, melodyVolume: Math.min(1, Math.max(0, melodyVolume)) })));
  },
  setMelodyMute: (melodyMute) => {
    const song = currentSong(get());
    const section = currentSection(song);
    set(writeSong(get(), writeSection(song, { ...section, melodyMute })));
  },
  setMelodyStep: (melodyStep) => {
    const song = currentSong(get());
    const section = currentSection(song);
    set(writeSong(get(), writeSection(song, { ...section, melodyStep })));
  },
  setMelody: (notes) => {
    const song = currentSong(get());
    const section = currentSection(song);
    set(writeSong(get(), writeSection(song, { ...section, melody: sanitizeMelody(notes) })));
  },
  setLoop: (loop) => set({ loop }),
  setPlayForm: (playForm) => set({ playForm }),
  setMetronome: (metronome) => set({ metronome }),
  setCountIn: (countIn) => set({ countIn }),
  hydrate: () => {
    if (get().hydrated) return;
    const saved = readSaved();
    if (!saved) {
      set({ hydrated: true });
      return;
    }
    set({ ...saved, hydrated: true });
  },
}));

export function persistCadence(state: CadenceState) {
  if (!state.hydrated || typeof localStorage === "undefined") return;
  const payload: Saved = {
    songs: state.songs,
    activeSongId: state.activeSongId,
    volume: state.volume,
    loop: state.loop,
    playForm: state.playForm,
    metronome: state.metronome,
    countIn: state.countIn,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}
