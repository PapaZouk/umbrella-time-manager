import styles from './styles/MonthSelector.module.css';

export default function MonthSelector({ onMonthChange }) {
    return (
        <div className={styles.container}>
            <label htmlFor="month" className={styles.label}>Wybierz miesiąc:</label>
            <input
                type="month"
                id="month"
                name="month"
                className={styles.input}
                onChange={(event) => onMonthChange(event.target.value)}
            />
        </div>
    );
}