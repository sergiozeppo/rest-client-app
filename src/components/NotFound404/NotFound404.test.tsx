import { mockRouter } from '@/tests/mockRouter';
import { screen } from '@testing-library/react';
import NotFound404 from './NotFound404';
import { ReactNode } from 'react';

vi.mock('next/link', () => ({
  default: ({ children }: { children: ReactNode }) => <a>{children}</a>,
}));
describe('NotFound404 component', () => {
  it('should render the "Oops! Page Not Found" message', () => {
    mockRouter(<NotFound404 />);
    expect(screen.getByText('Oops! Page Not Found')).toBeInTheDocument();
  });
});
