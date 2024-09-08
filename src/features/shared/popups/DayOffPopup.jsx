import styles from "../styles/Popup.module.css";
import effects from '../styles/Effects.module.css';
import errors from '../styles/Errors.module.css';
import buttons from '../styles/Buttons.module.css';
import labels from '../styles/Labels.module.css';
import {dayOffTypes} from "../../../resources/dayOffTypes";
import {useState} from "react";
import PropTypes from "prop-types";

export default function DayOffPopup({ onSaveDayOff, handleCancel }) {
    const [selectedOption, setSelectedOption] = useState("");
    const [error, setError] = useState(false);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSave = () => {
        if (selectedOption) {
            setError(false);
            onSaveDayOff(selectedOption);
        } else {
            setError(true);
            setTimeout(() => {
               setError(false);
            }, 2000);
        }
    }

    return (
        <>
            {error && (
                <div data-testid='day-off-error' className={styles.container}>
                    <p className={errors.errorFrame}>Wybierz rodzaj dnia wolnego</p>
                </div>
            )}
            <label
                data-testid='day-off-selector-label'
                htmlFor="day-off-selector-label"
                className={labels.label}
            >
                Wybierz rodzaj
            </label>
            <div>
                <select
                    data-testid='day-off-selector-select'
                    value={selectedOption}
                    className={`${error && !selectedOption ? effects.errorEffect : ''}`}
                    onChange={handleChange}
                >
                    <option
                        value="" disabled>Wybierz...</option>
                    {dayOffTypes().map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <button
                    data-testid='day-off-selector-save-button'
                    className={buttons.greenButton}
                    onClick={handleSave}
                    disabled={error}
                >
                    Zapisz
                </button>
                <button
                    data-testid='day-off-selector-cancel-button'
                    className={buttons.redButton}
                    onClick={handleCancel}
                >
                    Anuluj
                </button>
            </div>
        </>
    );
};

DayOffPopup.propTypes = {
    onSaveDayOff: PropTypes.func,
    setSelectedDayOff: PropTypes.func,
    handleCancel: PropTypes.func,
};
