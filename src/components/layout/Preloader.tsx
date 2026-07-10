import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import "./preloader.css";

const WORD = "PAUZ".split("");
const DURATION = 1500; // ms de comptage 0 → 100
const HOLD = 500; // ms de pause avant que le rideau se lève

const wordVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const letterVariants: Variants = {
  hidden: { y: "115%" },
  visible: {
    y: "0%",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Écran de chargement affiché au 1er rendu de l'app. Se démonte tout seul
 * une fois l'intro jouée. Respecte `prefers-reduced-motion` (pas de
 * révélation animée, simple fondu court).
 */
export default function Preloader() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);

  // Compteur 0 → 100 puis disparition
  useEffect(() => {
    if (reduced) {
      setCount(100);
      const t = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(t);
    }

    let raf = 0;
    let hideTimer: ReturnType<typeof setTimeout>;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      setCount(Math.round(p * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        hideTimer = setTimeout(() => setVisible(false), HOLD);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hideTimer);
    };
  }, [reduced]);

  // Bloque le scroll tant que le preloader est visible
  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="preloader"
          aria-hidden
          exit={reduced ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.span
            className="preloader__eyebrow"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Eau de coco · Abidjan
          </motion.span>

          <motion.div
            className="preloader__word"
            variants={wordVariants}
            initial={reduced ? false : "hidden"}
            animate="visible"
          >
            {WORD.map((c, i) => (
              <span key={i} className="preloader__letter-mask">
                <motion.span
                  className="preloader__letter"
                  variants={letterVariants}
                >
                  {c}
                </motion.span>
              </span>
            ))}
          </motion.div>

          <span className="preloader__count">{count}%</span>

          {/* <motion.div
            className="preloader__bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: count / 100 }}
            transition={{ ease: 'linear', duration: 0.1 }}
          /> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
