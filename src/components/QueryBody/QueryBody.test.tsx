import { mockRouter } from '@/tests/mockRouter';
import { screen } from '@testing-library/react';
import QueryBody from './QueryBody';

describe('QueryBody', () => {
  it('renders QueryBody', () => {
    mockRouter(<QueryBody />);
    expect(screen.getByText('Headers')).toBeInTheDocument();
    expect(screen.getByLabelText('Content-Type:')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    const status = screen.getByTestId('json-status');
    expect(status).toHaveClass(/invalid/);
  });
});
