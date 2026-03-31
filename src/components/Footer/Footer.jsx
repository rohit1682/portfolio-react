import { personalInfo } from "../../constants";
import styles from "./Footer.module.css";

export default function Footer() {
  const initials = personalInfo.name.split(" ").map((w) => w[0]).join("");
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.logo}>{initials}<span className={styles.dot}>.</span></span>
        <p className={styles.copy}>
          © {new Date().getFullYear()} {personalInfo.name}. Built with React &amp; Framer Motion.
        </p>
      </div>
    </footer>
  );
}
