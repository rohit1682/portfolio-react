import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SectionTitle({ title, subtitle }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.55"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const lineScaleX = useTransform(scrollYProgress, [0.2, 1], [0, 1]);

  return (
    <div className="section-title" ref={ref}>
      <motion.h2 style={{ opacity, y, scale }}>
        {title}
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
