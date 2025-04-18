import { mockRouter } from '@/tests/mockRouter';
import { screen } from '@testing-library/react';
import QueryHistory from './QueryHistory';
import { useHistory } from '@/Store/History';
import { useUrl } from '@/Store/useUrlStore';

vi.mock('@/Store/History', () => ({
  useHistory: vi.fn(),
}));

vi.mock('@/Store/useUrlStore', () => ({
  useUrl: vi.fn(),
}));

vi.mock('@/i18n/navigation', () => ({
  useRouter: vi.fn(),
}));

const mockSetValueBase = vi.fn();
describe('QueryHistory component', () => {
  it('should display empty message when history is empty', () => {
    vi.mocked(useUrl).mockReturnValue({ setValueBase: mockSetValueBase });
    vi.mocked(useHistory).mockReturnValue({
      history: [],
    });

    mockRouter(<QueryHistory />);
    expect(screen.getByText(/It's empty here/)).toBeInTheDocument();
  });

  it('should render history items when history is available', () => {
    const mockHistory = [
      { id: '1', method: 'GET', url: 'https://test1' },
      { id: '2', method: 'POST', url: 'https://test2' },
    ];
    vi.mocked(useUrl).mockReturnValue({ setValueBase: mockSetValueBase });
    vi.mocked(useHistory).mockReturnValue({
      history: mockHistory,
    });
    mockRouter(<QueryHistory />);

    expect(screen.getByText('Query History')).toBeInTheDocument();
    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(screen.getByText('https://test1')).toBeInTheDocument();
    expect(screen.getByText('POST')).toBeInTheDocument();
    expect(screen.getByText('https://test2')).toBeInTheDocument();
  });
});
