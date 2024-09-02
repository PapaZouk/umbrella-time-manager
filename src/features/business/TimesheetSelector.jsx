import { useState } from "react";
import { calculateBalance } from "../utils";
import styles from "./styles/TimesheetSelector.module.css";
import logger from "react-logger";
import PropTypes from "prop-types";

export function TimesheetSelector({
  employee,
  month,
  day,
  onTimesheetUpdate,
  setError,
}) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const handleChange = (event, type) => {
    if (type === "check-in") {
      setCheckIn(event.target.value);
    }
    if (type === "check-out") {
      setCheckOut(event.target.value);
    }
  };

  const handleUpdate = () => {
    if (checkIn && checkOut && employee.name && employee.surname && day) {
      const balance = calculateBalance(checkIn, checkOut, 8);
      const newTimesheet = {
        employee,
        times: [
          {
            checkIn,
            checkOut,
            month,
            day,
            balance,
            isHoliday: false,
          },
        ],
      };

      onTimesheetUpdate(newTimesheet);

      setCheckIn("");
      setCheckOut("");
    } else {
      logger.error("Missing data", { checkIn, checkOut, employee, day });
      setError("Uzupełnij wszystkie dane");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  const handleHolidayLeave = () => {
    if (employee) {
      const newTimesheet = {
        employee,
        times: [
          {
            checkIn: "",
            checkOut: "",
            month,
            day,
            balance: 0,
            isHoliday: true,
          },
        ],
      };
      onTimesheetUpdate(newTimesheet);
    }
  };

  return (
    <>
      <h3 data-testid='time-selector-h3'>Wybierz godziny pracy</h3>
      <div className={styles.container}>
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
            id="check-in"
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
            id="check-out"
            type="time"
            className={styles.input}
            value={checkOut}
            onChange={(e) => handleChange(e, "check-out")}
          />
          <button
              data-testid='time-selector-annual-leave-button'
              className={styles.holidayButton}
              onClick={handleHolidayLeave}
          >
            Urlop
          </button>
          <button
              data-testid='time-selector-add-button'
              onClick={handleUpdate}
          >Dodaj</button>
        </span>
      </div>
    </>
  );
};

TimesheetSelector.propTypes = {
  employee: PropTypes.object,
  month: PropTypes.string,
  day: PropTypes.string,
  onTimesheetUpdate: PropTypes.func,
  setError: PropTypes.func,
};
