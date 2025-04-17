import { render, screen, waitFor } from '@testing-library/react';
import GitHubLogo from './GitHubLogo';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { ImgHTMLAttributes } from 'react';

vi.mock('next/image', () => ({
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => {
    const { alt, ...rest } = props;
    return <img alt={alt || ''} {...rest} />;
  },
}));

const mockStore = {
  theme: 'light',
  setTheme: vi.fn(),
};

vi.mock('@/Store/Theme', () => ({
  useTheme: vi.fn(() => mockStore),
}));

describe('GitHubLogo', () => {
  beforeEach(() => {
    mockStore.theme = 'light';
    vi.clearAllMocks();
  });

  it('renders light theme GitHub logo', async () => {
    render(<GitHubLogo />);

    await waitFor(() => {
      const img = screen.getByAltText('GitHub Logo');
      expect(img).toHaveAttribute(
        'src',
        expect.stringContaining('github-mark.svg')
      );
    });
  });

  it('renders dark theme GitHub logo', async () => {
    mockStore.theme = 'dark';

    render(<GitHubLogo />);

    await waitFor(() => {
      const img = screen.getByAltText('GitHub Logo');
      expect(img).toHaveAttribute(
        'src',
        expect.stringContaining('github-mark-white.svg')
      );
    });
  });

  it('updates logo when theme changes', async () => {
    const { rerender } = render(<GitHubLogo />);

    await waitFor(() => {
      expect(screen.getByAltText('GitHub Logo')).toHaveAttribute(
        'src',
        expect.stringContaining('github-mark.svg')
      );
    });

    mockStore.theme = 'dark';
    rerender(<GitHubLogo />);

    await waitFor(() => {
      expect(screen.getByAltText('GitHub Logo')).toHaveAttribute(
        'src',
        expect.stringContaining('github-mark-white.svg')
      );
    });
  });
});
