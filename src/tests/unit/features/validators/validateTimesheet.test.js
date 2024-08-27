import validateTimesheet from '../../../../features/validators/validateTimesheet';

describe('validateTimesheet', () => {
    test('given timesheet should validate successfully', () => {
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

        expect(() => validateTimesheet(employeeTimesheet)).not.toThrow();
    });

    test('given timesheet is missing property should throw an error', async () => {
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

        await expect(validateTimesheet(employeeTimesheet)).rejects.toThrow();
    });
});
