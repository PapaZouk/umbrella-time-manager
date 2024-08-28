import {generateEmployeeMock} from "./generateEmployee.mock";
import {generateTimesheetMock} from "./generateTimesheet.mock";

export const generateTimesheetWithEmployeeMock = (override = {}) => ({
    employee: override.employee || generateEmployeeMock(),
    times: override.times || [generateTimesheetMock()],
});
