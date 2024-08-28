import * as Yup from 'yup';

const timesheetSchema = Yup.array().of(
    Yup.object().shape({
        employee: Yup.object().shape({
            name: Yup.string().required('Name is required'),
            surname: Yup.string().required('Surname is required'),
            workingHours: Yup.string().required('Working hours are required'),
            annualLeave: Yup.number().required('Annual leave is required'),
        }),
        times: Yup.array().of(
            Yup.object().shape({
                checkIn: Yup.string().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
                checkOut: Yup.string().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
                month: Yup.string().required('Month is required').matches(/^\d{4}-\d{2}$/, 'Month must be in the format YYYY-MM'),
                day: Yup.number()
                    .transform(value => (isNaN(value) ? Number(value) : value))
                    .min(1, 'Day must be between 1 and 31')
                    .max(31, 'Day must be between 1 and 31')
                    .required('Day is required'),
                balance: Yup.number().required('Balance is required'),
                isHoliday: Yup.boolean().notRequired(),
            })
        ).required('At least one time entry is required'),
    })
);

export default timesheetSchema;
