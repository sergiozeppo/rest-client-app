import { mockRouter } from '@/tests/mockRouter';
import { screen } from '@testing-library/react';
import LocaleSwitcher from './LocaleSwitcher';

const mockReplace = vi.fn();

vi.mock('@/i18n/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

describe('LocaleSwitcher component', () => {
  it('renders select with correct default value', () => {
    mockRouter(<LocaleSwitcher />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('en');
    expect(screen.getByText('EN')).toBeInTheDocument();
  });
});
