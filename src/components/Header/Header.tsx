import styles from './Header.module.css';

// Simple header component containing the app banner/icon
export function Header() {
  return (
    // Semantic header element for page branding
    <header className={styles.header}>
      {/* Icon container: displays app banner image */}
      <div className={styles.icon}>
        <img src='/public/banner.png' alt='GitHub Icon' />
      </div>
    </header>
  );
}
