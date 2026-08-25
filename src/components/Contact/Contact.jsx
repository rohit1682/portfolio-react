import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Copy } from "lucide-react";
import { personalInfo } from "../../constants";
import SocialLinks from "../SocialLinks/SocialLinks";
import { cardDramatic3D, cardDramatic3DAlt } from "../../hooks/animations";
import SectionTitle from "../SectionTitle/SectionTitle";
import Toast from "../Toast/Toast";
import styles from "./Contact.module.css";

export default function Contact() {
  const [toast, setToast] = useState({ visible: false, message: "" });

  /* v8 ignore next 4 */
  const showToast = (message) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 1800);
  };

  const copy = async (value, label) => {
    try {
      await navigator.clipboard.writeText(value);
      showToast(`${label} copied`);
    } catch {
      showToast("Copy failed — try manually");
    }
  };

  /* v8 ignore next 5 */
  const handleSubmit = (e) => {
    e.preventDefault();
    const f = e.target;
    window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(f.subject.value)}&body=${encodeURIComponent(`Name: ${f.name.value}\n\n${f.message.value}`)}`;
  };

  const detailItems = [
    { icon: Mail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}`, copyable: true },
    { icon: Phone, label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}`, copyable: true },
    { icon: MapPin, label: "Location", value: personalInfo.location, href: null, copyable: false },
  ];

  return (
    <section id="contact" className="section-wrapper section-bg section-3d">
      <div className="container">
        <SectionTitle title="Get In Touch" subtitle="Have a project in mind or just want to say hi? My inbox is always open." />

        <div className={styles.grid}>
          <motion.div className={styles.info} variants={cardDramatic3D} custom={0} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }}>
            <h3>{personalInfo.contactHeading}</h3>
            <p>{personalInfo.contactDescription}</p>

            <div className={styles.details}>
              {detailItems.map(({ icon: Icon, label, value, href, copyable }) => (
                <motion.div key={label} className={styles.detailItem} whileHover={{ x: 6 }}>
                  <div className={styles.detailIcon}><Icon size={17} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span className={styles.detailLabel}>{label}</span>
                    {href
                      ? <a href={href} className={styles.detailValue}>{value}</a>
                      : <span className={styles.detailValue}>{value}</span>
                    }
                  </div>
                  {copyable && (
                    <button
                      type="button"
                      className={styles.copyBtn}
                      onClick={() => copy(value, label)}
                      aria-label={`Copy ${label.toLowerCase()}`}
                      title={`Copy ${label.toLowerCase()}`}
                    >
                      <Copy size={14} />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            <SocialLinks />
          </motion.div>

          <motion.form className={`card card--subtle ${styles.form}`} onSubmit={handleSubmit} variants={cardDramatic3DAlt} custom={0.1} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" placeholder="Your name" required />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="emailInput">Email</label>
                <input id="emailInput" name="email" type="email" placeholder="your@email.com" required />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="subject">Subject</label>
              <input id="subject" name="subject" type="text" placeholder="What's this about?" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={5} placeholder="Your message..." required />
            </div>
            <motion.button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Send size={16} /> Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>

      <Toast message={toast.message} visible={toast.visible} />
    </section>
  );
}
