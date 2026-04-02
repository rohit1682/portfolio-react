import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Code2, ArrowUp } from "lucide-react";
import { personalInfo } from "../../constants";
import styles from "./Footer.module.css";

const links = [
  { icon: Github, href: personalInfo.github, label: "GitHub" },
  { icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
  { icon: Code2, href: personalInfo.leetcode, label: "LeetCode" },
];

export default function Footer() {
  const initials = personalInfo.name.split(" ").map((w) => w[0]).join("");
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className={styles.footer}>
      <motion.div
        className={styles.topLine}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
      <div className={`container ${styles.inner}`}>
        <motion.div className={styles.left} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className={styles.logo}>{initials}<span className={styles.dot}>.</span></span>
          <p className={styles.tagline}>Building things for the web.</p>
          <p className={styles.copy}>© {new Date().getFullYear()} {personalInfo.name}</p>
        </motion.div>

        <motion.div className={styles.socials} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
          {links.map(({ icon: Icon, href, label }, i) => (
            <motion.a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className={styles.socialIcon}
              whileHover={{ y: -4, scale: 1.15 }} whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.07, duration: 0.4 }}>
              <Icon size={18} />
            </motion.a>
          ))}
        </motion.div>

        <motion.button className={styles.backTop} onClick={scrollTop} aria-label="Back to top"
          whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(230,57,70,0.35)" }} whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}>
          <ArrowUp size={16} /><span>Top</span>
        </motion.button>
      </div>
    </footer>
  );
}
