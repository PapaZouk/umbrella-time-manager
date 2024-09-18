import { render } from '@testing-library/react';
import TableDetailsHead from "../../../../../../src/features/ui/table/details/TableDetailsHead";

describe('TableDetailsHead', () => {
    test('render thead with the correct class name correctly', () => {
        const testClassName = 'any class';
       const { container } = render(
           <table>
               <TableDetailsHead style={testClassName}/>
           </table>
       );

       const thead = container.querySelector('thead');
       const tr = thead.firstChild;
       const thDay = tr.firstChild;
       const thCheckIn = thDay.nextSibling;
       const thCheckOut = thCheckIn.nextSibling;
       const thBalance = thCheckOut.nextSibling;

       expect(thead).toBeInTheDocument();
       expect(tr).toBeInTheDocument();
       expect(thDay).toBeInTheDocument();
       expect(thCheckIn).toBeInTheDocument();
       expect(thCheckOut).toBeInTheDocument();
       expect(thBalance).toBeInTheDocument();

       expect(thDay.textContent).toBe('Dzień');
       expect(thCheckIn.textContent).toBe('Przyjście');
       expect(thCheckOut.textContent).toBe('Wyjście');
       expect(thBalance.textContent).toBe('Bilans (min/godz)');
       expect(thead).toHaveClass(testClassName);
    });
});
