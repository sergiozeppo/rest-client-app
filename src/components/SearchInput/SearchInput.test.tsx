import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchInput from './SearchInput';
import { useUrl } from '@/Store/useUrlStore';
import { useRouter } from '@/i18n/navigation';
import { useFetch } from '@/Store/useFetch';
import { useTranslations } from 'next-intl';

vi.mock('@/Store/useUrlStore', () => ({
  useUrl: vi.fn(),
}));

vi.mock('@/i18n/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/Store/useFetch', () => ({
  useFetch: vi.fn(),
}));

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
}));

describe('SearchInput Component', () => {
  const mockRouter = {
    push: vi.fn(),
    replace: vi.fn(),
  };

  const mockSetValueBase = vi.fn();
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useUrl as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      params: { method: 'get' },
      value: '',
      setValueBase: mockSetValueBase,
    });

    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockRouter
    );

    (useFetch as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (selector) => {
        if (selector) {
          return selector({ fetch: mockFetch });
        }
        return { fetch: mockFetch };
      }
    );

    (useTranslations as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      (key: string) => (key === 'go' ? 'Go' : '')
    );
  });

  it('renders input and button', () => {
    render(<SearchInput />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument();
  });

  it('updates input value when typing', () => {
    render(<SearchInput />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'https://example.com' } });
    expect(input).toHaveValue('https://example.com');
  });

  it('handles form submission with valid URL', async () => {
    render(<SearchInput />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: 'Go' });
    fireEvent.change(input, { target: { value: 'https://example.com' } });
    fireEvent.click(button);
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith({
        pathname: '/get/aHR0cHMlM0ElMkYlMkZleGFtcGxlLmNvbSUyRg==/',
        query: {},
      });
      expect(mockFetch).toHaveBeenCalledWith('https://example.com');
    });
  });

  it('handles empty input submission', async () => {
    render(<SearchInput />);
    const button = screen.getByRole('button', { name: 'Go' });
    fireEvent.click(button);
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith({
        pathname: '/get/_/',
      });
    });
  });

  it('handles Enter key press', async () => {
    render(<SearchInput />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'https://example.com' } });
    fireEvent.keyDown(input, { code: 'Enter' });
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith({
        pathname: '/get/aHR0cHMlM0ElMkYlMkZleGFtcGxlLmNvbSUyRg==/',
        query: {},
      });
      expect(mockFetch).toHaveBeenCalledWith('https://example.com');
    });
  });

  it('handles blur event', async () => {
    render(<SearchInput />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'https://example.com' } });
    fireEvent.blur(input);
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith({
        pathname: '/get/aHR0cHMlM0ElMkYlMkZleGFtcGxlLmNvbSUyRg==/',
        query: {},
      });
    });
  });
});
