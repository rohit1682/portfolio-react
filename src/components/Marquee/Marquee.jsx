import styles from "./Marquee.module.css";

export default function Marquee({ items = [] }) {
  if (!items.length) return null;

  const content = items.map((item, i) => (
    <span key={i} className={styles.item}>
      {item} <span className={styles.separator} aria-hidden="true">&#10022;</span>
    </span>
  ));

  return (
    <div className={styles.marquee} aria-hidden="true" data-testid="marquee">
      <div className={styles.track}>
        <div className={styles.scroll}>{content}</div>
        <div className={styles.scroll}>{content}</div>
      </div>
    </div>
  );
}
