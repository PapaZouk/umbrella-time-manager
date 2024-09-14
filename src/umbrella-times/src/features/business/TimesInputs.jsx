import styles from "./styles/TimesheetSelector.module.css";
import effects from '../../../../umbrella-web-common/src/components/styles/Effects.module.css';
import errors from '../../../../umbrella-web-common/src/components/styles/Errors.module.css';
import buttons from '../shared/styles/Buttons.module.css';
import inputs from '../shared/styles/Inputs.module.css';
import labels from '../shared/styles/Labels.module.css';
import PropTypes from "prop-types";
import {useState} from "react";

export default function TimesInputs({ handleCloseTimesInputs, handleCancel }) {
    const [selectedCheckIn, setSelectedCheckIn] = useState('');
    const [selectedCheckOut, setSelectedCheckOut] = useState('');
    const [error, setError] = useState(false);

    const handleCheckInSelect = (event) => {
        setSelectedCheckIn(event.target.value);
    };

    const handleCheckOutSelect = (event) => {
        setSelectedCheckOut(event.target.value);
    };

    const handleOnSave = () => {
        if (selectedCheckIn && selectedCheckOut) {
            handleCloseTimesInputs(selectedCheckIn, selectedCheckOut);
            setError(false);
        } else {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 3000);
        }
    }

    return (
        <>
            {error && (
                <div
                    data-testid={'times-input-error'}
                    className={styles.container}>
                    <p className={errors.errorFrame}>Uzupełnij wszystkie godziny</p>
                </div>
            )}
            <div className={styles.container}>
                <span>
                  <label
                      data-testid='time-selector-check-in-label'
                      htmlFor="check-in"
                      className={labels.label}
                  >
                    Przyjście
                  </label>
                  <input
                      data-testid='time-selector-check-in-input'
                      type="time"
                      id="check-in"
                      className={`${inputs.input} ${error && !selectedCheckIn ? effects.errorEffect : ''}`}
                      value={selectedCheckIn}
                      onChange={handleCheckInSelect}
                  />
                  <label
                      data-testid='time-selector-check-out-label'
                      htmlFor="check-out"
                      className={labels.label}
                  >
                    Wyjście
                  </label>
                  <input
                      data-testid='time-selector-check-out-input'
                      type="time"
                      id="check-out"
                      className={`${inputs.input} ${error && !selectedCheckOut ? effects.errorEffect : ''}`}
                      value={selectedCheckOut}
                      onChange={handleCheckOutSelect}
                  />
                    <button
                        data-testid='times-input-save-button'
                        className={buttons.greenButton}
                        onClick={handleOnSave}
                    >
                        Zapisz
                    </button>
                    <button
                    data-testid='times-input-cancel-button'
                    className={buttons.redButton}
                    onClick={handleCancel}
                    >
                        Anuluj
                    </button>
                </span>
            </div>
        </>


    );
};

TimesInputs.propTypes = {
    handleCloseTimesInputs: PropTypes.func,
    handleCancel: PropTypes.func,
};
