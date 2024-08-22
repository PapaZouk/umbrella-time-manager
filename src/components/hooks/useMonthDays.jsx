import { useState, useEffect } from "react";
import moment from 'moment';

const useMonthDays = (selectedMonth) => {
    const [days, setDays] = useState([]);

    useEffect(() => {
        if (selectedMonth) {
            const [year, month] = selectedMonth.split('-').map(Number);
            const daysInMonth = moment({year, month: month - 1}).daysInMonth();
            setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));
        }
    }, [selectedMonth]);

    return days;
}

export default useMonthDays;