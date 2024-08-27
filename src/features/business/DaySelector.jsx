import React from 'react';
import styles from './styles/DaysSelector.module.css';

export function DaySelector({ days, onDayChange }) {
    return (
        <div className={styles.container}>
            <label htmlFor="day" className={styles.label}>Wybierz dzień:</label>
            <select
                name="day"
                id="day"
                className={styles.select}
                onChange={(e) => onDayChange(e.target.value)}
            >
                <option>Wybierz...</option>
                {Array.isArray(days) && days.map((day) => (
                    <option key={day} value={day}>{day}</option>
                ))}
            </select>
        </div>
    );
}
