import { screen } from '@testing-library/react';
import GithubSignInButton from './GithubSignInButton';
import { mockRouter } from '@/tests/mockRouter';

describe('GithubSignInButton', () => {
  it('renders a button with a proper text', () => {
    mockRouter(<GithubSignInButton />);
    expect(screen.getByRole('button')).toHaveTextContent(
      'Continue with GitHub'
    );
    const img = screen.getByAltText('GitHub Logo') as HTMLImageElement;
    expect(img.src).toContain('/logos/github-dark.svg');
  });
});
