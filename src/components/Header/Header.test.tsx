import { mockRouter } from '@/tests/mockRouter';
import { screen } from '@testing-library/react';
import Header from './Header';
import { useSession } from '@/hooks/useSession';

vi.mock('@/hooks/useSession', () => ({
  useSession: vi.fn(),
}));

vi.mock('@/components', () => ({
  LocaleSwitcher: () => <div>LocaleSwitcher</div>,
  ThemeSwitcher: () => <div>ThemeSwitcher</div>,
  MainButtons: () => <div>MainButtons</div>,
  Logo: () => <div>Logo</div>,
}));

describe('Header component', () => {
  it('renders correctly without session', () => {
    vi.mocked(useSession).mockReturnValue(null);
    mockRouter(<Header />);
    expect(screen.getByText('Logo')).toBeInTheDocument();
    expect(screen.queryByText(/Header:/)).not.toBeInTheDocument();
    expect(screen.getByText('LocaleSwitcher')).toBeInTheDocument();
    expect(screen.getByText('MainButtons')).toBeInTheDocument();
  });

  it('renders welcome message when session exists', () => {
    vi.mocked(useSession).mockImplementation(
      () =>
        ({
          user: {
            email: '',
            user_metadata: {
              user_name: 'TestUser',
            },
          },
        }) as unknown as ReturnType<typeof useSession>
    );

    mockRouter(<Header />);
    expect(screen.getByText('Welcome, TestUser')).toBeInTheDocument();
  });

  it('renders welcome message when session exists', () => {
    vi.mocked(useSession).mockImplementation(
      () =>
        ({
          user: {
            email: 'test@example.com',
            user_metadata: {
              user_name: '',
            },
          },
        }) as unknown as ReturnType<typeof useSession>
    );

    mockRouter(<Header />);
    expect(screen.getByText('Welcome, test@example.com')).toBeInTheDocument();
  });
});
