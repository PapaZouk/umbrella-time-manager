import {render} from '@testing-library/react';
import TableAnnualLeave from "../../../../../../features/ui/table/details/TableAnnualLeave";

describe('TableAnnualLeave', () => {
    test('renders with default props and annual leave type text', () => {
       const { container } = render(
           <table>
               <tbody>
                   <tr>
                       <TableAnnualLeave annualLeaveType={'annual leave type'}/>
                   </tr>
               </tbody>
           </table>
       );
       const cell = container.querySelector('td');

       expect(cell).toBeInTheDocument();
       expect(cell).toHaveAttribute('colSpan', '4');
       expect(cell).toHaveTextContent('ANNUAL LEAVE TYPE');
       expect(cell).not.toHaveClass('some-class');
    });

    test('applies custom class name when provided', () => {
       const { container } = render(
           <table>
               <tbody>
                    <tr>
                        <TableAnnualLeave style='custom-class' annualLeaveType={''}/>
                    </tr>
               </tbody>
           </table>
       );

       const cell = container.querySelector('td');

       expect(cell).toHaveClass('custom-class');
    });
});
