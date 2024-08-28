import { render, screen } from '@testing-library/react';
import TableEditButtons from "../../../../../../features/ui/table/elements/TableEditButtons";

describe('TableEditButtons', () => {
   test('render two edit buttons with save and cancel icon correctly', () => {
       const onSaveHandlerMock = jest.fn();
       const onCancelHandlerMock = jest.fn();

       const { container } = render(<TableEditButtons onSave={onSaveHandlerMock} onCancel={onCancelHandlerMock} />);
       const spanElement = container.querySelector('span');
       const saveButton = spanElement.firstChild;
       const cancelButton = saveButton.nextSibling;

       expect(spanElement).toBeInTheDocument();
       expect(saveButton).toBeInTheDocument();
       expect(cancelButton).toBeInTheDocument();

       const saveIcon = screen.getByTestId('save-icon');
       const cancelIcon = screen.getByTestId('cancel-icon');

       expect(saveIcon).toBeInTheDocument();
       expect(cancelIcon).toBeInTheDocument();
   });
});
