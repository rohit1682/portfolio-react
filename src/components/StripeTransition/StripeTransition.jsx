import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./StripeTransition.module.css";

const STRIPE_COUNT = 5;

function Stripe({ scrollYProgress, index }) {
  const offset = index * 0.05;

  const scaleY = useTransform(
    scrollYProgress,
    [0 + offset, 0.2 + offset, 0.5 + offset, 0.7 + offset],
    [0, 1, 1, 0],
  );

  /* v8 ignore next */
  const origin = useTransform(scrollYProgress, (p) =>
    p < 0.5 + offset ? "bottom" : "top",
  );

  return (
    <motion.div
      className={styles.stripe}
      style={{ scaleY, transformOrigin: origin }}
    />
  );
}

export default function StripeTransition() {
  const containerRef = useRef(null);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  if (prefersReduced) return null;

  return (
    <div className={styles.container} ref={containerRef} data-testid="stripe-transition" aria-hidden="true">
      <div className={styles.stickyWrap}>
        {Array.from({ length: STRIPE_COUNT }, (_, i) => (
          <Stripe key={i} scrollYProgress={scrollYProgress} index={i} />
        ))}
      </div>
    </div>
  );
}
