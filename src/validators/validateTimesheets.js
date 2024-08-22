import timesheetsSchema from '../contracts/schemas/timesheetsSchema';
import { ValidationError } from 'yup';
import logger from 'react-logger';

export default async function validateTimesheets(timesheets) {
    try {
       await timesheetsSchema.validate(timesheets);
    } catch(error) {
        if (error instanceof ValidationError) {
            logger.error(error.message);
        }    
    }
}