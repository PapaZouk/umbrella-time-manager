import styles from './styles/Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Umbrella Manager</h1>
        </header>
    );
}
