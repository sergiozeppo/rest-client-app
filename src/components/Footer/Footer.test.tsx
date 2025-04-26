import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Footer from './Footer';

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn().mockImplementation(() =>
    Promise.resolve((key: string) => {
      if (key === 'Rights') return 'All rights reserved';
      return '';
    })
  ),
}));

describe('Footer Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders footer with correct structure', async () => {
    render(await Footer());

    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();

    expect(footerElement).toHaveClass('_footer_33bf66');
  });

  it('displays all developer links correctly', async () => {
    render(await Footer());

    const developers = [
      { name: 'sergiozeppo', url: 'https://github.com/sergiozeppo' },
      { name: 'kamilmrogowski', url: 'https://github.com/kamilmrogowski' },
      { name: 'yelantsevv', url: 'https://github.com/yelantsevv' },
    ];

    developers.forEach(({ name, url }) => {
      const link = screen.getByRole('link', { name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', url);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
    });
  });

  it('displays copyright and school info', async () => {
    render(await Footer());

    const copyright = screen.getByText(/© 2025 \|/);
    expect(copyright).toHaveTextContent('All rights reserved');

    const logo = screen.getByAltText('Course Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute(
      'src',
      'https://raw.githubusercontent.com/rolling-scopes-school/tasks/refs/heads/master/react/assets/rss-logo.svg'
    );

    const rssLink = logo.closest('a');
    expect(rssLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
  });
});
