import moment from 'moment';
import { isHoliday } from './isHoliday';

export function handleDateChange(day, selectedMonth, setSelectedDay, setError) {
    const [year, month] = selectedMonth.split('-').map(Number);
    const date = moment({ year, month: month - 1, day});

    const dayOfWeek = date.day();
    const formattedDate = date.format('YYYY-MM-DD');

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      setError('Wybrany dzień jest weekendem. Proszę wybrać dzień roboczy');
      setTimeout(() => {
        setError('');
        setSelectedDay(null);
      }, 2000);
    } else if (isHoliday(formattedDate)) {
      setError('Wybrany dzień jest świętem. Proszę wybrać dzień roboczy');
      setTimeout(() => {
        setError('');
        setSelectedDay(null);
      }, 2000);
    } else {
      setSelectedDay(day);
    }
  }