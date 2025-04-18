import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SignUp from './page';
import { FormData } from '@/utils/validation';

vi.mock('next-intl/server', () => ({
  getLocale: () => 'en',
  getTranslations: vi.fn().mockResolvedValue((key: string) => key),
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
  redirect: vi.fn(),
}));

vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn().mockReturnValue({
    auth: {
      signUp: vi.fn().mockResolvedValue({ error: null }),
      signOut: vi.fn(),
    },
  }),
}));

vi.mock('@/components/SignUpForm/SignUpForm', () => ({
  default: ({
    onSubmit,
  }: {
    // eslint-disable-next-line no-unused-vars
    onSubmit: (data: FormData) => Promise<{ error: string } | undefined>;
  }) => (
    <div data-testid="signup-form">
      <button
        onClick={async () => {
          await onSubmit({
            email: 'test@example.com',
            username: 'testuser',
            passwordForm: {
              password: 'Password123!',
              confirmPassword: 'Password123!',
            },
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

describe('SignUp Page', () => {
  it('renders the sign-up page with all components', async () => {
    render(await SignUp());

    await waitFor(() => {
      // Check for title and subtitle
      expect(screen.getByText('title')).toBeInTheDocument();
      expect(screen.getByText('subtitle')).toBeInTheDocument();

      // Check for GitHub sign-in button
      expect(screen.getByText('Sign in with GitHub')).toBeInTheDocument();

      // Check for divider
      expect(screen.getByText('divider')).toBeInTheDocument();

      // Check for sign-up form
      expect(screen.getByTestId('signup-form')).toBeInTheDocument();

      // Check for redirect link
      expect(screen.getByText('account')).toBeInTheDocument();
      expect(screen.getByText('redirect')).toBeInTheDocument();
    });
  });

  it('handles successful sign-up', async () => {
    const { createClient } = await import('@/utils/supabase/server');
    const { redirect } = await import('@/i18n/navigation');
    const mockSupabase = {
      auth: {
        signUp: vi.fn().mockResolvedValue({ error: null }),
        signOut: vi.fn(),
      },
    };

    (createClient as ReturnType<typeof vi.fn>).mockReturnValue(mockSupabase);

    render(await SignUp());

    const submitButton = screen.getByText('Submit');
    await submitButton.click();

    await waitFor(() => {
      expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'Password123!',
        options: {
          data: {
            user_name: 'testuser',
          },
        },
      });

      expect(mockSupabase.auth.signOut).toHaveBeenCalled();
      expect(redirect).toHaveBeenCalledWith({
        locale: 'en',
        href: '/sign-in',
      });
    });
  });

  it('handles sign-up error', async () => {
    const { createClient } = await import('@/utils/supabase/server');
    const mockSupabase = {
      auth: {
        signUp: vi
          .fn()
          .mockResolvedValue({ error: { message: 'Email already in use' } }),
        signOut: vi.fn(),
      },
    };

    (createClient as ReturnType<typeof vi.fn>).mockReturnValue(mockSupabase);

    render(await SignUp());

    const submitButton = screen.getByText('Submit');
    await submitButton.click();

    await waitFor(() => {
      expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'Password123!',
        options: {
          data: {
            user_name: 'testuser',
          },
        },
      });

      expect(mockSupabase.auth.signOut).not.toHaveBeenCalled();
    });
  });
});
