import styles from './Header.module.css';
import logo from '../../../assets/umbrella.svg';

export default function Header() {
    return (
        <header className={styles.appHeader}>
            <div className={styles.logoContainer}>
            <h1 className={styles.title}>Umbrella Time Manager</h1>
                <img className={logo} src={logo} alt="Umbrella Time Manager Logo" />
            </div>
        </header>
    );
}
