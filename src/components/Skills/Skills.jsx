import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { skillCategories, skillTags } from "../../constants";
import { staggerContainer, staggerItem, fadeLeft } from "../../hooks/animations";
import SectionTitle from "../SectionTitle/SectionTitle";
import styles from "./Skills.module.css";

function SkillBar({ name, level, inView, delay }) {
  return (
    <div className={styles.skillItem}>
      <div className={styles.skillHeader}>
        <span className={styles.skillName}>{name}</span>
        <span className={styles.skillLevel}>{level}%</span>
      </div>
      <div className={styles.track}>
        <motion.div
          className={styles.fill}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
    </div>
  );
}

const tagColors = [
  "rgba(108,99,255,0.15)", "rgba(255,101,132,0.15)", "rgba(67,233,123,0.12)",
  "rgba(56,249,215,0.12)", "rgba(255,193,7,0.12)", "rgba(0,188,212,0.12)", "rgba(233,30,99,0.12)",
];
const tagBorders = [
  "rgba(108,99,255,0.35)", "rgba(255,101,132,0.35)", "rgba(67,233,123,0.3)",
  "rgba(56,249,215,0.3)", "rgba(255,193,7,0.3)", "rgba(0,188,212,0.3)", "rgba(233,30,99,0.3)",
];
const tagText = ["#a09af8", "#ff8fa3", "#43e97b", "#38f9d7", "#ffc107", "#00bcd4", "#e91e63"];

export default function Skills() {
  const [activeTab, setActiveTab] = useState("bars");
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="skills" className="section-wrapper section-bg">
      <div className="container">
        <SectionTitle title="Skills" subtitle="Technologies and tools I work with" />

        {/* Tab toggle */}
        <motion.div className={styles.tabs} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <button className={`${styles.tab} ${activeTab === "bars" ? styles.tabActive : ""}`} onClick={() => setActiveTab("bars")}>Proficiency</button>
          <button className={`${styles.tab} ${activeTab === "tags" ? styles.tabActive : ""}`} onClick={() => setActiveTab("tags")}>All Skills</button>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "bars" && (
            <motion.div key="bars" className={styles.barsGrid} ref={ref} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              {skillCategories.map((group, gi) => (
                <motion.div key={group.category} className={`card ${styles.group}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: gi * 0.1, duration: 0.6 }}>
                  <h3 className={styles.category}>{group.category}</h3>
                  {group.items.map((skill, si) => (
                    <SkillBar key={skill.name} name={skill.name} level={skill.level} inView={inView} delay={gi * 0.1 + si * 0.07} />
                  ))}
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "tags" && (
            <motion.div key="tags" className={styles.tagsView} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              {Object.entries(skillTags).map(([category, tags], ci) => (
                <motion.div key={category} className={styles.tagGroup} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: ci * 0.08, duration: 0.5 }}>
                  <h3 className={styles.tagCategory}>{category}</h3>
                  <div className={styles.tagList}>
                    {tags.map((tag, ti) => (
                      <motion.span
                        key={tag}
                        className={styles.tagChip}
                        style={{
                          background: tagColors[ci % tagColors.length],
                          border: `1px solid ${tagBorders[ci % tagBorders.length]}`,
                          color: tagText[ci % tagText.length],
                        }}
                        initial={{ opacity: 0, scale: 0.7 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: ci * 0.05 + ti * 0.04, duration: 0.3, ease: "backOut" }}
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
