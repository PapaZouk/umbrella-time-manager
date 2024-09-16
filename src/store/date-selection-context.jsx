import {createContext, useState} from "react";

export const DateSelectionContext = createContext({
    selectedMonth: "",
    selectedDay: "",
    isMonthSelectionDisabled: false,
    updateMonth: () => {
    },
    updateDay: () => {
    },
});

export default function DateSelectionContextProvider({ children }) {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedDay, setSelectedDay] = useState('');

    function handleUpdateMonth(month) {
        setSelectedMonth(month);
    }

    function handleUpdateDay(day) {
        setSelectedDay(day);
    }

    const dateSelectionContextValue = {
        selectedMonth: selectedMonth,
        selectedDay: selectedDay,
        updateMonth: handleUpdateMonth,
        updateDay: handleUpdateDay,
    }

    return (
        <DateSelectionContext.Provider value={dateSelectionContextValue}>
            {children}
        </DateSelectionContext.Provider>
    )
}
