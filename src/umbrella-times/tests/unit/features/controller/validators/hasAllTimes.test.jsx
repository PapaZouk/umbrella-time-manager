import {hasAllTimes} from "../../../../../src/features/controller/validators/hasAllTimes";

describe('hasAllTimes', () => {
   test('given check-in, check-out and employee are correct should return true and not call setError', () => {
      const checkIn = '08:00';
      const checkOut = '16:00';
      const employee = { name: 'Joe', surname: 'Bloggs' };
      const setError = jest.fn();

      const result = hasAllTimes(checkIn, checkOut, employee, setError);

      expect(result).toBe(true);
      expect(setError).not.toHaveBeenCalled();
   });

   test('given check-in, check-out and employee are empty should return false and call setError', () => {
      jest.useFakeTimers();

      const checkIn = '';
      const checkOut = '';
      const employee = { name: '', surname: '' };
      const setError = jest.fn();

      const result = hasAllTimes(checkIn, checkOut, employee, setError);

      expect(result).toBe(false);
      expect(setError).toHaveBeenCalledWith('Uzupełnij wszystkie dane');

      jest.advanceTimersByTime(2000);
      expect(setError).toHaveBeenCalledWith('');
      jest.useRealTimers();
   });
});
