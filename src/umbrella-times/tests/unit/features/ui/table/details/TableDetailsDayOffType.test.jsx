/* eslint-disable jest/no-identical-title */

import { render, screen } from '@testing-library/react';
import TableDetailsDayOffType from "../../../../../../src/features/ui/table/details/TableDetailsDayOffType";

const styles = {
    annualLeaveDays: 'annual-leave-days',
    maternityLeave: 'maternity-leave',
    unpaidLeave: 'unpaid-leave',
    sickLeave: 'sick-leave',
    occasionalLeave: 'occasional-leave',
    parentalLeave: 'parental-leave',
};

describe('TableDetailsDayOffType', () => {
    const testComponent = (testedComponent) => (<table>
        <tbody>
        {testedComponent}
        </tbody>
    </table>);

    test('renders table with proper annual leave day style and content', () => {
        const annualLeaveDay = 'Urlop';

        render(
            testComponent(
                <tr>
                    <TableDetailsDayOffType style={styles} dayOffType={annualLeaveDay}/>
                </tr>
        ));

        const tableDataDayOff = screen.getByTestId('day-off-type-data');

        expect(tableDataDayOff).toBeInTheDocument();
        expect(tableDataDayOff.textContent).toBe(annualLeaveDay.toUpperCase());
        expect(tableDataDayOff).toHaveClass(styles.annualLeaveDays);
        expect(tableDataDayOff).toHaveAttribute('colspan', '4')
    });

    test('renders table with proper maternity leave day style and content', () => {
        const maternityLeave = 'Urlop macierzyński';

        render(
            testComponent(
                <tr>
                    <TableDetailsDayOffType style={styles} dayOffType={maternityLeave}/>
                </tr>
        ));

        const tableDataDayOff = screen.getByTestId('day-off-type-data');

        expect(tableDataDayOff).toBeInTheDocument();
        expect(tableDataDayOff.textContent).toBe(maternityLeave.toUpperCase());
        expect(tableDataDayOff).toHaveClass(styles.maternityLeave);
        expect(tableDataDayOff).toHaveAttribute('colspan', '4');
    });

    test('renders table with proper maternity leave day style and content', () => {
        const unpaidLeave = 'Bezpłatny urlop';

        render(
            testComponent(
                <tr>
                    <TableDetailsDayOffType style={styles} dayOffType={unpaidLeave}/>
                </tr>
        ));

        const tableDataDayOff = screen.getByTestId('day-off-type-data');

        expect(tableDataDayOff).toBeInTheDocument();
        expect(tableDataDayOff.textContent).toBe(unpaidLeave.toUpperCase());
        expect(tableDataDayOff).toHaveClass(styles.unpaidLeave);
        expect(tableDataDayOff).toHaveAttribute('colspan', '4');
    });

    test('renders table with proper sick leave day style and content', () => {
        const sickLeave = 'Zwolnienie lekarskie';

        render(
            testComponent(
                <tr>
                    <TableDetailsDayOffType style={styles} dayOffType={sickLeave}/>
                </tr>
        ));

        const tableDataDayOff = screen.getByTestId('day-off-type-data');

        expect(tableDataDayOff).toBeInTheDocument();
        expect(tableDataDayOff.textContent).toBe(sickLeave.toUpperCase());
        expect(tableDataDayOff).toHaveClass(styles.sickLeave);
        expect(tableDataDayOff).toHaveAttribute('colspan', '4');
    });

    test('renders table with proper occasional leave day style and content', () => {
        const occasionalLeave = 'Urlop okazjonalny';

        render(
            testComponent(
                <tr>
                    <TableDetailsDayOffType style={styles} dayOffType={occasionalLeave}/>
                </tr>
        ));

        const tableDataDayOff = screen.getByTestId('day-off-type-data');

        expect(tableDataDayOff).toBeInTheDocument();
        expect(tableDataDayOff.textContent).toBe(occasionalLeave.toUpperCase());
        expect(tableDataDayOff).toHaveClass(styles.occasionalLeave);
        expect(tableDataDayOff).toHaveAttribute('colspan', '4');
    });

    test('renders table with proper parental leave day style and content', () => {
        const parentalLeave = 'Urlop wychowawczy';

        render(
            testComponent(
                <tr>
                    <TableDetailsDayOffType style={styles} dayOffType={parentalLeave}/>
                </tr>
        ));

        const tableDataDayOff = screen.getByTestId('day-off-type-data');

        expect(tableDataDayOff).toBeInTheDocument();
        expect(tableDataDayOff.textContent).toBe(parentalLeave.toUpperCase());
        expect(tableDataDayOff).toHaveClass(styles.parentalLeave);
        expect(tableDataDayOff).toHaveAttribute('colspan', '4');
    });

    test('renders table data with custom day off type and default style', () => {
        const dayOffType = 'test';

        render(
            testComponent(
                <tr>
                    <TableDetailsDayOffType style={styles} dayOffType={dayOffType}/>
                </tr>
            )
        );

       const tableDataDayOff = screen.getByTestId('day-off-type-data');

        expect(tableDataDayOff).toBeInTheDocument();
        expect(tableDataDayOff.textContent).toBe(dayOffType.toUpperCase());
        expect(tableDataDayOff).toHaveClass(styles.annualLeaveDays);
        expect(tableDataDayOff).toHaveAttribute('colspan', '4');
    });
});
