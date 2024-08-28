import { render } from '@testing-library/react';
import TableTotalBalance from "../../../../../../features/ui/table/details/TableTotalBalance";

const styles = {
    "total-balance-cell": "total-balance-cell",
    "total-balance-negative": "total-balance-negative",
    "total-balance-positive": "total-balance-positive",
};

describe('TableTotalBalance', () => {
   test('given time with balance greater than zero should render cell and span with proper value and class name', () => {
    const timeMock = {
        balance: '10',
    };
    const calculatedBalance = Number(timeMock.balance / 60).toFixed(2);

    const { container } = render(
        <table>
            <tbody>
                <tr>
                    <TableTotalBalance time={timeMock} styles={styles}/>
                </tr>
            </tbody>
        </table>
    );

    const cell = container.querySelector('td');
    const span = cell.querySelector('span');

    expect(cell).toBeInTheDocument();
    expect(cell.textContent).toBe(`${timeMock.balance} / ${calculatedBalance}`);
    expect(cell).toHaveClass(styles["total-balance-cell"]);
    expect(span).toHaveClass(styles["total-balance-positive"]);
   });

   test('given time with negative balance should render cell and span with proper value and class name', () => {
       const timeMock = {
           balance: '-10',
       };
       const calculatedBalance = Number(timeMock.balance / 60).toFixed(2);

       const { container } = render(
           <table>
               <tbody>
               <tr>
                   <TableTotalBalance time={timeMock} styles={styles}/>
               </tr>
               </tbody>
           </table>
       );

       const cell = container.querySelector('td');
       const span = cell.querySelector('span');

       expect(cell).toBeInTheDocument();
       expect(cell.textContent).toBe(`${timeMock.balance} / ${calculatedBalance}`);
       expect(cell).toHaveClass(styles["total-balance-cell"]);
       expect(span).toHaveClass(styles["total-balance-negative"]);
   });

   test('given no time should read default value and set total positive balance class name', () => {
       const { container } = render(
           <table>
               <tbody>
               <tr>
                   <TableTotalBalance styles={styles}/>
               </tr>
               </tbody>
           </table>
       );

       const cell = container.querySelector('td');
       const span = cell.querySelector('span');

       expect(cell).toBeInTheDocument();
       expect(cell.textContent).toBe('0 / 0.00');
       expect(cell).toHaveClass(styles["total-balance-cell"]);
       expect(span).toHaveClass(styles["total-balance-positive"]);
   });

   test('given time with no style should render cell and span with a proper value with no class name', () => {
       const timeMock = {
           balance: '10',
       };
       const calculatedBalance = Number(timeMock.balance / 60).toFixed(2);

       const { container } = render(
           <table>
               <tbody>
               <tr>
                   <TableTotalBalance time={timeMock} />
               </tr>
               </tbody>
           </table>
       );

       const cell = container.querySelector('td');
       const span = cell.querySelector('span');

       expect(cell).toBeInTheDocument();
       expect(cell.textContent).toBe(`${timeMock.balance} / ${calculatedBalance}`);
       expect(cell).not.toHaveClass(styles["total-balance-cell"]);
       expect(span).not.toHaveClass(styles["total-balance-negative"]);
   });
});
