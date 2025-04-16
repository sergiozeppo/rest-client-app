import { render, screen } from '@testing-library/react';
import Logo from './Logo';
import { useTheme } from '@/Store/Theme';
import '@testing-library/jest-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, ImgHTMLAttributes } from 'react';

vi.mock('next/image', () => ({
  default: (props: ImgHTMLAttributes<HTMLImageElement>) => {
    const { alt, ...rest } = props;
    return <img alt={alt || ''} {...rest} />;
  },
}));

describe('Logo component', () => {
  beforeEach(() => {
    act(() => {
      useTheme.setState({ theme: 'light' });
    });
  });

  afterEach(() => {
    act(() => {
      useTheme.setState({ theme: 'light' });
    });
  });

  it('renders light theme logo', () => {
    act(() => {
      useTheme.setState({ theme: 'light' });
    });

    render(<Logo />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/logos/NR_light.PNG');
    expect(img).toHaveAttribute('alt', 'NeverREST Logo');
  });

  it('renders dark theme logo', () => {
    act(() => {
      useTheme.setState({ theme: 'dark' });
    });

    render(<Logo />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/logos/NR_dark.PNG');
  });

  it('wraps logo in a link to home page', () => {
    render(<Logo />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });
});
