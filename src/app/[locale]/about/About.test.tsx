import { screen, render } from '@testing-library/react';
import Page from './page';

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn().mockResolvedValue((key: string) => key),
}));

vi.mock('@/components/MainButtons/MainButtons', () => ({
  default: () => <div data-testid="main-buttons">Main Buttons</div>,
}));

describe('About Page', () => {
  it('renders the main title and subtitle', async () => {
    render(await Page());

    expect(screen.getByText('NeverREST')).toBeInTheDocument();
    expect(screen.getByText('subtitle')).toBeInTheDocument();
  });

  it('renders the features section with all features', async () => {
    render(await Page());

    expect(screen.getByText('why')).toBeInTheDocument();
    expect(screen.getByText('feature-fast')).toBeInTheDocument();
    expect(screen.getByText('feature-global')).toBeInTheDocument();
    expect(screen.getByText('feature-auth')).toBeInTheDocument();
    expect(screen.getByText('feature-history')).toBeInTheDocument();
    expect(screen.getByText('feature-headers')).toBeInTheDocument();
    expect(screen.getByText('feature-rest')).toBeInTheDocument();
  });

  it('renders the team section with all team members', async () => {
    render(await Page());
    expect(screen.getByText('team-title')).toBeInTheDocument();

    expect(screen.getByText('Sergey Tsepodoy')).toBeInTheDocument();
    expect(screen.getByText('Kamil Rogowski')).toBeInTheDocument();
    expect(screen.getByText('Viktor Yelantsev')).toBeInTheDocument();
  });

  it('renders all feature icons and team profile pics', async () => {
    render(await Page());

    const icons = screen.getAllByRole('img');
    expect(icons).toHaveLength(9);

    expect(icons.some((img) => img.getAttribute('alt') === 'zap')).toBe(true);
    expect(icons.some((img) => img.getAttribute('alt') === 'globe')).toBe(true);
    expect(icons.some((img) => img.getAttribute('alt') === 'lock')).toBe(true);
    expect(icons.some((img) => img.getAttribute('alt') === 'parchment')).toBe(
      true
    );
    expect(icons.some((img) => img.getAttribute('alt') === 'header')).toBe(
      true
    );
    expect(icons.some((img) => img.getAttribute('alt') === 'satellite')).toBe(
      true
    );
    expect(icons.some((img) => img.getAttribute('alt') === 'Dev 1')).toBe(true);
    expect(icons.some((img) => img.getAttribute('alt') === 'Dev 2')).toBe(true);
    expect(icons.some((img) => img.getAttribute('alt') === 'Dev 3')).toBe(true);
  });
});
