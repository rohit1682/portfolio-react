import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { personalInfo } from "../../constants";
import SocialLinks from "../SocialLinks/SocialLinks";
import { fadeLeft, fadeRight, staggerContainer, staggerItem } from "../../hooks/animations";
import SectionTitle from "../SectionTitle/SectionTitle";
import styles from "./Contact.module.css";

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const f = e.target;
    window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(f.subject.value)}&body=${encodeURIComponent(`Name: ${f.name.value}\n\n${f.message.value}`)}`;
  };

  return (
    <section id="contact" className="section-wrapper section-bg">
      <div className="container">
        <SectionTitle title="Get In Touch" subtitle="Have a project in mind or just want to say hi? My inbox is always open." />

        <div className={styles.grid}>
          <motion.div className={styles.info} variants={fadeLeft} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <h3>Let's talk</h3>
            <p>I'm currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you.</p>

            <div className={styles.details}>
              {[
                { icon: Mail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { icon: Phone, label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
                { icon: MapPin, label: "Location", value: personalInfo.location, href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <motion.div key={label} className={styles.detailItem} whileHover={{ x: 6 }}>
                  <div className={styles.detailIcon}><Icon size={17} /></div>
                  <div>
                    <span className={styles.detailLabel}>{label}</span>
                    {href
                      ? <a href={href} className={styles.detailValue}>{value}</a>
                      : <span className={styles.detailValue}>{value}</span>
                    }
                  </div>
                </motion.div>
              ))}
            </div>

            <SocialLinks />
          </motion.div>

          <motion.form className={`card ${styles.form}`} onSubmit={handleSubmit} variants={fadeRight} custom={0.1} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
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
    </section>
  );
}
