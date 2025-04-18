import { screen } from '@testing-library/react';
import ResponseViewer from './ResponseViewer';
import { useFetch } from '@/Store/useFetch';
import { useLoader } from '@/Store/useLoader';
import { mockRouter } from '@/tests/mockRouter';

vi.mock('@/Store/useFetch', () => ({
  useFetch: vi.fn(),
}));

vi.mock('@/Store/useLoader', () => ({
  useLoader: vi.fn(),
}));

vi.mock('@/components', () => ({
  Copy: vi.fn(() => <div>Copy Component</div>),
  Loader: vi.fn(() => <div>Loading...</div>),
}));

describe('ResponseViewer component', () => {
  it('renders loading true', () => {
    vi.mocked(useLoader).mockReturnValue(true);
    vi.mocked(useFetch).mockReturnValue(null);

    mockRouter(<ResponseViewer />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders default message when no response and error are available', () => {
    vi.mocked(useLoader).mockReturnValue(false);
    vi.mocked(useFetch).mockReturnValue(null);

    mockRouter(<ResponseViewer />);

    expect(
      screen.getByText('No response yet. Try to get some data!')
    ).toBeInTheDocument();
  });

  it('renders response data correctly when response is available', async () => {
    const mockData = { message: 'Success', code: 200 };
    vi.mocked(useLoader).mockReturnValue(false);
    vi.mocked(useFetch).mockReturnValue(mockData);

    mockRouter(<ResponseViewer />);

    expect(screen.getByText(/message/)).toBeInTheDocument();
    expect(screen.getByText(/Success/)).toBeInTheDocument();
  });
});
