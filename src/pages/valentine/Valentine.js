import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FloatingHearts from "../../components/floatingHearts/FloatingHearts";
import MovingButton from "../../components/movingButton/MovingButton";
import LoveConfetti from "../../components/loveConfetti/LoveConfetti";
import "./Valentine.css";

const TAUNTS = [
  "Are you sure? 🥺",
  "Think again... 💭",
  "Catch me if you can! 🏃‍♀️",
  "Don't be like that 😢",
  "Last chance... 💔",
  "You can't escape love 💘",
  "Really? Really? 🙃",
  "I'm faster than you 😏",
];

function useHeartbeat(active) {
  useEffect(() => {
    if (!active) return undefined;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return undefined;
    const ctx = new Ctx();
    let stopped = false;

    const beat = (freq, when, gain = 0.28) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = freq;
      g.gain.setValueAtTime(0, when);
      g.gain.linearRampToValueAtTime(gain, when + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, when + 0.18);
      o.connect(g).connect(ctx.destination);
      o.start(when);
      o.stop(when + 0.22);
    };

    const tick = () => {
      if (stopped) return;
      const t = ctx.currentTime;
      beat(62, t, 0.32);
      beat(50, t + 0.22, 0.24);
    };

    tick();
    const id = setInterval(tick, 1100);

    return () => {
      stopped = true;
      clearInterval(id);
      ctx.close().catch(() => {});
    };
  }, [active]);
}

export default function Valentine() {
  const [stage, setStage] = useState("ask");
  const [dark, setDark] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [confetti, setConfetti] = useState(false);
  const finalTimer = useRef(null);

  useHeartbeat(musicOn);

  const text = "Will you be my Valentine ?";
  const letters = useMemo(() => Array.from(text), []);

  const handleYes = useCallback(() => {
    setConfetti(true);
    setStage("celebrate");
    finalTimer.current = setTimeout(() => setStage("final"), 2600);
  }, []);

  const handleNoAttempt = useCallback(() => {
    setAttempts((p) => p + 1);
  }, []);

  const replay = useCallback(() => {
    setStage("ask");
    setAttempts(0);
    setConfetti(false);
  }, []);

  useEffect(() => () => clearTimeout(finalTimer.current), []);

  const tauntMessage =
    attempts === 0
      ? "A simple click. A whole feeling."
      : TAUNTS[(attempts - 1) % TAUNTS.length];

  return (
    <div className={`vt-root ${dark ? "vt-dark" : ""}`}>
      <div className="vt-bg" />
      <FloatingHearts />

      <div className="vt-toolbar">
        <button
          className="vt-toggle"
          onClick={() => setDark((d) => !d)}
          aria-label="Toggle dark romantic mode"
          title="Dark romantic"
          type="button"
        >
          {dark ? "☀️" : "🌙"}
        </button>
        <button
          className="vt-toggle"
          onClick={() => setMusicOn((m) => !m)}
          aria-label="Toggle heartbeat sound"
          title="Heartbeat"
          type="button"
        >
          {musicOn ? "🔊" : "🔇"}
        </button>
      </div>

      {confetti && (
        <LoveConfetti onDone={() => setConfetti(false)} duration={2400} />
      )}

      <main className="vt-stage">
        <AnimatePresence mode="wait">
          {stage === "ask" && (
            <motion.section
              key="ask"
              className="vt-card vt-glass"
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.97 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="vt-image"
                whileHover={{ rotate: -2, scale: 1.04 }}
                transition={{ type: "spring", stiffness: 220, damping: 14 }}
              >
                <div className="vt-image-glow" aria-hidden="true" />
                <div className="vt-image-inner">💖</div>
              </motion.div>

              <h1
                className="vt-title"
                style={{ fontSize: "38px" }}
                aria-label={text}
              >
                {letters.map((c, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 18, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      delay: 0.35 + i * 0.04,
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ display: "inline-block", whiteSpace: "pre" }}
                    aria-hidden="true"
                  >
                    {c}
                  </motion.span>
                ))}
                <motion.span
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.35 + letters.length * 0.04 + 0.15,
                    type: "spring",
                    stiffness: 260,
                    damping: 14,
                  }}
                  className="vt-title-emoji"
                  aria-hidden="true"
                >
                  💖
                </motion.span>
              </h1>

              <motion.p
                key={tauntMessage}
                className="vt-sub"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                {tauntMessage}
              </motion.p>

              <div className="vt-actions">
                <motion.button
                  className="vt-btn vt-btn-yes"
                  onClick={handleYes}
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  type="button"
                >
                  Yes 💕
                </motion.button>
                <MovingButton onAttempt={handleNoAttempt}>No 😅</MovingButton>
              </div>

              <AnimatePresence>
                {attempts >= 7 && (
                  <motion.div
                    className="vt-easter"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    🥚 Easter egg unlocked — your persistence is admirable. Just
                    say Yes 😉
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>
          )}

          {stage === "celebrate" && (
            <motion.section
              key="celebrate"
              className="vt-card vt-glass vt-celebrate"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="vt-bigheart"
                animate={{ scale: [1, 1.14, 1] }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ❤️
              </motion.div>
              <h2 className="vt-celebrate-text" style={{ color: "white" }}>
                🌸 I knew it 🌸
              </h2>
            </motion.section>
          )}

          {stage === "final" && (
            <motion.section
              key="final"
              className="vt-card vt-glass vt-final"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="vt-final-emoji"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                💞
              </motion.div>
              <h2 className="vt-final-title">You just made my year</h2>
              <p className="vt-final-msg">
                From this moment, every heartbeat has your name on it.
                <br />
                Happy Valentine's, forever.
              </p>
              <motion.button
                className="vt-btn vt-btn-yes"
                onClick={replay}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.96 }}
                type="button"
              >
                Replay 💫
              </motion.button>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
