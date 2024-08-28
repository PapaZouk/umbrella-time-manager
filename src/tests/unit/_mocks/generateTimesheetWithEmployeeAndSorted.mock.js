import {generateEmployeeMock} from "./generateEmployee.mock";
import {generateTimesheetMock} from "./generateTimesheet.mock";

export const generateTimesheetWithEmployeeAndSortedMock = (overide = {}) => ({
   employee: overide.employee || generateEmployeeMock(),
    times: overide.times || [generateTimesheetMock()],
    sortedTimes: overide.sortedTimes || [generateTimesheetMock()],
});
