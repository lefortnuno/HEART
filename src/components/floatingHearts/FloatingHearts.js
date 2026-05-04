import { useMemo } from "react";
import { motion } from "framer-motion";
import "./FloatingHearts.css";

const GLYPHS = ["💖", "❤️", "💕", "💗", "💘", "💝"];

function buildHearts(count) {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 14 + Math.random() * 30,
    duration: 9 + Math.random() * 11,
    delay: Math.random() * 9,
    sway: 30 + Math.random() * 70,
    opacity: 0.35 + Math.random() * 0.5,
    glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
  }));
}

export default function FloatingHearts({ count = 22 }) {
  const hearts = useMemo(() => buildHearts(count), [count]);

  return (
    <div className="vt-hearts" aria-hidden="true">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="vt-heart"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            opacity: h.opacity,
          }}
          initial={{ y: 0, x: 0 }}
          animate={{
            y: `-110vh`,
            x: [0, h.sway, -h.sway, 0],
          }}
          transition={{
            y: {
              duration: h.duration,
              delay: h.delay,
              repeat: Infinity,
              ease: "linear",
            },
            x: {
              duration: h.duration / 2,
              delay: h.delay,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          {h.glyph}
        </motion.span>
      ))}
    </div>
  );
}
