import timesheetsSchema from "../../contracts/schemas/timesheetsSchema";
import logger from "react-logger";

export default async function validateTimesheet(timesheets) {
 try {
  await timesheetsSchema.validate(timesheets);
 } catch (error) {
  logger.error(error.message);
  throw error;
 }
}
