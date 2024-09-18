import { render } from '@testing-library/react';
import TableSummaryHead from "../../../../../../src/features/ui/table/summary/TableSummaryHead";

describe('TableSummaryHead', () => {
   test('renders table row with proper columns', () => {
      const testColumns = [
          'column1',
          'column2',
          'column3',
      ];

      const { getAllByTestId } = render(
          <table>
              <TableSummaryHead columns={testColumns} />
          </table>
      );

      const thElements = getAllByTestId(/summary-head-column/);

      expect(thElements).toHaveLength(testColumns.length);
   });

   test('no columns were given, should render empty table row with default', () => {
      const { queryAllByTestId } = render(
          <table>
              <TableSummaryHead />
          </table>
      );

       const thElements = queryAllByTestId(/summary-head-column/);

       expect(thElements).toHaveLength(0);
   });
});
