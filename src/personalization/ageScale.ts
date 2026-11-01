import { ageBoundaries } from "./ageBoundaries";
import type { AgeGroup } from "./types";

interface BandScale {
  id: AgeGroup;
  min: number;
  max: number;
  base: [number, number];
  space: [number, number];
  button: [number, number];
  lineHeight: number;
}

const bands: BandScale[] = [
  { id: "toddler", min: 1, max: 4, base: [28, 26], space: [1.65, 1.55], button: [64, 60], lineHeight: 1.6 },
  { id: "child", min: 5, max: 12, base: [22, 19], space: [1.45, 1.25], button: [56, 48], lineHeight: 1.55 },
  { id: "teen", min: 13, max: 17, base: [17, 16], space: [1.15, 1.05], button: [44, 40], lineHeight: 1.45 },
  { id: "young", min: 18, max: 25, base: [16, 16], space: [1, 1], button: [40, 40], lineHeight: 1.45 },
  { id: "adult", min: 26, max: 59, base: [16.5, 18], space: [1.05, 1.2], button: [44, 48], lineHeight: 1.5 },
  { id: "older", min: 60, max: 79, base: [21, 24], space: [1.4, 1.55], button: [56, 64], lineHeight: 1.55 },
  { id: "elder", min: 80, max: 100, base: [26, 30], space: [1.6, 1.75], button: [64, 72], lineHeight: 1.6 },
];

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

const softPalette = {
  bg: "#f6f3ef",
  text: "#241c17",
  muted: "#6b625b",
  border: "#e4dcd3",
  accent: "#c9840a",
  accentSoft: "#f8e7c2",
  focus: "#8a5a00",
  positive: "#1f7a4d",
  danger: "#9c2f2f",
};

const hardPalette = {
  bg: "#ffffff",
  text: "#000000",
  muted: "#1a1a1a",
  border: "#000000",
  accent: "#4a2800",
  accentSoft: "#ffd56a",
  focus: "#000000",
  positive: "#064d28",
  danger: "#7a1010",
};

function channels(hex: string): [number, number, number] {
  const value = hex.slice(1);
  return [parseInt(value.slice(0, 2), 16), parseInt(value.slice(2, 4), 16), parseInt(value.slice(4, 6), 16)];
}

function mixHex(from: string, to: string, amount: number) {
  const [ar, ag, ab] = channels(from);
  const [br, bg, bb] = channels(to);
  const channel = (start: number, end: number) => Math.round(lerp(start, end, amount));
  return [channel(ar, br), channel(ag, bg), channel(ab, bb)] as [number, number, number];
}

function rgb([r, g, b]: [number, number, number]) {
  return `rgb(${r} ${g} ${b})`;
}

function luminance([r, g, b]: [number, number, number]) {
  const channel = (value: number) => {
    const scaled = value / 255;
    return scaled <= 0.03928 ? scaled / 12.92 : ((scaled + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrastAmount(age: number) {
  const years = Math.min(100, Math.max(1, age));
  if (years <= 22) return (22 - years) / 21;
  return (years - 22) / 78;
}

export interface AgeScale {
  basePx: number;
  lineHeight: number;
  spaceScale: number;
  buttonHeight: number;
}

export function scaleForAge(age: number): AgeScale {
  const clamped = Math.min(100, Math.max(1, age));
  const band = bands.find((item) => clamped >= item.min && clamped <= item.max) ?? bands[bands.length - 1];
  const span = Math.max(1, band.max - band.min);
  const t = Math.min(1, Math.max(0, (clamped - band.min) / span));
  return {
    basePx: Math.round(lerp(band.base[0], band.base[1], t) * 10) / 10,
    lineHeight: band.lineHeight,
    spaceScale: lerp(band.space[0], band.space[1], t),
    buttonHeight: Math.round(lerp(band.button[0], band.button[1], t)),
  };
}

export function applyAgeScale(age: number, group: AgeGroup) {
  const scale = scaleForAge(age);
  const root = document.documentElement;
  const base = scale.basePx;
  const space = (step: number) => `${Math.round(step * scale.spaceScale)}px`;
  const amount = contrastAmount(age);
  const accent = mixHex(softPalette.accent, hardPalette.accent, amount);
  const accentLuma = luminance(accent);
  const accentContrast = (1.05 / (accentLuma + 0.05)) >= ((accentLuma + 0.05) / 0.05) ? "#ffffff" : "#1c1408";
  const reducedMotion = ageBoundaries[group].min >= 60 || group === "toddler" || group === "child";

  root.style.setProperty("--base-font", `${base}px`);
  root.style.setProperty("--line-height", String(scale.lineHeight));
  root.style.setProperty("--font-scale", String(base / 16));
  root.style.setProperty("--space-scale", String(scale.spaceScale));
  root.style.setProperty("--space-1", space(4));
  root.style.setProperty("--space-2", space(8));
  root.style.setProperty("--space-3", space(12));
  root.style.setProperty("--space-4", space(16));
  root.style.setProperty("--space-5", space(24));
  root.style.setProperty("--space-6", space(32));
  root.style.setProperty("--space-7", space(48));
  root.style.setProperty("--text-sm", `${Math.round(base * 0.86)}px`);
  root.style.setProperty("--text-md", `${base}px`);
  root.style.setProperty("--text-lg", `${Math.round(base * 1.28)}px`);
  root.style.setProperty("--text-xl", `${Math.round(base * 1.7)}px`);
  root.style.setProperty("--text-2xl", `${Math.round(base * 2.05)}px`);
  root.style.setProperty("--button-height", `${scale.buttonHeight}px`);
  root.style.setProperty("--button-px", `${Math.round(scale.buttonHeight * 0.38)}px`);
  root.style.setProperty("--control-height", `${scale.buttonHeight + 8}px`);
  root.style.setProperty("--nav-item-height", `${scale.buttonHeight}px`);
  root.style.setProperty("--header-height", `${scale.buttonHeight + Math.round(28 * scale.spaceScale)}px`);
  root.style.setProperty("--border-width", amount >= 0.55 ? "2px" : "1px");
  root.style.setProperty("--motion-duration", reducedMotion ? "1ms" : group === "adult" ? "180ms" : "220ms");
  root.style.setProperty("--motion-distance", reducedMotion ? "0px" : "8px");
  root.style.setProperty("--bg", rgb(mixHex(softPalette.bg, hardPalette.bg, amount)));
  root.style.setProperty("--surface", "#ffffff");
  root.style.setProperty("--text", rgb(mixHex(softPalette.text, hardPalette.text, amount)));
  root.style.setProperty("--muted", rgb(mixHex(softPalette.muted, hardPalette.muted, amount)));
  root.style.setProperty("--border", rgb(mixHex(softPalette.border, hardPalette.border, amount)));
  root.style.setProperty("--accent", rgb(accent));
  root.style.setProperty("--accent-contrast", accentContrast);
  root.style.setProperty("--accent-soft", rgb(mixHex(softPalette.accentSoft, hardPalette.accentSoft, amount)));
  root.style.setProperty("--focus", rgb(mixHex(softPalette.focus, hardPalette.focus, amount)));
  root.style.setProperty("--positive", rgb(mixHex(softPalette.positive, hardPalette.positive, amount)));
  root.style.setProperty("--danger", rgb(mixHex(softPalette.danger, hardPalette.danger, amount)));
  root.style.setProperty("--shadow", amount >= 0.4 ? "none" : "0 8px 24px rgb(36 28 23 / 0.06)");
  root.dataset.ageGroup = group;
}

export function clearAgeScale() {
  const root = document.documentElement;
  [
    "--base-font",
    "--line-height",
    "--font-scale",
    "--space-scale",
    "--space-1",
    "--space-2",
    "--space-3",
    "--space-4",
    "--space-5",
    "--space-6",
    "--space-7",
    "--text-sm",
    "--text-md",
    "--text-lg",
    "--text-xl",
    "--text-2xl",
    "--button-height",
    "--button-px",
    "--control-height",
    "--nav-item-height",
    "--header-height",
    "--border-width",
    "--motion-duration",
    "--motion-distance",
    "--bg",
    "--surface",
    "--text",
    "--muted",
    "--border",
    "--accent",
    "--accent-contrast",
    "--accent-soft",
    "--focus",
    "--positive",
    "--danger",
    "--shadow",
  ].forEach((name) => root.style.removeProperty(name));
  delete root.dataset.ageGroup;
}
