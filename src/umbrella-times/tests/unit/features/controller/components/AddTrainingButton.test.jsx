import {render, screen, fireEvent} from "@testing-library/react";
import AddTrainingButton from "../../../../../features/controller/components/AddTrainingButton";

describe('addTrainingButton', () => {
   test('renders add training button correctly', () => {
     render(<AddTrainingButton onClick={() => {}}/>);

     const addTrainingButton = screen.getByTestId('time-controller-business-training-button');

     expect(addTrainingButton).toBeInTheDocument();
     expect(addTrainingButton.textContent).toBe('Dodaj szkolenie');
   });

   test('calls onClick when add training button was clicked', () => {
       const onClickMock = jest.fn();
       render(<AddTrainingButton onClick={onClickMock}/>);

       const addTrainingButton = screen.getByTestId('time-controller-business-training-button');
       fireEvent.click(addTrainingButton);

       expect(onClickMock).toHaveBeenCalled();
   });
});
