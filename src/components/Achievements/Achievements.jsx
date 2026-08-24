import { motion } from "framer-motion";
import { Trophy, Globe, FileCheck, Medal, Star, Award } from "lucide-react";
import { achievements } from "../../constants";
import SectionTitle from "../SectionTitle/SectionTitle";
import styles from "./Achievements.module.css";

const iconMap = { Trophy, Globe, FileCheck, Medal, Star, Award };

const burstVariant = {
  /* v8 ignore next */
  hidden: { opacity: 0, scale: 0.6, rotateZ: () => (Math.random() - 0.5) * 6 },
  /* v8 ignore next */
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    rotateZ: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: "backOut" },
  }),
};

export default function Achievements() {
  return (
    <section id="achievements" className="section-wrapper section-bg section-3d">
      <div className="container">
        <SectionTitle title="Achievements" subtitle="Milestones and recognitions along the way" />

        <motion.p
          className={styles.note}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          🏆 Awards & Recognition — see the dedicated <a href="#certificates">Certificates</a> section for credentials.
        </motion.p>

        <div className={styles.achieveGrid}>
          {achievements.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div
                key={item.title}
                className={`card ${styles.achieveCard} ${item.highlight ? styles.highlight : ""}`}
                variants={burstVariant}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ scale: 1.02, y: -3, z: 20 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className={styles.achieveIcon}
                  style={item.highlight ? { background: "rgba(255,193,7,0.15)", border: "1px solid rgba(255,193,7,0.3)", color: "#ffc107" } : {}}
                >
                  {Icon && <Icon size={18} />}
                </div>
                <span className={styles.achieveTitle}>{item.title}</span>
                {item.highlight && <span className={styles.highlightStar}>⭐</span>}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
