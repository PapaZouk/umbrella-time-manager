import {render, screen} from '@testing-library/react';
import TableTraining from "../../../../../../features/ui/table/details/TableTraining";

describe('tableTraining', () => {
   test('renders training data with correct value', () => {
       const trainingType = "BHP";
       render(
           <table>
               <tbody>
                   <tr>
                       <TableTraining trainingType={trainingType}/>
                   </tr>
               </tbody>
           </table>
       )

       const trainingData = screen.getByTestId('table-training-data');

      expect(trainingData).toBeInTheDocument();
      expect(trainingData.textContent).toBe(`SZKOLENIE: ${trainingType}`)
       expect(trainingData).toHaveAttribute("colspan", "4");
   });
});
