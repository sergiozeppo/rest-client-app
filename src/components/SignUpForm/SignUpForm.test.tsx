import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignUpForm from './SignUpForm';
import { vi } from 'vitest';
import { FormData } from '@/utils/validation';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

describe('SignUpForm', () => {
  const setup = (
    // eslint-disable-next-line no-unused-vars
    onSubmit: (data: FormData) => Promise<{ error: string } | undefined>
  ) => {
    render(<SignUpForm onSubmit={onSubmit} />);
  };

  it('renders all fields and submit button', () => {
    setup(vi.fn());
    expect(screen.getByLabelText('username')).toBeInTheDocument();
    expect(screen.getByLabelText('email')).toBeInTheDocument();
    expect(screen.getByLabelText('password')).toBeInTheDocument();
    expect(screen.getByTestId('confirmPassword')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shows validation errors on submit without input', async () => {
    setup(vi.fn());
    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText(/username is required/i)).toBeInTheDocument();
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
      expect(
        screen.getByText(/password must be at least 8 characters/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/confirm password is required/i)
      ).toBeInTheDocument();
    });
  });

  it('submits valid data', async () => {
    const mockSubmit = vi.fn().mockResolvedValue(undefined);
    setup(mockSubmit);

    fireEvent.input(screen.getByLabelText('username'), {
      target: { value: 'testuser' },
    });
    fireEvent.input(screen.getByLabelText('email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.input(screen.getByLabelText('password'), {
      target: { value: 'Password123!' },
    });
    fireEvent.input(screen.getByTestId('confirmPassword'), {
      target: { value: 'Password123!' },
    });

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'test@example.com',
        passwordForm: {
          password: 'Password123!',
          confirmPassword: 'Password123!',
        },
      });
    });
  });

  it('shows server error returned from onSubmit', async () => {
    const mockSubmit = vi
      .fn()
      .mockResolvedValue({ error: 'Email already in use' });
    setup(mockSubmit);

    fireEvent.input(screen.getByLabelText('username'), {
      target: { value: 'testuser' },
    });
    fireEvent.input(screen.getByLabelText('email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.input(screen.getByLabelText('password'), {
      target: { value: 'Password123!' },
    });
    fireEvent.input(screen.getByTestId('confirmPassword'), {
      target: { value: 'Password123!' },
    });

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText(/email already in use/i)).toBeInTheDocument();
    });
  });
});
