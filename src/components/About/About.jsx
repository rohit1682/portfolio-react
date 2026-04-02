import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code2, FolderGit2, Monitor, Users } from "lucide-react";
import { personalInfo, stats } from "../../constants";
import { fadeLeft, fadeRight, staggerContainer, staggerItem } from "../../hooks/animations";
import SectionTitle from "../SectionTitle/SectionTitle";
import styles from "./About.module.css";

const iconMap = { Code2, FolderGit2, Monitor, Users };

function Counter({ target, inView }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let val = 0;
    const step = Math.ceil(target / 60);
    const t = setInterval(() => {
      val += step;
      if (val >= target) { setCount(target); clearInterval(t); }
      else setCount(val);
    }, 20);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span>{count}+</span>;
}

export default function About() {
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="about" className="section-wrapper">
      <div className="container">
        <SectionTitle title="About Me" subtitle="A little bit about who I am and what I do" />

        <div className={styles.grid}>
          {/* Photo side */}
          <motion.div className={styles.photoSide} variants={fadeLeft} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <div className={styles.photoStack}>
              <div className={styles.photoFrame}>
                <img src={personalInfo.photos.intro} alt={personalInfo.name} className={styles.photo} />
                <div className={styles.photoAccent} />
                <div className={styles.photoGlow} />
              </div>
            </div>
            <div className={styles.currentRole}>
              <span className={styles.roleDot} />
              <span>{personalInfo.currentRole}</span>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div className={styles.textSide} variants={fadeRight} custom={0.1} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h3>Full Stack Developer &amp; Public Speaker</h3>
            <p>{personalInfo.summary}</p>

            <div className={styles.infoGrid}>
              <div className={styles.infoItem}><span className={styles.label}>Email</span><a href={`mailto:${personalInfo.email}`} className={styles.link}>{personalInfo.email}</a></div>
              <div className={styles.infoItem}><span className={styles.label}>Phone</span><span className={styles.value}>{personalInfo.phone}</span></div>
              <div className={styles.infoItem}><span className={styles.label}>Location</span><span className={styles.value}>{personalInfo.location}</span></div>
              <div className={styles.infoItem}><span className={styles.label}>Degree</span><span className={styles.value}>B.Tech — CSE, KIIT</span></div>
              <div className={styles.infoItem}><span className={styles.label}>Languages</span><span className={styles.value}>{personalInfo.spokenLanguages.join(", ")}</span></div>
              <div className={styles.infoItem}><span className={styles.label}>Status</span><span className={styles.available}>Employed · Open to Opportunities ✦</span></div>
            </div>

            <div className={styles.learning}>
              <span className={styles.learningLabel}>Currently learning:</span>
              {personalInfo.currentlyLearning.map(t => <span key={t} className="tag">{t}</span>)}
            </div>

            <div className={styles.btnRow}>
              <a href={`mailto:${personalInfo.email}`} className="btn-primary">Say Hello</a>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="btn-outline">GitHub Profile</a>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div className={styles.statsGrid} ref={statsRef} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          {stats.map((stat, idx) => {
            const Icon = iconMap[stat.icon];
            return (
              <motion.div
                key={stat.label}
                className={`card ${styles.statCard}`}
                variants={staggerItem}
                whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(230,57,70,0.15)" }}
              >
                {Icon && (
                  <motion.div
                    className={styles.statIcon}
                    initial={{ scale: 0, rotate: -20 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.2, duration: 0.5, ease: "backOut" }}
                  >
                    <Icon size={26} />
                  </motion.div>
                )}
                <div className={styles.statNum}><Counter target={stat.value} inView={statsInView} /></div>
                <div className={styles.statLabel}>{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
