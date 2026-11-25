import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { uid, type MelodyNote } from "@/lib/music/theory";

const LOW = 60;
const HIGH = 81;

const SHARP = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
const FLAT = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];

function pitchLabel(midi: number, flats: boolean) {
  const names = flats ? FLAT : SHARP;
  return `${names[((midi % 12) + 12) % 12]}${Math.floor(midi / 12) - 1}`;
}

type Drag = {
  mode: "draw" | "edit";
  id?: string;
  midi: number;
  anchor: number;
  start: number;
  length: number;
  moved: boolean;
  x: number;
};

export function MelodyLane({
  notes,
  step,
  totalBeats,
  scalePcs,
  tones,
  spans,
  flats,
  activeColumn,
  onChange,
}: {
  notes: MelodyNote[];
  step: 0.25 | 0.5;
  totalBeats: number;
  scalePcs: number[];
  tones: number[][];
  spans: { symbol: string; cols: number }[];
  flats: boolean;
  activeColumn: number;
  onChange: (notes: MelodyNote[]) => void;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState<Drag | null>(null);
  const cols = Math.max(1, Math.round(totalBeats / step));
  const cell = step === 0.25 ? 14 : 18;
  const rowH = 18;
  const gutter = 42;
  const header = 22;
  const scale = new Set(scalePcs);

  function cellAt(clientX: number, clientY: number) {
    const el = scroller.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left + el.scrollLeft - gutter;
    const y = clientY - rect.top + el.scrollTop - header;
    if (x < 0 || y < 0) return null;
    const col = Math.max(0, Math.min(cols - 1, Math.floor(x / cell)));
    const row = Math.floor(y / rowH);
    const midi = HIGH - row;
    if (midi < LOW || midi > HIGH) return null;
    return { midi, beat: col * step };
  }

  function shown() {
    if (!drag) return notes;
    if (drag.mode === "edit" && drag.id) {
      return notes.map((note) => (note.id === drag.id ? { ...note, length: drag.length } : note));
    }
    return [...notes.filter((note) => note.midi !== drag.midi || note.beat + note.length <= drag.start + 0.001 || note.beat >= drag.start + drag.length - 0.001), { id: "drag", beat: drag.start, midi: drag.midi, length: drag.length }];
  }

  const painted = shown();

  function down(event: React.PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    const hit = cellAt(event.clientX, event.clientY);
    if (!hit) return;
    event.preventDefault();
    const covering = notes.find((note) => note.midi === hit.midi && hit.beat >= note.beat - 0.001 && hit.beat < note.beat + note.length - 0.001);
    if (covering) {
      setDrag({ mode: "edit", id: covering.id, midi: covering.midi, anchor: covering.beat, start: covering.beat, length: covering.length, moved: false, x: event.clientX });
    } else {
      setDrag({ mode: "draw", midi: hit.midi, anchor: hit.beat, start: hit.beat, length: step, moved: false, x: event.clientX });
    }
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function move(event: React.PointerEvent<HTMLDivElement>) {
    if (!drag) return;
    const hit = cellAt(event.clientX, event.clientY);
    const beat = hit && hit.midi === drag.midi ? hit.beat : drag.mode === "draw" ? drag.start : drag.anchor;
    const moved = drag.moved || Math.abs(event.clientX - drag.x) > 4;
    if (drag.mode === "draw") {
      const start = Math.min(drag.anchor, beat);
      const length = Math.abs(beat - drag.anchor) + step;
      setDrag({ ...drag, start, length, moved });
      return;
    }
    const length = Math.max(step, beat + step - drag.anchor);
    setDrag({ ...drag, start: drag.anchor, length, moved });
  }

  function up() {
    if (!drag) return;
    if (drag.mode === "edit" && drag.id && !drag.moved) onChange(notes.filter((note) => note.id !== drag.id));
    else if (drag.mode === "edit" && drag.id) onChange(notes.map((note) => (note.id === drag.id ? { ...note, length: drag.length } : note)));
    else {
      const next = notes.filter((note) => note.midi !== drag.midi || note.beat + note.length <= drag.start + 0.001 || note.beat >= drag.start + drag.length - 0.001);
      next.push({ id: uid(), beat: drag.start, midi: drag.midi, length: drag.length });
      onChange(next);
    }
    setDrag(null);
  }

  return (
    <div
      ref={scroller}
      className="scroller mt-2 max-w-full touch-none select-none overflow-x-auto rounded-lg border border-line bg-bg"
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      aria-label="Melody grid"
    >
      <div className="relative" style={{ width: gutter + cols * cell, height: header + (HIGH - LOW + 1) * rowH }}>
        <div className="absolute left-0 top-0 flex" style={{ height: header, marginLeft: gutter }}>
          {spans.map((span, index) => (
            <div key={`${span.symbol}-${index}`} className="truncate border-l border-line px-1 text-[10px] leading-5 text-muted" style={{ width: span.cols * cell }}>
              {span.symbol}
            </div>
          ))}
        </div>
        {Array.from({ length: HIGH - LOW + 1 }, (_, row) => {
          const midi = HIGH - row;
          const inScale = scale.has(midi % 12);
          return (
            <div key={midi} className="absolute left-0 flex" style={{ top: header + row * rowH, height: rowH, width: gutter + cols * cell }}>
              <div className={cn("w-[42px] shrink-0 pr-1 text-right text-[10px] leading-[18px]", inScale ? "text-ivory" : "text-muted/50")}>{pitchLabel(midi, flats)}</div>
              {Array.from({ length: cols }, (_, col) => {
                const tone = tones[col]?.includes(midi % 12);
                const live = col === activeColumn;
                return <div key={col} className={cn("border-l border-line/70", tone ? "bg-brass/10" : inScale ? "bg-raised/40" : "", live && "bg-brass/25")} style={{ width: cell, height: rowH }} />;
              })}
            </div>
          );
        })}
        {painted.map((note) => {
          const col = Math.round(note.beat / step);
          const span = Math.max(1, Math.round(note.length / step));
          const top = header + (HIGH - note.midi) * rowH + 1;
          if (note.midi < LOW || note.midi > HIGH || col >= cols) return null;
          return <div key={note.id} className="pointer-events-none absolute rounded-sm bg-brass" style={{ left: gutter + col * cell + 1, top, width: Math.min(span, cols - col) * cell - 2, height: rowH - 2 }} />;
        })}
      </div>
    </div>
  );
}
