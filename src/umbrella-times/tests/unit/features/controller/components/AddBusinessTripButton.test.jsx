import { render, screen, fireEvent } from "@testing-library/react";
import AddBusinessTripButton from "../../../../../src/features/controller/components/AddBusinessTripButton";

describe('addBusinessTripButton', () => {
   test('renders add business trip button correctly', () => {
     render(<AddBusinessTripButton onClick={() => {}} />);

     const addBusinessTripButton = screen.getByTestId('time-controller-business-trip-button');

     expect(addBusinessTripButton).toBeInTheDocument();
     expect(addBusinessTripButton.textContent).toBe('Wyjazd służbowy');
   });

   test('calls onClick when add business trip button was clicked', () => {
      const onClickMock = jest.fn();
       render(<AddBusinessTripButton onClick={onClickMock} />);

       const addBusinessTripButton = screen.getByTestId('time-controller-business-trip-button');
       fireEvent.click(addBusinessTripButton);

       expect(onClickMock).toHaveBeenCalled();
   });
});
