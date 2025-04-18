import { mockRouter } from '@/tests/mockRouter';
import { screen, fireEvent } from '@testing-library/react';
import MainButtons, { OriginType } from './MainButtons';
import { useSession } from '@/hooks/useSession';
import { signOut } from '@/utils/auth';
import { redirect } from '@/i18n/navigation';
import { ReactNode } from 'react';

vi.mock('@/hooks/useSession', () => ({
  useSession: vi.fn(),
}));

vi.mock('@/utils/auth', () => ({
  signOut: vi.fn(),
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className} data-testid={`link-${href}`}>
      {children}
    </a>
  ),
  redirect: vi.fn(),
}));

describe('MainButtons component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const renderWithOrigin = (origin: OriginType) => {
    mockRouter(<MainButtons origin={origin} />);
  };

  it('renders sign-in and sign-up when not authenticated', () => {
    vi.mocked(useSession).mockReturnValue(null);

    renderWithOrigin('main');

    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  it('renders rest-client, history, and variables when authenticated and origin is main', () => {
    vi.mocked(useSession).mockReturnValue({
      user: { name: 'Test' },
    } as unknown as ReturnType<typeof useSession>);

    renderWithOrigin('main');

    expect(screen.getByText('Rest Client')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText('Variables')).toBeInTheDocument();
  });

  it('renders main and logout buttons when authenticated and origin is header', () => {
    vi.mocked(useSession).mockReturnValue({
      user: { name: 'Test' },
    } as unknown as ReturnType<typeof useSession>);

    renderWithOrigin('header');

    expect(screen.getByText('Main Page')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('calls signOut and redirect on logout click', async () => {
    vi.mocked(useSession).mockReturnValue({
      user: { name: 'Test' },
    } as unknown as ReturnType<typeof useSession>);

    renderWithOrigin('header');

    const logoutButton = screen.getByText('Logout');
    await fireEvent.click(logoutButton);

    expect(signOut).toHaveBeenCalled();
    expect(redirect).toHaveBeenCalledWith({
      locale: expect.any(String),
      href: '/',
    });
  });
});
