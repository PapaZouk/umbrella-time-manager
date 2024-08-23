import React from 'react';
import moment from 'moment';
import Holidays from 'date-holidays';

export default function calculateBusinessDaysInMonth(selectedMonth) {
    const [year, month] = selectedMonth.split('-').map(Number);
    const startDate = moment([year, month - 1]).startOf('month');
    const endDate = moment([year, month - 1]).endOf('month');

    const hd = new Holidays('PL');

    let businessDays = 0;
    let current = startDate;

    while (current.isSameOrBefore(endDate)) {
        const isWeekend = current.isoWeekday() === 6 || current.isoWeekday() === 7;
        const holidays = hd.isHoliday(current.toDate());
        const isHoliday = Array.isArray(holidays) && holidays.length > 0;
        if (!isWeekend && !isHoliday) {
            businessDays++;
        }
        current.add(1, 'day');
    }
    return businessDays;
}
