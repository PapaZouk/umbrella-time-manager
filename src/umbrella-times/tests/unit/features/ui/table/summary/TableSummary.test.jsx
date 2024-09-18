import { render } from '@testing-library/react';
import TableSummary from "../../../../../../src/features/ui/table/summary/TableSummary";

describe('TableSummary', () => {
   test('renders table with all table elements correctly', () => {
       const timesheetIndex = 1;
       const employeeData = {
           name: 'Joe',
           surname: 'Bloggs',
           workingHours: '08:00-16:00',
           annualLeave: 26
       };
       const annualLeaveDays = 2;
       const totalDaysInMonth = 21;
       const formattedDate = 'August 2024';
       const totalBalance = 10;
       const totalRecordedDays = 1;

      const { container } = render(
          <TableSummary
            timesheetIndex={timesheetIndex}
            employeeData={employeeData}
            annualLeaveDays={annualLeaveDays}
            totalDaysInMonth={totalDaysInMonth}
            formattedDate={formattedDate}
            totalBalance={totalBalance}
            totalRecordedDays={totalRecordedDays}
          />
      );

      const table = container.querySelector('table');
      expect(table).toBeInTheDocument();

      const thead = container.querySelector('thead');
      expect(thead).toBeInTheDocument();

      const tbody = container.querySelector('tbody');
      expect(tbody).toBeInTheDocument();
   });
});
