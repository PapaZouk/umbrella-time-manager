import timesheetsSchema from '../contracts/schemas/timesheetsSchema';
import { ValidationError } from 'yup';

export default async function validateTimesheets(timesheets) {
    console.log('Validating timesheets', timesheets);
    try {
       await timesheetsSchema.validate(timesheets);
       console.log('Successfully validated timesheets!');
    } catch(error) {
        if (error instanceof ValidationError) {
            console.error(error.message);
        }    
    }
}