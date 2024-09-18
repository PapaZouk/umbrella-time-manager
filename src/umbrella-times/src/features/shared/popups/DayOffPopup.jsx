import styles from "../styles/Popup.module.css";
import effects from '../../../../../umbrella-web-common/src/components/styles/Effects.module.css';
import errors from '../../../../../umbrella-web-common/src/components/styles/Errors.module.css';
import buttons from '../styles/Buttons.module.css';
import labels from '../styles/Labels.module.css';
import {dayOffTypes} from "../../../resources/dayOffTypes";
import {useContext, useState} from "react";
import PropTypes from "prop-types";
import {PopupContext} from "../../../../../store/popups-context";
import {MessagesContext} from "../../../../../store/messages-context";

export default function DayOffPopup({ onSaveDayOff }) {
    const { closePopup } = useContext(PopupContext);
    const { errorMessage, setErrorMessage } = useContext(MessagesContext);

    const [selectedOption, setSelectedOption] = useState("");

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSave = () => {
        if (selectedOption) {
            setErrorMessage(false);
            onSaveDayOff(selectedOption);
        } else {
            setErrorMessage(true);
            setTimeout(() => {
               setErrorMessage(false);
            }, 2000);
        }
    }

    return (
        <>
            {errorMessage && (
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
                    className={`${errorMessage && !selectedOption ? effects.errorEffect : ''}`}
                    onChange={handleChange}
                >
                    <option value="" disabled>
                        Wybierz...
                    </option>
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
                    disabled={!!errorMessage}
                >
                    Zapisz
                </button>
                <button
                    data-testid='day-off-selector-cancel-button'
                    className={buttons.redButton}
                    onClick={closePopup}
                >
                    Anuluj
                </button>
            </div>
        </>
    );
};

DayOffPopup.propTypes = {
    onSaveDayOff: PropTypes.func,
};
