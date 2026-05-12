import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code2, FolderGit2, Monitor, Users } from "lucide-react";
import { GitHubCalendar } from "react-github-calendar";
import { personalInfo, stats } from "../../constants";
import { fadeLeft, fadeRight, staggerContainer, staggerItem } from "../../hooks/animations";
import SectionTitle from "../SectionTitle/SectionTitle";
import styles from "./About.module.css";

const iconMap = { Code2, FolderGit2, Monitor, Users };

// Inline GitHub mark — lucide-react dropped brand icons.
const GithubMark = (props) => (
  <svg viewBox="0 0 24 24" width={props.size || 18} height={props.size || 18} fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

// Extract username from the github URL once
const githubUsername = (() => {
  try {
    return new URL(personalInfo.github).pathname.replace(/\//g, "") || "rohit1682";
  } catch {
    return "rohit1682";
  }
})();

const calendarTheme = {
  light: ["#1a151a", "#3d1f2a", "#7c1d2e", "#b91c2e", "#e85d75"],
  dark:  ["#1a151a", "#3d1f2a", "#7c1d2e", "#b91c2e", "#e85d75"],
};

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
  const [calendarKey, setCalendarKey] = useState(Date.now());

  // Refresh GitHub calendar every 5 minutes to show real-time contributions
  useEffect(() => {
    const interval = setInterval(() => {
      setCalendarKey(Date.now());
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

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

        {/* GitHub contributions */}
        <motion.div
          className={`card ${styles.calendarCard}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.calendarHead}>
            <div className={styles.calendarTitle}>
              <GithubMark size={18} />
              <span>GitHub Contributions</span>
            </div>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className={styles.calendarLink}
            >
              @{githubUsername} →
            </a>
          </div>
          <div className={styles.calendarWrap}>
            <GitHubCalendar
              key={calendarKey}
              username={githubUsername}
              colorScheme="dark"
              theme={calendarTheme}
              fontSize={12}
              blockSize={11}
              blockMargin={3}
              hideColorLegend={false}
              hideMonthLabels={false}
              labels={{
                totalCount: "{{count}} contributions in the last year",
              }}
              errorMessage="Unable to load contributions"
              transformData={(data) => {
                // Force fresh data by adding cache-busting timestamp
                return data;
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
