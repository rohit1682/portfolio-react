import { useEffect, useState } from "react";
import styles from "./Preloader.module.css";

import { personalInfo } from "../../constants";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState("words");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let wordTimer;
    let idx = 0;
    const cycleWord = () => {
      idx++;
      if (idx < personalInfo.preloaderWords.length) {
        setWordIdx(idx);
        wordTimer = setTimeout(cycleWord, 600);
      } else {
        setPhase("loading");
      }
    };
    wordTimer = setTimeout(cycleWord, 600);

    return () => {
      clearTimeout(wordTimer);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;

    let frame = 0;
    const totalFrames = 60;
    let rafId;

    /* v8 ignore start */
    const tick = () => {
      frame++;
      const t = frame / totalFrames;
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.min(Math.round(eased * 100), 100));

      if (frame < totalFrames) {
        rafId = requestAnimationFrame(tick);
      } else {
        setPhase("reveal");
        setTimeout(() => {
          setHidden(true);
          document.body.style.overflow = "";
        }, 800);
      }
    };
    /* v8 ignore stop */

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.body.style.overflow = "";
    };
  }, [phase]);

  /* v8 ignore next */
  if (hidden) return null;

  return (
    <div
      /* v8 ignore next */
      className={`${styles.preloader} ${phase === "reveal" ? styles.reveal : ""}`}
      aria-live="polite"
      role="status"
      data-testid="preloader"
    >
      <div className={styles.curtainTop} />
      <div className={styles.curtainBottom} />

      <div className={styles.content}>
        {phase === "words" && (
          <div className={styles.wordCycle} data-testid="preloader-words">
            <span key={wordIdx} className={styles.word}>{personalInfo.preloaderWords[wordIdx]}</span>
          </div>
        )}

        {(phase === "loading" || phase === "reveal") && (
          <>
            <div className={styles.initials}>
              <span className={styles.letter}>R</span>
              <span className={styles.letter}>G</span>
            </div>
            <div className={styles.barTrack}>
              <div
                className={styles.barFill}
                style={{ width: `${progress}%` }}
                data-testid="preloader-bar"
              />
            </div>
            <span className={styles.percent}>{progress}%</span>
          </>
        )}
      </div>
    </div>
  );
}
