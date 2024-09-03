import {fireEvent, screen, render} from '@testing-library/react';
import TimesController from "../../../../features/controller/TimesController";
import {generateEmployeeMock} from "../../_mocks/generateEmployee.mock";
import {afterEach, beforeEach} from "node:test";

jest.mock('../../../../features/shared', () => ({
    Container: jest.fn(({ children }) => (<div>{children}</div>)),
}));
jest.mock('../../../../features/controller/styles/TimesController.module.css', () => ({
        addTimes: "addTimes",
        holidayButton: "holidayButton",
        businessTripButton: "businessTripButton",
}));

describe('TimesController', () => {
    const timeControllerAddButtonId = 'time-controller-add-button';
    const timeControllerAnnualLeaveButtonId = 'time-controller-annual-leave-button';
    const timeControllerBusinessTripButtonId = 'time-controller-business-trip-button';
    const timeSelectorCheckInLabelId = 'time-selector-check-in-label';
    const timeSelectorCheckInInputId = 'time-selector-check-in-input';
    const timeSelectorCheckOutLabelId = 'time-selector-check-out-label';
    const timeSelectorCheckOutInputId = 'time-selector-check-out-input';
    const timesInputSaveButtonId = 'times-input-save-button';

    const month = '2024-08';
    const day = '2';

    const setErrorMock = jest.fn();

    beforeEach(() => {
       jest.clearAllMocks();
    });

    afterEach(() => {
       jest.resetAllMocks();
    });

   test('renders all buttons, times inputs and save button, when add button was clicked', () => {
       const employee = generateEmployeeMock();
       const onTimesheetUpdateMock = jest.fn();

       render(
           <TimesController
               employee={employee}
               month={month}
               day={day}
               onTimesheetUpdate={onTimesheetUpdateMock}
               setError={setErrorMock}
           />
       );

       const addButton = screen.getByTestId(timeControllerAddButtonId);
       fireEvent.click(addButton);

       const annualLeaveButton = screen.getByTestId(timeControllerAnnualLeaveButtonId);
       const businessTripButton = screen.getByTestId(timeControllerBusinessTripButtonId);
       const checkInLabel = screen.getByTestId(timeSelectorCheckInLabelId);
       const checkInInput = screen.getByTestId(timeSelectorCheckInInputId);
       const checkOutLabel = screen.getByTestId(timeSelectorCheckOutLabelId);
       const checkOutInput = screen.getByTestId(timeSelectorCheckOutInputId);
       const saveButton = screen.getByTestId(timesInputSaveButtonId);

       expect(addButton).toBeVisible();
       expect(annualLeaveButton).toBeVisible();
       expect(businessTripButton).toBeVisible();
       expect(checkInLabel).toBeVisible();
       expect(checkInInput).toBeVisible();
       expect(checkOutLabel).toBeVisible();
       expect(checkOutInput).toBeVisible();
       expect(saveButton).toBeVisible();
   });

   test('renders only add, annual leave and business trip buttons', () => {
       const employee = generateEmployeeMock();
       const onTimesheetUpdateMock = jest.fn();

       render(
           <TimesController
               employee={employee}
               month={month}
               day={day}
               onTimesheetUpdate={onTimesheetUpdateMock}
               setError={setErrorMock}
           />
       );

       const addButton = screen.getByTestId(timeControllerAddButtonId);
       const annualLeaveButton = screen.getByTestId(timeControllerAnnualLeaveButtonId);
       const businessTripButton = screen.getByTestId(timeControllerBusinessTripButtonId);

       expect(addButton).toBeVisible();
       expect(annualLeaveButton).toBeVisible();
       expect(businessTripButton).toBeVisible();
   });

   test('calls onTimesheetUpdate with correct data when save button was clicked', () => {
       const employee = generateEmployeeMock();
       const onTimesheetUpdateMock = jest.fn();

      render(
          <TimesController
              employee={employee}
              month={month}
              day={day}
              onTimesheetUpdate={onTimesheetUpdateMock}
              setError={setErrorMock}
          />
      );

      const addButton = screen.getByTestId(timeControllerAddButtonId);
      fireEvent.click(addButton);

      fireEvent.change(screen.getByTestId(timeSelectorCheckInInputId), {
          target: {
              value: '08:00'
          },
      });
      fireEvent.change(screen.getByTestId(timeSelectorCheckOutInputId), {
          target: {
              value: '16:00',
          },
      });

      const saveButton = screen.getByTestId(timesInputSaveButtonId);
      fireEvent.click(saveButton);

      expect(onTimesheetUpdateMock).toHaveBeenCalledWith({
         employee,
         times: [
             {
                 checkIn: '08:00',
                 checkOut: '16:00',
                 day,
                 month,
                 balance: 0,
                 isHoliday: false,
             },
         ],
      });
      expect(setErrorMock).not.toHaveBeenCalled();
   });

   test('calls setError when save button was clicked with missing data', () => {
       const mockEmployee = {};
       const onTimesheetUpdateMock = jest.fn();

       render(
           <TimesController
               employee={mockEmployee}
               month={month}
               day={day}
               onTimesheetUpdate={onTimesheetUpdateMock}
               setError={setErrorMock}
           />
       );

       const addButton =  screen.getByTestId(timeControllerAddButtonId);
       fireEvent.click(addButton);

       const saveButton = screen.getByTestId(timesInputSaveButtonId);
       fireEvent.click(saveButton);

       expect(setErrorMock).toHaveBeenCalledWith('Uzupełnij wszystkie dane');
       expect(onTimesheetUpdateMock).not.toHaveBeenCalled();
   });
});
