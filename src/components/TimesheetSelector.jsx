import styles from './styles/TimesheetSelector.module.css';

export default function TimesheetSelector({ employee, month, day, onTimesheetsUpdate }) {
    const employeeTimesheet = {
        employee,
        times: [{
            checkIn: null,
            checkOut: null,
            month,
            day,
        }],
    };

    function handleChange(event, type) {
        if (type === 'check-in') {
            employeeTimesheet.times[0].checkIn = event;
        } else if (type === 'check-out') {
            employeeTimesheet.times[0].checkOut = event;
        }
    }

    function handleUpdate() {
        if (employeeTimesheet.employee && employeeTimesheet.times && employeeTimesheet.times.length > 0) {
            onTimesheetsUpdate(employeeTimesheet);
        }
    }

    return (
        <div className={styles.container}>
            <span>
                <label
                    htmlFor="check-in"
                    id="check-in"
                    className={styles.label}
                >Przyjście</label>
                <input
                    type="time"
                    className={styles.input}
                    onChange={(e) => handleChange(e.target.value, "check-in")}
                />
                <label
                    htmlFor="check-out"
                    className={styles.label}
                    id="check-out"
                >Wyjście</label>
                <input
                    type="time"
                    className={styles.input}
                    onChange={(e) => handleChange(e.target.value, "check-out")}
                />
                <button onClick={handleUpdate}>+</button>
            </span>
        </div>
    );
}