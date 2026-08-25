import { useEffect, useRef, useState } from "react";
import styles from "./CustomCursor.module.css";

/* v8 ignore next 4 */
function shouldHide() {
  if (typeof window === "undefined") return true;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const hidden = shouldHide();
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    if (hidden) return;
    document.documentElement.classList.add("custom-cursor-active");

    /* v8 ignore start */
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const interactiveSelector = 'a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]';

    const onOver = (e) => {
      if (e.target.closest(interactiveSelector)) setHovering(true);
    };
    const onOut = (e) => {
      if (e.target.closest(interactiveSelector)) setHovering(false);
    };

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    /* v8 ignore stop */

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafId.current);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [hidden]);

  if (hidden) return null;

  /* v8 ignore next 5 */
  const ringClass = [
    styles.ring,
    hovering ? styles.hovering : "",
    clicking ? styles.clicking : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <div ref={dotRef} className={styles.dot} data-testid="cursor-dot" />
      <div ref={ringRef} className={ringClass} data-testid="cursor-ring" />
    </>
  );
}
