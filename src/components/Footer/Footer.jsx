import { motion } from "framer-motion";
import { Mail, Code2, ArrowUp } from "lucide-react";
import { personalInfo } from "../../constants";
import styles from "./Footer.module.css";

/** Lucide dropped brand icons (Github, Linkedin); match SocialLinks.jsx SVGs */
const GithubIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const links = [
  { icon: GithubIcon, href: personalInfo.github, label: "GitHub" },
  { icon: LinkedinIcon, href: personalInfo.linkedin, label: "LinkedIn" },
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
