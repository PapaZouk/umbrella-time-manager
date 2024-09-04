import styles from './Header.module.css';
import logo from '../../../assets/umbrella_logo_transparent.png';

export default function Header() {
    return (
        <header className={styles.appHeader}>
            <div className={styles.logoContainer}>
                <img data-testid='header-logo' className={styles.logo} src={logo} alt="Umbrella Time Manager Logo" />
            </div>
            <div className={styles.textContainer}>
                <h1 data-testid='header-title' className={styles.title}>Umbrella Time Manager</h1>
                <h3 data-testid='header-subtitle' className={styles.subtitle}>Twój podręczny menadżer godzin</h3>
            </div>
        </header>
    );
}
