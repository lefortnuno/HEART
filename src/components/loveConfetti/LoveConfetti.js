import { useEffect, useRef } from "react";

const COLORS = [
  "#ff4d6d",
  "#ff85a1",
  "#ffb3c1",
  "#fb6f92",
  "#ff0a54",
  "#ffffff",
  "#ffd1dc",
];

function drawHeart(ctx, x, y, size, color) {
  const k = size / 30;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(k, k);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(0, -15, -15, -15, -15, 0);
  ctx.bezierCurveTo(-15, 10, 0, 18, 0, 30);
  ctx.bezierCurveTo(0, 18, 15, 10, 15, 0);
  ctx.bezierCurveTo(15, -15, 0, -15, 0, 0);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export default function LoveConfetti({ duration = 2400, onDone, count = 220 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    let raf;
    let stopped = false;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    const particles = Array.from({ length: count }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 9;
      return {
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: 6 + Math.random() * 10,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        kind: Math.random() < 0.55 ? "heart" : "rect",
      };
    });

    const start = performance.now();

    const tick = (t) => {
      if (stopped) return;
      const elapsed = t - start;
      const life = Math.max(0, 1 - elapsed / duration);

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particles.forEach((p) => {
        p.vy += 0.16;
        p.vx *= 0.992;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;

        ctx.globalAlpha = life;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        if (p.kind === "heart") {
          drawHeart(ctx, 0, 0, p.size, p.color);
        } else {
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.55);
        }
        ctx.restore();
      });
      ctx.globalAlpha = 1;

      if (elapsed < duration) {
        raf = requestAnimationFrame(tick);
      } else if (onDone) {
        onDone();
      }
    };

    raf = requestAnimationFrame(tick);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [duration, onDone, count]);

  return <canvas ref={canvasRef} className="vt-confetti" aria-hidden="true" />;
}
