import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./Code3D.module.css";

const DEPTH_LAYERS = 8;

export default function Code3D() {
  const sceneRef = useRef(null);
  const cubeRef = useRef(null);
  const rotRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  /* v8 ignore start */
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const onMouseMove = (e) => {
      const el = sceneRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetRef.current = {
        x: -((e.clientY - cy) / (rect.height / 2)) * 30,
        y: ((e.clientX - cx) / (rect.width / 2)) * 30,
      };
    };

    const animate = () => {
      rotRef.current.x += (targetRef.current.x - rotRef.current.x) * 0.06;
      rotRef.current.y += (targetRef.current.y - rotRef.current.y) * 0.06;
      if (cubeRef.current) {
        cubeRef.current.style.transform =
          `rotateX(${rotRef.current.x}deg) rotateY(${rotRef.current.y}deg)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);
  /* v8 ignore stop */

  const layers = Array.from({ length: DEPTH_LAYERS }, (_, i) => i);

  return (
    <section className={styles.section} aria-hidden="true">
      <motion.div
        ref={sceneRef}
        className={styles.scene}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div ref={cubeRef} className={styles.cube}>
          <span className={styles.front}>&lt;code /&gt;</span>
          {layers.map((i) => (
            <span
              key={i}
              className={styles.layer}
              style={{ transform: `translateZ(${-(i + 1) * 4}px)` }}
              aria-hidden="true"
            >
              &lt;code /&gt;
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
