import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export default function TextScramble({ text, inView = false }) {
  const [display, setDisplay] = useState(text);
  const running = useRef(false);
  const prefersReduced = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (!inView || prefersReduced.current || running.current) return;
    running.current = true;

    const chars = text.split("");
    const resolved = new Array(chars.length).fill(false);
    let frame = 0;
    const totalFrames = 20;
    let rafId;

    const tick = () => {
      frame++;
      const progress = frame / totalFrames;

      const next = chars.map((ch, i) => {
        if (ch === " ") return " ";
        if (resolved[i]) return ch;
        if (i / chars.length < progress) {
          resolved[i] = true;
          return ch;
        }
        return randomChar();
      });

      setDisplay(next.join(""));

      if (frame < totalFrames) {
        rafId = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
        running.current = false;
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      running.current = false;
    };
  }, [inView, text]);

  return <span data-testid="text-scramble">{display}</span>;
}
