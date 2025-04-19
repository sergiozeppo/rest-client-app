import { render, screen } from '@testing-library/react';
import VariablesPage from './page';

describe('VariablesPage', () => {
  it('renders Variables', () => {
    render(<VariablesPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
