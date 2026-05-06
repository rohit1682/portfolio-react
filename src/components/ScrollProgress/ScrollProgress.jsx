import { useEffect, useState } from "react";
import styles from "./ScrollProgress.module.css";

/**
 * Thin gradient progress bar pinned to the top of the viewport,
 * fills as the user scrolls through the page.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      setProgress(pct);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={styles.bar} aria-hidden="true">
      <div className={styles.fill} style={{ transform: `scaleX(${progress / 100})` }} />
    </div>
  );
}
