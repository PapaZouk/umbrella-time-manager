import { render } from '@testing-library/react';
import { EndLine } from "../../../../../features/shared";

describe('EndLine', () => {
   test('renders hr element successfully', () => {
      const { container } = render(<EndLine />);

      const hr = container.querySelector('hr');

      expect(hr).toBeInTheDocument();
      expect(hr).toHaveStyle('border: 1px solid grey');
      expect(hr).toHaveStyle('width: 70%');
      expect(hr).toHaveStyle('margin: 20px auto');
   });
});
