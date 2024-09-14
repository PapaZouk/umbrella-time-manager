import styles from '../styles/Popup.module.css';
import labels from '../styles/Labels.module.css';
import buttons from '../styles/Buttons.module.css';
import {useState} from "react";
import errors from "../../../../../umbrella-web-common/src/components/styles/Errors.module.css";
import { trainingTypes } from '../../../resources/trainingTypes';
import PropTypes from "prop-types";

export default function TrainingPopup({ onSaveTraining, handleCancel }) {
    const [selectedOption, setSelectedOption] = useState('');
    const [error, setError] = useState(false);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleOnCancel = () => {
        handleCancel();
    }

    const handleSave = () => {
        if (selectedOption) {
            setError(false);
            onSaveTraining(selectedOption);
        } else {
            setError(true);
            setTimeout(() => {
               setError('')
            }, 2000);
        }
    };

    return (
        <>
            {error && (
                <div data-testid='training-popup-error' className={styles.popupErrorContainer}>
                    <p className={errors.errorFrame}>Wybierz rodzaj szkolenia</p>
                </div>
            )}
            <label
            data-testid='training-selector-label'
            htmlFor='training-selector'
            className={labels.label}
            >
                Wybierz trening
            </label>
            <div>
                <select
                    data-testid='training-selector'
                    value={selectedOption}
                    onChange={handleChange}
                >
                    <option value="" disabled>
                        Wybierz...
                    </option>
                    {trainingTypes().map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <button
                    data-testid='training-selector-save-button'
                    className={buttons.greenButton}
                    onClick={handleSave}
                    disabled={error}
                >
                    Zapisz
                </button>
                <button
                    data-testid='training-selector-cancel-button'
                    className={buttons.redButton}
                    onClick={handleOnCancel}
                >
                    Anuluj
                </button>
            </div>
        </>
    );
};

TrainingPopup.propTypes = {
    onSaveTraining: PropTypes.func,
    handleCancel: PropTypes.func,
};
