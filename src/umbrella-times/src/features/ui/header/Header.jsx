import styles from './Header.module.css';
import logo from '../../../../../assets/umbrella_logo_transparent.png';
import PropTypes from "prop-types";

export default function Header({ userName, children }) {
    return (
        <>
            <header data-testid="time-manager-header" className={styles.appHeader}>
                <div className={styles.logoContainer}>
                    <img data-testid='header-logo' className={styles.logo} src={logo} alt="Umbrella Time Manager Logo" />
                </div>
                <div className={styles.textContainer}>
                    <h1 data-testid='header-title' className={styles.title}>Umbrella Time Manager</h1>
                    <h3 data-testid='header-subtitle' className={styles.subtitle}>Twój podręczny menadżer godzin</h3>
                </div>
            </header>
            <menu className={styles.menu}>
                <h4 className={styles.welcomeMessage}>Witaj, {userName}!</h4>
                <div className={styles.menuItem}>
                    {children}
                </div>
            </menu>
        </>
    );
}

Header.propTypes = {
    userName: PropTypes.string,
    children: PropTypes.node,
}
