import { render, screen } from '@testing-library/react';
import Page from './page';

vi.mock('@/components', () => ({
  MainButtons: () => (
    <div data-testid="main-buttons">MainButtons Component</div>
  ),
}));

describe('About Page', () => {
  it('renders About', () => {
    render(<Page />);
    expect(screen.getByText('NeverREST')).toBeInTheDocument();
    expect(screen.getByText('Meet the Team')).toBeInTheDocument();
    expect(screen.getByText('Fast & Intuitive')).toBeInTheDocument();
    expect(screen.getByText('Internationalization')).toBeInTheDocument();
    expect(screen.getByText('Authentication')).toBeInTheDocument();
    expect(screen.getByText('History Tracking')).toBeInTheDocument();
    expect(screen.getByText('Custom Headers')).toBeInTheDocument();
    expect(screen.getByText('REST & Beyond')).toBeInTheDocument();
    expect(screen.getByText('Sergey Tsepodoy')).toBeInTheDocument();
    expect(screen.getByText('Kamil Rogowski')).toBeInTheDocument();
    expect(screen.getByText('Viktor Yelantsev')).toBeInTheDocument();
    expect(screen.getByTestId('main-buttons')).toBeInTheDocument();
  });
});
