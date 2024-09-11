import { render } from '@testing-library/react';
import TableSummaryBody from "../../../../../../features/ui/table/summary/TableSummaryBody";

jest.mock('../../../../../../features/ui/table/styles/Tables.module.css', () => ({
    "total-balance-cell": "total-balance-cell",
    "total-balance-negative": "total-balance-negative",
    "total-balance-positive": "total-balance-positive",
}));


describe('TableSummaryBody', () => {
   test('renders table summary body with single row and filled data', () => {
       const formattedDate = 'August 20024';
       const employeeData = {
           name: 'Joe',
           surname: 'Bloggs',
           workingHours: '8am-3pm',
           annualLeave: 21
       };
       const totalBalance = 8;
       const totalBusinessTripDays = 1;
       const totalDaysInMonth = 21;
       const totalRecordedDays = 13;
       const annualLeaveDays = 2;

      const { container, getAllByTestId } = render(
          <table>
              <TableSummaryBody
                formattedDate={formattedDate}
                employeeData={employeeData}
                businessTripDays={totalBusinessTripDays}
                totalBalance={totalBalance}
                annualLeaveDays={annualLeaveDays}
                totalDaysInMonth={totalDaysInMonth}
                totalRecordedDays={totalRecordedDays}
              />
           </table>
      );

      const tableBody =container.querySelector('tbody');
      expect(tableBody).toBeInTheDocument();

      const tableRow = container.querySelector('tr');
      expect(tableRow).toBeInTheDocument();

      const tableData = getAllByTestId(/summary-body/);
      expect(tableData).toHaveLength(10);
   });

   test('given balance is negative should render total balance cell with correct class name', () => {
       const formattedDate = 'August 20024';
       const employeeData = {
           name: 'Joe',
           surname: 'Bloggs',
           workingHours: '8am-3pm',
           annualLeave: 21
       };
       const totalBalance = -15;
       const totalBusinessTripDays = 1;
       const totalDaysInMonth = 21;
       const totalRecordedDays = 13;
       const annualLeaveDays = 2;

       const { getByTestId } = render(
           <table>
               <TableSummaryBody
                   formattedDate={formattedDate}
                   employeeData={employeeData}
                   businessTripDays={totalBusinessTripDays}
                   totalBalance={totalBalance}
                   annualLeaveDays={annualLeaveDays}
                   totalDaysInMonth={totalDaysInMonth}
                   totalRecordedDays={totalRecordedDays}
               />
           </table>
       );

       const totalBalanceCell = getByTestId(/summary-body-total-balance/);

       expect(totalBalanceCell).toBeInTheDocument();
       expect(totalBalanceCell).toHaveClass("total-balance-negative");
   });

   test('given balance is positive should render total balance cell with correct class name', () => {
       const formattedDate = 'August 20024';
       const employeeData = {
           name: 'Joe',
           surname: 'Bloggs',
           workingHours: '8am-3pm',
           annualLeave: 21
       };
       const totalBalance = 30;
       const totalBusinessTripDays = 1;
       const totalDaysInMonth = 21;
       const totalRecordedDays = 13;
       const annualLeaveDays = 2;

       const { getByTestId } = render(
           <table>
               <TableSummaryBody
                   formattedDate={formattedDate}
                   employeeData={employeeData}
                   businessTripDays={totalBusinessTripDays}
                   totalBalance={totalBalance}
                   annualLeaveDays={annualLeaveDays}
                   totalDaysInMonth={totalDaysInMonth}
                   totalRecordedDays={totalRecordedDays}
               />
           </table>
       );

       const totalBalanceCell = getByTestId(/summary-body-total-balance/);

       expect(totalBalanceCell).toBeInTheDocument();
       expect(totalBalanceCell).toHaveClass("total-balance-positive");
   });
});
