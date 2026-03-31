import { motion } from "framer-motion";
import { Trophy, Globe, FileCheck, Medal, Star, Award } from "lucide-react";
import { achievements, certifications } from "../../constants";
import { staggerContainer, staggerItem, scaleIn, fadeRight } from "../../hooks/animations";
import SectionTitle from "../SectionTitle/SectionTitle";
import styles from "./Achievements.module.css";

const iconMap = { Trophy, Globe, FileCheck, Medal, Star, Award };

export default function Achievements() {
  return (
    <section id="achievements" className="section-wrapper section-bg">
      <div className="container">
        <SectionTitle title="Achievements" subtitle="Milestones and recognitions along the way" />

        <div className={styles.grid}>
          {/* Achievements */}
          <div>
            <motion.h3 className={styles.colLabel} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              🏆 Awards & Recognition
            </motion.h3>
            <div className={styles.achieveList}>
              {achievements.map((item, i) => {
                const Icon = iconMap[item.icon];
                return (
                  <motion.div
                    key={i}
                    className={`card ${styles.achieveCard} ${item.highlight ? styles.highlight : ""}`}
                    variants={scaleIn}
                    custom={i * 0.08}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                  >
                    <div className={styles.achieveIcon} style={item.highlight ? { background: "rgba(255,193,7,0.15)", border: "1px solid rgba(255,193,7,0.3)", color: "#ffc107" } : {}}>
                      {Icon && <Icon size={18} />}
                    </div>
                    <span className={styles.achieveTitle}>{item.title}</span>
                    {item.highlight && <span className={styles.highlightStar}>⭐</span>}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <motion.h3 className={styles.colLabel} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              📜 Certifications
            </motion.h3>
            <div className={styles.certList}>
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  className={`card ${styles.certCard}`}
                  variants={fadeRight}
                  custom={i * 0.06}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  <div className={styles.certDot} />
                  <div>
                    <p className={styles.certName}>{cert.name}</p>
                    <p className={styles.certIssuer}>{cert.issuer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
