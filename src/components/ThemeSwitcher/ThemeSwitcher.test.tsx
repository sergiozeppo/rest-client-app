import { render, screen, fireEvent } from '@testing-library/react';
import ThemeSwitcher from './ThemeSwitcher';
import { useTheme } from '@/Store/Theme';

vi.mock('@/Store/Theme', () => {
  const setTheme = vi.fn();
  let theme = 'dark';
  return {
    useTheme: vi.fn(() => ({
      theme,
      setTheme: () => {
        theme = theme === 'light' ? 'dark' : 'light';
        setTheme();
      },
    })),
  };
});

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls setTheme when clicked', () => {
    const mockSetTheme = vi.fn();
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
    });

    render(<ThemeSwitcher />);
    expect(screen.getByText('🌗')).toBeInTheDocument();

    const switcher = screen.getByText('🌗');
    fireEvent.click(switcher);

    expect(mockSetTheme).toHaveBeenCalled();
  });
});
