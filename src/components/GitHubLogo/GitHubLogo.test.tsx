import { screen } from '@testing-library/react';
import GitHubLogo from './GitHubLogo';
import { mockRouter } from '@/tests/mockRouter';

describe('GitHubLogo', () => {
  it('renders light theme GitHub logo', () => {
    mockRouter(<GitHubLogo />);
    const img = screen.getByAltText('GitHub Logo');
    expect(img).toHaveAttribute('src');
  });
});
