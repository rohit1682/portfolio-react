import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import TextScramble from "../TextScramble/TextScramble";

export default function SectionTitle({ title, subtitle }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.5 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.55"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const lineScaleX = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

  return (
    <div className="section-title" ref={ref} style={{ perspective: "800px" }}>
      <motion.h2 style={{ opacity, y, scale, rotateX, transformStyle: "preserve-3d" }}>
        <TextScramble text={title} inView={inView} />
      </motion.h2>

      <motion.div
        style={{
          height: 3,
          background: "var(--gradient)",
          borderRadius: 2,
          margin: "10px auto 14px",
          scaleX: lineScaleX,
          transformOrigin: "center",
        }}
      />

      {subtitle && (
        <motion.p style={{ opacity, y }}>
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
