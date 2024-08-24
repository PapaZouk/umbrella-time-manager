import timesheetsSchema from "../contracts/schemas/timesheetsSchema";
import logger from "react-logger";

export default async function validateTimesheets(timesheets) {
 try {
  await timesheetsSchema.validate(timesheets);
 } catch (error) {
  logger.error(error.message);
  throw error;
 }
}
