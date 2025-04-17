import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import GithubSignInButton from './GithubSignInButton';
import signInWithGithub from './signInWithGithub';

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(() => (key: string) => {
    if (key === 'github') {
      return 'Continue with GitHub';
    }
    return key;
  }),
}));

vi.mock('./signInWithGithub', () => ({
  default: vi.fn(),
}));

vi.mock('../GitHubLogo/GitHubLogo', () => {
  const MockGitHubLogo = ({
    width,
    height,
  }: {
    width?: number;
    height?: number;
  }) => (
    <div
      data-testid="github-logo"
      style={{ width: `${width}px`, height: `${height}px` }}
    ></div>
  );
  return { default: MockGitHubLogo };
});

describe('GithubSignInButton', () => {
  it('renders a button with a proper text', () => {
    render(<GithubSignInButton />);
    expect(screen.getByRole('button')).toHaveTextContent(
      'Continue with GitHub'
    );
  });

  it('renders a button with a proper class', () => {
    render(<GithubSignInButton />);
    expect(screen.getByRole('button')).toHaveClass('_authButton_1cd1b6');
  });

  it('renders the GitHub Logo', () => {
    render(<GithubSignInButton />);
    expect(screen.getByTestId('github-logo')).toBeInTheDocument();
  });

  it('calls a function signInWithGithub on button click', () => {
    render(<GithubSignInButton />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(signInWithGithub).toHaveBeenCalledTimes(1);
  });

  it('throws proper props to GitHubLogo', () => {
    render(<GithubSignInButton />);
    const logo = screen.getByTestId('github-logo');
    expect(logo).toHaveStyle({ width: '30px', height: '30px' });
  });
});
