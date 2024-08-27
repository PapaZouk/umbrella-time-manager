import React from 'react';
import styles from './styles/MonthSelector.module.css';

export function MonthSelector({ onMonthChange, disabled }) {
    const handleMonthChange = (event) => {
        if (!disabled) {
            onMonthChange(event.target.value);
        }
    }
    return (
        <div className={styles.container}>
            <label htmlFor="month" className={styles.label}>Wybierz miesiąc:</label>
            <input
                type="month"
                id="month"
                name="month"
                className={styles.input}
                onChange={handleMonthChange}
                disabled={disabled}
            />
        </div>
    );
}
