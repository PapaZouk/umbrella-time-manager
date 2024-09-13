import PropTypes from "prop-types";
import {useState} from "react";
import {calculateBalance} from "../utils";
import {dayOffTypes} from "../../resources/dayOffTypes";
import {CreateTimesheet} from "../utils/factory/TimesheetFactory";
import {isInitialTimesheetDataProvided} from "./validators/isInitialTimesheetDataProvided";
import {hasAllTimes} from './validators/hasAllTimes';
import AddTimeButton from "./components/AddTimeButton";
import AddDayOffButton from "./components/AddDayOffButton";
import AddBusinessTripButton from "./components/AddBusinessTripButton";
import AddTrainingButton from "./components/AddTrainingButton";
import {handleDayOffType, showAddTimesInputs, showAddTrainingPopup, showDayOffPopup} from "./handlers/popupHandlers";

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
        showAddTimesInputs(setPopupContent, handleCloseTimesInputsPopup, closePopup);
    };

    const handleAddDayOff = () => {
        if (!isInitialTimesheetDataProvided({month, day, employee, setError})) {
            return;
        }
        showDayOffPopup(setPopupContent, handleSaveDayOff, closePopup);
    };

    const handleAddTraining = () => {
      if (!isInitialTimesheetDataProvided({month, day, employee, setError})) {
          return;
      }
      showAddTrainingPopup(setPopupContent, handleTrainingButton, closePopup);
    };

    const handleSaveDayOff = (selectedDayOff) => {
        closePopup();
        const dayOffType = Array.from(dayOffTypes()).filter((day) => day === selectedDayOff)[0];
        handleDayOffType(dayOffType, employee, month, day, onTimesheetUpdate, resetCheckInAndCheckOut);
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
            <AddTimeButton onClick={handleAddTime} />
            <AddDayOffButton onClick={handleAddDayOff} />
            <AddBusinessTripButton onClick={handleAddBusinessTrip} />
            <AddTrainingButton onClick={handleAddTraining} />
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
