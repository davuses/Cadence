import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as AudioLines, a as Repeat, c as Piano, d as Guitar, f as Drum, g as AudioWaveform, h as ChevronLeft, i as Square, l as Music4, m as ChevronRight, o as Plus, p as Copy, r as Trash2, s as Play, t as Waves, u as Minus } from "../_libs/lucide-react.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CFhtBTIO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LETTERS = [
	"C",
	"D",
	"E",
	"F",
	"G",
	"A",
	"B"
];
var NATURAL_PC = [
	0,
	2,
	4,
	5,
	7,
	9,
	11
];
var MAJOR_SCALE = [
	0,
	2,
	4,
	5,
	7,
	9,
	11
];
var SCALES = [
	{
		id: "major",
		name: "Major",
		hint: "Ionian, bright and open",
		intervals: [
			0,
			2,
			4,
			5,
			7,
			9,
			11
		]
	},
	{
		id: "natural-minor",
		name: "Natural minor",
		hint: "Aeolian, the pop minor",
		intervals: [
			0,
			2,
			3,
			5,
			7,
			8,
			10
		]
	},
	{
		id: "harmonic-minor",
		name: "Harmonic minor",
		hint: "Raised 7, major V",
		intervals: [
			0,
			2,
			3,
			5,
			7,
			8,
			11
		]
	},
	{
		id: "melodic-minor",
		name: "Melodic minor",
		hint: "Jazz minor, raised 6 and 7",
		intervals: [
			0,
			2,
			3,
			5,
			7,
			9,
			11
		]
	},
	{
		id: "dorian",
		name: "Dorian",
		hint: "Minor with a bright 6",
		intervals: [
			0,
			2,
			3,
			5,
			7,
			9,
			10
		]
	},
	{
		id: "phrygian",
		name: "Phrygian",
		hint: "Flat 2, Spanish color",
		intervals: [
			0,
			1,
			3,
			5,
			7,
			8,
			10
		]
	},
	{
		id: "lydian",
		name: "Lydian",
		hint: "Raised 4, floating",
		intervals: [
			0,
			2,
			4,
			6,
			7,
			9,
			11
		]
	},
	{
		id: "mixolydian",
		name: "Mixolydian",
		hint: "Flat 7, rock and blues",
		intervals: [
			0,
			2,
			4,
			5,
			7,
			9,
			10
		]
	}
];
var SCALE_BY_ID = Object.fromEntries(SCALES.map((s) => [s.id, s]));
var PARENT_SHIFT = {
	major: 0,
	lydian: -5,
	mixolydian: -7,
	dorian: -2,
	phrygian: -4,
	"natural-minor": 3,
	"harmonic-minor": 3,
	"melodic-minor": 3
};
var FLAT_PARENTS = /* @__PURE__ */ new Set([
	5,
	10,
	3,
	8,
	1,
	6
]);
var SHAPES = {
	maj: [
		{
			letter: 0,
			semi: 0
		},
		{
			letter: 2,
			semi: 4
		},
		{
			letter: 4,
			semi: 7
		}
	],
	min: [
		{
			letter: 0,
			semi: 0
		},
		{
			letter: 2,
			semi: 3
		},
		{
			letter: 4,
			semi: 7
		}
	],
	dim: [
		{
			letter: 0,
			semi: 0
		},
		{
			letter: 2,
			semi: 3
		},
		{
			letter: 4,
			semi: 6
		}
	],
	aug: [
		{
			letter: 0,
			semi: 0
		},
		{
			letter: 2,
			semi: 4
		},
		{
			letter: 4,
			semi: 8
		}
	],
	dom7: [
		{
			letter: 0,
			semi: 0
		},
		{
			letter: 2,
			semi: 4
		},
		{
			letter: 4,
			semi: 7
		},
		{
			letter: 6,
			semi: 10
		}
	],
	maj7: [
		{
			letter: 0,
			semi: 0
		},
		{
			letter: 2,
			semi: 4
		},
		{
			letter: 4,
			semi: 7
		},
		{
			letter: 6,
			semi: 11
		}
	],
	min7: [
		{
			letter: 0,
			semi: 0
		},
		{
			letter: 2,
			semi: 3
		},
		{
			letter: 4,
			semi: 7
		},
		{
			letter: 6,
			semi: 10
		}
	],
	m7b5: [
		{
			letter: 0,
			semi: 0
		},
		{
			letter: 2,
			semi: 3
		},
		{
			letter: 4,
			semi: 6
		},
		{
			letter: 6,
			semi: 10
		}
	],
	dim7: [
		{
			letter: 0,
			semi: 0
		},
		{
			letter: 2,
			semi: 3
		},
		{
			letter: 4,
			semi: 6
		},
		{
			letter: 6,
			semi: 9
		}
	],
	sus2: [
		{
			letter: 0,
			semi: 0
		},
		{
			letter: 1,
			semi: 2
		},
		{
			letter: 4,
			semi: 7
		}
	],
	sus4: [
		{
			letter: 0,
			semi: 0
		},
		{
			letter: 3,
			semi: 5
		},
		{
			letter: 4,
			semi: 7
		}
	],
	add9: [
		{
			letter: 0,
			semi: 0
		},
		{
			letter: 2,
			semi: 4
		},
		{
			letter: 4,
			semi: 7
		},
		{
			letter: 1,
			semi: 14
		}
	]
};
var QUALITY_OPTIONS = [
	{
		id: "auto",
		label: "Auto"
	},
	{
		id: "maj",
		label: "Maj"
	},
	{
		id: "min",
		label: "min"
	},
	{
		id: "dom7",
		label: "7"
	},
	{
		id: "maj7",
		label: "maj7"
	},
	{
		id: "min7",
		label: "m7"
	},
	{
		id: "m7b5",
		label: "m7♭5"
	},
	{
		id: "dim",
		label: "dim"
	},
	{
		id: "dim7",
		label: "dim7"
	},
	{
		id: "aug",
		label: "aug"
	},
	{
		id: "sus2",
		label: "sus2"
	},
	{
		id: "sus4",
		label: "sus4"
	},
	{
		id: "add9",
		label: "add9"
	}
];
function bare(degree, quality = "auto") {
	return {
		degree,
		accidental: 0,
		quality,
		inversion: 0,
		bars: 1
	};
}
var PRESETS = [
	{
		id: "pop",
		name: "I–V–vi–IV",
		group: "Pop",
		slots: [
			0,
			4,
			5,
			3
		].map((d) => bare(d))
	},
	{
		id: "axis",
		name: "vi–IV–I–V",
		group: "Pop",
		slots: [
			5,
			3,
			0,
			4
		].map((d) => bare(d))
	},
	{
		id: "fifties",
		name: "I–vi–IV–V",
		group: "Pop",
		slots: [
			0,
			5,
			3,
			4
		].map((d) => bare(d))
	},
	{
		id: "canon",
		name: "Canon",
		group: "Pop",
		slots: [
			0,
			4,
			5,
			2,
			3,
			0,
			3,
			4
		].map((d) => bare(d))
	},
	{
		id: "one-four-five",
		name: "I–IV–V",
		group: "Pop",
		slots: [
			0,
			3,
			4,
			0
		].map((d) => bare(d))
	},
	{
		id: "two-five",
		name: "ii–V–I",
		group: "Jazz",
		scale: "major",
		extensions: true,
		slots: [
			bare(1, "min7"),
			bare(4, "dom7"),
			bare(0, "maj7"),
			bare(0, "maj7")
		]
	},
	{
		id: "turnaround",
		name: "I–VI–ii–V",
		group: "Jazz",
		scale: "major",
		extensions: true,
		slots: [
			bare(0, "maj7"),
			bare(5, "dom7"),
			bare(1, "min7"),
			bare(4, "dom7")
		]
	},
	{
		id: "blues",
		name: "12-bar blues",
		group: "Blues",
		scale: "mixolydian",
		slots: [
			0,
			0,
			0,
			0,
			3,
			3,
			0,
			0,
			4,
			3,
			0,
			4
		].map((d) => bare(d, "dom7"))
	},
	{
		id: "andalusian",
		name: "Andalusian",
		group: "Minor",
		scale: "harmonic-minor",
		slots: [
			bare(0),
			{
				...bare(6),
				accidental: -1
			},
			bare(5),
			bare(4)
		]
	},
	{
		id: "minor-pop",
		name: "i–♭VI–♭III–♭VII",
		group: "Minor",
		scale: "natural-minor",
		slots: [
			0,
			5,
			2,
			6
		].map((d) => bare(d))
	},
	{
		id: "aeolian",
		name: "i–♭VII–♭VI",
		group: "Minor",
		scale: "natural-minor",
		slots: [
			0,
			6,
			5,
			6
		].map((d) => bare(d))
	},
	{
		id: "creep",
		name: "I–III–IV–iv",
		group: "Color",
		scale: "major",
		slots: [
			bare(0),
			bare(2, "maj"),
			bare(3),
			bare(3, "min")
		]
	},
	{
		id: "mixo",
		name: "I–♭VII–IV",
		group: "Color",
		scale: "mixolydian",
		slots: [
			0,
			6,
			3,
			0
		].map((d) => bare(d))
	},
	{
		id: "dorian",
		name: "i–IV vamp",
		group: "Color",
		scale: "dorian",
		slots: [
			0,
			3,
			0,
			3
		].map((d) => bare(d))
	},
	{
		id: "phrygian",
		name: "i–♭II",
		group: "Color",
		scale: "phrygian",
		slots: [
			0,
			1,
			0,
			1
		].map((d) => bare(d))
	}
];
var PRESET_GROUPS = [
	"Pop",
	"Jazz",
	"Blues",
	"Minor",
	"Color"
];
var seq = 0;
function uid() {
	seq += 1;
	return `c${seq.toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}
function autoFlats(rootPc, scaleId) {
	const parent = (rootPc + PARENT_SHIFT[scaleId] + 120) % 12;
	return FLAT_PARENTS.has(parent);
}
function prefersFlats(rootPc, scaleId, spelling) {
	if (spelling === "flat") return true;
	if (spelling === "sharp") return false;
	return autoFlats(rootPc, scaleId);
}
function suffix(delta) {
	if (delta === 0) return "";
	if (delta === 1) return "#";
	if (delta === 2) return "##";
	if (delta === -1) return "b";
	if (delta === -2) return "bb";
	if (delta > 2) return "#".repeat(delta);
	return "b".repeat(-delta);
}
function pretty(name) {
	return name.replaceAll("##", "𝄪").replaceAll("#", "♯").replaceAll("bb", "𝄫").replaceAll("b", "♭");
}
function nameToPc(name) {
	const letter = LETTERS.indexOf(name[0] ?? "C");
	const acc = name.slice(1);
	const delta = acc === "#" ? 1 : acc === "##" ? 2 : acc === "b" ? -1 : acc === "bb" ? -2 : 0;
	return (NATURAL_PC[letter] + delta + 120) % 12;
}
function spellRoot(pc, flats) {
	return flats ? [
		"C",
		"Db",
		"D",
		"Eb",
		"E",
		"F",
		"Gb",
		"G",
		"Ab",
		"A",
		"Bb",
		"B"
	][(pc % 12 + 12) % 12] : [
		"C",
		"C#",
		"D",
		"D#",
		"E",
		"F",
		"F#",
		"G",
		"G#",
		"A",
		"A#",
		"B"
	][(pc % 12 + 12) % 12];
}
function spellScale(rootPc, scaleId, flats) {
	const intervals = SCALE_BY_ID[scaleId].intervals;
	const options = [];
	NATURAL_PC.forEach((pc, letterIndex) => {
		let delta = (rootPc - pc + 12) % 12;
		if (delta > 6) delta -= 12;
		if (Math.abs(delta) <= 2) options.push({
			letterIndex,
			delta
		});
	});
	const preferred = options.filter((o) => flats ? o.delta <= 0 : o.delta >= 0);
	const start = (preferred.length ? preferred : options).slice().sort((a, b) => Math.abs(a.delta) - Math.abs(b.delta))[0]?.letterIndex ?? 0;
	return intervals.map((interval, degree) => {
		const pc = (rootPc + interval) % 12;
		const letterIndex = (start + degree) % 7;
		let delta = (pc - NATURAL_PC[letterIndex] + 12) % 12;
		if (delta > 6) delta -= 12;
		return LETTERS[letterIndex] + suffix(delta);
	});
}
function alterSpelling(name, accidental) {
	if (accidental === 0) return name;
	const letter = name[0] ?? "C";
	const acc = name.slice(1);
	return letter + suffix((acc === "#" ? 1 : acc === "##" ? 2 : acc === "b" ? -1 : acc === "bb" ? -2 : 0) + accidental);
}
function diatonicQuality(intervals, degree, sevenths) {
	const root = intervals[degree % intervals.length];
	const third = intervals[(degree + 2) % intervals.length];
	const fifth = intervals[(degree + 4) % intervals.length];
	const seventh = intervals[(degree + 6) % intervals.length];
	const i3 = (third - root + 12) % 12;
	const i5 = (fifth - root + 12) % 12;
	const i7 = (seventh - root + 12) % 12;
	let triad;
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
function resolveQuality(slot, intervals, extensions) {
	if (slot.quality !== "auto") return slot.quality;
	if (slot.accidental < 0) return extensions ? "maj7" : "maj";
	if (slot.accidental > 0) return extensions ? "min7" : "min";
	return diatonicQuality(intervals, slot.degree, extensions);
}
function spellChord(rootName, quality) {
	const rootLetter = Math.max(0, LETTERS.indexOf(rootName[0] ?? "C"));
	const rootPc = nameToPc(rootName);
	return SHAPES[quality].map((step) => {
		const letterIndex = (rootLetter + step.letter) % 7;
		const natural = NATURAL_PC[letterIndex];
		const target = (rootPc + step.semi % 12) % 12;
		let delta = (target - natural + 12) % 12;
		if (delta > 6) delta -= 12;
		return {
			name: LETTERS[letterIndex] + suffix(delta),
			pc: target
		};
	});
}
var ROMAN = [
	"I",
	"II",
	"III",
	"IV",
	"V",
	"VI",
	"VII"
];
function alterationPrefix(intervals, degree, accidental) {
	let delta = ((intervals[degree] + accidental + 12) % 12 - MAJOR_SCALE[degree] + 12) % 12;
	if (delta > 6) delta -= 12;
	if (delta <= -2) return "𝄫";
	if (delta === -1) return "♭";
	if (delta === 1) return "♯";
	if (delta >= 2) return "𝄪";
	return "";
}
function romanFor(degree, quality, prefix) {
	let body = quality === "min" || quality === "dim" || quality === "min7" || quality === "m7b5" || quality === "dim7" ? ROMAN[degree].toLowerCase() : ROMAN[degree];
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
function symbolFor(root, quality, bass) {
	const head = quality === "maj" ? root : quality === "min" ? `${root}m` : quality === "dim" ? `${root}dim` : quality === "aug" ? `${root}aug` : quality === "dom7" ? `${root}7` : quality === "maj7" ? `${root}maj7` : quality === "min7" ? `${root}m7` : quality === "m7b5" ? `${root}m7b5` : quality === "dim7" ? `${root}dim7` : quality === "sus2" ? `${root}sus2` : quality === "sus4" ? `${root}sus4` : `${root}add9`;
	return bass && bass !== root ? `${head}/${bass}` : head;
}
function placeNear(pc, center) {
	const pitch = (pc % 12 + 12) % 12;
	const base = center - center % 12 + pitch;
	const candidates = [
		base - 12,
		base,
		base + 12
	];
	candidates.sort((a, b) => Math.abs(a - center) - Math.abs(b - center));
	return candidates[0];
}
function voiceMidis(pcs, bassPc, timbre) {
	const unique = [...new Set(pcs.map((pc) => (pc % 12 + 12) % 12))];
	if (!unique.length) return [];
	if (timbre === "guitar" || timbre === "nylon") {
		const bass = placeNear(bassPc, timbre === "nylon" ? 48 : 45);
		const notes = [bass];
		const span = timbre === "nylon" ? 22 : 28;
		const cap = timbre === "nylon" ? 5 : 6;
		for (let midi = bass + 1; midi <= bass + span && notes.length < cap; midi++) if (unique.includes(midi % 12)) notes.push(midi);
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
		for (let midi = bass + 3; midi <= bass + 19 && notes.length < 4; midi++) if (unique.includes(midi % 12)) notes.push(midi);
		return notes;
	}
	const bass = placeNear(bassPc, 40);
	const upper = [];
	for (let midi = 60; midi < 72; midi++) if (unique.includes(midi % 12)) upper.push(midi);
	return [bass, ...upper.filter((n) => n - bass > 3)];
}
function scalePcs(rootPc, scaleId) {
	return SCALE_BY_ID[scaleId].intervals.map((i) => (rootPc + i) % 12);
}
function keyTitle(rootPc, scaleId, spelling) {
	return `${pretty(spellRoot(rootPc, prefersFlats(rootPc, scaleId, spelling)))} ${SCALE_BY_ID[scaleId].name}`;
}
function resolveSlot(slot, ctx) {
	const scale = SCALE_BY_ID[ctx.scaleId];
	const flats = prefersFlats(ctx.rootPc, ctx.scaleId, ctx.spelling);
	const names = spellScale(ctx.rootPc, ctx.scaleId, flats);
	const degree = (slot.degree % 7 + 7) % 7;
	const rootName = alterSpelling(names[degree] ?? "C", slot.accidental);
	const quality = resolveQuality({
		...slot,
		degree
	}, scale.intervals, ctx.extensions);
	const tones = spellChord(rootName, quality);
	const inv = Math.max(0, Math.min(slot.inversion, tones.length - 1));
	const bass = tones[inv] ?? tones[0];
	const prefix = alterationPrefix(scale.intervals, degree, slot.accidental);
	const pcs = tones.map((t) => t.pc);
	return {
		id: slot.id,
		roman: romanFor(degree, quality, prefix),
		symbol: pretty(symbolFor(rootName, quality, inv > 0 ? bass?.name : void 0)),
		noteNames: tones.map((t) => pretty(t.name)),
		rootPc: tones[0]?.pc ?? 0,
		bassPc: bass?.pc ?? 0,
		pcs,
		midis: voiceMidis(pcs, bass?.pc ?? 0, ctx.timbre),
		quality,
		degree,
		bars: slot.bars
	};
}
function resolveAll(slots, ctx) {
	return slots.map((slot) => resolveSlot(slot, ctx));
}
function slotForPitch(rootPc, scaleId, targetPc, flats) {
	const intervals = SCALE_BY_ID[scaleId].intervals;
	const rel = (targetPc - rootPc + 12) % 12;
	for (let degree = 0; degree < intervals.length; degree++) if (intervals[degree] === rel) return {
		degree,
		accidental: 0
	};
	const found = [];
	for (let degree = 0; degree < intervals.length; degree++) {
		if ((intervals[degree] + 1) % 12 === rel) found.push({
			degree,
			accidental: 1
		});
		if ((intervals[degree] + 11) % 12 === rel) found.push({
			degree,
			accidental: -1
		});
	}
	if (!found.length) return {
		degree: 0,
		accidental: 0
	};
	return found.find((item) => flats ? item.accidental < 0 : item.accidental > 0) ?? found[0];
}
function rootChoices(flats) {
	return Array.from({ length: 12 }, (_, pc) => ({
		pc,
		label: pretty(spellRoot(pc, flats))
	}));
}
var PATTERNS = [
	{
		id: "folk",
		name: "Folk strum",
		blurb: "Down, down-up, up-down-up",
		meter: 4,
		signature: "4/4",
		family: "strum"
	},
	{
		id: "eighths",
		name: "Eighths",
		blurb: "Steady down-up pulse",
		meter: 4,
		signature: "4/4",
		family: "strum"
	},
	{
		id: "shuffle",
		name: "Shuffle",
		blurb: "Swung eighths, blues and soul",
		meter: 4,
		signature: "4/4",
		family: "strum"
	},
	{
		id: "downs",
		name: "Downstrums",
		blurb: "Four broad downstrokes",
		meter: 4,
		signature: "4/4",
		family: "strum"
	},
	{
		id: "pulse",
		name: "Pulse",
		blurb: "Short chords, four to the bar",
		meter: 4,
		signature: "4/4",
		family: "strum"
	},
	{
		id: "block",
		name: "Sustain",
		blurb: "One chord, let it ring",
		meter: 4,
		signature: "4/4",
		family: "strum"
	},
	{
		id: "ballad",
		name: "Ballad",
		blurb: "Bass then chord, piano feel",
		meter: 4,
		signature: "4/4",
		family: "strum"
	},
	{
		id: "waltz",
		name: "Waltz",
		blurb: "Bass-chord-chord in 3/4",
		meter: 3,
		signature: "3/4",
		family: "strum"
	},
	{
		id: "compound",
		name: "6/8",
		blurb: "A lilt on one and four",
		meter: 3,
		signature: "6/8",
		family: "strum"
	},
	{
		id: "offbeat",
		name: "Offbeat",
		blurb: "Short chords on the ands",
		meter: 4,
		signature: "4/4",
		family: "strum"
	},
	{
		id: "arp",
		name: "Arpeggio",
		blurb: "Notes climbing one by one",
		meter: 4,
		signature: "4/4",
		family: "arp"
	},
	{
		id: "rolling",
		name: "Rolling",
		blurb: "Up and back down",
		meter: 4,
		signature: "4/4",
		family: "arp"
	},
	{
		id: "travis",
		name: "Fingerpick",
		blurb: "Alternating bass and fingers",
		meter: 4,
		signature: "4/4",
		family: "arp"
	},
	{
		id: "alberti",
		name: "Alberti",
		blurb: "Low, high, middle, high",
		meter: 4,
		signature: "4/4",
		family: "arp"
	}
];
function patternById(id) {
	return PATTERNS.find((p) => p.id === id) ?? PATTERNS[0];
}
function decayFor(bpm, timbre, feel) {
	const beat = 60 / bpm;
	if (timbre === "organ" || timbre === "strings") {
		if (feel === "short") return Math.min(.7, Math.max(.32, beat * .85));
		if (feel === "medium") return Math.min(2.2, Math.max(.7, beat * 1.8));
		return Math.min(4.4, Math.max(1.3, beat * (timbre === "strings" ? 3.4 : 3)));
	}
	if (timbre === "bass") {
		if (feel === "short") return Math.min(.28, Math.max(.12, beat * .45));
		if (feel === "medium") return Math.min(.9, Math.max(.22, beat * .8));
		return Math.min(1.6, Math.max(.4, beat * 1.4));
	}
	if (feel === "short") return Math.min(.18, Math.max(.09, beat * .35));
	if (feel === "medium") return Math.max(.25, Math.min(1.4, beat * 1.2));
	return Math.min(3.4, Math.max(.5, beat * (timbre === "guitar" ? 2 : timbre === "nylon" ? 2.6 : timbre === "soft" ? 2.6 : 2.2)));
}
function strum(midis, direction, velocity, decay) {
	if (!midis.length) return [];
	const ordered = direction === "up" ? [...midis].reverse() : [...midis];
	const stagger = direction === "block" ? 0 : .014;
	return ordered.map((midi, i) => ({
		midi,
		delay: i * stagger,
		velocity: Math.max(.2, velocity * (direction === "block" ? 1 : .96 - i * .035)),
		decay
	}));
}
function pick(midis, target) {
	if (!midis.length) return [];
	if (target === "bass") return [midis[0]];
	if (target === "upper") return midis.length > 1 ? midis.slice(1) : midis;
	return midis;
}
function strumHits(events, midis, bpm, timbre) {
	return events.map((event) => ({
		beat: event.beat,
		notes: strum(pick(midis, event.target), event.direction, event.velocity, decayFor(bpm, timbre, event.feel))
	}));
}
function cycleHits(midis, cycle, steps, bpm, timbre, step = .5) {
	if (!cycle.length) return [];
	const decay = decayFor(bpm, timbre, "ring");
	return Array.from({ length: steps }, (_, i) => ({
		beat: i * step,
		notes: [{
			midi: cycle[i % cycle.length],
			delay: 0,
			velocity: i % cycle.length === 0 ? .9 : .72,
			decay
		}]
	}));
}
function once(patternId, midis, bpm, timbre) {
	const meter = patternById(patternId).meter;
	const safe = midis.length ? midis : [60];
	if (patternId === "folk") return {
		meter,
		lengthBeats: 4,
		hits: strumHits([
			{
				beat: 0,
				target: "all",
				direction: "down",
				velocity: .92,
				feel: "ring"
			},
			{
				beat: 1,
				target: "all",
				direction: "down",
				velocity: .74,
				feel: "medium"
			},
			{
				beat: 1.5,
				target: "upper",
				direction: "up",
				velocity: .52,
				feel: "medium"
			},
			{
				beat: 2,
				target: "upper",
				direction: "up",
				velocity: .6,
				feel: "medium"
			},
			{
				beat: 2.5,
				target: "all",
				direction: "down",
				velocity: .7,
				feel: "medium"
			},
			{
				beat: 3,
				target: "upper",
				direction: "up",
				velocity: .55,
				feel: "medium"
			}
		], safe, bpm, timbre)
	};
	if (patternId === "eighths") return {
		meter,
		lengthBeats: 4,
		hits: strumHits(Array.from({ length: 8 }, (_, i) => ({
			beat: i * .5,
			target: i % 2 === 0 ? "all" : "upper",
			direction: i % 2 === 0 ? "down" : "up",
			velocity: i % 2 === 0 ? .78 : .5,
			feel: "medium"
		})), safe, bpm, timbre)
	};
	if (patternId === "shuffle") return {
		meter,
		lengthBeats: 4,
		hits: strumHits([
			0,
			2 / 3,
			1,
			1 + 2 / 3,
			2,
			2 + 2 / 3,
			3,
			3 + 2 / 3
		].map((beat, i) => ({
			beat,
			target: i % 2 === 0 ? "all" : "upper",
			direction: i % 2 === 0 ? "down" : "up",
			velocity: i % 2 === 0 ? .84 : .46,
			feel: "short"
		})), safe, bpm, timbre)
	};
	if (patternId === "downs") return {
		meter,
		lengthBeats: 4,
		hits: strumHits([
			0,
			1,
			2,
			3
		].map((beat, i) => ({
			beat,
			target: "all",
			direction: "down",
			velocity: i % 2 === 0 ? .88 : .7,
			feel: "medium"
		})), safe, bpm, timbre)
	};
	if (patternId === "pulse") return {
		meter,
		lengthBeats: 4,
		hits: strumHits([
			0,
			1,
			2,
			3
		].map((beat, i) => ({
			beat,
			target: "all",
			direction: "down",
			velocity: i % 2 === 0 ? .84 : .58,
			feel: "short"
		})), safe, bpm, timbre)
	};
	if (patternId === "block") return {
		meter,
		lengthBeats: 4,
		hits: strumHits([{
			beat: 0,
			target: "all",
			direction: "block",
			velocity: .9,
			feel: "ring"
		}], safe, bpm, timbre)
	};
	if (patternId === "ballad") return {
		meter,
		lengthBeats: 4,
		hits: strumHits([
			{
				beat: 0,
				target: "bass",
				direction: "block",
				velocity: .95,
				feel: "ring"
			},
			{
				beat: 1,
				target: "upper",
				direction: "block",
				velocity: .7,
				feel: "ring"
			},
			{
				beat: 2,
				target: "bass",
				direction: "block",
				velocity: .8,
				feel: "ring"
			},
			{
				beat: 3,
				target: "upper",
				direction: "block",
				velocity: .66,
				feel: "ring"
			}
		], safe, bpm, timbre)
	};
	if (patternId === "waltz") return {
		meter: 3,
		lengthBeats: 3,
		hits: strumHits([
			{
				beat: 0,
				target: "all",
				direction: "down",
				velocity: .9,
				feel: "ring"
			},
			{
				beat: 1,
				target: "upper",
				direction: "block",
				velocity: .58,
				feel: "medium"
			},
			{
				beat: 2,
				target: "upper",
				direction: "block",
				velocity: .58,
				feel: "medium"
			}
		], safe, bpm, timbre)
	};
	if (patternId === "compound") return {
		meter: 3,
		lengthBeats: 3,
		hits: strumHits([
			{
				beat: 0,
				target: "all",
				direction: "down",
				velocity: .9,
				feel: "ring"
			},
			{
				beat: 1,
				target: "upper",
				direction: "up",
				velocity: .48,
				feel: "short"
			},
			{
				beat: 1.5,
				target: "all",
				direction: "down",
				velocity: .78,
				feel: "medium"
			},
			{
				beat: 2.5,
				target: "upper",
				direction: "up",
				velocity: .46,
				feel: "short"
			}
		], safe, bpm, timbre)
	};
	if (patternId === "offbeat") return {
		meter,
		lengthBeats: 4,
		hits: strumHits([
			.5,
			1.5,
			2.5,
			3.5
		].map((beat) => ({
			beat,
			target: "upper",
			direction: "block",
			velocity: .72,
			feel: "short"
		})), safe, bpm, timbre)
	};
	if (patternId === "arp") return {
		meter,
		lengthBeats: 4,
		hits: cycleHits(safe, safe, 8, bpm, timbre)
	};
	if (patternId === "rolling") {
		const down = safe.length > 1 ? [...safe].slice(0, -1).reverse() : [];
		return {
			meter,
			lengthBeats: 4,
			hits: cycleHits(safe, [...safe, ...down], 8, bpm, timbre)
		};
	}
	if (patternId === "travis") {
		const bass = safe[0];
		const upper = safe.slice(1);
		const u = (i) => upper[i % Math.max(1, upper.length)] ?? bass;
		return {
			meter,
			lengthBeats: 4,
			hits: cycleHits(safe, [
				bass,
				u(0),
				u(1),
				u(2),
				bass,
				u(2),
				u(1),
				u(0)
			], 8, bpm, timbre)
		};
	}
	const pool = safe.slice(1);
	const low = pool[0] ?? safe[0];
	const high = pool[pool.length - 1] ?? safe[0];
	return {
		meter,
		lengthBeats: 4,
		hits: cycleHits(safe, [
			low,
			high,
			pool[Math.min(1, Math.max(0, pool.length - 1))] ?? low,
			high
		], 8, bpm, timbre)
	};
}
function addClicks(hits, lengthBeats, enabled) {
	const out = hits.map((h) => ({
		...h,
		notes: h.notes.map((n) => ({ ...n }))
	}));
	if (!enabled) return out.sort((a, b) => a.beat - b.beat);
	for (let beat = 0; beat < lengthBeats; beat++) {
		const existing = out.find((h) => Math.abs(h.beat - beat) < .001);
		if (existing) existing.click = true;
		else out.push({
			beat,
			notes: [],
			click: true
		});
	}
	return out.sort((a, b) => a.beat - b.beat);
}
function durationBeats(patternId, bars) {
	return patternById(patternId).meter * bars;
}
function buildHits(patternId, midis, opts) {
	const base = once(patternId, midis, opts.bpm, opts.timbre);
	let hits = base.hits;
	let lengthBeats = base.lengthBeats;
	if (opts.bars === 2) {
		const shift = lengthBeats;
		hits = [...hits, ...hits.map((h) => ({
			...h,
			beat: h.beat + shift,
			notes: h.notes.map((n) => ({ ...n }))
		}))];
		lengthBeats = shift * 2;
	} else if (opts.bars === .5) {
		const half = lengthBeats / 2;
		hits = hits.filter((h) => h.beat < half - .001).map((h) => ({
			...h,
			notes: h.notes.map((n) => ({ ...n }))
		}));
		lengthBeats = half;
	}
	return {
		hits: addClicks(hits, lengthBeats, opts.metronome),
		lengthBeats,
		meter: base.meter
	};
}
function countInHits(meter) {
	return Array.from({ length: meter }, (_, beat) => ({
		beat,
		notes: [],
		click: true
	}));
}
var DRUM_BARS = {
	ballad: {
		bar: 4,
		hits: [
			{
				beat: 0,
				voice: "kick",
				velocity: .7
			},
			{
				beat: 2,
				voice: "snare",
				velocity: .42
			},
			{
				beat: 0,
				voice: "hat",
				velocity: .2
			},
			{
				beat: 1,
				voice: "hat",
				velocity: .16
			},
			{
				beat: 2,
				voice: "hat",
				velocity: .2
			},
			{
				beat: 3,
				voice: "hat",
				velocity: .16
			}
		]
	},
	pop: {
		bar: 4,
		hits: [
			{
				beat: 0,
				voice: "kick",
				velocity: .86
			},
			{
				beat: 2.5,
				voice: "kick",
				velocity: .5
			},
			{
				beat: 1,
				voice: "snare",
				velocity: .68
			},
			{
				beat: 3,
				voice: "snare",
				velocity: .68
			},
			...[
				0,
				.5,
				1,
				1.5,
				2,
				2.5,
				3,
				3.5
			].map((beat) => ({
				beat,
				voice: "hat",
				velocity: beat % 1 === 0 ? .32 : .2
			}))
		]
	},
	clap: {
		bar: 4,
		hits: [
			{
				beat: 0,
				voice: "kick",
				velocity: .55
			},
			{
				beat: 1,
				voice: "clap",
				velocity: .74
			},
			{
				beat: 3,
				voice: "clap",
				velocity: .74
			},
			{
				beat: .5,
				voice: "hat",
				velocity: .18
			},
			{
				beat: 1.5,
				voice: "hat",
				velocity: .18
			},
			{
				beat: 2.5,
				voice: "hat",
				velocity: .18
			},
			{
				beat: 3.5,
				voice: "hat",
				velocity: .18
			}
		]
	},
	shaker: {
		bar: 4,
		hits: [{
			beat: 0,
			voice: "kick",
			velocity: .4
		}, ...[
			0,
			.5,
			1,
			1.5,
			2,
			2.5,
			3,
			3.5
		].map((beat) => ({
			beat,
			voice: "hat",
			velocity: beat % 1 === 0 ? .38 : .22
		}))]
	},
	shuffle: {
		bar: 4,
		hits: [
			{
				beat: 0,
				voice: "kick",
				velocity: .8
			},
			{
				beat: 2,
				voice: "kick",
				velocity: .62
			},
			{
				beat: 1,
				voice: "snare",
				velocity: .66
			},
			{
				beat: 3,
				voice: "snare",
				velocity: .66
			},
			...[
				0,
				2 / 3,
				1,
				1 + 2 / 3,
				2,
				2 + 2 / 3,
				3,
				3 + 2 / 3
			].map((beat) => ({
				beat,
				voice: "hat",
				velocity: Math.abs(beat - Math.round(beat)) < .05 ? .34 : .18
			}))
		]
	},
	waltz: {
		bar: 3,
		hits: [
			{
				beat: 0,
				voice: "kick",
				velocity: .78
			},
			{
				beat: 1,
				voice: "hat",
				velocity: .32
			},
			{
				beat: 2,
				voice: "hat",
				velocity: .26
			}
		]
	},
	compound: {
		bar: 3,
		hits: [
			{
				beat: 0,
				voice: "kick",
				velocity: .8
			},
			{
				beat: 1.5,
				voice: "snare",
				velocity: .6
			},
			...[
				0,
				.5,
				1,
				1.5,
				2,
				2.5
			].map((beat) => ({
				beat,
				voice: "hat",
				velocity: .22
			}))
		]
	}
};
function drumEvents(id, lengthBeats) {
	if (id === "off" || lengthBeats <= 0) return [];
	const pattern = DRUM_BARS[id];
	const out = [];
	for (let origin = 0; origin < lengthBeats - .001; origin += pattern.bar) for (const hit of pattern.hits) {
		const beat = origin + hit.beat;
		if (beat < lengthBeats - .001) out.push({
			...hit,
			beat
		});
	}
	return out;
}
var STORAGE_KEY = "cadence.v2";
var LEGACY_KEY = "cadence.v1";
var SCALE_IDS = new Set(SCALES.map((scale) => scale.id));
var TIMBRES = /* @__PURE__ */ new Set([
	"guitar",
	"nylon",
	"piano",
	"soft",
	"organ",
	"bass",
	"strings"
]);
var DRUMS = /* @__PURE__ */ new Set([
	"off",
	"ballad",
	"pop",
	"clap",
	"shaker",
	"shuffle",
	"waltz",
	"compound"
]);
var MELODY_SOUNDS$1 = /* @__PURE__ */ new Set([
	"piano",
	"soft",
	"lead",
	"flute",
	"bit"
]);
var QUALITIES = /* @__PURE__ */ new Set([
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
	"add9"
]);
var SECTION_NAMES = [
	"Verse",
	"Chorus",
	"Pre-chorus",
	"Bridge",
	"Tag"
];
function clampBpm(bpm) {
	return Math.min(200, Math.max(40, Math.round(bpm)));
}
function freshSlots(defs) {
	return defs.map((slot) => ({
		...slot,
		id: uid()
	}));
}
function groove(section, timbre) {
	return {
		intensity: "medium",
		autoBass: false,
		drumId: "off",
		drumsOn: false,
		drumVolume: .7,
		melody: [],
		melodySound: "piano",
		melodyVolume: .75,
		melodyMute: false,
		melodyStep: .5,
		...section,
		timbre: section.timbre ?? timbre
	};
}
function sectionFromPreset(name, presetId, patternId, timbre = "guitar") {
	const preset = PRESETS.find((item) => item.id === presetId) ?? PRESETS[0];
	const slots = freshSlots(preset.slots);
	return groove({
		id: uid(),
		name,
		lyric: "",
		patternId,
		slots,
		selectedId: slots[0].id,
		activePreset: preset.id
	}, timbre);
}
function makeSong(title) {
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
		activeSectionId: verse.id
	};
}
function nextSectionName(sections) {
	const taken = new Set(sections.map((section) => section.name));
	return SECTION_NAMES.find((name) => !taken.has(name)) ?? `Section ${sections.length + 1}`;
}
function uniqueTitle(songs, base) {
	const taken = new Set(songs.map((song) => song.title));
	if (!taken.has(base)) return base;
	let n = 2;
	while (taken.has(`${base} ${n}`)) n += 1;
	return `${base} ${n}`;
}
function sanitizeSlot(value) {
	if (!value || typeof value !== "object") return null;
	const slot = value;
	if (typeof slot.degree !== "number" || slot.degree < 0 || slot.degree > 6) return null;
	const accidental = slot.accidental === -1 || slot.accidental === 1 ? slot.accidental : 0;
	const inversion = typeof slot.inversion === "number" ? Math.max(0, Math.min(3, Math.round(slot.inversion))) : 0;
	const bars = slot.bars === .5 || slot.bars === 2 ? slot.bars : 1;
	const quality = typeof slot.quality === "string" && QUALITIES.has(slot.quality) ? slot.quality : "auto";
	return {
		id: typeof slot.id === "string" ? slot.id : uid(),
		degree: slot.degree,
		accidental,
		quality,
		inversion,
		bars
	};
}
function sanitizeMelody(value) {
	if (!Array.isArray(value)) return [];
	const notes = [];
	for (const item of value) {
		if (!item || typeof item !== "object") continue;
		const note = item;
		if (typeof note.midi !== "number" || typeof note.beat !== "number" || typeof note.length !== "number") continue;
		const midi = Math.max(48, Math.min(84, Math.round(note.midi)));
		const beat = Math.max(0, Math.round(note.beat * 4) / 4);
		const length = Math.max(.25, Math.round(note.length * 4) / 4);
		notes.push({
			id: typeof note.id === "string" ? note.id : uid(),
			beat,
			midi,
			length
		});
		if (notes.length >= 192) break;
	}
	return notes;
}
function sanitizeSection(value, fallbackTimbre) {
	if (!value || typeof value !== "object") return null;
	const raw = value;
	const slots = Array.isArray(raw.slots) ? raw.slots.map(sanitizeSlot).filter((slot) => !!slot).slice(0, 32) : [];
	if (!slots.length) return null;
	const selectedId = slots.some((slot) => slot.id === raw.selectedId) ? String(raw.selectedId) : slots[0].id;
	const timbre = typeof raw.timbre === "string" && TIMBRES.has(raw.timbre) ? raw.timbre : fallbackTimbre;
	const drumId = typeof raw.drumId === "string" && DRUMS.has(raw.drumId) ? raw.drumId : "off";
	const intensity = raw.intensity === "soft" || raw.intensity === "loud" ? raw.intensity : "medium";
	return groove({
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
		drumVolume: typeof raw.drumVolume === "number" ? Math.min(1, Math.max(0, raw.drumVolume)) : .7,
		melody: sanitizeMelody(raw.melody),
		melodySound: typeof raw.melodySound === "string" && MELODY_SOUNDS$1.has(raw.melodySound) ? raw.melodySound : "piano",
		melodyVolume: typeof raw.melodyVolume === "number" ? Math.min(1, Math.max(0, raw.melodyVolume)) : .75,
		melodyMute: Boolean(raw.melodyMute),
		melodyStep: raw.melodyStep === .25 ? .25 : .5
	}, timbre);
}
function sanitizeSong(value) {
	if (!value || typeof value !== "object") return null;
	const raw = value;
	const fallback = typeof raw.timbre === "string" && TIMBRES.has(raw.timbre) ? raw.timbre : "guitar";
	const sections = Array.isArray(raw.sections) ? raw.sections.map((section) => sanitizeSection(section, fallback)).filter((section) => !!section).slice(0, 12) : [];
	if (!sections.length) return null;
	const activeSectionId = sections.some((section) => section.id === raw.activeSectionId) ? String(raw.activeSectionId) : sections[0].id;
	const scaleId = typeof raw.scaleId === "string" && SCALE_IDS.has(raw.scaleId) ? raw.scaleId : "major";
	return {
		id: typeof raw.id === "string" ? raw.id : uid(),
		title: typeof raw.title === "string" ? raw.title.slice(0, 48) : "Untitled",
		rootPc: typeof raw.rootPc === "number" ? (Math.round(raw.rootPc) + 12) % 12 : 0,
		scaleId,
		spelling: raw.spelling === "sharp" || raw.spelling === "flat" ? raw.spelling : "auto",
		extensions: Boolean(raw.extensions),
		bpm: clampBpm(typeof raw.bpm === "number" ? raw.bpm : 92),
		timbre: typeof raw.timbre === "string" && TIMBRES.has(raw.timbre) ? raw.timbre : "guitar",
		sections,
		activeSectionId
	};
}
function songFromLegacy(data) {
	const slots = Array.isArray(data.slots) ? data.slots.map(sanitizeSlot).filter((slot) => !!slot) : [];
	if (!slots.length) return null;
	const section = groove({
		id: uid(),
		name: "Verse",
		lyric: "",
		patternId: typeof data.patternId === "string" ? data.patternId : "folk",
		slots,
		selectedId: slots.some((slot) => slot.id === data.selectedId) ? String(data.selectedId) : slots[0].id,
		activePreset: typeof data.activePreset === "string" ? data.activePreset : null
	}, typeof data.timbre === "string" && TIMBRES.has(data.timbre) ? data.timbre : "guitar");
	const scaleId = typeof data.scaleId === "string" && SCALE_IDS.has(data.scaleId) ? data.scaleId : "major";
	return {
		id: uid(),
		title: "Untitled",
		rootPc: typeof data.rootPc === "number" ? (Math.round(data.rootPc) + 12) % 12 : 0,
		scaleId,
		spelling: data.spelling === "sharp" || data.spelling === "flat" ? data.spelling : "auto",
		extensions: Boolean(data.extensions),
		bpm: clampBpm(typeof data.bpm === "number" ? data.bpm : 92),
		timbre: typeof data.timbre === "string" && TIMBRES.has(data.timbre) ? data.timbre : "guitar",
		sections: [section],
		activeSectionId: section.id
	};
}
function readSaved() {
	if (typeof localStorage === "undefined") return null;
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw) {
			const data = JSON.parse(raw);
			const songs = Array.isArray(data.songs) ? data.songs.map(sanitizeSong).filter((song) => !!song).slice(0, 24) : [];
			if (songs.length) return {
				songs,
				activeSongId: songs.some((song) => song.id === data.activeSongId) ? String(data.activeSongId) : songs[0].id,
				volume: typeof data.volume === "number" ? Math.min(1, Math.max(0, data.volume)) : .82,
				loop: data.loop !== false,
				playForm: Boolean(data.playForm),
				metronome: Boolean(data.metronome),
				countIn: Boolean(data.countIn)
			};
		}
	} catch {}
	try {
		const legacy = localStorage.getItem(LEGACY_KEY);
		if (!legacy) return null;
		const data = JSON.parse(legacy);
		const song = songFromLegacy(data);
		if (!song) return null;
		return {
			songs: [song],
			activeSongId: song.id,
			volume: typeof data.volume === "number" ? Math.min(1, Math.max(0, data.volume)) : .82,
			loop: data.loop !== false,
			playForm: false,
			metronome: Boolean(data.metronome),
			countIn: Boolean(data.countIn)
		};
	} catch {
		return null;
	}
}
var starter = makeSong("First song");
function currentSong(state) {
	return state.songs.find((song) => song.id === state.activeSongId) ?? state.songs[0];
}
function currentSection(song) {
	return song.sections.find((section) => section.id === song.activeSectionId) ?? song.sections[0];
}
function writeSong(state, song) {
	return { songs: state.songs.map((item) => item.id === song.id ? song : item) };
}
function writeSection(song, section) {
	return {
		...song,
		sections: song.sections.map((item) => item.id === section.id ? section : item)
	};
}
var useCadence = create((set, get) => ({
	songs: [starter],
	activeSongId: starter.id,
	volume: .82,
	loop: true,
	playForm: false,
	metronome: false,
	countIn: false,
	hydrated: false,
	renameSong: (title) => {
		const song = currentSong(get());
		set(writeSong(get(), {
			...song,
			title: title.slice(0, 48)
		}));
	},
	selectSong: (id) => {
		if (!get().songs.some((song) => song.id === id)) return;
		set({ activeSongId: id });
	},
	newSong: () => {
		const song = makeSong(uniqueTitle(get().songs, "Untitled"));
		set({
			songs: [...get().songs, song].slice(-24),
			activeSongId: song.id
		});
	},
	duplicateSong: () => {
		const song = currentSong(get());
		const sections = song.sections.map((section) => {
			const slots = section.slots.map((slot) => ({
				...slot,
				id: uid()
			}));
			return {
				...section,
				id: uid(),
				slots,
				selectedId: slots[0].id
			};
		});
		const copy = {
			...song,
			id: uid(),
			title: uniqueTitle(get().songs, `${song.title.trim() || "Untitled"} copy`).slice(0, 48),
			sections,
			activeSectionId: sections[0].id
		};
		set({
			songs: [...get().songs, copy].slice(-24),
			activeSongId: copy.id
		});
	},
	deleteSong: () => {
		const { songs, activeSongId } = get();
		if (songs.length <= 1) return;
		const index = songs.findIndex((song) => song.id === activeSongId);
		const next = songs.filter((song) => song.id !== activeSongId);
		set({
			songs: next,
			activeSongId: (next[Math.max(0, index - 1)] ?? next[0]).id
		});
	},
	focusSection: (id) => {
		const song = currentSong(get());
		if (!song.sections.some((section) => section.id === id)) return;
		set(writeSong(get(), {
			...song,
			activeSectionId: id
		}));
	},
	renameSection: (name) => {
		const song = currentSong(get());
		const section = currentSection(song);
		set(writeSong(get(), writeSection(song, {
			...section,
			name: name.slice(0, 24)
		})));
	},
	setLyric: (lyric) => {
		const song = currentSong(get());
		const section = currentSection(song);
		set(writeSong(get(), writeSection(song, {
			...section,
			lyric: lyric.slice(0, 160)
		})));
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
			melodyStep: current.melodyStep
		};
		const index = song.sections.findIndex((item) => item.id === song.activeSectionId);
		const sections = song.sections.slice();
		sections.splice(index + 1, 0, section);
		set(writeSong(get(), {
			...song,
			sections,
			activeSectionId: section.id
		}));
	},
	duplicateSection: () => {
		const song = currentSong(get());
		if (song.sections.length >= 12) return;
		const section = currentSection(song);
		const index = song.sections.findIndex((item) => item.id === section.id);
		const slots = section.slots.map((slot) => ({
			...slot,
			id: uid()
		}));
		const copy = {
			...section,
			id: uid(),
			name: nextSectionName(song.sections),
			slots,
			selectedId: slots[Math.max(0, section.slots.findIndex((slot) => slot.id === section.selectedId))]?.id ?? slots[0].id,
			melody: section.melody.map((note) => ({
				...note,
				id: uid()
			}))
		};
		const sections = song.sections.slice();
		sections.splice(index + 1, 0, copy);
		set(writeSong(get(), {
			...song,
			sections,
			activeSectionId: copy.id
		}));
	},
	removeSection: () => {
		const song = currentSong(get());
		if (song.sections.length <= 1) return;
		const index = song.sections.findIndex((section) => section.id === song.activeSectionId);
		const sections = song.sections.filter((section) => section.id !== song.activeSectionId);
		const next = sections[Math.max(0, index - 1)] ?? sections[0];
		set(writeSong(get(), {
			...song,
			sections,
			activeSectionId: next.id
		}));
	},
	moveSection: (dir) => {
		const song = currentSong(get());
		const index = song.sections.findIndex((section) => section.id === song.activeSectionId);
		const target = index + dir;
		if (index < 0 || target < 0 || target >= song.sections.length) return;
		const sections = song.sections.slice();
		const [item] = sections.splice(index, 1);
		sections.splice(target, 0, item);
		set(writeSong(get(), {
			...song,
			sections
		}));
	},
	setRoot: (pc) => {
		const song = currentSong(get());
		set(writeSong(get(), {
			...song,
			rootPc: (pc + 12) % 12
		}));
	},
	transpose: (delta) => {
		const song = currentSong(get());
		set(writeSong(get(), {
			...song,
			rootPc: (song.rootPc + delta + 120) % 12
		}));
	},
	setScale: (scaleId) => {
		const song = currentSong(get());
		const section = currentSection(song);
		set(writeSong(get(), writeSection({
			...song,
			scaleId
		}, {
			...section,
			activePreset: null
		})));
	},
	setSpelling: (spelling) => {
		const song = currentSong(get());
		set(writeSong(get(), {
			...song,
			spelling
		}));
	},
	setExtensions: (extensions) => {
		const song = currentSong(get());
		set(writeSong(get(), {
			...song,
			extensions
		}));
	},
	applyPreset: (id) => {
		const preset = PRESETS.find((item) => item.id === id);
		if (!preset) return;
		const song = currentSong(get());
		const section = currentSection(song);
		const slots = !preset.scale || preset.scale === song.scaleId ? freshSlots(preset.slots) : preset.slots.map((slot) => {
			const heard = resolveSlot({
				...slot,
				id: "preset"
			}, {
				rootPc: song.rootPc,
				scaleId: preset.scale ?? song.scaleId,
				spelling: song.spelling,
				extensions: preset.extensions ?? false,
				timbre: section.timbre
			});
			const place = slotForPitch(song.rootPc, song.scaleId, heard.rootPc, prefersFlats(song.rootPc, preset.scale ?? song.scaleId, song.spelling));
			return {
				id: uid(),
				degree: place.degree,
				accidental: place.accidental,
				quality: heard.quality,
				inversion: slot.inversion,
				bars: slot.bars
			};
		});
		set(writeSong(get(), writeSection(song, {
			...section,
			slots,
			selectedId: slots[0].id,
			activePreset: id
		})));
	},
	select: (selectedId) => {
		const song = currentSong(get());
		const section = currentSection(song);
		if (!section.slots.some((slot) => slot.id === selectedId)) return;
		set(writeSong(get(), writeSection(song, {
			...section,
			selectedId
		})));
	},
	updateSelected: (patch) => {
		const song = currentSong(get());
		const section = currentSection(song);
		set(writeSong(get(), writeSection(song, {
			...section,
			activePreset: null,
			slots: section.slots.map((slot) => slot.id === section.selectedId ? {
				...slot,
				...patch
			} : slot)
		})));
	},
	addChord: () => {
		const song = currentSong(get());
		const section = currentSection(song);
		if (section.slots.length >= 32) return;
		const current = section.slots.find((slot) => slot.id === section.selectedId) ?? section.slots[section.slots.length - 1];
		const next = {
			id: uid(),
			degree: ((current?.degree ?? 0) + 1) % 7,
			accidental: 0,
			quality: "auto",
			inversion: 0,
			bars: 1
		};
		const index = section.slots.findIndex((slot) => slot.id === section.selectedId);
		const slots = section.slots.slice();
		slots.splice(index >= 0 ? index + 1 : slots.length, 0, next);
		set(writeSong(get(), writeSection(song, {
			...section,
			slots,
			selectedId: next.id,
			activePreset: null
		})));
	},
	duplicateSelected: () => {
		const song = currentSong(get());
		const section = currentSection(song);
		if (section.slots.length >= 32) return;
		const index = section.slots.findIndex((slot) => slot.id === section.selectedId);
		if (index < 0) return;
		const copySlot = {
			...section.slots[index],
			id: uid()
		};
		const slots = section.slots.slice();
		slots.splice(index + 1, 0, copySlot);
		set(writeSong(get(), writeSection(song, {
			...section,
			slots,
			selectedId: copySlot.id,
			activePreset: null
		})));
	},
	removeSelected: () => {
		const song = currentSong(get());
		const section = currentSection(song);
		if (section.slots.length <= 1) return;
		const index = section.slots.findIndex((slot) => slot.id === section.selectedId);
		const slots = section.slots.filter((slot) => slot.id !== section.selectedId);
		const next = slots[Math.max(0, index - 1)] ?? slots[0];
		set(writeSong(get(), writeSection(song, {
			...section,
			slots,
			selectedId: next.id,
			activePreset: null
		})));
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
		set(writeSong(get(), writeSection(song, {
			...section,
			slots,
			activePreset: null
		})));
	},
	setPattern: (patternId) => {
		const song = currentSong(get());
		const section = currentSection(song);
		set(writeSong(get(), writeSection(song, {
			...section,
			patternId
		})));
	},
	setBpm: (bpm) => {
		const song = currentSong(get());
		set(writeSong(get(), {
			...song,
			bpm: clampBpm(bpm)
		}));
	},
	setVolume: (volume) => set({ volume: Math.min(1, Math.max(0, volume)) }),
	setTimbre: (timbre) => {
		const song = currentSong(get());
		const section = currentSection(song);
		set(writeSong(get(), writeSection(song, {
			...section,
			timbre
		})));
	},
	setIntensity: (intensity) => {
		const song = currentSong(get());
		const section = currentSection(song);
		set(writeSong(get(), writeSection(song, {
			...section,
			intensity
		})));
	},
	setAutoBass: (autoBass) => {
		const song = currentSong(get());
		const section = currentSection(song);
		set(writeSong(get(), writeSection(song, {
			...section,
			autoBass
		})));
	},
	setDrum: (drumId) => {
		const song = currentSong(get());
		const section = currentSection(song);
		set(writeSong(get(), writeSection(song, {
			...section,
			drumId,
			drumsOn: drumId !== "off"
		})));
	},
	setDrumsOn: (drumsOn) => {
		const song = currentSong(get());
		const section = currentSection(song);
		const drumId = drumsOn && section.drumId === "off" ? patternById(section.patternId).meter === 3 ? "waltz" : "pop" : section.drumId;
		set(writeSong(get(), writeSection(song, {
			...section,
			drumsOn,
			drumId
		})));
	},
	setDrumVolume: (drumVolume) => {
		const song = currentSong(get());
		const section = currentSection(song);
		set(writeSong(get(), writeSection(song, {
			...section,
			drumVolume: Math.min(1, Math.max(0, drumVolume))
		})));
	},
	setMelodySound: (melodySound) => {
		const song = currentSong(get());
		const section = currentSection(song);
		set(writeSong(get(), writeSection(song, {
			...section,
			melodySound
		})));
	},
	setMelodyVolume: (melodyVolume) => {
		const song = currentSong(get());
		const section = currentSection(song);
		set(writeSong(get(), writeSection(song, {
			...section,
			melodyVolume: Math.min(1, Math.max(0, melodyVolume))
		})));
	},
	setMelodyMute: (melodyMute) => {
		const song = currentSong(get());
		const section = currentSection(song);
		set(writeSong(get(), writeSection(song, {
			...section,
			melodyMute
		})));
	},
	setMelodyStep: (melodyStep) => {
		const song = currentSong(get());
		const section = currentSection(song);
		set(writeSong(get(), writeSection(song, {
			...section,
			melodyStep
		})));
	},
	setMelody: (notes) => {
		const song = currentSong(get());
		const section = currentSection(song);
		set(writeSong(get(), writeSection(song, {
			...section,
			melody: sanitizeMelody(notes)
		})));
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
		set({
			...saved,
			hydrated: true
		});
	}
}));
function persistCadence(state) {
	if (!state.hydrated || typeof localStorage === "undefined") return;
	const payload = {
		songs: state.songs,
		activeSongId: state.activeSongId,
		volume: state.volume,
		loop: state.loop,
		playForm: state.playForm,
		metronome: state.metronome,
		countIn: state.countIn
	};
	localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function midiToFreq(midi) {
	return 440 * 2 ** ((midi - 69) / 12);
}
function holdFor(timbre) {
	if (timbre === "bass") return 1.05;
	if (timbre === "guitar" || timbre === "nylon") return 1.8;
	if (timbre === "organ" || timbre === "strings") return 2.6;
	return 2;
}
function pluckSamples(freq, decay, kind, sr) {
	const nylon = kind === "nylon";
	const len = Math.max(8, Math.floor(sr * Math.min(nylon ? 3.4 : 2.9, Math.max(.4, decay))));
	const data = new Float32Array(len);
	const f = Math.max(70, Math.min(1400, freq));
	const blend = nylon ? .58 : .2;
	const delay = Math.max(2.2, sr / f - blend / (1 - blend));
	const iDelay = Math.floor(delay);
	const frac = delay - iDelay;
	const exciteLen = Math.min(len, iDelay + 2);
	const burst = Math.max(8, Math.floor(sr * (nylon ? .008 : .003)));
	const color = nylon ? .16 : .48;
	let colored = 0;
	for (let i = 0; i < exciteLen; i++) {
		const env = i < burst ? Math.sin(Math.PI * i / burst) : 0;
		const white = Math.random() * 2 - 1;
		colored += color * (white - colored);
		const thump = Math.sin(2 * Math.PI * (nylon ? 126 : 172) * i / sr) * Math.exp(-i / (sr * (nylon ? .014 : .008)));
		data[i] = colored * env * (nylon ? .7 : 1) + thump * (nylon ? .7 : .32);
	}
	if (!nylon) {
		const tick = Math.min(exciteLen, Math.floor(sr * .0016));
		for (let i = 0; i < tick; i++) data[i] += (Math.random() * 2 - 1) * (1 - i / tick) * .18;
	}
	const tail = Math.floor(exciteLen * .18);
	for (let i = 0; i < tail; i++) data[exciteLen - 1 - i] *= i / Math.max(1, tail);
	const loss = (nylon ? .9962 : .998) - (nylon ? 9e-4 : 28e-5) * (f / 220);
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
		const y = .996 * (prevOut + x - prevIn);
		prevIn = x;
		prevOut = y;
		data[i] = y;
	}
	const attack = Math.min(18, len);
	for (let i = 0; i < attack; i++) data[i] *= i / attack;
	const fade = Math.min(len, Math.floor(sr * .03));
	for (let i = 0; i < fade; i++) data[len - 1 - i] *= i / fade;
	let peak = 1e-4;
	for (let i = 0; i < len; i++) peak = Math.max(peak, Math.abs(data[i] ?? 0));
	const norm = .85 / peak;
	for (let i = 0; i < len; i++) data[i] *= norm;
	return data;
}
var CadenceEngine = class {
	ctx = null;
	master = null;
	voiceBus = null;
	previewBus = null;
	timer = null;
	cache = /* @__PURE__ */ new Map();
	visuals = [];
	hits = [];
	hitIndex = 0;
	phase = "hits";
	origin = 0;
	spb = .6;
	lengthBeats = 4;
	chordIndex = 0;
	pendingIndex = 0;
	view = {
		chordIndex: -1,
		sectionId: "",
		patternId: "folk"
	};
	countInPhase = false;
	nextTime = Infinity;
	playing = false;
	volume = .8;
	getSnap = () => ({
		midis: [[
			60,
			64,
			67
		]],
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
		drumGain: [.7],
		melody: [[]],
		melodySound: ["piano"],
		melodyGain: [0],
		startIndex: 0,
		bpm: 92,
		volume: .8,
		loop: true,
		metronome: false,
		countIn: false
	});
	onVisual = null;
	setSnapshotGetter(fn) {
		this.getSnap = fn;
	}
	setOnVisual(fn) {
		this.onVisual = fn;
	}
	setVolume(volume) {
		this.volume = volume;
		if (this.master && this.ctx && this.playing) this.master.gain.setTargetAtTime(volume, this.ctx.currentTime, .03);
	}
	setTempo(bpm) {
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
		this.origin = now + .05;
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
	preview(midis, timbre, bassMidi) {
		if (this.playing) return;
		this.ensure().then(() => {
			if (!this.ctx || !this.master || !this.previewBus || this.playing) return;
			const now = this.ctx.currentTime;
			this.master.gain.cancelScheduledValues(now);
			this.master.gain.setValueAtTime(this.volume, now);
			this.previewBus.gain.cancelScheduledValues(now);
			this.previewBus.gain.setValueAtTime(1e-4, now);
			this.previewBus.gain.setValueAtTime(1, now + .012);
			[...midis].forEach((midi, i) => {
				this.playNote(midi, now + .012 + i * .016, Math.max(.35, .86 - i * .04), holdFor(timbre), timbre, this.previewBus);
			});
			if (typeof bassMidi === "number" && bassMidi >= 28) this.playNote(bassMidi, now + .012, .8, 1.1, "bass", this.previewBus);
		});
	}
	seek(index) {
		if (!this.playing || !this.ctx) return;
		const snap = this.getSnap();
		if (!snap.midis.length) return;
		this.cutVoices();
		this.origin = this.ctx.currentTime + .04;
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
		if (elapsed >= this.lengthBeats - .001) {
			this.onBoundary();
			return;
		}
		const idx = this.hits.findIndex((h) => h.beat > elapsed + .03);
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
		this.ctx?.close();
		this.ctx = null;
		this.master = null;
		this.voiceBus = null;
		this.previewBus = null;
	}
	async ensure() {
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
			comp.attack.value = .004;
			comp.release.value = .18;
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
	halt(fade) {
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
			this.master.gain.setValueAtTime(Math.max(1e-4, current), now);
			this.master.gain.linearRampToValueAtTime(1e-4, now + .05);
		}
		if (was) this.onVisual?.({
			chordIndex: -1,
			sectionId: "",
			patternId: "",
			eighth: -1,
			countIn: false,
			playing: false
		});
	}
	patternAt(snap, index) {
		return snap.patternIds[index] || snap.patternIds[0] || "folk";
	}
	clampIndex(snap, index) {
		const n = snap.midis.length;
		if (!n) return 0;
		return (index % n + n) % n;
	}
	rememberView(snap, index) {
		const safe = index >= 0 && index < snap.midis.length ? index : 0;
		this.view = {
			chordIndex: snap.localAt[safe] ?? 0,
			sectionId: snap.sectionAt[safe] ?? "",
			patternId: this.patternAt(snap, safe)
		};
	}
	beginCountIn() {
		const snap = this.getSnap();
		const start = this.clampIndex(snap, this.pendingIndex);
		const patternId = this.patternAt(snap, start);
		const meter = patternById(patternId).meter;
		this.countInPhase = true;
		this.chordIndex = -1;
		this.view = {
			chordIndex: -1,
			sectionId: snap.sectionAt[start] ?? "",
			patternId
		};
		this.lengthBeats = meter;
		this.hits = countInHits(meter);
		this.hitIndex = 0;
		this.phase = "hits";
		this.syncNext();
		this.refreshVisuals();
	}
	enterChord(index, advanceOrigin) {
		const snap = this.getSnap();
		if (!snap.midis.length) {
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
	onBoundary() {
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
	syncNext() {
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
	refreshVisuals() {
		if (!this.ctx) return;
		const now = this.ctx.currentTime;
		this.visuals = this.visuals.filter((v) => v.time <= now);
		const steps = Math.max(1, Math.round(this.lengthBeats * 2));
		for (let i = 0; i < steps; i++) {
			const time = this.origin + i / 2 * this.spb;
			if (time >= now - .02) this.visuals.push({
				time,
				chordIndex: this.view.chordIndex,
				sectionId: this.view.sectionId,
				patternId: this.view.patternId,
				eighth: i,
				countIn: this.countInPhase
			});
		}
		this.visuals.sort((a, b) => a.time - b.time);
	}
	tick = () => {
		if (!this.playing || !this.ctx) return;
		const horizon = this.ctx.currentTime + .18;
		let guard = 0;
		while (this.playing && this.nextTime < horizon && guard < 48) {
			guard += 1;
			if (this.nextTime < this.ctx.currentTime - .3) {
				this.origin = this.ctx.currentTime + .05;
				this.countInPhase = false;
				this.enterChord(Math.max(0, this.chordIndex), false);
				break;
			}
			this.dispatchNext();
		}
		this.flushVisuals();
		if (this.playing) this.timer = window.setTimeout(this.tick, 25);
	};
	dispatchNext() {
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
		if (hit.click && (snap.metronome || this.countInPhase)) this.playClick(when, Math.abs(hit.beat) < .001);
		for (const note of hit.notes) this.playNote(note.midi, when + note.delay, note.velocity, note.decay, note.timbre ?? timbre);
		if (hit.drum) this.playDrum(hit.drum.voice, when, hit.drum.velocity);
		if (hit.melody) this.playMelody(hit.melody.midi, when, hit.melody.velocity, hit.melody.decay, hit.melody.sound);
		this.hitIndex += 1;
		if (this.hitIndex >= this.hits.length) this.phase = "boundary";
		this.syncNext();
	}
	flushVisuals() {
		if (!this.ctx || !this.onVisual) return;
		const t = this.ctx.currentTime + .02;
		let last = null;
		while (this.visuals.length && this.visuals[0].time <= t) last = this.visuals.shift() ?? null;
		if (last) this.onVisual({
			chordIndex: last.chordIndex,
			sectionId: last.sectionId,
			patternId: last.patternId,
			eighth: last.eighth,
			countIn: last.countIn,
			playing: true
		});
	}
	playClick(when, accent) {
		if (!this.ctx || !this.master) return;
		const osc = this.ctx.createOscillator();
		const gain = this.ctx.createGain();
		osc.type = "sine";
		osc.frequency.setValueAtTime(accent ? 1560 : 1040, when);
		gain.gain.setValueAtTime(1e-4, when);
		gain.gain.exponentialRampToValueAtTime(accent ? .16 : .08, when + .004);
		gain.gain.exponentialRampToValueAtTime(1e-4, when + .04);
		osc.connect(gain);
		gain.connect(this.master);
		osc.start(when);
		osc.stop(when + .05);
	}
	compose(index) {
		const snap = this.getSnap();
		const i = this.clampIndex(snap, index);
		const timbre = snap.timbres[i] ?? "guitar";
		const built = buildHits(this.patternAt(snap, i), snap.midis[i] ?? [], {
			bpm: snap.bpm,
			timbre,
			bars: snap.bars[i] ?? 1,
			metronome: snap.metronome
		});
		const level = snap.levels[i] ?? 1;
		const hits = built.hits.map((hit) => ({
			...hit,
			notes: hit.notes.map((note) => ({
				...note,
				velocity: note.velocity * level
			}))
		}));
		if (snap.autoBass[i]) {
			const midi = snap.bassMidi[i] ?? 0;
			if (midi >= 28) hits.push({
				beat: 0,
				notes: [{
					midi,
					delay: 0,
					velocity: .82 * level,
					decay: Math.min(1.7, built.lengthBeats * (60 / snap.bpm) * .9),
					timbre: "bass"
				}]
			});
		}
		if (snap.drumsOn[i] && snap.drumIds[i] && snap.drumIds[i] !== "off") {
			const gain = (snap.drumGain[i] ?? .7) * (.55 + .45 * level);
			for (const drum of drumEvents(snap.drumIds[i], built.lengthBeats)) hits.push({
				beat: drum.beat,
				notes: [],
				drum: {
					voice: drum.voice,
					velocity: drum.velocity * gain
				}
			});
		}
		const melodyGain = snap.melodyGain[i] ?? 0;
		if (melodyGain > .001) {
			const sound = snap.melodySound[i] ?? "piano";
			const spb = 60 / snap.bpm;
			for (const note of snap.melody[i] ?? []) {
				if (note.beat < -.001 || note.beat >= built.lengthBeats - .001) continue;
				hits.push({
					beat: note.beat,
					notes: [],
					melody: {
						midi: note.midi,
						sound,
						velocity: .8 * melodyGain,
						decay: Math.max(.08, Math.min(4, note.length * spb))
					}
				});
			}
		}
		hits.sort((a, b) => a.beat - b.beat);
		return {
			hits,
			lengthBeats: built.lengthBeats
		};
	}
	cutVoices() {
		if (!this.ctx || !this.master || !this.voiceBus) return;
		const old = this.voiceBus;
		const now = this.ctx.currentTime;
		old.gain.cancelScheduledValues(now);
		old.gain.setValueAtTime(Math.max(1e-4, old.gain.value), now);
		old.gain.exponentialRampToValueAtTime(1e-4, now + .03);
		const fresh = this.ctx.createGain();
		fresh.gain.setValueAtTime(1, now);
		fresh.connect(this.master);
		this.voiceBus = fresh;
		window.setTimeout(() => old.disconnect(), 120);
	}
	playNote(midi, when, velocity, decay, timbre, dest) {
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
	playPluck(freq, when, velocity, decay, kind, dest) {
		if (!this.ctx || !this.master) return;
		const ctx = this.ctx;
		const nylon = kind === "nylon";
		const dur = Math.min(nylon ? 3.4 : 2.9, Math.max(.35, decay));
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
		presence.Q.value = .7;
		presence.gain.value = nylon ? -3.5 : 1.2;
		const lp = ctx.createBiquadFilter();
		lp.type = "lowpass";
		lp.Q.value = .55;
		lp.frequency.setValueAtTime((nylon ? 2100 : 3900) + velocity * (nylon ? 500 : 1200), when);
		input.connect(air);
		air.connect(top);
		top.connect(box);
		box.connect(presence);
		presence.connect(lp);
		const gain = ctx.createGain();
		gain.gain.setValueAtTime(Math.max(.05, velocity) * (nylon ? .8 : .68), when);
		lp.connect(gain);
		gain.connect(dest);
		const voice = (ratio, level) => {
			const src = ctx.createBufferSource();
			src.buffer = this.stringBuffer(freq * ratio, decay, kind);
			const amp = ctx.createGain();
			amp.gain.value = level;
			src.connect(amp);
			amp.connect(input);
			src.start(when);
			src.stop(when + dur + .02);
		};
		voice(1, 1);
		if (!nylon) voice(1.0035, .36);
	}
	playBass(freq, when, velocity, decay, dest) {
		if (!this.ctx || !this.master) return;
		const release = Math.min(1.7, Math.max(.16, decay));
		const filter = this.ctx.createBiquadFilter();
		filter.type = "lowpass";
		filter.Q.value = .7;
		filter.frequency.setValueAtTime(280 + velocity * 420, when);
		filter.frequency.exponentialRampToValueAtTime(180, when + release);
		const mix = this.ctx.createGain();
		mix.gain.value = .34;
		for (const [harmonic, amp] of [
			[1, 1],
			[2, .32],
			[3, .1],
			[4, .04]
		]) {
			const osc = this.ctx.createOscillator();
			osc.type = "sine";
			const f = Math.max(30, freq * harmonic);
			osc.frequency.setValueAtTime(f * 1.01, when);
			osc.frequency.exponentialRampToValueAtTime(f, when + .045);
			const gain = this.ctx.createGain();
			const peak = Math.max(2e-4, velocity * amp * .7);
			gain.gain.setValueAtTime(1e-4, when);
			gain.gain.exponentialRampToValueAtTime(peak, when + .012);
			gain.gain.exponentialRampToValueAtTime(1e-4, when + Math.max(.08, release / (1 + (harmonic - 1) * .45)));
			osc.connect(gain);
			gain.connect(filter);
			osc.start(when);
			osc.stop(when + release + .04);
		}
		filter.connect(mix);
		mix.connect(dest);
	}
	playStrings(freq, when, velocity, decay, dest) {
		if (!this.ctx || !this.master) return;
		const release = Math.min(4.8, Math.max(.6, decay));
		const filter = this.ctx.createBiquadFilter();
		filter.type = "lowpass";
		filter.Q.value = .5;
		filter.frequency.setValueAtTime(900, when);
		filter.frequency.exponentialRampToValueAtTime(1600, when + .35);
		const mix = this.ctx.createGain();
		mix.gain.value = .16;
		for (const [harmonic, amp, detune] of [
			[
				1,
				.72,
				-.006
			],
			[
				1,
				.72,
				.006
			],
			[
				2,
				.26,
				-.004
			],
			[
				2,
				.26,
				.004
			],
			[
				3,
				.08,
				0
			]
		]) {
			const osc = this.ctx.createOscillator();
			osc.type = "sine";
			osc.frequency.setValueAtTime(freq * harmonic * (1 + detune), when);
			const gain = this.ctx.createGain();
			const peak = Math.max(2e-4, velocity * amp * .42);
			const holdAt = when + Math.max(.22, release * .55);
			gain.gain.setValueAtTime(1e-4, when);
			gain.gain.exponentialRampToValueAtTime(peak, when + .16);
			gain.gain.setValueAtTime(peak * .85, holdAt);
			gain.gain.exponentialRampToValueAtTime(1e-4, when + release);
			osc.connect(gain);
			gain.connect(filter);
			osc.start(when);
			osc.stop(when + release + .05);
		}
		filter.connect(mix);
		mix.connect(dest);
	}
	playDrum(voice, when, velocity) {
		if (!this.ctx || !this.voiceBus) return;
		const ctx = this.ctx;
		const dest = this.voiceBus;
		const v = Math.max(.04, Math.min(1, velocity));
		if (voice === "kick") {
			const osc = ctx.createOscillator();
			osc.type = "sine";
			osc.frequency.setValueAtTime(168, when);
			osc.frequency.exponentialRampToValueAtTime(46, when + .09);
			const gain = ctx.createGain();
			gain.gain.setValueAtTime(1e-4, when);
			gain.gain.exponentialRampToValueAtTime(v * .95, when + .004);
			gain.gain.exponentialRampToValueAtTime(1e-4, when + .2);
			osc.connect(gain);
			gain.connect(dest);
			osc.start(when);
			osc.stop(when + .22);
			return;
		}
		if (voice === "snare") {
			this.noiseBurst(when, .16, 1e3, v * .5, dest);
			const osc = ctx.createOscillator();
			osc.type = "triangle";
			osc.frequency.setValueAtTime(186, when);
			const gain = ctx.createGain();
			gain.gain.setValueAtTime(1e-4, when);
			gain.gain.exponentialRampToValueAtTime(v * .28, when + .004);
			gain.gain.exponentialRampToValueAtTime(1e-4, when + .1);
			osc.connect(gain);
			gain.connect(dest);
			osc.start(when);
			osc.stop(when + .12);
			return;
		}
		if (voice === "clap") {
			this.noiseBurst(when, .07, 1200, v * .38, dest);
			this.noiseBurst(when + .012, .08, 1200, v * .32, dest);
			return;
		}
		this.noiseBurst(when, .04, 6200, v * .22, dest);
	}
	noiseBurst(when, dur, highpass, peak, dest) {
		if (!this.ctx) return;
		const src = this.ctx.createBufferSource();
		src.buffer = this.noiseBuffer();
		const filter = this.ctx.createBiquadFilter();
		filter.type = "highpass";
		filter.frequency.setValueAtTime(highpass, when);
		const gain = this.ctx.createGain();
		gain.gain.setValueAtTime(1e-4, when);
		gain.gain.exponentialRampToValueAtTime(Math.max(2e-4, peak), when + .003);
		gain.gain.exponentialRampToValueAtTime(1e-4, when + dur);
		src.connect(filter);
		filter.connect(gain);
		gain.connect(dest);
		src.start(when);
		src.stop(when + dur + .02);
	}
	noiseBuffer() {
		const cached = this.cache.get("noise");
		if (cached) return cached;
		const ctx = this.ctx;
		const len = Math.floor(ctx.sampleRate * .35);
		const data = new Float32Array(len);
		for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
		const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
		buffer.getChannelData(0).set(data);
		this.cache.set("noise", buffer);
		return buffer;
	}
	playMelody(midi, when, velocity, decay, sound) {
		if (!this.ctx || !this.voiceBus) return;
		const dest = this.voiceBus;
		const freq = midiToFreq(midi);
		const dur = Math.max(.08, Math.min(4, decay));
		if (sound === "piano") this.playPiano(freq, when, velocity, dur, false, dest);
		else if (sound === "soft") this.playPiano(freq, when, velocity * .9, dur, true, dest);
		else if (sound === "flute") this.playTone(freq, when, velocity * .7, dur, dest, "flute");
		else if (sound === "bit") this.playTone(freq, when, velocity * .45, dur, dest, "bit");
		else this.playTone(freq, when, velocity * .55, dur, dest, "lead");
	}
	playTone(freq, when, velocity, decay, dest, kind) {
		if (!this.ctx) return;
		const ctx = this.ctx;
		const filter = ctx.createBiquadFilter();
		filter.type = "lowpass";
		filter.frequency.setValueAtTime(kind === "bit" ? 1800 : kind === "flute" ? 1400 : 1600, when);
		const mix = ctx.createGain();
		mix.gain.value = kind === "bit" ? .18 : .16;
		const voices = kind === "bit" ? [[
			"square",
			1,
			0
		]] : kind === "flute" ? [[
			"sine",
			1,
			0
		], [
			"sine",
			.18,
			.002
		]] : [[
			"sawtooth",
			.55,
			-.004
		], [
			"sawtooth",
			.4,
			.006
		]];
		const attack = kind === "flute" ? .07 : kind === "lead" ? .03 : .004;
		for (const [type, amp, detune] of voices) {
			const osc = ctx.createOscillator();
			osc.type = type;
			osc.frequency.setValueAtTime(freq * (1 + detune), when);
			const gain = ctx.createGain();
			const peak = Math.max(2e-4, velocity * amp);
			const noteEnd = when + decay;
			gain.gain.setValueAtTime(1e-4, when);
			gain.gain.exponentialRampToValueAtTime(peak, when + attack);
			if (decay > attack + .05) gain.gain.setValueAtTime(peak * .9, when + attack + (decay - attack) * .55);
			gain.gain.exponentialRampToValueAtTime(1e-4, noteEnd);
			osc.connect(gain);
			gain.connect(filter);
			osc.start(when);
			osc.stop(when + decay + .04);
		}
		if (kind === "flute") this.noiseBurst(when, Math.min(.12, decay), 2e3, velocity * .04, filter);
		filter.connect(mix);
		mix.connect(dest);
	}
	stringBuffer(freq, decay, kind) {
		const ctx = this.ctx;
		const sr = ctx.sampleRate;
		const dur = Math.min(kind === "nylon" ? 3.4 : 2.9, Math.max(.4, decay));
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
	playOrgan(freq, when, velocity, decay, dest) {
		if (!this.ctx || !this.master) return;
		const release = Math.min(4.6, Math.max(.5, decay));
		const filter = this.ctx.createBiquadFilter();
		filter.type = "lowpass";
		filter.Q.value = .6;
		filter.frequency.setValueAtTime(980, when);
		const lfo = this.ctx.createOscillator();
		const lfoGain = this.ctx.createGain();
		lfo.frequency.setValueAtTime(1.7, when);
		lfoGain.gain.setValueAtTime(320, when);
		lfo.connect(lfoGain);
		lfoGain.connect(filter.frequency);
		const mix = this.ctx.createGain();
		mix.gain.value = .2;
		for (const [harmonic, amp, detune] of [
			[
				1,
				.66,
				-.0035
			],
			[
				1,
				.66,
				.0035
			],
			[
				2,
				.48,
				0
			],
			[
				3,
				.2,
				0
			],
			[
				4,
				.12,
				0
			],
			[
				6,
				.06,
				0
			]
		]) {
			const osc = this.ctx.createOscillator();
			osc.type = "sine";
			osc.frequency.setValueAtTime(freq * harmonic * (1 + detune), when);
			const gain = this.ctx.createGain();
			const peak = Math.max(2e-4, velocity * amp * .5);
			const holdAt = when + Math.max(.07, release * .62);
			gain.gain.setValueAtTime(1e-4, when);
			gain.gain.exponentialRampToValueAtTime(peak, when + .045);
			gain.gain.setValueAtTime(peak, holdAt);
			gain.gain.exponentialRampToValueAtTime(1e-4, when + release);
			osc.connect(gain);
			gain.connect(filter);
			osc.start(when);
			osc.stop(when + release + .06);
		}
		filter.connect(mix);
		mix.connect(dest);
		lfo.start(when);
		lfo.stop(when + release + .06);
	}
	playPiano(freq, when, velocity, decay, soft, dest) {
		if (!this.ctx || !this.master) return;
		const filter = this.ctx.createBiquadFilter();
		filter.type = "lowpass";
		filter.frequency.setValueAtTime(soft ? 1500 : 2800, when);
		const mix = this.ctx.createGain();
		mix.gain.value = soft ? .22 : .2;
		const partials = soft ? [
			[1, 1],
			[2, .38],
			[3, .14],
			[4, .05]
		] : [
			[1, 1],
			[2, .5],
			[3, .24],
			[4, .12],
			[5, .06],
			[6, .03]
		];
		for (const [harmonic, amp] of partials) {
			const osc = this.ctx.createOscillator();
			osc.type = "sine";
			osc.frequency.setValueAtTime(freq * harmonic * (1 + 12e-5 * harmonic * harmonic), when);
			const gain = this.ctx.createGain();
			const peak = Math.max(2e-4, velocity * amp);
			const partialDecay = Math.max(.12, decay / (1 + (harmonic - 1) * .55));
			const attack = soft ? .028 : .008;
			gain.gain.setValueAtTime(1e-4, when);
			gain.gain.exponentialRampToValueAtTime(peak, when + attack);
			gain.gain.exponentialRampToValueAtTime(1e-4, when + Math.max(attack + .06, partialDecay));
			osc.connect(gain);
			gain.connect(filter);
			osc.start(when);
			osc.stop(when + partialDecay + .03);
		}
		filter.connect(mix);
		mix.connect(dest);
	}
};
var LOW = 60;
var HIGH = 81;
var SHARP = [
	"C",
	"C♯",
	"D",
	"D♯",
	"E",
	"F",
	"F♯",
	"G",
	"G♯",
	"A",
	"A♯",
	"B"
];
var FLAT = [
	"C",
	"D♭",
	"D",
	"E♭",
	"E",
	"F",
	"G♭",
	"G",
	"A♭",
	"A",
	"B♭",
	"B"
];
function pitchLabel(midi, flats) {
	return `${(flats ? FLAT : SHARP)[(midi % 12 + 12) % 12]}${Math.floor(midi / 12) - 1}`;
}
function MelodyLane({ notes, step, totalBeats, scalePcs, tones, spans, flats, activeColumn, onChange }) {
	const scroller = (0, import_react.useRef)(null);
	const [drag, setDrag] = (0, import_react.useState)(null);
	const cols = Math.max(1, Math.round(totalBeats / step));
	const cell = step === .25 ? 14 : 18;
	const rowH = 18;
	const gutter = 42;
	const header = 22;
	const scale = new Set(scalePcs);
	function cellAt(clientX, clientY) {
		const el = scroller.current;
		if (!el) return null;
		const rect = el.getBoundingClientRect();
		const x = clientX - rect.left + el.scrollLeft - gutter;
		const y = clientY - rect.top + el.scrollTop - header;
		if (x < 0 || y < 0) return null;
		const col = Math.max(0, Math.min(cols - 1, Math.floor(x / cell)));
		const midi = HIGH - Math.floor(y / rowH);
		if (midi < LOW || midi > HIGH) return null;
		return {
			midi,
			beat: col * step
		};
	}
	function shown() {
		if (!drag) return notes;
		if (drag.mode === "edit" && drag.id) return notes.map((note) => note.id === drag.id ? {
			...note,
			length: drag.length
		} : note);
		return [...notes.filter((note) => note.midi !== drag.midi || note.beat + note.length <= drag.start + .001 || note.beat >= drag.start + drag.length - .001), {
			id: "drag",
			beat: drag.start,
			midi: drag.midi,
			length: drag.length
		}];
	}
	const painted = shown();
	function down(event) {
		if (event.button !== 0) return;
		const hit = cellAt(event.clientX, event.clientY);
		if (!hit) return;
		event.preventDefault();
		const covering = notes.find((note) => note.midi === hit.midi && hit.beat >= note.beat - .001 && hit.beat < note.beat + note.length - .001);
		if (covering) setDrag({
			mode: "edit",
			id: covering.id,
			midi: covering.midi,
			anchor: covering.beat,
			start: covering.beat,
			length: covering.length,
			moved: false,
			x: event.clientX
		});
		else setDrag({
			mode: "draw",
			midi: hit.midi,
			anchor: hit.beat,
			start: hit.beat,
			length: step,
			moved: false,
			x: event.clientX
		});
		event.currentTarget.setPointerCapture(event.pointerId);
	}
	function move(event) {
		if (!drag) return;
		const hit = cellAt(event.clientX, event.clientY);
		const beat = hit && hit.midi === drag.midi ? hit.beat : drag.mode === "draw" ? drag.start : drag.anchor;
		const moved = drag.moved || Math.abs(event.clientX - drag.x) > 4;
		if (drag.mode === "draw") {
			const start = Math.min(drag.anchor, beat);
			const length = Math.abs(beat - drag.anchor) + step;
			setDrag({
				...drag,
				start,
				length,
				moved
			});
			return;
		}
		const length = Math.max(step, beat + step - drag.anchor);
		setDrag({
			...drag,
			start: drag.anchor,
			length,
			moved
		});
	}
	function up() {
		if (!drag) return;
		if (drag.mode === "edit" && drag.id && !drag.moved) onChange(notes.filter((note) => note.id !== drag.id));
		else if (drag.mode === "edit" && drag.id) onChange(notes.map((note) => note.id === drag.id ? {
			...note,
			length: drag.length
		} : note));
		else {
			const next = notes.filter((note) => note.midi !== drag.midi || note.beat + note.length <= drag.start + .001 || note.beat >= drag.start + drag.length - .001);
			next.push({
				id: uid(),
				beat: drag.start,
				midi: drag.midi,
				length: drag.length
			});
			onChange(next);
		}
		setDrag(null);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: scroller,
		className: "scroller mt-2 max-w-full touch-none select-none overflow-x-auto rounded-lg border border-line bg-bg",
		onPointerDown: down,
		onPointerMove: move,
		onPointerUp: up,
		onPointerCancel: up,
		"aria-label": "Melody grid",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			style: {
				width: gutter + cols * cell,
				height: 418
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute left-0 top-0 flex",
					style: {
						height: header,
						marginLeft: gutter
					},
					children: spans.map((span, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "truncate border-l border-line px-1 text-[10px] leading-5 text-muted",
						style: { width: span.cols * cell },
						children: span.symbol
					}, `${span.symbol}-${index}`))
				}),
				Array.from({ length: 22 }, (_, row) => {
					const midi = HIGH - row;
					const inScale = scale.has(midi % 12);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute left-0 flex",
						style: {
							top: header + row * rowH,
							height: rowH,
							width: gutter + cols * cell
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("w-[42px] shrink-0 pr-1 text-right text-[10px] leading-[18px]", inScale ? "text-ivory" : "text-muted/50"),
							children: pitchLabel(midi, flats)
						}), Array.from({ length: cols }, (_, col) => {
							const tone = tones[col]?.includes(midi % 12);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("border-l border-line/70", tone ? "bg-brass/10" : inScale ? "bg-raised/40" : "", col === activeColumn && "bg-brass/25"),
								style: {
									width: cell,
									height: rowH
								}
							}, col);
						})]
					}, midi);
				}),
				painted.map((note) => {
					const col = Math.round(note.beat / step);
					const span = Math.max(1, Math.round(note.length / step));
					const top = header + (HIGH - note.midi) * rowH + 1;
					if (note.midi < LOW || note.midi > HIGH || col >= cols) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute rounded-sm bg-brass",
						style: {
							left: gutter + col * cell + 1,
							top,
							width: Math.min(span, cols - col) * cell - 2,
							height: 16
						}
					}, note.id);
				})
			]
		})
	});
}
var WHITE = /* @__PURE__ */ new Set([
	0,
	2,
	4,
	5,
	7,
	9,
	11
]);
function Piano$1({ scalePcs, chordPcs, rootPc }) {
	const low = 48;
	const high = 72;
	const whites = [];
	for (let midi = low; midi <= high; midi++) if (WHITE.has(midi % 12)) whites.push(midi);
	const blacks = [];
	whites.forEach((midi, index) => {
		const next = midi + 1;
		if (next <= high && !WHITE.has(next % 12)) blacks.push({
			midi: next,
			after: index
		});
	});
	const scale = new Set(scalePcs);
	const chord = new Set(chordPcs);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden rounded-lg border border-line bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-24 sm:h-32",
			children: whites.map((midi) => {
				const pc = midi % 12;
				const inChord = chord.has(pc);
				const isRoot = inChord && pc === rootPc;
				const inScale = scale.has(pc);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("relative flex-1 border-r border-line last:border-r-0", isRoot ? "bg-brass" : inChord ? "bg-brass/45" : "bg-ivory"),
					children: inScale && !inChord ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-x-1 bottom-1.5 h-1 rounded-full bg-brass" }) : null
				}, midi);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-x-0 top-0 h-14 sm:h-20",
			children: blacks.map(({ midi, after }) => {
				const pc = midi % 12;
				const inChord = chord.has(pc);
				const isRoot = inChord && pc === rootPc;
				const inScale = scale.has(pc);
				const left = (after + 1) / whites.length * 100;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: { left: `${left}%` },
					className: cn("absolute h-14 w-2.5 -translate-x-1/2 rounded-b-sm border border-line sm:h-20 sm:w-3.5", isRoot ? "bg-brass" : inChord ? "bg-brass/70" : "bg-ink"),
					children: inScale && !inChord ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-x-0.5 bottom-1 h-0.5 rounded-full bg-brass" }) : null
				}, midi);
			})
		})]
	});
}
var IDLE = {
	chordIndex: -1,
	sectionId: "",
	patternId: "",
	eighth: -1,
	countIn: false,
	playing: false
};
function Mark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: "size-6",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "4",
				y: "16",
				width: "6",
				height: "12",
				rx: "1.5",
				className: "fill-fg"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "13",
				y: "11",
				width: "6",
				height: "17",
				rx: "1.5",
				className: "fill-fg"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "22",
				y: "5",
				width: "6",
				height: "23",
				rx: "1.5",
				className: "fill-brass"
			})
		]
	});
}
function CadenceApp() {
	const state = useCadence();
	const engineRef = (0, import_react.useRef)(null);
	const following = (0, import_react.useRef)(false);
	const [playhead, setPlayhead] = (0, import_react.useState)(IDLE);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const taps = (0, import_react.useRef)([]);
	const railRef = (0, import_react.useRef)(null);
	const song = state.songs.find((item) => item.id === state.activeSongId) ?? state.songs[0];
	const section = song.sections.find((item) => item.id === song.activeSectionId) ?? song.sections[0];
	const flats = prefersFlats(song.rootPc, song.scaleId, song.spelling);
	const ctx = (0, import_react.useMemo)(() => ({
		rootPc: song.rootPc,
		scaleId: song.scaleId,
		spelling: song.spelling,
		extensions: song.extensions,
		timbre: section.timbre
	}), [
		song.rootPc,
		song.scaleId,
		song.spelling,
		song.extensions,
		section.timbre
	]);
	const arrangement = (0, import_react.useMemo)(() => song.sections.map((item) => ({
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
			timbre: item.timbre
		})
	})), [
		song.sections,
		song.rootPc,
		song.scaleId,
		song.spelling,
		song.extensions
	]);
	const chords = arrangement.find((item) => item.id === section.id)?.chords ?? [];
	const flat = (0, import_react.useMemo)(() => {
		const source = state.playForm ? arrangement : arrangement.filter((item) => item.id === section.id);
		const rows = source.length ? source : arrangement.slice(0, 1);
		const midis = [];
		const bars = [];
		const patternIds = [];
		const sectionAt = [];
		const localAt = [];
		const timbres = [];
		const levels = [];
		const autoBass = [];
		const bassMidi = [];
		const drumIds = [];
		const drumsOn = [];
		const drumGain = [];
		const melody = [];
		const melodySound = [];
		const melodyGain = [];
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
				melody.push(item.melody.filter((note) => note.beat >= start - .001 && note.beat < end - .001).map((note) => ({
					beat: note.beat - start,
					midi: note.midi,
					length: note.length
				})));
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
			startIndex: 0
		};
	}, [
		arrangement,
		state.playForm,
		section.id
	]);
	const selected = chords.find((chord) => chord.id === section.selectedId) ?? chords[0];
	const playing = playhead.playing;
	const counting = playing && playhead.countIn;
	const live = counting ? chords[0] : playing && playhead.chordIndex >= 0 ? chords[playhead.chordIndex] ?? selected : selected;
	const pattern = patternById(playing && playhead.patternId ? playhead.patternId : section.patternId);
	const sectionPattern = patternById(section.patternId);
	const pipCount = counting ? pattern.meter * 2 : Math.max(1, Math.round(pattern.meter * (live?.bars ?? 1) * 2));
	const activePip = playing && playhead.eighth >= 0 ? playhead.eighth % pipCount : -1;
	const countNumber = Math.floor(Math.max(0, playhead.eighth) / 2) + 1;
	const title = keyTitle(song.rootPc, song.scaleId, song.spelling);
	const names = spellScale(song.rootPc, song.scaleId, flats);
	const pcs = scalePcs(song.rootPc, song.scaleId);
	const snapRef = (0, import_react.useRef)(flatSnap(flat, song.bpm, state.volume, state.loop, state.metronome, state.countIn));
	snapRef.current = flatSnap(flat, song.bpm, state.volume, state.loop, state.metronome, state.countIn);
	function engine() {
		if (!engineRef.current) {
			const next = new CadenceEngine();
			next.setSnapshotGetter(() => snapRef.current);
			engineRef.current = next;
		}
		return engineRef.current;
	}
	(0, import_react.useEffect)(() => {
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
	}, []);
	(0, import_react.useEffect)(() => {
		engineRef.current?.setVolume(state.volume);
	}, [state.volume]);
	(0, import_react.useEffect)(() => {
		engineRef.current?.setTempo(song.bpm);
	}, [song.bpm]);
	const seenSong = (0, import_react.useRef)(song.id);
	(0, import_react.useEffect)(() => {
		if (seenSong.current === song.id) return;
		seenSong.current = song.id;
		engineRef.current?.stop();
	}, [song.id]);
	const editSig = JSON.stringify({
		rows: flat.midis.map((midis, index) => [
			midis.join("."),
			flat.bars[index],
			flat.patternIds[index],
			flat.sectionAt[index],
			flat.timbres[index]
		]),
		levels: flat.levels,
		autoBass: flat.autoBass,
		bass: flat.bassMidi,
		drums: flat.drumIds,
		drumsOn: flat.drumsOn,
		drumGain: flat.drumGain,
		melody: flat.melody,
		melodySound: flat.melodySound,
		melodyGain: flat.melodyGain,
		metronome: state.metronome
	});
	(0, import_react.useEffect)(() => {
		engineRef.current?.rebuild();
	}, [editSig]);
	const seenSection = (0, import_react.useRef)(section.id);
	(0, import_react.useEffect)(() => {
		if (seenSection.current === section.id) return;
		const fromFollow = following.current;
		following.current = false;
		seenSection.current = section.id;
		if (fromFollow) return;
		const index = snapRef.current.sectionAt.findIndex((id) => id === section.id);
		engineRef.current?.seek(index < 0 ? 0 : index);
	}, [section.id]);
	const seenForm = (0, import_react.useRef)(state.playForm);
	(0, import_react.useEffect)(() => {
		if (seenForm.current === state.playForm) return;
		seenForm.current = state.playForm;
		engineRef.current?.seek(0);
	}, [state.playForm]);
	(0, import_react.useEffect)(() => {
		if (!playing || playhead.chordIndex < 0) return;
		const node = railRef.current?.querySelector(`[data-index="${playhead.chordIndex}"]`);
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		node?.scrollIntoView({
			behavior: reduce ? "auto" : "smooth",
			inline: "center",
			block: "nearest"
		});
	}, [
		playing,
		playhead.chordIndex,
		section.id
	]);
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			const target = event.target;
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
			} else if (event.key === "[") state.setBpm(song.bpm - 1);
			else if (event.key === "]") state.setBpm(song.bpm + 1);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	});
	function moveSelection(dir) {
		const index = section.slots.findIndex((slot) => slot.id === section.selectedId);
		const next = section.slots[index + dir];
		if (next) state.select(next.id);
	}
	function toggle() {
		if (playhead.playing) engine().stop();
		else engine().start();
	}
	const [melodyOpen, setMelodyOpen] = (0, import_react.useState)(false);
	const melodySection = (0, import_react.useRef)(null);
	if (melodySection.current !== section.id) {
		melodySection.current = section.id;
		if (section.melody.length > 0 && !melodyOpen) setMelodyOpen(true);
	}
	function hear(slot) {
		if (playhead.playing) return;
		const heard = resolveSlot(slot, ctx);
		const bass = section.autoBass && heard.midis.length ? Math.min(...heard.midis) - 12 : void 0;
		engine().preview(heard.midis, section.timbre, bass);
	}
	function edit(patch) {
		const current = section.slots.find((slot) => slot.id === section.selectedId);
		if (!current) return;
		const next = {
			...current,
			...patch
		};
		state.updateSelected(patch);
		hear(next);
	}
	function choose(id) {
		state.select(id);
		const slot = section.slots.find((item) => item.id === id);
		if (slot) hear(slot);
	}
	function tapTempo() {
		const now = performance.now();
		taps.current = taps.current.filter((stamp) => now - stamp < 2400);
		taps.current.push(now);
		if (taps.current.length < 2) return;
		const gaps = [];
		for (let i = 1; i < taps.current.length; i++) gaps.push(taps.current[i] - taps.current[i - 1]);
		const avg = gaps.reduce((sum, gap) => sum + gap, 0) / gaps.length;
		state.setBpm(Math.round(6e4 / avg));
	}
	async function copyChart() {
		const blocks = arrangement.map((item) => {
			const groove = patternById(item.patternId);
			const symbols = item.chords.map((chord) => `${chord.symbol}${durationMark(chord.bars, groove.meter, groove.signature)}`).join("  –  ");
			const drums = item.drumsOn && item.drumId !== "off" ? DRUM_LABEL[item.drumId] : "No drums";
			const line = item.lyric.trim();
			const melody = item.melody.slice().sort((a, b) => a.beat - b.beat).map((note) => pitchName(note.midi, flats)).join(" ");
			return `${`${item.name} · ${SOUND_LABEL[item.timbre]} · ${groove.name} · ${item.intensity} · ${drums}${item.autoBass ? " · Bass" : ""}`}\n${symbols}${line ? `\n${line}` : ""}${melody ? `\nMelody${item.melodyMute ? " (muted)" : ""} · ${MELODY_LABEL[item.melodySound]}: ${melody}` : ""}`;
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
	const degreePreview = [
		0,
		1,
		2,
		3,
		4,
		5,
		6
	].map((degree) => resolveSlot({
		...selectedSlot,
		degree,
		accidental: 0,
		quality: "auto",
		inversion: 0
	}, ctx).roman);
	const selectedIndex = section.slots.findIndex((slot) => slot.id === section.selectedId);
	const sectionIndex = song.sections.findIndex((item) => item.id === section.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 sm:py-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-11 shrink-0 place-items-center rounded-lg border border-line bg-surface",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-widest text-brass",
						children: "Cadence"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "title-field mt-1",
						"aria-label": "Song title",
						value: song.title,
						placeholder: "Untitled",
						onChange: (event) => state.renameSong(event.target.value)
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: "field",
						"aria-label": "Songs",
						value: song.id,
						onChange: (event) => state.selectSong(event.target.value),
						children: state.songs.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: item.id,
							children: item.title.trim() || "Untitled"
						}, item.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "chip",
						onClick: () => state.newSong(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), "New"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "chip",
						onClick: () => state.duplicateSong(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), "Duplicate"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "chip",
						onClick: () => state.deleteSong(),
						disabled: state.songs.length <= 1,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), "Delete"]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "desk",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "area-now rounded-xl border border-line bg-surface px-4 py-5 sm:px-6 sm:py-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium uppercase tracking-widest text-brass",
								children: counting ? "Count-in" : `${section.name} · ${live?.roman ?? ""}`
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									title,
									" · ",
									pattern.signature
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 truncate font-display text-6xl leading-none text-fg sm:text-7xl",
							children: counting ? countNumber : live?.symbol
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: counting ? `Starts on ${chords[0]?.symbol ?? ""}` : live?.noteNames.join("   ·   ")
						}),
						section.lyric.trim() && !counting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 truncate text-sm text-ivory",
							children: section.lyric
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 flex gap-1.5",
							"aria-hidden": true,
							children: Array.from({ length: pipCount }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-1.5 flex-1 rounded-full", index === activePip ? "bg-brass" : index < activePip ? "bg-brass/35" : "bg-line") }, index))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Piano$1, {
								scalePcs: pcs,
								chordPcs: live?.pcs ?? [],
								rootPc: live?.rootPc ?? 0
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted",
							children: "Ivory marks are the scale. Brass keys are this chord. The brightest key is the root."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "area-transport rounded-xl border border-line bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: toggle,
								className: "flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-brass text-base font-semibold text-ink",
								children: [playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-4 fill-current" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-5 fill-current" }), playing ? "Stop" : state.playForm ? "Play song" : "Play section"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: cn("chip", !state.playForm && "chip-on"),
								"aria-pressed": !state.playForm,
								onClick: () => state.setPlayForm(false),
								children: "Section"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: cn("chip", state.playForm && "chip-on"),
								"aria-pressed": state.playForm,
								onClick: () => state.setPlayForm(true),
								children: "Song"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "icon-btn",
									onClick: () => state.setBpm(song.bpm - 1),
									"aria-label": "Slower",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-16 flex-1 text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-4xl leading-none tabular-nums text-fg",
										children: song.bpm
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs uppercase tracking-widest text-muted",
										children: "bpm"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "icon-btn",
									onClick: () => state.setBpm(song.bpm + 1),
									"aria-label": "Faster",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "mt-2 h-11 w-full accent-brass",
							type: "range",
							min: 40,
							max: 200,
							value: song.bpm,
							"aria-label": "Tempo",
							onChange: (event) => state.setBpm(Number(event.target.value))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "chip",
									onClick: tapTempo,
									children: "Tap"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: cn("chip", state.loop && "chip-on"),
									"aria-pressed": state.loop,
									onClick: () => state.setLoop(!state.loop),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Repeat, { className: "size-3.5" }), "Loop"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: cn("chip", state.metronome && "chip-on"),
									"aria-pressed": state.metronome,
									onClick: () => state.setMetronome(!state.metronome),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drum, { className: "size-3.5" }), "Click"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: cn("chip", state.countIn && "chip-on"),
									"aria-pressed": state.countIn,
									onClick: () => state.setCountIn(!state.countIn),
									children: "Count-in"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-4 flex items-center gap-3 text-sm text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-12",
								children: "Level"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "h-11 flex-1 accent-brass",
								type: "range",
								min: 0,
								max: 1,
								step: .01,
								value: state.volume,
								"aria-label": "Volume",
								onChange: (event) => state.setVolume(Number(event.target.value))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 hidden text-xs text-muted lg:block",
							children: "Space plays. Arrows move the selection. Brackets nudge tempo."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "area-prog rounded-xl border border-line bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xs font-medium uppercase tracking-widest text-muted",
								children: "Form"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "icon-btn",
									"aria-label": "Move section earlier",
									onClick: () => state.moveSection(-1),
									disabled: sectionIndex <= 0,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "icon-btn",
									"aria-label": "Move section later",
									onClick: () => state.moveSection(1),
									disabled: sectionIndex < 0 || sectionIndex >= song.sections.length - 1,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "scroller flex items-stretch gap-2 overflow-x-auto pb-1",
							children: [song.sections.map((item) => {
								const on = item.id === section.id;
								const sounding = playing && !counting && playhead.sectionId === item.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-pressed": on,
									onClick: () => state.focusSection(item.id),
									className: cn("min-w-24 shrink-0 rounded-lg border px-3 py-2 text-left text-sm", sounding ? "border-brass bg-brass/15 text-fg" : on ? "border-brass bg-raised text-fg" : "border-line bg-raised text-fg"),
									children: item.name || "Section"
								}, item.id);
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "icon-btn w-12 self-stretch",
								onClick: () => state.addSection(),
								"aria-label": "Add section",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 grid gap-2 sm:grid-cols-[11rem_minmax(0,1fr)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								"aria-label": "Section name",
								value: section.name,
								onChange: (event) => state.renameSection(event.target.value)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								"aria-label": "Lyric line",
								placeholder: "A line for this section",
								value: section.lyric,
								onChange: (event) => state.setLyric(event.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "chip",
								onClick: () => state.duplicateSection(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), "Duplicate section"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "chip",
								onClick: () => state.removeSection(),
								disabled: song.sections.length <= 1,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), "Delete section"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 mt-5 flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xs font-medium uppercase tracking-widest text-muted",
								children: "Progression"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "chip",
								onClick: () => void copyChart(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), copied ? "Copied" : "Copy chart"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							ref: railRef,
							className: "scroller flex items-stretch gap-2 overflow-x-auto pb-1",
							children: [chords.map((chord, index) => {
								const isLive = playing && !counting && playhead.sectionId === section.id && playhead.chordIndex === index;
								const isSelected = chord.id === section.selectedId;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									"data-index": index,
									onClick: () => choose(chord.id),
									"aria-pressed": isSelected,
									className: cn("flex shrink-0 flex-col rounded-lg border px-3 py-3 text-left", chord.bars === 2 ? "min-w-52" : chord.bars === .5 ? "min-w-24" : "min-w-32", isLive ? "border-brass bg-brass/15" : isSelected ? "border-brass bg-raised" : "border-line bg-raised"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center justify-between gap-2 text-xs text-brass",
											children: [chord.roman, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "tabular-nums text-muted",
												children: index + 1
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-1 font-display text-2xl leading-none text-fg",
											children: chord.symbol
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-2 text-xs text-muted",
											children: chord.noteNames.join(" ")
										}),
										barsBadge(chord.bars, sectionPattern.meter, sectionPattern.signature) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-2 text-xs text-brass",
											children: barsBadge(chord.bars, sectionPattern.meter, sectionPattern.signature)
										}) : null
									]
								}, chord.id);
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "icon-btn w-12 self-stretch",
								onClick: () => state.addChord(),
								"aria-label": "Add chord",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MelodyPanel, {
							open: melodyOpen,
							onToggle: () => setMelodyOpen((open) => !open),
							section,
							chords,
							flats,
							scale: pcs,
							playing: playing && !counting && playhead.sectionId === section.id,
							chordIndex: playhead.chordIndex,
							eighth: playhead.eighth,
							onMelody: (notes) => state.setMelody(notes),
							onSound: (sound) => state.setMelodySound(sound),
							onVolume: (volume) => state.setMelodyVolume(volume),
							onMute: (on) => state.setMelodyMute(on),
							onStep: (step) => state.setMelodyStep(step)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "area-presets rounded-xl border border-line bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xs font-medium uppercase tracking-widest text-muted",
							children: "Presets"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "Drops into this section, in the key you already have. The other sections stay put."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-col gap-3",
							children: PRESET_GROUPS.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-1.5 text-xs text-muted",
								children: group
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: PRESETS.filter((preset) => preset.group === group).map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: cn("chip", section.activePreset === preset.id && "chip-on"),
									"aria-pressed": section.activePreset === preset.id,
									onClick: () => state.applyPreset(preset.id),
									children: preset.name
								}, preset.id))
							})] }, group))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "area-edit rounded-xl border border-line bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-xs font-medium uppercase tracking-widest text-muted",
								children: ["Edit chord ", selectedIndex + 1]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "icon-btn",
									"aria-label": "Move earlier",
									onClick: () => state.moveSelected(-1),
									disabled: selectedIndex <= 0,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "icon-btn",
									"aria-label": "Move later",
									onClick: () => state.moveSelected(1),
									disabled: selectedIndex < 0 || selectedIndex >= section.slots.length - 1,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-muted",
							children: "Scale degree"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1.5 grid grid-cols-7 gap-1.5",
							children: degreePreview.map((label, degree) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: cn("choice px-0 text-xs", selectedSlot.degree === degree && "choice-on"),
								onClick: () => edit({
									degree,
									accidental: 0
								}),
								children: label
							}, degree))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-muted",
							children: "Accidental"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1.5 grid grid-cols-3 gap-1.5",
							children: [
								[-1, "♭"],
								[0, "♮"],
								[1, "♯"]
							].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: cn("choice", selectedSlot.accidental === value && "choice-on"),
								onClick: () => edit({ accidental: value }),
								children: label
							}, label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-muted",
							children: "Root"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1.5 grid grid-cols-6 gap-1.5",
							children: rootChoices(flats).map((root) => {
								const on = liveMatchesRoot(selected, root.pc);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: cn("choice", on && "choice-on"),
									onClick: () => edit(slotForPitch(song.rootPc, song.scaleId, root.pc, flats)),
									children: root.label
								}, root.pc);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-muted",
							children: "Quality"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1.5 flex flex-wrap gap-1.5",
							children: QUALITY_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: cn("chip", selectedSlot.quality === option.id && "chip-on"),
								onClick: () => edit({ quality: option.id }),
								children: option.label
							}, option.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-muted",
							children: "Bass"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1.5 grid grid-cols-4 gap-1.5",
							children: [
								"Root",
								"1st",
								"2nd",
								"3rd"
							].map((label, inversion) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: cn("choice", selectedSlot.inversion === inversion && "choice-on"),
								disabled: inversion >= (selected?.noteNames.length ?? 3),
								onClick: () => edit({ inversion }),
								children: label
							}, label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: cn("chip", selectedSlot.bars === .5 && "chip-on"),
									onClick: () => edit({ bars: .5 }),
									children: halfLabel(sectionPattern.meter, sectionPattern.signature)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: cn("chip", selectedSlot.bars === 1 && "chip-on"),
									onClick: () => edit({ bars: 1 }),
									children: "1 bar"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: cn("chip", selectedSlot.bars === 2 && "chip-on"),
									onClick: () => edit({ bars: 2 }),
									children: "2 bars"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "chip",
									onClick: () => state.duplicateSelected(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), "Duplicate"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "chip",
									onClick: () => state.removeSelected(),
									disabled: section.slots.length <= 1,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), "Delete"]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "area-key rounded-xl border border-line bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xs font-medium uppercase tracking-widest text-muted",
								children: "Key and scale"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-1.5",
								children: [
									"auto",
									"sharp",
									"flat"
								].map((mode) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: cn("chip", song.spelling === mode && "chip-on"),
									onClick: () => state.setSpelling(mode),
									children: mode === "auto" ? "Auto" : mode === "sharp" ? "♯" : "♭"
								}, mode))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 grid grid-cols-6 gap-1.5",
							children: rootChoices(flats).map((root) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: cn("choice", song.rootPc === root.pc && "choice-on"),
								onClick: () => state.setRoot(root.pc),
								children: root.label
							}, root.pc))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "chip flex-1",
								onClick: () => state.transpose(-7),
								children: "Down a 5th"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "chip flex-1",
								onClick: () => state.transpose(7),
								children: "Up a 5th"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 grid grid-cols-2 gap-1.5",
							children: SCALES.map((scale) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: cn("choice h-auto flex-col items-start py-2 text-left", song.scaleId === scale.id && "choice-on"),
								onClick: () => state.setScale(scale.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: scale.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("text-xs", song.scaleId === scale.id ? "text-ink/70" : "text-muted"),
									children: scale.hint
								})]
							}, scale.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-1.5",
							children: names.map((name, index) => {
								const on = live?.pcs.includes(pcs[index] ?? -1);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: cn("rounded-md px-2 py-1 text-sm", on ? "bg-brass text-ink" : "bg-raised text-fg"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mr-1 text-xs opacity-70",
										children: index + 1
									}), pretty(name)]
								}, `${name}-${index}`);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: cn("chip mt-3", song.extensions && "chip-on"),
							"aria-pressed": song.extensions,
							onClick: () => state.setExtensions(!song.extensions),
							children: "Sevenths on diatonic chords"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "area-pattern rounded-xl border border-line bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xs font-medium uppercase tracking-widest text-muted",
							children: "Groove for this section"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 grid grid-cols-4 gap-1.5",
							children: [
								[
									"guitar",
									"Steel",
									Guitar
								],
								[
									"nylon",
									"Nylon",
									Guitar
								],
								[
									"piano",
									"Piano",
									Piano
								],
								[
									"soft",
									"Soft",
									AudioLines
								],
								[
									"organ",
									"Organ",
									Waves
								],
								[
									"bass",
									"Bass",
									AudioWaveform
								],
								[
									"strings",
									"Strings",
									Music4
								]
							].map(([id, label, Icon]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: cn("choice flex-col gap-0.5 px-1 text-xs", section.timbre === id && "choice-on"),
								onClick: () => state.setTimbre(id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), label]
							}, id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-muted",
							children: "Dynamics"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1.5 grid grid-cols-3 gap-1.5",
							children: [
								["soft", "Soft"],
								["medium", "Medium"],
								["loud", "Loud"]
							].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: cn("choice text-xs", section.intensity === id && "choice-on"),
								onClick: () => state.setIntensity(id),
								children: label
							}, id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: cn("chip mt-3", section.autoBass && "chip-on"),
							"aria-pressed": section.autoBass,
							onClick: () => state.setAutoBass(!section.autoBass),
							children: "Auto bass"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: "Drums"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: cn("chip", section.drumsOn && section.drumId !== "off" && "chip-on"),
								"aria-pressed": section.drumsOn,
								onClick: () => state.setDrumsOn(!section.drumsOn),
								children: section.drumsOn && section.drumId !== "off" ? "On" : "Off"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-2 flex items-center gap-3 text-sm text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-12",
								children: "Level"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "h-11 flex-1 accent-brass",
								type: "range",
								min: 0,
								max: 1,
								step: .01,
								value: section.drumVolume,
								"aria-label": "Drum volume",
								onChange: (event) => state.setDrumVolume(Number(event.target.value))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-1.5",
							children: [
								["off", "Off"],
								["ballad", "Ballad"],
								["pop", "Pop"],
								["clap", "Clap"],
								["shaker", "Shaker"],
								["shuffle", "Shuffle"],
								["waltz", "Waltz"],
								["compound", "6/8"]
							].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: cn("chip", section.drumId === id && "chip-on"),
								onClick: () => state.setDrum(id),
								children: label
							}, id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-col gap-1.5",
							children: PATTERNS.map((item) => {
								const Icon = item.family === "arp" ? AudioLines : item.id === "waltz" || item.id === "ballad" || item.id === "compound" ? Piano : item.id === "offbeat" || item.id === "shuffle" ? Drum : Guitar;
								const on = section.patternId === item.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: cn("flex items-center gap-3 rounded-lg border px-3 py-2 text-left", on ? "border-brass bg-brass/15" : "border-transparent bg-raised"),
									onClick: () => state.setPattern(item.id),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("size-4 shrink-0", on ? "text-brass" : "text-muted") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "block text-sm font-medium text-fg",
										children: [item.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-2 text-xs font-normal text-muted",
											children: item.signature
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs text-muted",
										children: item.blurb
									})] })]
								}, item.id);
							})
						})
					]
				})
			]
		})]
	});
}
function flatSnap(flat, bpm, volume, loop, metronome, countIn) {
	return {
		...flat,
		bpm,
		volume,
		loop,
		metronome,
		countIn
	};
}
function levelOf(intensity) {
	if (intensity === "soft") return .62;
	if (intensity === "loud") return 1;
	return .86;
}
function halfLabel(meter, signature) {
	if (meter !== 3) return "2 beats";
	return signature === "6/8" ? "3 eighths" : "½ bar";
}
function barsBadge(bars, meter, signature) {
	if (bars === 2) return "2 bars";
	if (bars === .5) return halfLabel(meter, signature);
	return null;
}
function durationMark(bars, meter, signature) {
	const badge = barsBadge(bars, meter, signature);
	return badge ? ` (${badge})` : "";
}
var SOUND_LABEL = {
	guitar: "Steel",
	nylon: "Nylon",
	piano: "Piano",
	soft: "Soft",
	organ: "Organ",
	bass: "Bass",
	strings: "Strings"
};
var DRUM_LABEL = {
	off: "No drums",
	ballad: "Soft ballad",
	pop: "Pop",
	clap: "Clap march",
	shaker: "Folk shaker",
	shuffle: "Shuffle",
	waltz: "Waltz",
	compound: "6/8"
};
var MELODY_LABEL = {
	piano: "Piano",
	soft: "Soft lead",
	lead: "Synth",
	flute: "Flute",
	bit: "8-bit"
};
var MELODY_SOUNDS = [
	"piano",
	"soft",
	"lead",
	"flute",
	"bit"
];
function pitchName(midi, flats) {
	return `${(flats ? [
		"C",
		"D♭",
		"D",
		"E♭",
		"E",
		"F",
		"G♭",
		"G",
		"A♭",
		"A",
		"B♭",
		"B"
	] : [
		"C",
		"C♯",
		"D",
		"D♯",
		"E",
		"F",
		"F♯",
		"G",
		"G♯",
		"A",
		"A♯",
		"B"
	])[(midi % 12 + 12) % 12]}${Math.floor(midi / 12) - 1}`;
}
function MelodyPanel({ open, onToggle, section, chords, flats, scale, playing, chordIndex, eighth, onMelody, onSound, onVolume, onMute, onStep }) {
	const step = section.melodyStep;
	const spans = [];
	const tones = [];
	let total = 0;
	for (const chord of chords) {
		const beats = durationBeats(section.patternId, chord.bars);
		const cols = Math.max(1, Math.round(beats / step));
		spans.push({
			symbol: chord.symbol,
			cols
		});
		for (let i = 0; i < cols; i++) tones.push(chord.pcs);
		total += beats;
	}
	if (!total) total = patternById(section.patternId).meter;
	let activeColumn = -1;
	if (playing && eighth >= 0) {
		let beat = 0;
		for (let i = 0; i < chordIndex; i++) beat += durationBeats(section.patternId, chords[i]?.bars ?? 1);
		beat += eighth * .5;
		activeColumn = Math.max(0, Math.floor(beat / step + .001));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 border-t border-line pt-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "flex w-full items-center justify-between gap-3 text-left",
			onClick: onToggle,
			"aria-expanded": open,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-medium uppercase tracking-widest text-muted",
				children: "Melody"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-muted",
				children: open ? "Hide" : section.melody.length ? `${section.melody.length} notes` : "Add a line"
			})]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-5 gap-1.5",
					children: MELODY_SOUNDS.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: cn("choice px-1 text-xs", section.melodySound === id && "choice-on"),
						onClick: () => onSound(id),
						children: id === "soft" ? "Soft" : id === "lead" ? "Synth" : id === "bit" ? "8-bit" : MELODY_LABEL[id]
					}, id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: cn("chip", section.melodyMute && "chip-on"),
							"aria-pressed": section.melodyMute,
							onClick: () => onMute(!section.melodyMute),
							children: section.melodyMute ? "Muted" : "Mute"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: cn("chip", step === .5 && "chip-on"),
							onClick: () => onStep(.5),
							children: "1/8"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: cn("chip", step === .25 && "chip-on"),
							onClick: () => onStep(.25),
							children: "1/16"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex min-w-40 flex-1 items-center gap-3 text-sm text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-12",
								children: "Level"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "h-11 flex-1 accent-brass",
								type: "range",
								min: 0,
								max: 1,
								step: .01,
								value: section.melodyVolume,
								"aria-label": "Melody volume",
								onChange: (event) => onVolume(Number(event.target.value))
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted",
					children: "Click a cell to add or remove. Drag across the row to hold a note. Ivory rows are in the scale. A brass wash is a chord tone."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MelodyLane, {
					notes: section.melody,
					step,
					totalBeats: total,
					scalePcs: scale,
					tones,
					spans,
					flats,
					activeColumn,
					onChange: onMelody
				})
			]
		}) : null]
	});
}
function liveMatchesRoot(chord, pc) {
	return chord?.rootPc === pc;
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-bg text-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CadenceApp, {})
	});
}
//#endregion
export { Home as component };
