import { ValidationError } from 'yup';
import validateTimesheets from '../../../validators/validateTimesheets';

describe('validateTimesheets', () => {
    test('given timesheets should validate successfully', () => {
        const employeeTimesheet = [{
            employee: {
                name: 'Joe',
                surname: 'Bloggs',
                workingHours: '08:00-16:00',
            },
            times: [{
                checkIn: '08:10',
                checkOut: '15:55',
                month: '2024-08',
                day: '1',
                balance: -15,
                isHoliday: false,
            }],
        }];

        expect(() => validateTimesheets(employeeTimesheet)).not.toThrow();
    });

    test('given timesheets is missing property should throw an error', async () => {
        const employeeTimesheet = [{
            times: [{
                checkIn: '08:10',
                checkOut: '15:55',
                month: '2024-08',
                day: '1',
                balance: -15,
                isHoliday: false,
            }],
        }];

        await expect(validateTimesheets(employeeTimesheet)).rejects.toThrow();
    });
});