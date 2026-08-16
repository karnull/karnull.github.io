import { useEffect, useRef } from "react";

// Adapted from lazy-tmux.xyz's AsciiField (MIT licensed,
// github.com/alchemmist/lazy-tmux/blob/main/docs/src/components/AsciiField.tsx):
// several drifting sine waves interfere into an organic, breathing field of
// monospace glyphs. Restyled toward Cyberpunk 2077's Blackwall: a near-black
// field pierced by deep red glyphs, with a couple of brighter "bubbles" that
// roam the field on their own, plus the odd corruption flicker.
const CHARS = Array.from(
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTVWXYZ!@#$%^&*{}ЯШЫИЪЩДФГЧЛЖБΔΨμλ"
);
const CHARS_LEN = CHARS.length;
const BLANK_CUTOFF = 0.16; // fraction of low-density cells left empty, for breathing room

const CELL_W = 10;
const CELL_H = 12;
const FONT_PX = CELL_H - 3;

// Spatial frequencies are expressed per pixel so the wave scale stays put if
// the cell size changes; multiplied back up into per-cell units at use.
const X_FREQ = 0.0225 * CELL_W;
const Y_FREQ = 0.028 * CELL_H;
const CELL_ASPECT = CELL_H / CELL_W;

// Cap just above 60 so a 60Hz display never has a frame rejected by timing
// jitter (the old exact-interval check dropped frames unevenly), while 120Hz+
// displays still halve their work.
const MIN_FRAME_MS = 1000 / 62;
const POINTER_DECAY = 1.22; // per second, matches the old 0.96/frame at 30fps
const GLITCH_CHANCE = 0.36; // per second
const GLITCH_DURATION = 0.07; // seconds

// Cells are bucketed by intensity and drawn a bucket at a time: one fillStyle
// assignment per bucket instead of one per cell, which is what buys the
// headroom for the higher frame rate.
const BUCKETS = 16;

// Deep red -> slightly warmer red as field density rises. Never reaches
// orange/yellow - kept tight and blood-red for the Blackwall look.
function emberColor(v: number, alpha: number) {
  const hue = v * 12;
  const light = 14 + v * 20;
  return `hsla(${hue}, 95%, ${light}%, ${alpha})`;
}

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    const context = canvasEl?.getContext("2d");
    if (!canvasEl || !context) {
      return;
    }
    const canvas = canvasEl;
    const ctx = context;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let cols = 0;
    let rows = 0;
    const pointer = { x: -1, y: -1, strength: 0 };
    const glitch = { row: -1, until: 0 };

    // Reused across frames so a full field costs no per-frame allocation.
    const bucketX: number[][] = Array.from({ length: BUCKETS }, () => []);
    const bucketY: number[][] = Array.from({ length: BUCKETS }, () => []);
    const bucketCh: string[][] = Array.from({ length: BUCKETS }, () => []);
    const glitchX: number[] = [];
    const glitchCh: string[] = [];

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      cols = Math.floor(rect.width / CELL_W) + 1;
      rows = Math.floor(rect.height / CELL_H) + 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${FONT_PX}px "JetBrains Mono", monospace`;
      ctx.textBaseline = "top";
    }

    function draw(t: number) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let b = 0; b < BUCKETS; b++) {
        bucketX[b].length = 0;
        bucketY[b].length = 0;
        bucketCh[b].length = 0;
      }
      glitchX.length = 0;
      glitchCh.length = 0;

      // Two brighter "bubbles" that wander the grid on independent,
      // slow Lissajous paths, on top of the base shimmer.
      const b1x = cols * 0.5 + cols * 0.38 * Math.sin(t * 0.11);
      const b1y = rows * 0.5 + rows * 0.38 * Math.sin(t * 0.07 + 1.3);
      const b2x = cols * 0.5 + cols * 0.42 * Math.cos(t * 0.05 + 2);
      const b2y = rows * 0.5 + rows * 0.42 * Math.sin(t * 0.08 + 0.6);

      for (let j = 0; j < rows; j++) {
        const isGlitchRow = j === glitch.row && t < glitch.until;
        for (let i = 0; i < cols; i++) {
          const x = i * X_FREQ;
          const y = j * Y_FREQ;
          let v =
            Math.sin(x + t * 0.24) +
            Math.sin(y * 0.8 - t * 0.2) +
            Math.sin((x + y) * 0.5 + t * 0.16) +
            Math.sin(
              Math.hypot(x - cols * X_FREQ * 0.5, y - rows * Y_FREQ * 0.5) -
                t * 0.32
            );
          v /= 4;

          const d1 = Math.hypot(i - b1x, j - b1y);
          const d2 = Math.hypot(i - b2x, j - b2y);
          v += 0.5 * Math.exp(-(d1 * d1) / (2 * 6.4 * 6.4));
          v += 0.4 * Math.exp(-(d2 * d2) / (2 * 5.6 * 5.6));

          if (pointer.x >= 0 && pointer.strength > 0.01) {
            const d = Math.hypot(i - pointer.x, (j - pointer.y) * CELL_ASPECT);
            v +=
              Math.cos(d * 0.56 - t * 1.2) * Math.exp(-d * 0.1) * pointer.strength;
          }
          v = Math.max(0, Math.min(1, (v + 1) / 2));
          if (v < BLANK_CUTOFF && !isGlitchRow) {
            continue;
          }
          const norm = (v - BLANK_CUTOFF) / (1 - BLANK_CUTOFF);
          const ch = CHARS[Math.floor(Math.max(0, norm) * (CHARS_LEN - 1))];
          if (isGlitchRow) {
            glitchX.push(i * CELL_W);
            glitchCh.push(ch);
            continue;
          }
          const b = Math.min(BUCKETS - 1, Math.floor(v * BUCKETS));
          bucketX[b].push(i * CELL_W);
          bucketY[b].push(j * CELL_H);
          bucketCh[b].push(ch);
        }
      }

      for (let b = 0; b < BUCKETS; b++) {
        const xs = bucketX[b];
        if (xs.length === 0) {
          continue;
        }
        const ys = bucketY[b];
        const chs = bucketCh[b];
        const v = (b + 0.5) / BUCKETS;
        ctx.fillStyle = emberColor(v, 0.06 + v * v * 0.7);
        for (let k = 0; k < xs.length; k++) {
          ctx.fillText(chs[k], xs[k], ys[k]);
        }
      }

      if (glitchX.length > 0) {
        const gy = glitch.row * CELL_H;
        ctx.fillStyle = "hsla(0, 100%, 72%, 0.85)";
        for (let k = 0; k < glitchX.length; k++) {
          ctx.fillText(glitchCh[k], glitchX[k], gy);
        }
      }
    }

    resize();
    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) {
        draw(0);
      }
    });
    resizeObserver.observe(canvas);

    if (reduceMotion) {
      draw(0);
      return () => resizeObserver.disconnect();
    }

    let raf = 0;
    let last = 0;
    let running = true;
    function loop(now: number) {
      if (!running) {
        return;
      }
      raf = requestAnimationFrame(loop);
      if (now - last < MIN_FRAME_MS) {
        return;
      }
      // Clamped so a tab regaining focus (or the first frame) can't fire a
      // huge dt that snaps the pointer ripple and glitch timing.
      const dt = last === 0 ? 0 : Math.min((now - last) / 1000, 0.1);
      last = now;
      const t = now / 1000;

      pointer.strength *= Math.exp(-POINTER_DECAY * dt);

      if (t >= glitch.until && Math.random() < GLITCH_CHANCE * dt) {
        glitch.row = Math.floor(Math.random() * rows);
        glitch.until = t + GLITCH_DURATION;
      }

      draw(t);
    }
    raf = requestAnimationFrame(loop);

    function onPointerMove(event: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / CELL_W;
      pointer.y = (event.clientY - rect.top) / CELL_H;
      pointer.strength = 1.2;
    }
    function onPointerLeave() {
      pointer.x = -1;
      pointer.y = -1;
    }
    window.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerleave", onPointerLeave);

    function onVisibility() {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        last = 0;
        raf = requestAnimationFrame(loop);
      }
    }
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
