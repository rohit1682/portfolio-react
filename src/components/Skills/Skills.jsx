import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { skillCategories, skillTags, personalInfo } from "../../constants";
import { cardDramatic3D, staggerDramatic } from "../../hooks/animations";
import TiltCard from "../TiltCard/TiltCard";
import SectionTitle from "../SectionTitle/SectionTitle";
import styles from "./Skills.module.css";

function SkillBar({ name, level, scrollProgress }) {
  const width = useTransform(scrollProgress, [0.1, 0.6], [0, level]);
  const widthStr = useTransform(width, (v) => `${Math.min(v, level)}%`);

  return (
    <div className={styles.skillItem}>
      <div className={styles.skillHeader}>
        <span className={styles.skillName}>{name}</span>
        <span className={styles.skillLevel}>{level}%</span>
      </div>
      <div className={styles.track}>
        <motion.div className={styles.fill} style={{ width: widthStr }} />
      </div>
    </div>
  );
}

const tagColors = [
  "rgba(230,57,70,0.12)", "rgba(59,130,246,0.12)", "rgba(16,185,129,0.1)",
  "rgba(245,158,11,0.1)", "rgba(139,92,246,0.1)", "rgba(236,72,153,0.1)", "rgba(20,184,166,0.1)",
];
const tagBorders = [
  "rgba(230,57,70,0.35)", "rgba(59,130,246,0.35)", "rgba(16,185,129,0.3)",
  "rgba(245,158,11,0.3)", "rgba(139,92,246,0.3)", "rgba(236,72,153,0.3)", "rgba(20,184,166,0.3)",
];
const tagText = ["#f87171", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa", "#f472b6", "#2dd4bf"];

export default function Skills() {
  const [activeTab, setActiveTab] = useState("bars");
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section id="skills" className="section-wrapper section-bg section-3d" ref={sectionRef}>
      <div className="container">
        <SectionTitle title="Skills" subtitle={personalInfo.skillsTagline} />

        <motion.div className={styles.tabs} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <button className={`${styles.tab} ${activeTab === "bars" ? styles.tabActive : ""}`} onClick={() => setActiveTab("bars")}>Proficiency</button>
          <button className={`${styles.tab} ${activeTab === "tags" ? styles.tabActive : ""}`} onClick={() => setActiveTab("tags")}>All Skills</button>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "bars" && (
            <motion.div key="bars" className={styles.barsGrid} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              {skillCategories.map((group, gi) => (
                <motion.div key={group.category} variants={cardDramatic3D} custom={gi * 0.08} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }}>
                  <TiltCard className={`card card--accent-top ${styles.group}`} tiltRange={4} hoverY={-4}>
                    <h3 className={styles.category}>{group.category}</h3>
                    {group.items.map((skill) => (
                      <SkillBar key={skill.name} name={skill.name} level={skill.level} scrollProgress={scrollYProgress} />
                    ))}
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "tags" && (
            <motion.div key="tags" className={styles.tagsView} variants={staggerDramatic} initial="hidden" whileInView="visible" viewport={{ once: false }} animate="visible">
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
