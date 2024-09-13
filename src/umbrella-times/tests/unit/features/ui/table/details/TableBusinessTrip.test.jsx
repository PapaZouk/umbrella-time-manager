import { render, screen } from '@testing-library/react';
import TableBusinessTrip from "../../../../../../features/ui/table/details/TableBusinessTrip";

describe('tableBusinessTrip', () => {
    const testComponent = (businessTrip) => (
        <table>
            <tbody>
                <tr>
                    {businessTrip}
                </tr>
            </tbody>
        </table>
    );

    test('renders business trip data with default style', () => {
        render(
            testComponent(
                <TableBusinessTrip />
            )
        );

        const businessTripElement = screen.getByTestId('table-business-trip-data');

        expect(businessTripElement).toBeInTheDocument();
    });

    test('renders business trip data with given style', () => {
        const style = { businessTrip: 'test' };
        render(
            testComponent(
                <TableBusinessTrip style={style}/>
            )
        );

        const businessTripElement = screen.getByTestId('table-business-trip-data');

        expect(businessTripElement).toBeInTheDocument();
        expect(businessTripElement).toHaveClass('test');
    });
});
