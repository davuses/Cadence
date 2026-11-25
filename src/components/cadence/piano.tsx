import { cn } from "@/lib/cn";

const WHITE = new Set([0, 2, 4, 5, 7, 9, 11]);

type Props = {
  scalePcs: number[];
  chordPcs: number[];
  rootPc: number;
};

export function Piano({ scalePcs, chordPcs, rootPc }: Props) {
  const low = 48;
  const high = 72;
  const whites: number[] = [];
  for (let midi = low; midi <= high; midi++) {
    if (WHITE.has(midi % 12)) whites.push(midi);
  }
  const blacks: { midi: number; after: number }[] = [];
  whites.forEach((midi, index) => {
    const next = midi + 1;
    if (next <= high && !WHITE.has(next % 12)) blacks.push({ midi: next, after: index });
  });
  const scale = new Set(scalePcs);
  const chord = new Set(chordPcs);

  return (
    <div className="relative overflow-hidden rounded-lg border border-line bg-bg">
      <div className="flex h-24 sm:h-32">
        {whites.map((midi) => {
          const pc = midi % 12;
          const inChord = chord.has(pc);
          const isRoot = inChord && pc === rootPc;
          const inScale = scale.has(pc);
          return (
            <div
              key={midi}
              className={cn(
                "relative flex-1 border-r border-line last:border-r-0",
                isRoot ? "bg-brass" : inChord ? "bg-brass/45" : "bg-ivory",
              )}
            >
              {inScale && !inChord ? (
                <span className="absolute inset-x-1 bottom-1.5 h-1 rounded-full bg-brass" />
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-14 sm:h-20">
        {blacks.map(({ midi, after }) => {
          const pc = midi % 12;
          const inChord = chord.has(pc);
          const isRoot = inChord && pc === rootPc;
          const inScale = scale.has(pc);
          const left = ((after + 1) / whites.length) * 100;
          return (
            <div
              key={midi}
              style={{ left: `${left}%` }}
              className={cn(
                "absolute h-14 w-2.5 -translate-x-1/2 rounded-b-sm border border-line sm:h-20 sm:w-3.5",
                isRoot ? "bg-brass" : inChord ? "bg-brass/70" : "bg-ink",
              )}
            >
              {inScale && !inChord ? (
                <span className="absolute inset-x-0.5 bottom-1 h-0.5 rounded-full bg-brass" />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
