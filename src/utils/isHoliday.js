import Holidays from 'date-holidays';

const hd = new Holidays('PL');

export function isHoliday(date) {
  return hd.isHoliday(date);
}
