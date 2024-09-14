import { render, screen, fireEvent } from '@testing-library/react';
import AddDayOffButton from "../../../../../src/features/controller/components/AddDayOffButton";

describe('addDayOffButton', () => {
   test('renders add day off button correctly', () => {
      render(<AddDayOffButton onClick={() => {}} />);

      const addDayOffButton = screen.getByTestId('time-controller-day-off-button');

      expect(addDayOffButton).toBeInTheDocument();
      expect(addDayOffButton.textContent).toBe('Dodaj dzień wolny');
   });

   test('calss onClick when add day off button was clicked', () => {
      const onClickMock = jest.fn();
      render(<AddDayOffButton onClick={onClickMock} />);

      const addDayOffButton = screen.getByTestId('time-controller-day-off-button');
      fireEvent.click(addDayOffButton);

      expect(onClickMock).toHaveBeenCalled();
   });
});
