import styles from './Header.module.css';
import logo from '../../../../../assets/umbrella_logo_transparent.png';
import PropTypes from "prop-types";
import {UserContext} from "../../../../../store/user-context";
import {useContext} from "react";

export default function Header({ children }) {
    const {user} = useContext(UserContext);

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
                <h4 className={styles.welcomeMessage}>Witaj, {user.userName}!</h4>
                <div className={styles.menuItem}>
                    {children}
                </div>
            </menu>
        </>
    );
}

Header.propTypes = {
    children: PropTypes.node,
}
