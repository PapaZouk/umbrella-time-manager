import buttons from '../shared/styles/Buttons.module.css';
import PropTypes from "prop-types";
import {useState} from "react";
import TimesInputs from "../business/TimesInputs";
import {calculateBalance} from "../utils";
import DayOffPopup from "../shared/popups/DayOffPopup";
import {dayOffTypes} from "../../resources/dayOffTypes";
import {CreateTimesheet} from "../utils/factory/TimesheetFactory";
import {isInitialTimesheetDataProvided} from "./validators/isInitialTimesheetDataProvided";
import {hasAllTimes} from './validators/hasAllTimes';
import TrainingPopup from "../shared/popups/TrainingPopup";

export default function TimesController(
    {
        employee,
        month,
        day,
        onTimesheetUpdate,
        setError,
        setPopupContent,
    }
) {
    // eslint-disable-next-line no-unused-vars
    const [checkIn, setCheckIn] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [checkOut, setCheckOut] = useState("");

    const handleAddTime = () => {
        if (!isInitialTimesheetDataProvided({month, day, employee, setError})) {
            return;
        }
        setPopupContent(
            <TimesInputs
                setCheckIn={setCheckIn}
                setCheckOut={setCheckOut}
                handleCloseTimesInputs={(checkInValue, checkOutValue) => handleCloseTimesInputsPopup(checkInValue, checkOutValue)}
                handleCancel={closePopup}
            />
        );
    };

    const handleAddDayOff = () => {
        if (!isInitialTimesheetDataProvided({month, day, employee, setError})) {
            return;
        }
        setPopupContent(
            <DayOffPopup
                onSaveDayOff={(day) => handleSaveDayOff(day)}
                handleCancel={closePopup}
            />
        );
    };

    const handleAddTraining = () => {
      if (!isInitialTimesheetDataProvided({month, day, employee, setError})) {
          return;
      }
      setPopupContent(
          <TrainingPopup
            onSaveTraining={(training) => handleTrainingButton(training)}
            handleCancel={closePopup}
          />
      );
    };

    const handleSaveDayOff = (selectedDayOff) => {
        closePopup();

        const dayOffType = Array.from(dayOffTypes()).filter((day) => day === selectedDayOff)[0];

        if (dayOffType === "Zwolnienie lekarskie") {
            handleSickLeave(dayOffType);
        } else if (dayOffType === "Bezpłatny urlop"){
            handleUnpaidLeave(dayOffType);
        } else if (dayOffType === "Urlop macierzyński") {
            handleMaternityLeave(dayOffType);
        } else if (dayOffType === "Urlop okazjonalny") {
            handleOccasionalLeave(dayOffType);
        } else if (dayOffType === 'Urlop wychowawczy') {
            handleParentalLeave(dayOffType);
        } else {
            handleAddAnnualLeave(dayOffType);
        }
    };

    const handleAddBusinessTrip = () => {
        if (!isInitialTimesheetDataProvided({month, day, employee, setError})) {
            return;
        }
        const newTimesheetWithBusinessTrip = CreateTimesheet(
            {
                employee: employee,
                month: month,
                day: day,
                isBusinessTrip: true,
            }
        );
        onTimesheetUpdate(newTimesheetWithBusinessTrip);
        resetCheckInAndCheckOut();
    };

    const handleTrainingButton = (trainingType) => {
      closePopup();

      if (!isInitialTimesheetDataProvided({month, day, employee, setError})) {
          return;
      }

      const newTimesheetWithTraining = CreateTimesheet(
          {
            employee,
              month,
              day,
              isTraining: true,
              trainingType: trainingType
          }
      );
      onTimesheetUpdate(newTimesheetWithTraining);
      resetCheckInAndCheckOut();
    };

    const handleSave = (newCheckIn, newCheckOut) => {
        if (!hasAllTimes(newCheckIn, newCheckOut, employee, setError)) {
            return;
        }

        const balance = calculateBalance(newCheckIn, newCheckOut, 8);
        const newTimesheet = CreateTimesheet(
            {
                employee: employee,
                checkIn: newCheckIn,
                checkOut: newCheckOut,
                month: month,
                day: day,
                balance: balance,
            },
        );

        onTimesheetUpdate(newTimesheet);
        resetCheckInAndCheckOut();
    };

    const handleUnpaidLeave = (unpaidLeave) => {
        const newTimesheetWithUnpaidLeave = CreateTimesheet(
            {
                employee: employee,
                month: month,
                day: day,
                dayOff: unpaidLeave,
                isUnpaidLeave: true,
            },
        );
        onTimesheetUpdate(newTimesheetWithUnpaidLeave);
        resetCheckInAndCheckOut();
    };

    const handleSickLeave = (sickLeave) => {
        const newTimesheetWithSickLeave = CreateTimesheet(
            {
                employee: employee,
                month: month,
                day: day,
                dayOff: sickLeave,
                isSickLeave: true,
            },
        );
        onTimesheetUpdate(newTimesheetWithSickLeave);
        resetCheckInAndCheckOut();
    };

    const handleAddAnnualLeave = (annualLeaveType) => {
        const newTimesheetWithAnnualLeave = CreateTimesheet(
            {
                employee: employee,
                month: month,
                day: day,
                dayOff: annualLeaveType,
                isHoliday: true,
            },
        );
        onTimesheetUpdate(newTimesheetWithAnnualLeave);
        resetCheckInAndCheckOut();
    };

    const handleMaternityLeave = (maternityLeave) => {
        const newTimesheetWithMaternityLeave = CreateTimesheet(
            {
                employee: employee,
                month: month,
                day: day,
                dayOff: maternityLeave,
                isMaternityLeave: true,
            },
        );
        onTimesheetUpdate(newTimesheetWithMaternityLeave);
        resetCheckInAndCheckOut();
    }

    const handleOccasionalLeave = (occasionalLeave) => {
      const newTimesheetWithOccasionalLeave = CreateTimesheet(
          {
            employee: employee,
            month: month,
            day: day,
            dayOff: occasionalLeave,
            isOccasionalLeave: true,
          },
      );
      onTimesheetUpdate(newTimesheetWithOccasionalLeave);
      resetCheckInAndCheckOut();
    };

    const handleParentalLeave = (parentalLeave) => {
      const newTimesheetWithParentalLeave = CreateTimesheet(
          {
              employee: employee,
              month: month,
              day: day,
              dayOff: parentalLeave,
              isParentalLeave: true,
          }
      );
      onTimesheetUpdate(newTimesheetWithParentalLeave);
      resetCheckInAndCheckOut();
    };

    const handleCloseTimesInputsPopup = (checkIn, checkOut) => {
        closePopup();
        handleSave(checkIn, checkOut);
    };

    const closePopup = () => {
        setTimeout(() => {
            setPopupContent("");
        }, 200);
    };

    const resetCheckInAndCheckOut = () => {
        setCheckIn("");
        setCheckOut("");
    };

    return (
        <div>
            <button
                data-testid='time-controller-add-button'
                className={buttons.greenButton}
                onClick={handleAddTime}
            >
                Dodaj godziny
            </button>
            <button
                data-testid='time-controller-day-off-button'
                className={buttons.yellowButton}
                onClick={handleAddDayOff}
            >
            Dodaj dzień wolny
            </button>
            <button
                data-testid='time-controller-business-trip-button'
                className={buttons.blueButton}
                onClick={handleAddBusinessTrip}
            >
            Wyjazd służbowy
            </button>
            <button
                data-testid='time-controller-business-training-button'
                className={buttons.blueButton}
                onClick={handleAddTraining}
            >
            Dodaj szkolenie
            </button>
        </div>
    );
};

TimesController.propTypes = {
    employee: PropTypes.object,
    month: PropTypes.string,
    day: PropTypes.string,
    onTimesheetUpdate: PropTypes.func,
    setError: PropTypes.func,
    setPopupContent: PropTypes.func,
};
