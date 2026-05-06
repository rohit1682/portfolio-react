import { motion } from "framer-motion";
import { Trophy, Globe, FileCheck, Medal, Star, Award } from "lucide-react";
import { achievements } from "../../constants";
import { scaleIn } from "../../hooks/animations";
import SectionTitle from "../SectionTitle/SectionTitle";
import styles from "./Achievements.module.css";

const iconMap = { Trophy, Globe, FileCheck, Medal, Star, Award };

export default function Achievements() {
  return (
    <section id="achievements" className="section-wrapper section-bg">
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
                variants={scaleIn}
                custom={i * 0.06}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ scale: 1.02, y: -3 }}
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
