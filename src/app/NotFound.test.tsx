import { render, screen } from '@testing-library/react';
import NotFound from './not-found';

vi.mock('@/components', () => ({
  NotFound404: () => <div>Mocked 404</div>,
}));

describe('NotFound page', () => {
  it('renders the NotFound404 component', () => {
    render(<NotFound />);
    expect(screen.getByText('Mocked 404')).toBeInTheDocument();
  });
});
