import { motion } from "framer-motion";

/**
 * Reusable animated section title.
 * Uses whileInView directly so it always works regardless of parent variants.
 */
export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="section-title">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
