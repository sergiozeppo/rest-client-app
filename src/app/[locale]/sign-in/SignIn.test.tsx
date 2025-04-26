import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SignIn from './page';

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn().mockResolvedValue((key: string) => key),
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const mockSignInWithPassword = vi.fn();
vi.mock('@/utils/supabase/client', () => ({
  createClient: () => ({
    auth: {
      signInWithPassword: mockSignInWithPassword,
    },
  }),
}));

vi.mock('@/components/SignInForm/SignInForm', () => ({
  default: () => (
    <div data-testid="signin-form">
      <button
        onClick={() => {
          mockSignInWithPassword({
            email: 'test@example.com',
            password: 'Password123!',
          });
        }}
      >
        Submit
      </button>
    </div>
  ),
}));

vi.mock('@/components/GithubSignInButton/GithubSignInButton', () => ({
  default: () => <button>Sign in with GitHub</button>,
}));

describe('SignIn Page', () => {
  it('renders the sign-in page with all components', async () => {
    render(await SignIn());

    await waitFor(() => {
      expect(screen.getByText('title')).toBeInTheDocument();
      expect(screen.getByText('subtitle')).toBeInTheDocument();
      expect(screen.getByText('Sign in with GitHub')).toBeInTheDocument();
      expect(screen.getByText('divider')).toBeInTheDocument();
      expect(screen.getByTestId('signin-form')).toBeInTheDocument();
      expect(screen.getByText('account')).toBeInTheDocument();
      expect(screen.getByText('redirect')).toBeInTheDocument();
    });
  });
});
