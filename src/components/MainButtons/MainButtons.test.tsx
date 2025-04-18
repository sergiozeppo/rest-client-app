import { mockRouter } from '@/tests/mockRouter';

import { screen } from '@testing-library/react';
import MainButtons from './MainButtons';
import { useSession } from '@/Store/useSession';
import { ReactNode } from 'react';

vi.mock('@/Store/useSession', () => ({
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
    <a href={href} className={className}>
      {children}
    </a>
  ),
  redirect: vi.fn(),
}));

describe('MainButtons component', () => {
  it('renders sign-in and sign-up buttons when not authenticated', () => {
    vi.mocked(useSession).mockReturnValue(null);

    mockRouter(<MainButtons />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  it('renders rest-client and logout buttons when authenticated', () => {
    vi.mocked(useSession).mockReturnValue({
      user: { name: 'Test' },
    } as unknown as ReturnType<typeof useSession>);

    mockRouter(<MainButtons />);

    expect(screen.getByText('Rest Client')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});
