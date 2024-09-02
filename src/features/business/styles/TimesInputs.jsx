import styles from "./TimesheetSelector.module.css";
import PropTypes from "prop-types";

export default function TimesInputs(
        {
            checkIn,
            checkOut,
            setCheckIn,
            setCheckOut,
            handleSave
        }
    ) {
    const handleChange = (event, type) => {
        if (type === "check-in") {
            setCheckIn(event.target.value);
        }
        if (type === "check-out") {
            setCheckOut(event.target.value);
        }
    };

    return (
        <span>
          <label
              data-testid='time-selector-check-in-label'
              htmlFor="check-in"
              className={styles.label}
          >
            Przyjście
          </label>
          <input
              data-testid='time-selector-check-in-input'
              type="time"
              className={styles.input}
              value={checkIn}
              onChange={(e) => handleChange(e, "check-in")}
          />
          <label
              data-testid='time-selector-check-out-label'
              htmlFor="check-out"
              className={styles.label}
          >
            Wyjście
          </label>
          <input
              data-testid='time-selector-check-out-input'
              type="time"
              className={styles.input}
              value={checkOut}
              onChange={(e) => handleChange(e, "check-out")}
          />
            <button
                data-testid='times-input-save-button'
                htmlFor='times-input-save-button'
                onClick={handleSave}
            >
                Zapisz
            </button>
        </span>
    );
};

TimesInputs.propTypes = {
    checkIn: PropTypes.string,
    checkOut: PropTypes.string,
    setCheckIn: PropTypes.node,
    setCheckOut: PropTypes.node,
    handleSave: PropTypes.func,
};
