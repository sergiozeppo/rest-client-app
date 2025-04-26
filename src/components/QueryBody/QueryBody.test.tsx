import { mockRouter } from '@/tests/mockRouter';
import { screen } from '@testing-library/react';
import QueryBody from './QueryBody';

vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({
    replace: vi.fn(),
  }),
}));

describe('QueryBody', () => {
  it('renders QueryBody', () => {
    mockRouter(<QueryBody />);
    expect(screen.getByText('Headers')).toBeInTheDocument();
    expect(screen.getByLabelText('Content-Type:')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
