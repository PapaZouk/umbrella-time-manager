import { render } from '@testing-library/react';
import PrintTimesheet from "../../../../features/business/PrintTimesheet";

jest.mock('../../../../features/shared/styles/Buttons.module.css');

describe('PrintTimesheet', () => {
   test('renders print button with proper text value correctly', () => {
      const handlePrintMock = jest.fn();

      const { getByText } = render(<PrintTimesheet handlePrint={handlePrintMock}/>);

      const button = getByText('Drukuj');
      expect(button).toBeInTheDocument();
   });
});
