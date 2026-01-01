import { useEffect, useRef, useState } from "react";

type Phase = "in" | "visible" | "out";

interface TextLine {
  id: number;
  chars: string[];
  xOffset: number;
  yOffset: number;
}

interface Group {
  id: number;
  x: number;
  baseY: number;
  opacity: number;
  phase: Phase;
  lines: TextLine[];

  visibleFrames: number;
  visibleDuration: number;
  fadeInSpeed: number;
  fadeOutSpeed: number;
  jitterCooldown: number;
}

const CHARS = Array.from(
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTVWXYZ!@#$%^&*{}ЯШЫИЪЩДФГЧЛЖБΔΨμλ"
);
const CHARS_LEN = CHARS.length;
const rand = (n: number) => (Math.random() * n) | 0;
const getRandomChar = () => CHARS[rand(CHARS_LEN)];

const SIM_FPS = 30;
const FRAME_TIME = 1000 / SIM_FPS;

const getRandomX = () => {
  const r = Math.random();
  if (r < 0.4) return 80 + rand(18);
  if (r < 0.8) return 1 + rand(16);
  return 20 + rand(60);
};

const makeChars = (len: number) =>
  Array.from({ length: len }, getRandomChar);

const createGroup = (idStart: number): Group => {
  const baseX = getRandomX();
  const groupSize = 3 + rand(4);
  const baseY = -15 + Math.random() * 70;

  const lines: TextLine[] = [];
  for (let i = 0; i < groupSize; i++) {
    lines.push({
      id: idStart + i,
      chars: makeChars(100 + rand(50)),
      xOffset: i * 0.25,
      yOffset: Math.random() * 10 - 20,
    });
  }

  return {
    id: idStart,
    x: baseX,
    baseY,
    opacity: -0.15,
    phase: "in",
    lines,

    visibleFrames: 0,
    visibleDuration: 60 + rand(300),
    fadeInSpeed: 0.02 + Math.random() * 0.015,
    fadeOutSpeed: 0.02 + Math.random() * 0.015,
    jitterCooldown: rand(3),
  };
};

export default function MatrixRain() {
  const [, forceRender] = useState(0);
  const groupsRef = useRef<Group[]>([]);
  const idRef = useRef(0);
  const lastSimRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    groupsRef.current = [createGroup(0)];
    idRef.current = 1000;
    forceRender((t) => t + 1);
  }, []);

  useEffect(() => {
    const step = (ts: number) => {
      if (ts - lastSimRef.current < FRAME_TIME) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }
      lastSimRef.current = ts;

      const groups = groupsRef.current;

      for (let i = groups.length - 1; i >= 0; i--) {
        const g = groups[i];

        if (g.phase === "in") {
          g.opacity += g.fadeInSpeed;
          if (g.opacity >= 0.2) g.phase = "visible";
        } else if (g.phase === "visible") {
          g.visibleFrames++;

          if (--g.jitterCooldown <= 0) {
            g.jitterCooldown = rand(3);
            for (const ln of g.lines) {
              const idx = rand(ln.chars.length);
              ln.chars[idx] = getRandomChar();
            }
          }

          if (g.visibleFrames > g.visibleDuration && Math.random() < 0.25) {
            g.phase = "out";
          }
        } else {
          g.opacity -= g.fadeOutSpeed;
          if (g.opacity <= 0) groups.splice(i, 1);
        }
      }

      if (groups.length < 5 && Math.random() < 0.1) {
        const g = createGroup(idRef.current);
        idRef.current += g.lines.length;
        groups.push(g);
      }

      forceRender((t) => t + 1);
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {groupsRef.current.map((g) =>
        g.lines.map((line) => (
          <div
            key={`${g.id}-${line.id}`}
            className="absolute font-mono text-[7px] leading-[1] whitespace-pre select-none"
            style={{
              left: `${g.x + line.xOffset}%`,
              top: `${g.baseY + line.yOffset}%`,
              color: `hsl(0 70% 50% / ${Math.max(0, g.opacity)})`,
              textShadow: `0 0 6px hsl(0 80% 45% / ${g.opacity * 0.5})`,
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            {line.chars.join("")}
          </div>
        ))
      )}
    </div>
  );
}

