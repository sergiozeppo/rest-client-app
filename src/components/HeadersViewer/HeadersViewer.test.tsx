import { mockRouter } from '@/tests/mockRouter';
import { screen } from '@testing-library/react';
import HeadersViewer from './HeadersViewer';
import { useFetch } from '@/Store/useFetch';

vi.mock('@/Store/useFetch', () => ({
  useFetch: vi.fn(),
}));

describe('HeadersViewer component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders fallback message when no data', () => {
    vi.mocked(useFetch).mockReturnValue(null);
    mockRouter(<HeadersViewer />);
    expect(
      screen.getByText('No headers yet. Try to get some data!')
    ).toBeInTheDocument();
  });

  it('renders parsed headers from string', () => {
    const headers = JSON.stringify({
      'Content-Type': 'application/json',
      Authorization: 'test123',
    });
    vi.mocked(useFetch).mockReturnValue(headers);

    mockRouter(<HeadersViewer />);
    expect(screen.getByText('Content-Type')).toBeInTheDocument();
    expect(screen.getByText('application/json')).toBeInTheDocument();
    expect(screen.getByText('Authorization')).toBeInTheDocument();
    expect(screen.getByText('test123')).toBeInTheDocument();
  });

  it('renders parsed error instead of headers if error exists', () => {
    const error = {
      'Error-Code': '403',
      Message: 'Forbidden',
    };
    vi.mocked(useFetch).mockReturnValue({ error });

    mockRouter(<HeadersViewer />);
    expect(screen.getByText(/Error-Code/)).toBeInTheDocument();
    expect(screen.getByText(/403/)).toBeInTheDocument();
    expect(screen.getByText(/Message/)).toBeInTheDocument();
    expect(screen.getByText(/Forbidden/)).toBeInTheDocument();
  });
});
