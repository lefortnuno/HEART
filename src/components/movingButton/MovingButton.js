import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import "./MovingButton.css";

export default function MovingButton({ children, onAttempt }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  const dodge = useCallback(
    (e) => {
      if (e && e.preventDefault) e.preventDefault();
      onAttempt && onAttempt();

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const rangeX = Math.min(vw * 0.35, 320);
      const rangeY = Math.min(vh * 0.35, 240);
      const x = (Math.random() - 0.5) * rangeX * 2;
      const y = (Math.random() - 0.5) * rangeY * 2;

      setPos({ x, y });
      setScale((s) => Math.max(0.45, s * 0.92));
    },
    [onAttempt]
  );

  return (
    <motion.button
      type="button"
      className="vt-moving-btn"
      onPointerEnter={dodge}
      onFocus={dodge}
      onClick={dodge}
      animate={{ x: pos.x, y: pos.y, scale }}
      transition={{ type: "spring", stiffness: 240, damping: 16 }}
    >
      {children}
    </motion.button>
  );
}
