import styles from './styles/MonthSelector.module.css';
import {useContext} from "react";
import {DateSelectionContext} from "../../../../store/date-selection-context";

export function MonthSelector() {
    const { isMonthSelectionDisabled, updateMonth } = useContext(DateSelectionContext);

    const handleMonthChange = (event) => {
        if (!isMonthSelectionDisabled) {
            updateMonth(event.target.value);
        }
    }
    return (
        <div className={styles.container}>
            <label
                data-testid='month-selector-label'
                htmlFor="month"
                className={styles.label}
            >
                Wybierz miesiąc:
            </label>
            <input
                data-testid='month-selector-input'
                type="month"
                id="month"
                name="month"
                className={styles.input}
                onChange={handleMonthChange}
                disabled={isMonthSelectionDisabled}
            />
        </div>
    );
};
