import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import SignInForm from './SignInForm';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

const mockRouterPush = vi.fn();
vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

const mockSignInWithPassword = vi.fn();
vi.mock('@/utils/supabase/client', () => ({
  createClient: () => ({
    auth: {
      signInWithPassword: mockSignInWithPassword,
    },
  }),
}));

describe('SignInForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSignInWithPassword.mockResolvedValue({ error: null, data: {} });
  });

  it('should render the form with email, password inputs, labels and submit button', () => {
    render(<SignInForm />);

    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');
    const submitButton = screen.getByRole('button', { name: 'submit' });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should allow typing into email and password fields', () => {
    render(<SignInForm />);

    const emailInput = screen.getByLabelText('email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('password') as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'securepassword' } });

    expect(emailInput.value).toBe('test@test.com');
    expect(passwordInput.value).toBe('securepassword');
  });

  it('should call supabase.auth.signInWithPassword on submit with correct credentials', async () => {
    render(<SignInForm />);

    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');
    const submitButton = screen.getByRole('button', { name: 'submit' });

    fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'securepassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignInWithPassword).toHaveBeenCalledTimes(1);
      expect(mockSignInWithPassword).toHaveBeenCalledWith({
        email: 'user@test.com',
        password: 'securepassword',
      });
    });
  });

  it('should redirect to "/" on successful sign-in', async () => {
    mockSignInWithPassword.mockResolvedValue({ error: null, data: {} });

    render(<SignInForm />);

    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');
    const submitButton = screen.getByRole('button', { name: 'submit' });

    fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'securepass' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledTimes(1);
      expect(mockRouterPush).toHaveBeenCalledWith('/');
    });
  });

  it('should display an error message if sign-in fails', async () => {
    const errorMessage = 'Invalid login credentials';
    mockSignInWithPassword.mockResolvedValue({
      error: { message: errorMessage },
      data: {},
    });

    render(<SignInForm />);

    const emailInput = screen.getByLabelText('email');
    const passwordInput = screen.getByLabelText('password');
    const submitButton = screen.getByRole('button', { name: 'submit' });

    fireEvent.change(emailInput, { target: { value: 'wrong@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'badpassword' } });
    fireEvent.click(submitButton);

    const errorElement = await screen.findByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
    expect(mockRouterPush).not.toHaveBeenCalled();
  });
});
