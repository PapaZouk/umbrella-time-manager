import styles from './styles/DaysSelector.module.css';
import {DateSelectionContext} from "../../../../store/date-selection-context";
import {useContext, useEffect} from "react";
import {isHoliday} from "../utils";
import {MessagesContext} from "../../../../store/messages-context";
import moment from "moment/moment";
import {useMonthDays} from "../hooks";

export function DaySelector() {
    const { selectedMonth, selectedDay, updateDay  } = useContext(DateSelectionContext);
    const { errorMessage, setErrorMessage }  = useContext(MessagesContext);
    const days = useMonthDays(selectedMonth) || [];

    useEffect(() => {
        if (errorMessage !== '') {
            setTimeout(() => {
                setErrorMessage('');
                updateDay('');
            }, 2000);
        }
    }, [errorMessage, setErrorMessage, updateDay])

    function handleDaySelection(event) {
        const day = event.target.value;

        const [year, month] = selectedMonth.split('-').map(Number);
        const date = moment({year, month: month - 1, day: day});

        const dayOfWeek = date.day();
        const formattedDate = date.format('YYYY-MM-DD');

        if (dayOfWeek === 0 || dayOfWeek === 6) {
            setErrorMessage('Wybrany dzień jest weekendem. Proszę wybrać dzień roboczy');
        } else if (isHoliday(formattedDate)) {
            setErrorMessage('Wybrany dzień jest świętem. Proszę wybrać dzień roboczy');
        } else {
            updateDay(day);
        }
    }

    return (
        <div className={styles.container}>
            <label
                data-testid='day-selector-input'
                htmlFor="day"
                className={styles.label}
            >
                Wybierz dzień:
            </label>
            <select
                data-testid='day-selector-select'
                name="day"
                id="day"
                className={styles.select}
                onChange={handleDaySelection}
            >
                <option value={selectedDay} disabled>Wybierz...</option>
                {Array.isArray(days) && days.map((day) => (
                    <option key={day} value={day}>{day}</option>
                ))}
            </select>
        </div>
    );
}
