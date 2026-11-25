import { useEffect, useMemo, useRef, useState } from "react";
import {
  AudioLines,
  AudioWaveform,
  ChevronLeft,
  ChevronRight,
  Copy,
  Drum,
  Guitar,
  Minus,
  Music4,
  Piano as PianoIcon,
  Play,
  Plus,
  Repeat,
  Square,
  Trash2,
  Waves,
} from "lucide-react";
import { persistCadence, useCadence, type Section } from "@/lib/cadence-store";
import { cn } from "@/lib/cn";
import { CadenceEngine, type Playhead } from "@/lib/music/audio";
import { durationBeats, PATTERNS, patternById } from "@/lib/music/patterns";
import {
  PRESET_GROUPS,
  PRESETS,
  QUALITY_OPTIONS,
  SCALES,
  keyTitle,
  prefersFlats,
  resolveAll,
  resolveSlot,
  rootChoices,
  scalePcs,
  slotForPitch,
  spellScale,
  pretty,
  type Bars,
  type DrumId,
  type Intensity,
  type MelodySound,
  type QualityChoice,
  type ScaleId,
  type Slot,
  type Spelling,
  type Timbre,
} from "@/lib/music/theory";
import { MelodyLane } from "./melody-lane";
import { Piano } from "./piano";

const IDLE: Playhead = { chordIndex: -1, sectionId: "", patternId: "", eighth: -1, countIn: false, playing: false };

function Mark() {
  return (
    <svg viewBox="0 0 32 32" className="size-6" aria-hidden>
      <rect x="4" y="16" width="6" height="12" rx="1.5" className="fill-fg" />
      <rect x="13" y="11" width="6" height="17" rx="1.5" className="fill-fg" />
      <rect x="22" y="5" width="6" height="23" rx="1.5" className="fill-brass" />
    </svg>
  );
}

export function CadenceApp() {
  const state = useCadence();
  const engineRef = useRef<CadenceEngine | null>(null);
  const following = useRef(false);
  const [playhead, setPlayhead] = useState<Playhead>(IDLE);
  const [copied, setCopied] = useState(false);
  const taps = useRef<number[]>([]);
  const railRef = useRef<HTMLDivElement>(null);

  const song = state.songs.find((item) => item.id === state.activeSongId) ?? state.songs[0];
  const section = song.sections.find((item) => item.id === song.activeSectionId) ?? song.sections[0];
  const flats = prefersFlats(song.rootPc, song.scaleId, song.spelling);
  const ctx = useMemo(
    () => ({
      rootPc: song.rootPc,
      scaleId: song.scaleId,
      spelling: song.spelling,
      extensions: song.extensions,
      timbre: section.timbre,
    }),
    [song.rootPc, song.scaleId, song.spelling, song.extensions, section.timbre],
  );
  const arrangement = useMemo(
    () =>
      song.sections.map((item) => ({
        id: item.id,
        patternId: item.patternId,
        lyric: item.lyric,
        name: item.name,
        timbre: item.timbre,
        intensity: item.intensity,
        autoBass: item.autoBass,
        drumId: item.drumId,
        drumsOn: item.drumsOn,
        drumVolume: item.drumVolume,
        melody: item.melody,
        melodySound: item.melodySound,
        melodyVolume: item.melodyVolume,
        melodyMute: item.melodyMute,
        chords: resolveAll(item.slots, {
          rootPc: song.rootPc,
          scaleId: song.scaleId,
          spelling: song.spelling,
          extensions: song.extensions,
          timbre: item.timbre,
        }),
      })),
    [song.sections, song.rootPc, song.scaleId, song.spelling, song.extensions],
  );
  const chords = arrangement.find((item) => item.id === section.id)?.chords ?? [];
  const flat = useMemo(() => {
    const source = state.playForm ? arrangement : arrangement.filter((item) => item.id === section.id);
    const rows = source.length ? source : arrangement.slice(0, 1);
    const midis: number[][] = [];
    const bars: Bars[] = [];
    const patternIds: string[] = [];
    const sectionAt: string[] = [];
    const localAt: number[] = [];
    const timbres: Timbre[] = [];
    const levels: number[] = [];
    const autoBass: boolean[] = [];
    const bassMidi: number[] = [];
    const drumIds: DrumId[] = [];
    const drumsOn: boolean[] = [];
    const drumGain: number[] = [];
    const melody: { beat: number; midi: number; length: number }[][] = [];
    const melodySound: MelodySound[] = [];
    const melodyGain: number[] = [];
    for (const item of rows) {
      let cursor = 0;
      const starts = item.chords.map((chord) => {
        const start = cursor;
        cursor += durationBeats(item.patternId, chord.bars);
        return start;
      });
      item.chords.forEach((chord, index) => {
        const start = starts[index] ?? 0;
        const end = start + durationBeats(item.patternId, chord.bars);
        midis.push(chord.midis);
        bars.push(chord.bars);
        patternIds.push(item.patternId);
        sectionAt.push(item.id);
        localAt.push(index);
        timbres.push(item.timbre);
        levels.push(levelOf(item.intensity));
        autoBass.push(item.autoBass);
        bassMidi.push(chord.midis.length ? Math.min(...chord.midis) - 12 : 0);
        drumIds.push(item.drumId);
        drumsOn.push(item.drumsOn && item.drumId !== "off");
        drumGain.push(item.drumVolume);
        melody.push(
          item.melody
            .filter((note) => note.beat >= start - 0.001 && note.beat < end - 0.001)
            .map((note) => ({ beat: note.beat - start, midi: note.midi, length: note.length })),
        );
        melodySound.push(item.melodySound);
        melodyGain.push(item.melodyMute ? 0 : item.melodyVolume);
      });
    }
    return {
      midis,
      bars,
      patternIds,
      sectionAt,
      localAt,
      timbres,
      levels,
      autoBass,
      bassMidi,
      drumIds,
      drumsOn,
      drumGain,
      melody,
      melodySound,
      melodyGain,
      startIndex: 0,
    };
  }, [arrangement, state.playForm, section.id]);

  const selected = chords.find((chord) => chord.id === section.selectedId) ?? chords[0];
  const playing = playhead.playing;
  const counting = playing && playhead.countIn;
  const live = counting ? chords[0] : playing && playhead.chordIndex >= 0 ? (chords[playhead.chordIndex] ?? selected) : selected;
  const soundingId = playing && playhead.patternId ? playhead.patternId : section.patternId;
  const pattern = patternById(soundingId);
  const sectionPattern = patternById(section.patternId);
  const pipCount = counting ? pattern.meter * 2 : Math.max(1, Math.round(pattern.meter * (live?.bars ?? 1) * 2));
  const activePip = playing && playhead.eighth >= 0 ? playhead.eighth % pipCount : -1;
  const countNumber = Math.floor(Math.max(0, playhead.eighth) / 2) + 1;
  const title = keyTitle(song.rootPc, song.scaleId, song.spelling);
  const names = spellScale(song.rootPc, song.scaleId, flats);
  const pcs = scalePcs(song.rootPc, song.scaleId);

  const snapRef = useRef(flatSnap(flat, song.bpm, state.volume, state.loop, state.metronome, state.countIn));
  snapRef.current = flatSnap(flat, song.bpm, state.volume, state.loop, state.metronome, state.countIn);

  function engine() {
    if (!engineRef.current) {
      const next = new CadenceEngine();
      next.setSnapshotGetter(() => snapRef.current);
      engineRef.current = next;
    }
    return engineRef.current;
  }

  useEffect(() => {
    state.hydrate();
    const eng = engine();
    eng.setOnVisual((head) => {
      if (head.playing && head.sectionId) {
        const liveState = useCadence.getState();
        const liveSong = liveState.songs.find((item) => item.id === liveState.activeSongId);
        if (liveState.playForm && liveSong && head.sectionId !== liveSong.activeSectionId) {
          following.current = true;
          liveState.focusSection(head.sectionId);
        }
      }
      setPlayhead(head);
    });
    const unsub = useCadence.subscribe((next) => persistCadence(next));
    return () => {
      unsub();
      eng.dispose();
    };
    // Engine and hydration are owned for the lifetime of the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    engineRef.current?.setVolume(state.volume);
  }, [state.volume]);

  useEffect(() => {
    engineRef.current?.setTempo(song.bpm);
  }, [song.bpm]);

  const seenSong = useRef(song.id);
  useEffect(() => {
    if (seenSong.current === song.id) return;
    seenSong.current = song.id;
    engineRef.current?.stop();
  }, [song.id]);

  const editSig = JSON.stringify({
    rows: flat.midis.map((midis, index) => [midis.join("."), flat.bars[index], flat.patternIds[index], flat.sectionAt[index], flat.timbres[index]]),
    levels: flat.levels,
    autoBass: flat.autoBass,
    bass: flat.bassMidi,
    drums: flat.drumIds,
    drumsOn: flat.drumsOn,
    drumGain: flat.drumGain,
    melody: flat.melody,
    melodySound: flat.melodySound,
    melodyGain: flat.melodyGain,
    metronome: state.metronome,
  });
  useEffect(() => {
    engineRef.current?.rebuild();
  }, [editSig]);

  const seenSection = useRef(section.id);
  useEffect(() => {
    if (seenSection.current === section.id) return;
    const fromFollow = following.current;
    following.current = false;
    seenSection.current = section.id;
    if (fromFollow) return;
    const index = snapRef.current.sectionAt.findIndex((id) => id === section.id);
    engineRef.current?.seek(index < 0 ? 0 : index);
  }, [section.id]);

  const seenForm = useRef(state.playForm);
  useEffect(() => {
    if (seenForm.current === state.playForm) return;
    seenForm.current = state.playForm;
    engineRef.current?.seek(0);
  }, [state.playForm]);

  useEffect(() => {
    if (!playing || playhead.chordIndex < 0) return;
    const node = railRef.current?.querySelector<HTMLElement>(`[data-index="${playhead.chordIndex}"]`);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", inline: "center", block: "nearest" });
  }, [playing, playhead.chordIndex, section.id]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT")) return;
      if (event.code === "Space") {
        event.preventDefault();
        toggle();
      } else if (event.code === "ArrowRight") {
        event.preventDefault();
        moveSelection(1);
      } else if (event.code === "ArrowLeft") {
        event.preventDefault();
        moveSelection(-1);
      } else if (event.key === "[") {
        state.setBpm(song.bpm - 1);
      } else if (event.key === "]") {
        state.setBpm(song.bpm + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function moveSelection(dir: -1 | 1) {
    const index = section.slots.findIndex((slot) => slot.id === section.selectedId);
    const next = section.slots[index + dir];
    if (next) state.select(next.id);
  }

  function toggle() {
    if (playhead.playing) engine().stop();
    else void engine().start();
  }

  const [melodyOpen, setMelodyOpen] = useState(false);
  const melodySection = useRef<string | null>(null);
  if (melodySection.current !== section.id) {
    melodySection.current = section.id;
    if (section.melody.length > 0 && !melodyOpen) setMelodyOpen(true);
  }

  function hear(slot: Slot) {
    if (playhead.playing) return;
    const heard = resolveSlot(slot, ctx);
    const bass = section.autoBass && heard.midis.length ? Math.min(...heard.midis) - 12 : undefined;
    engine().preview(heard.midis, section.timbre, bass);
  }

  function edit(patch: Partial<Omit<Slot, "id">>) {
    const current = section.slots.find((slot) => slot.id === section.selectedId);
    if (!current) return;
    const next = { ...current, ...patch };
    state.updateSelected(patch);
    hear(next);
  }

  function choose(id: string) {
    state.select(id);
    const slot = section.slots.find((item) => item.id === id);
    if (slot) hear(slot);
  }

  function tapTempo() {
    const now = performance.now();
    taps.current = taps.current.filter((stamp) => now - stamp < 2400);
    taps.current.push(now);
    if (taps.current.length < 2) return;
    const gaps: number[] = [];
    for (let i = 1; i < taps.current.length; i++) gaps.push(taps.current[i] - taps.current[i - 1]);
    const avg = gaps.reduce((sum, gap) => sum + gap, 0) / gaps.length;
    state.setBpm(Math.round(60000 / avg));
  }

  async function copyChart() {
    const blocks = arrangement.map((item) => {
      const groove = patternById(item.patternId);
      const symbols = item.chords.map((chord) => `${chord.symbol}${durationMark(chord.bars, groove.meter, groove.signature)}`).join("  –  ");
      const drums = item.drumsOn && item.drumId !== "off" ? DRUM_LABEL[item.drumId] : "No drums";
      const line = item.lyric.trim();
      const melody = item.melody
        .slice()
        .sort((a, b) => a.beat - b.beat)
        .map((note) => pitchName(note.midi, flats))
        .join(" ");
      const head = `${item.name} · ${SOUND_LABEL[item.timbre]} · ${groove.name} · ${item.intensity} · ${drums}${item.autoBass ? " · Bass" : ""}`;
      return `${head}\n${symbols}${line ? `\n${line}` : ""}${melody ? `\nMelody${item.melodyMute ? " (muted)" : ""} · ${MELODY_LABEL[item.melodySound]}: ${melody}` : ""}`;
    });
    const chart = `${song.title.trim() || "Untitled"}\n${title} · ${song.bpm} bpm\n\n${blocks.join("\n\n")}`;
    try {
      await navigator.clipboard.writeText(chart);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  const selectedSlot = section.slots.find((slot) => slot.id === section.selectedId) ?? section.slots[0];
  const degreePreview = [0, 1, 2, 3, 4, 5, 6].map((degree) =>
    resolveSlot({ ...selectedSlot, degree, accidental: 0, quality: "auto", inversion: 0 }, ctx).roman,
  );
  const selectedIndex = section.slots.findIndex((slot) => slot.id === section.selectedId);
  const sectionIndex = song.sections.findIndex((item) => item.id === section.id);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 sm:py-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-line bg-surface">
            <Mark />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-widest text-brass">Cadence</p>
            <input
              className="title-field mt-1"
              aria-label="Song title"
              value={song.title}
              placeholder="Untitled"
              onChange={(event) => state.renameSong(event.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            className="field"
            aria-label="Songs"
            value={song.id}
            onChange={(event) => state.selectSong(event.target.value)}
          >
            {state.songs.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title.trim() || "Untitled"}
              </option>
            ))}
          </select>
          <button type="button" className="chip" onClick={() => state.newSong()}>
            <Plus className="size-3.5" />
            New
          </button>
          <button type="button" className="chip" onClick={() => state.duplicateSong()}>
            <Copy className="size-3.5" />
            Duplicate
          </button>
          <button type="button" className="chip" onClick={() => state.deleteSong()} disabled={state.songs.length <= 1}>
            <Trash2 className="size-3.5" />
            Delete
          </button>
        </div>
      </header>

      <div className="desk">
        <section className="area-now rounded-xl border border-line bg-surface px-4 py-5 sm:px-6 sm:py-6">
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs font-medium uppercase tracking-widest text-brass">
              {counting ? "Count-in" : `${section.name} · ${live?.roman ?? ""}`}
            </p>
            <p className="text-xs text-muted">
              {title} · {pattern.signature}
            </p>
          </div>
          <p className="mt-2 truncate font-display text-6xl leading-none text-fg sm:text-7xl">{counting ? countNumber : live?.symbol}</p>
          <p className="mt-3 text-sm text-muted">{counting ? `Starts on ${chords[0]?.symbol ?? ""}` : live?.noteNames.join("   ·   ")}</p>
          {section.lyric.trim() && !counting ? <p className="mt-2 truncate text-sm text-ivory">{section.lyric}</p> : null}
          <div className="mt-5 flex gap-1.5" aria-hidden>
            {Array.from({ length: pipCount }, (_, index) => (
              <span
                key={index}
                className={cn("h-1.5 flex-1 rounded-full", index === activePip ? "bg-brass" : index < activePip ? "bg-brass/35" : "bg-line")}
              />
            ))}
          </div>
          <div className="mt-5">
            <Piano scalePcs={pcs} chordPcs={live?.pcs ?? []} rootPc={live?.rootPc ?? 0} />
          </div>
          <p className="mt-2 text-xs text-muted">Ivory marks are the scale. Brass keys are this chord. The brightest key is the root.</p>
        </section>

        <section className="area-transport rounded-xl border border-line bg-surface p-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggle}
              className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-brass text-base font-semibold text-ink"
            >
              {playing ? <Square className="size-4 fill-current" /> : <Play className="size-5 fill-current" />}
              {playing ? "Stop" : state.playForm ? "Play song" : "Play section"}
            </button>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              className={cn("chip", !state.playForm && "chip-on")}
              aria-pressed={!state.playForm}
              onClick={() => state.setPlayForm(false)}
            >
              Section
            </button>
            <button
              type="button"
              className={cn("chip", state.playForm && "chip-on")}
              aria-pressed={state.playForm}
              onClick={() => state.setPlayForm(true)}
            >
              Song
            </button>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <button type="button" className="icon-btn" onClick={() => state.setBpm(song.bpm - 1)} aria-label="Slower">
              <Minus className="size-4" />
            </button>
            <div className="min-w-16 flex-1 text-center">
              <p className="font-display text-4xl leading-none tabular-nums text-fg">{song.bpm}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted">bpm</p>
            </div>
            <button type="button" className="icon-btn" onClick={() => state.setBpm(song.bpm + 1)} aria-label="Faster">
              <Plus className="size-4" />
            </button>
          </div>
          <input
            className="mt-2 h-11 w-full accent-brass"
            type="range"
            min={40}
            max={200}
            value={song.bpm}
            aria-label="Tempo"
            onChange={(event) => state.setBpm(Number(event.target.value))}
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className="chip" onClick={tapTempo}>
              Tap
            </button>
            <button type="button" className={cn("chip", state.loop && "chip-on")} aria-pressed={state.loop} onClick={() => state.setLoop(!state.loop)}>
              <Repeat className="size-3.5" />
              Loop
            </button>
            <button
              type="button"
              className={cn("chip", state.metronome && "chip-on")}
              aria-pressed={state.metronome}
              onClick={() => state.setMetronome(!state.metronome)}
            >
              <Drum className="size-3.5" />
              Click
            </button>
            <button
              type="button"
              className={cn("chip", state.countIn && "chip-on")}
              aria-pressed={state.countIn}
              onClick={() => state.setCountIn(!state.countIn)}
            >
              Count-in
            </button>
          </div>
          <label className="mt-4 flex items-center gap-3 text-sm text-muted">
            <span className="w-12">Level</span>
            <input
              className="h-11 flex-1 accent-brass"
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={state.volume}
              aria-label="Volume"
              onChange={(event) => state.setVolume(Number(event.target.value))}
            />
          </label>
          <p className="mt-3 hidden text-xs text-muted lg:block">Space plays. Arrows move the selection. Brackets nudge tempo.</p>
        </section>

        <section className="area-prog rounded-xl border border-line bg-surface p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-xs font-medium uppercase tracking-widest text-muted">Form</h2>
            <div className="flex gap-2">
              <button type="button" className="icon-btn" aria-label="Move section earlier" onClick={() => state.moveSection(-1)} disabled={sectionIndex <= 0}>
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                className="icon-btn"
                aria-label="Move section later"
                onClick={() => state.moveSection(1)}
                disabled={sectionIndex < 0 || sectionIndex >= song.sections.length - 1}
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
          <div className="scroller flex items-stretch gap-2 overflow-x-auto pb-1">
            {song.sections.map((item) => {
              const on = item.id === section.id;
              const sounding = playing && !counting && playhead.sectionId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => state.focusSection(item.id)}
                  className={cn(
                    "min-w-24 shrink-0 rounded-lg border px-3 py-2 text-left text-sm",
                    sounding ? "border-brass bg-brass/15 text-fg" : on ? "border-brass bg-raised text-fg" : "border-line bg-raised text-fg",
                  )}
                >
                  {item.name || "Section"}
                </button>
              );
            })}
            <button type="button" className="icon-btn w-12 self-stretch" onClick={() => state.addSection()} aria-label="Add section">
              <Plus className="size-5" />
            </button>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-[11rem_minmax(0,1fr)]">
            <input
              className="field"
              aria-label="Section name"
              value={section.name}
              onChange={(event) => state.renameSection(event.target.value)}
            />
            <input
              className="field"
              aria-label="Lyric line"
              placeholder="A line for this section"
              value={section.lyric}
              onChange={(event) => state.setLyric(event.target.value)}
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className="chip" onClick={() => state.duplicateSection()}>
              <Copy className="size-3.5" />
              Duplicate section
            </button>
            <button type="button" className="chip" onClick={() => state.removeSection()} disabled={song.sections.length <= 1}>
              <Trash2 className="size-3.5" />
              Delete section
            </button>
          </div>

          <div className="mb-3 mt-5 flex items-center justify-between gap-3">
            <h2 className="text-xs font-medium uppercase tracking-widest text-muted">Progression</h2>
            <button type="button" className="chip" onClick={() => void copyChart()}>
              <Copy className="size-3.5" />
              {copied ? "Copied" : "Copy chart"}
            </button>
          </div>
          <div ref={railRef} className="scroller flex items-stretch gap-2 overflow-x-auto pb-1">
            {chords.map((chord, index) => {
              const isLive = playing && !counting && playhead.sectionId === section.id && playhead.chordIndex === index;
              const isSelected = chord.id === section.selectedId;
              return (
                <button
                  key={chord.id}
                  type="button"
                  data-index={index}
                  onClick={() => choose(chord.id)}
                  aria-pressed={isSelected}
                  className={cn(
                    "flex shrink-0 flex-col rounded-lg border px-3 py-3 text-left",
                    chord.bars === 2 ? "min-w-52" : chord.bars === 0.5 ? "min-w-24" : "min-w-32",
                    isLive ? "border-brass bg-brass/15" : isSelected ? "border-brass bg-raised" : "border-line bg-raised",
                  )}
                >
                  <span className="flex items-center justify-between gap-2 text-xs text-brass">
                    {chord.roman}
                    <span className="tabular-nums text-muted">{index + 1}</span>
                  </span>
                  <span className="mt-1 font-display text-2xl leading-none text-fg">{chord.symbol}</span>
                  <span className="mt-2 text-xs text-muted">{chord.noteNames.join(" ")}</span>
                  {barsBadge(chord.bars, sectionPattern.meter, sectionPattern.signature) ? (
                    <span className="mt-2 text-xs text-brass">{barsBadge(chord.bars, sectionPattern.meter, sectionPattern.signature)}</span>
                  ) : null}
                </button>
              );
            })}
            <button type="button" className="icon-btn w-12 self-stretch" onClick={() => state.addChord()} aria-label="Add chord">
              <Plus className="size-5" />
            </button>
          </div>
          <MelodyPanel
            open={melodyOpen}
            onToggle={() => setMelodyOpen((open) => !open)}
            section={section}
            chords={chords}
            flats={flats}
            scale={pcs}
            playing={playing && !counting && playhead.sectionId === section.id}
            chordIndex={playhead.chordIndex}
            eighth={playhead.eighth}
            onMelody={(notes) => state.setMelody(notes)}
            onSound={(sound) => state.setMelodySound(sound)}
            onVolume={(volume) => state.setMelodyVolume(volume)}
            onMute={(on) => state.setMelodyMute(on)}
            onStep={(step) => state.setMelodyStep(step)}
          />
        </section>

        <section className="area-presets rounded-xl border border-line bg-surface p-4">
          <h2 className="text-xs font-medium uppercase tracking-widest text-muted">Presets</h2>
          <p className="mt-2 text-sm text-muted">Drops into this section, in the key you already have. The other sections stay put.</p>
          <div className="mt-3 flex flex-col gap-3">
            {PRESET_GROUPS.map((group) => (
              <div key={group}>
                <p className="mb-1.5 text-xs text-muted">{group}</p>
                <div className="flex flex-wrap gap-2">
                  {PRESETS.filter((preset) => preset.group === group).map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      className={cn("chip", section.activePreset === preset.id && "chip-on")}
                      aria-pressed={section.activePreset === preset.id}
                      onClick={() => state.applyPreset(preset.id)}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="area-edit rounded-xl border border-line bg-surface p-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xs font-medium uppercase tracking-widest text-muted">Edit chord {selectedIndex + 1}</h2>
            <div className="flex gap-2">
              <button type="button" className="icon-btn" aria-label="Move earlier" onClick={() => state.moveSelected(-1)} disabled={selectedIndex <= 0}>
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                className="icon-btn"
                aria-label="Move later"
                onClick={() => state.moveSelected(1)}
                disabled={selectedIndex < 0 || selectedIndex >= section.slots.length - 1}
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted">Scale degree</p>
          <div className="mt-1.5 grid grid-cols-7 gap-1.5">
            {degreePreview.map((label, degree) => (
              <button
                key={degree}
                type="button"
                className={cn("choice px-0 text-xs", selectedSlot.degree === degree && "choice-on")}
                onClick={() => edit({ degree, accidental: 0 })}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted">Accidental</p>
          <div className="mt-1.5 grid grid-cols-3 gap-1.5">
            {(
              [
                [-1, "♭"],
                [0, "♮"],
                [1, "♯"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={label}
                type="button"
                className={cn("choice", selectedSlot.accidental === value && "choice-on")}
                onClick={() => edit({ accidental: value })}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted">Root</p>
          <div className="mt-1.5 grid grid-cols-6 gap-1.5">
            {rootChoices(flats).map((root) => {
              const on = liveMatchesRoot(selected, root.pc);
              return (
                <button
                  key={root.pc}
                  type="button"
                  className={cn("choice", on && "choice-on")}
                  onClick={() => edit(slotForPitch(song.rootPc, song.scaleId, root.pc, flats))}
                >
                  {root.label}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-muted">Quality</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {QUALITY_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                className={cn("chip", selectedSlot.quality === option.id && "chip-on")}
                onClick={() => edit({ quality: option.id as QualityChoice })}
              >
                {option.label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted">Bass</p>
          <div className="mt-1.5 grid grid-cols-4 gap-1.5">
            {["Root", "1st", "2nd", "3rd"].map((label, inversion) => (
              <button
                key={label}
                type="button"
                className={cn("choice", selectedSlot.inversion === inversion && "choice-on")}
                disabled={inversion >= (selected?.noteNames.length ?? 3)}
                onClick={() => edit({ inversion })}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className={cn("chip", selectedSlot.bars === 0.5 && "chip-on")} onClick={() => edit({ bars: 0.5 })}>
              {halfLabel(sectionPattern.meter, sectionPattern.signature)}
            </button>
            <button type="button" className={cn("chip", selectedSlot.bars === 1 && "chip-on")} onClick={() => edit({ bars: 1 })}>
              1 bar
            </button>
            <button type="button" className={cn("chip", selectedSlot.bars === 2 && "chip-on")} onClick={() => edit({ bars: 2 })}>
              2 bars
            </button>
            <button type="button" className="chip" onClick={() => state.duplicateSelected()}>
              <Copy className="size-3.5" />
              Duplicate
            </button>
            <button type="button" className="chip" onClick={() => state.removeSelected()} disabled={section.slots.length <= 1}>
              <Trash2 className="size-3.5" />
              Delete
            </button>
          </div>
        </section>

        <section className="area-key rounded-xl border border-line bg-surface p-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xs font-medium uppercase tracking-widest text-muted">Key and scale</h2>
            <div className="flex gap-1.5">
              {(["auto", "sharp", "flat"] as Spelling[]).map((mode) => (
                <button key={mode} type="button" className={cn("chip", song.spelling === mode && "chip-on")} onClick={() => state.setSpelling(mode)}>
                  {mode === "auto" ? "Auto" : mode === "sharp" ? "♯" : "♭"}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-3 grid grid-cols-6 gap-1.5">
            {rootChoices(flats).map((root) => (
              <button key={root.pc} type="button" className={cn("choice", song.rootPc === root.pc && "choice-on")} onClick={() => state.setRoot(root.pc)}>
                {root.label}
              </button>
            ))}
          </div>
          <div className="mt-2 flex gap-2">
            <button type="button" className="chip flex-1" onClick={() => state.transpose(-7)}>
              Down a 5th
            </button>
            <button type="button" className="chip flex-1" onClick={() => state.transpose(7)}>
              Up a 5th
            </button>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-1.5">
            {SCALES.map((scale) => (
              <button
                key={scale.id}
                type="button"
                className={cn("choice h-auto flex-col items-start py-2 text-left", song.scaleId === scale.id && "choice-on")}
                onClick={() => state.setScale(scale.id as ScaleId)}
              >
                <span className="text-sm">{scale.name}</span>
                <span className={cn("text-xs", song.scaleId === scale.id ? "text-ink/70" : "text-muted")}>{scale.hint}</span>
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {names.map((name, index) => {
              const on = live?.pcs.includes(pcs[index] ?? -1);
              return (
                <span key={`${name}-${index}`} className={cn("rounded-md px-2 py-1 text-sm", on ? "bg-brass text-ink" : "bg-raised text-fg")}>
                  <span className="mr-1 text-xs opacity-70">{index + 1}</span>
                  {pretty(name)}
                </span>
              );
            })}
          </div>
          <button
            type="button"
            className={cn("chip mt-3", song.extensions && "chip-on")}
            aria-pressed={song.extensions}
            onClick={() => state.setExtensions(!song.extensions)}
          >
            Sevenths on diatonic chords
          </button>
        </section>

        <section className="area-pattern rounded-xl border border-line bg-surface p-4">
          <h2 className="text-xs font-medium uppercase tracking-widest text-muted">Groove for this section</h2>
          <div className="mt-3 grid grid-cols-4 gap-1.5">
            {(
              [
                ["guitar", "Steel", Guitar],
                ["nylon", "Nylon", Guitar],
                ["piano", "Piano", PianoIcon],
                ["soft", "Soft", AudioLines],
                ["organ", "Organ", Waves],
                ["bass", "Bass", AudioWaveform],
                ["strings", "Strings", Music4],
              ] as const
            ).map(([id, label, Icon]) => (
              <button
                key={id}
                type="button"
                className={cn("choice flex-col gap-0.5 px-1 text-xs", section.timbre === id && "choice-on")}
                onClick={() => state.setTimbre(id as Timbre)}
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted">Dynamics</p>
          <div className="mt-1.5 grid grid-cols-3 gap-1.5">
            {(
              [
                ["soft", "Soft"],
                ["medium", "Medium"],
                ["loud", "Loud"],
              ] as const
            ).map(([id, label]) => (
              <button key={id} type="button" className={cn("choice text-xs", section.intensity === id && "choice-on")} onClick={() => state.setIntensity(id)}>
                {label}
              </button>
            ))}
          </div>
          <button type="button" className={cn("chip mt-3", section.autoBass && "chip-on")} aria-pressed={section.autoBass} onClick={() => state.setAutoBass(!section.autoBass)}>
            Auto bass
          </button>
          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-xs text-muted">Drums</p>
            <button type="button" className={cn("chip", section.drumsOn && section.drumId !== "off" && "chip-on")} aria-pressed={section.drumsOn} onClick={() => state.setDrumsOn(!section.drumsOn)}>
              {section.drumsOn && section.drumId !== "off" ? "On" : "Off"}
            </button>
          </div>
          <label className="mt-2 flex items-center gap-3 text-sm text-muted">
            <span className="w-12">Level</span>
            <input className="h-11 flex-1 accent-brass" type="range" min={0} max={1} step={0.01} value={section.drumVolume} aria-label="Drum volume" onChange={(event) => state.setDrumVolume(Number(event.target.value))} />
          </label>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {(
              [
                ["off", "Off"],
                ["ballad", "Ballad"],
                ["pop", "Pop"],
                ["clap", "Clap"],
                ["shaker", "Shaker"],
                ["shuffle", "Shuffle"],
                ["waltz", "Waltz"],
                ["compound", "6/8"],
              ] as const
            ).map(([id, label]) => (
              <button key={id} type="button" className={cn("chip", section.drumId === id && "chip-on")} onClick={() => state.setDrum(id)}>
                {label}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-col gap-1.5">
            {PATTERNS.map((item) => {
              const Icon = item.family === "arp" ? AudioLines : item.id === "waltz" || item.id === "ballad" || item.id === "compound" ? PianoIcon : item.id === "offbeat" || item.id === "shuffle" ? Drum : Guitar;
              const on = section.patternId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={cn("flex items-center gap-3 rounded-lg border px-3 py-2 text-left", on ? "border-brass bg-brass/15" : "border-transparent bg-raised")}
                  onClick={() => state.setPattern(item.id)}
                >
                  <Icon className={cn("size-4 shrink-0", on ? "text-brass" : "text-muted")} />
                  <span>
                    <span className="block text-sm font-medium text-fg">
                      {item.name}
                      <span className="ml-2 text-xs font-normal text-muted">{item.signature}</span>
                    </span>
                    <span className="block text-xs text-muted">{item.blurb}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

function flatSnap(
  flat: {
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
  },
  bpm: number,
  volume: number,
  loop: boolean,
  metronome: boolean,
  countIn: boolean,
) {
  return { ...flat, bpm, volume, loop, metronome, countIn };
}

function levelOf(intensity: Intensity) {
  if (intensity === "soft") return 0.62;
  if (intensity === "loud") return 1;
  return 0.86;
}

function halfLabel(meter: 3 | 4, signature: string) {
  if (meter !== 3) return "2 beats";
  return signature === "6/8" ? "3 eighths" : "½ bar";
}

function barsBadge(bars: Bars, meter: 3 | 4, signature: string) {
  if (bars === 2) return "2 bars";
  if (bars === 0.5) return halfLabel(meter, signature);
  return null;
}

function durationMark(bars: Bars, meter: 3 | 4, signature: string) {
  const badge = barsBadge(bars, meter, signature);
  return badge ? ` (${badge})` : "";
}

const SOUND_LABEL: Record<Timbre, string> = {
  guitar: "Steel",
  nylon: "Nylon",
  piano: "Piano",
  soft: "Soft",
  organ: "Organ",
  bass: "Bass",
  strings: "Strings",
};

const DRUM_LABEL: Record<DrumId, string> = {
  off: "No drums",
  ballad: "Soft ballad",
  pop: "Pop",
  clap: "Clap march",
  shaker: "Folk shaker",
  shuffle: "Shuffle",
  waltz: "Waltz",
  compound: "6/8",
};

const MELODY_LABEL: Record<MelodySound, string> = {
  piano: "Piano",
  soft: "Soft lead",
  lead: "Synth",
  flute: "Flute",
  bit: "8-bit",
};

const MELODY_SOUNDS: MelodySound[] = ["piano", "soft", "lead", "flute", "bit"];

function pitchName(midi: number, flats: boolean) {
  const names = flats ? ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"] : ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
  return `${names[((midi % 12) + 12) % 12]}${Math.floor(midi / 12) - 1}`;
}

function MelodyPanel({
  open,
  onToggle,
  section,
  chords,
  flats,
  scale,
  playing,
  chordIndex,
  eighth,
  onMelody,
  onSound,
  onVolume,
  onMute,
  onStep,
}: {
  open: boolean;
  onToggle: () => void;
  section: Section;
  chords: { symbol: string; bars: Bars; pcs: number[] }[];
  flats: boolean;
  scale: number[];
  playing: boolean;
  chordIndex: number;
  eighth: number;
  onMelody: (notes: Section["melody"]) => void;
  onSound: (sound: MelodySound) => void;
  onVolume: (volume: number) => void;
  onMute: (on: boolean) => void;
  onStep: (step: 0.25 | 0.5) => void;
}) {
  const step = section.melodyStep;
  const spans: { symbol: string; cols: number }[] = [];
  const tones: number[][] = [];
  let total = 0;
  for (const chord of chords) {
    const beats = durationBeats(section.patternId, chord.bars);
    const cols = Math.max(1, Math.round(beats / step));
    spans.push({ symbol: chord.symbol, cols });
    for (let i = 0; i < cols; i++) tones.push(chord.pcs);
    total += beats;
  }
  if (!total) total = patternById(section.patternId).meter;
  let activeColumn = -1;
  if (playing && eighth >= 0) {
    let beat = 0;
    for (let i = 0; i < chordIndex; i++) beat += durationBeats(section.patternId, chords[i]?.bars ?? 1);
    beat += eighth * 0.5;
    activeColumn = Math.max(0, Math.floor(beat / step + 0.001));
  }
  return (
    <div className="mt-4 border-t border-line pt-3">
      <button type="button" className="flex w-full items-center justify-between gap-3 text-left" onClick={onToggle} aria-expanded={open}>
        <span className="text-xs font-medium uppercase tracking-widest text-muted">Melody</span>
        <span className="text-xs text-muted">{open ? "Hide" : section.melody.length ? `${section.melody.length} notes` : "Add a line"}</span>
      </button>
      {open ? (
        <div className="mt-3">
          <div className="grid grid-cols-5 gap-1.5">
            {MELODY_SOUNDS.map((id) => (
              <button key={id} type="button" className={cn("choice px-1 text-xs", section.melodySound === id && "choice-on")} onClick={() => onSound(id)}>
                {id === "soft" ? "Soft" : id === "lead" ? "Synth" : id === "bit" ? "8-bit" : MELODY_LABEL[id]}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button type="button" className={cn("chip", section.melodyMute && "chip-on")} aria-pressed={section.melodyMute} onClick={() => onMute(!section.melodyMute)}>
              {section.melodyMute ? "Muted" : "Mute"}
            </button>
            <button type="button" className={cn("chip", step === 0.5 && "chip-on")} onClick={() => onStep(0.5)}>
              1/8
            </button>
            <button type="button" className={cn("chip", step === 0.25 && "chip-on")} onClick={() => onStep(0.25)}>
              1/16
            </button>
            <label className="flex min-w-40 flex-1 items-center gap-3 text-sm text-muted">
              <span className="w-12">Level</span>
              <input className="h-11 flex-1 accent-brass" type="range" min={0} max={1} step={0.01} value={section.melodyVolume} aria-label="Melody volume" onChange={(event) => onVolume(Number(event.target.value))} />
            </label>
          </div>
          <p className="mt-2 text-xs text-muted">Click a cell to add or remove. Drag across the row to hold a note. Ivory rows are in the scale. A brass wash is a chord tone.</p>
          <MelodyLane notes={section.melody} step={step} totalBeats={total} scalePcs={scale} tones={tones} spans={spans} flats={flats} activeColumn={activeColumn} onChange={onMelody} />
        </div>
      ) : null}
    </div>
  );
}

function liveMatchesRoot(chord: { rootPc: number } | undefined, pc: number) {
  return chord?.rootPc === pc;
}
