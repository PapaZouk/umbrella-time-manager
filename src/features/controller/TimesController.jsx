import {Container} from "../shared";
import styles from './styles/TimesController.module.css';
import PropTypes from "prop-types";
import {useState} from "react";
import TimesInputs from "../business/TimesInputs";
import {calculateBalance} from "../utils";
import logger from "react-logger";

export default function TimesController(
    {
        employee,
        month,
        day,
        onTimesheetUpdate,
        setError,
    }
) {
    const [isAddingTime, setIsAddingTime] = useState(false);
    const [checkIn, setCheckIn] = useState();
    const [checkOut, setCheckOut] = useState("");

    const handleAddTime = () => {
        setIsAddingTime(!isAddingTime);
    };

    const handleSave = () => {
        console.log('CheckIn: ' + checkIn + " , CheckOut: " + checkOut);
        if (checkIn && checkOut && employee.name && employee.surname && day) {
            console.log('Calls handkeSave');
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
            setIsAddingTime(false);
        } else {
            logger.error("Missing data", { checkIn, checkOut, employee, day });
            setError("Uzupełnij wszystkie dane");
            setTimeout(() => {
                setError("");
            }, 2000);
        }
    }

    const handleAddAnnualLeave = () => {
        setIsAddingTime(false);

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

            setCheckIn("");
            setCheckOut("");
            setIsAddingTime(false);
        } else {
            setError('Wybierz pracownika');
            setTimeout(() => {
                setError('');
            }, 2000);
        }
    };
    const handleAddBusinessTrip = () => {
        setIsAddingTime(false);

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
                        isHoliday: false,
                        isBusinessTrip: true,
                    },
                ],
            };

            onTimesheetUpdate(newTimesheet);

            setCheckIn("");
            setCheckOut("");
            setIsAddingTime(false);
        } else {
            setError('Wybierz pracownika');
            setTimeout(() => {
               setError('');
            }, 2000);
        }
    };

    return (
        <Container fadeIn={true}>
            <div>
                <button
                    data-testid='time-controller-add-button'
                    className={styles.addTimes}
                    onClick={handleAddTime}
                >
                    Dodaj godziny
                </button>
                <button
                    data-testid='time-controller-annual-leave-button'
                    className={styles.holidayButton}
                    onClick={handleAddAnnualLeave}
                >
                Urlop
                </button>
                <button
                    data-testid='time-controller-business-trip-button'
                    className={styles.businessTripButton}
                    onClick={handleAddBusinessTrip}
                >
                Wyjazd służbowy
                </button>
            </div>
            {isAddingTime ? (
                <Container >
                    <TimesInputs
                        checkIn={checkIn}
                        checkOut={checkOut}
                        setCheckIn={setCheckIn}
                        setCheckOut={setCheckOut}
                        handleSave={handleSave}
                    />
                </Container>
            ) : ""}
        </Container>
    );
};

TimesController.propTypes = {
    employee: PropTypes.object,
    month: PropTypes.string,
    day: PropTypes.string,
    onTimesheetUpdate: PropTypes.func,
    setError: PropTypes.node,
};
