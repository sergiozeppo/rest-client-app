import { render, screen, act } from '@testing-library/react';
import GitHubLogo from './GitHubLogo';
import { useTheme } from '@/Store/Theme';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { ImgHTMLAttributes } from 'react';

vi.mock('next/image', () => ({
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => {
    const { alt, ...rest } = props;
    return <img alt={alt || ''} {...rest} />;
  },
}));

describe('GitHubLogo', () => {
  beforeEach(() => {
    useTheme.setState({ theme: 'light' });
  });

  afterEach(() => {
    useTheme.setState({ theme: 'light' });
  });

  it('renders light theme GitHub logo', async () => {
    await act(async () => {
      useTheme.setState({ theme: 'light' });
      render(<GitHubLogo width={100} height={100} />);
    });

    const img = screen.getByAltText('GitHub Logo') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('/logos/github-mark.svg');
    expect(img.width).toBe(100);
    expect(img.height).toBe(100);
  });

  it('renders dark theme GitHub logo', async () => {
    await act(async () => {
      useTheme.setState({ theme: 'dark' });
      render(<GitHubLogo width={120} height={80} />);
    });

    const img = screen.getByAltText('GitHub Logo') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('/logos/github-mark-white.svg');
    expect(img.width).toBe(120);
    expect(img.height).toBe(80);
  });
});
