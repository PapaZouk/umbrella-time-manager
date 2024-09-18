import timesheetSchema from "../../contracts/schemas/timesheetSchema";
import logger from "react-logger";

export default async function validateTimesheet(timesheet) {
 try {
  await timesheetSchema.validate(timesheet);
 } catch (error) {
  logger.error(error.message);
  throw error;
 }
}
