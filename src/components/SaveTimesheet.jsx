import styles from './styles/SaveTimesheet.module.css';
import validateTimesheets from '../validators/validateTimesheets';

export default function SaveTimesheet({ timesheets, onSave }) {
    function handleSave() {
        validateTimesheets(timesheets);
        onSave();
    }
    return (
        <div>
            <button className={styles.saveButton} onClick={handleSave}>Zapisz godziny</button>
            { }
        </div>
    );
}