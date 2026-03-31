import { motion } from "framer-motion";
import { GraduationCap, MapPin, Users, Award } from "lucide-react";
import { education, volunteer } from "../../constants";
import { staggerContainer, staggerItem, fadeLeft, fadeRight } from "../../hooks/animations";
import SectionTitle from "../SectionTitle/SectionTitle";
import styles from "./Education.module.css";

function EduCard({ item, i, isVolunteer, side }) {
  const variant = side === "left" ? fadeLeft : fadeRight;
  return (
    <motion.div className={`card ${styles.card}`} variants={variant} custom={i * 0.12} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
      <div className={styles.cardTop}>
        <div className={styles.iconWrap}>{isVolunteer ? <Users size={18} /> : <GraduationCap size={18} />}</div>
        <span className="tag">{item.period}</span>
      </div>
      <h4 className={styles.degree}>{isVolunteer ? item.role : item.degree}</h4>
      <p className={styles.institution}>{isVolunteer ? item.organization : item.institution}</p>
      <p className={styles.location}><MapPin size={12} />{item.location}</p>
      {(item.score || item.cgpa) && (
        <div className={styles.score}><Award size={13} />{item.score}</div>
      )}
      {item.description && <p className={styles.desc}>{item.description}</p>}
    </motion.div>
  );
}

export default function Education() {
  return (
    <section id="education" className="section-wrapper section-bg">
      <div className="container">
        <SectionTitle title="Education" subtitle="My academic background and leadership roles" />

        <div className={styles.grid}>
          <div>
            <motion.h3 className={styles.sectionLabel} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <GraduationCap size={18} /> Academic
            </motion.h3>
            {education.map((item, i) => <EduCard key={i} item={item} i={i} isVolunteer={false} side="left" />)}
          </div>
          <div>
            <motion.h3 className={styles.sectionLabel} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <Users size={18} /> Leadership & Volunteer
            </motion.h3>
            {volunteer.map((item, i) => <EduCard key={i} item={item} i={i} isVolunteer={true} side="right" />)}
          </div>
        </div>
      </div>
    </section>
  );
}
