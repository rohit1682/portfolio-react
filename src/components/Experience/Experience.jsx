import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { experience } from "../../constants";
import { staggerContainer, staggerItem, fadeLeft } from "../../hooks/animations";
import SectionTitle from "../SectionTitle/SectionTitle";
import styles from "./Experience.module.css";

export default function Experience() {
  return (
    <section id="experience" className="section-wrapper">
      <div className="container">
        <SectionTitle title="Experience" subtitle="My professional journey so far" />

        <div className={styles.timeline}>
          {/* Animated line */}
          <motion.div
            className={styles.line}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {experience.map((item, i) => (
            <motion.div
              key={i}
              className={styles.item}
              variants={fadeLeft}
              custom={i * 0.15}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div
                className={styles.dot}
                style={{ background: item.color }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.3, duration: 0.4, ease: "backOut" }}
              >
                <Briefcase size={12} />
              </motion.div>

              <div className={`card ${styles.card}`}>
                <div className={styles.header}>
                  <div className={styles.headerLeft}>
                    <h3 className={styles.role}>{item.role}</h3>
                    <span className={styles.company} style={{ color: item.color }}>{item.company}</span>
                  </div>
                  <div className={styles.headerRight}>
                    <span className="tag">{item.type}</span>
                    {item.current && <span className={styles.currentBadge}>● Current</span>}
                  </div>
                </div>

                <div className={styles.meta}>
                  <span className={styles.metaItem}><MapPin size={12} />{item.location}</span>
                  <span className={styles.metaItem}><Calendar size={12} />{item.period}</span>
                </div>

                <ul className={styles.points}>
                  {item.points.map((pt, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + j * 0.06 }}
                    >
                      <CheckCircle2 size={13} className={styles.checkIcon} />
                      {pt}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
