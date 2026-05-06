import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import styles from "./Toast.module.css";

/**
 * Tiny dismissible toast — render conditionally.
 *   {visible && <Toast message="Copied!" />}
 */
export default function Toast({ message, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.toast}
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <CheckCircle2 size={16} />
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
