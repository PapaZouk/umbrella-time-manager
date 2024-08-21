import styles from './styles/SaveTimesheet.module.css';

export default function SaveTimesshet({ timesheets, onSave }) {
    return (
        <div>
            <button className={styles.saveButton} onClick={onSave}>Zapisz godziny</button>
        </div>
    );
}