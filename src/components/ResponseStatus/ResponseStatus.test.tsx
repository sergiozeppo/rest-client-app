import { mockRouter } from '@/tests/mockRouter';
import { screen } from '@testing-library/react';
import ResponseStatus from './ResponseStatus';
import { Response, useFetch } from '@/Store/useFetch';

vi.mock('@/Store/useFetch', () => ({
  useFetch: vi.fn(),
}));

describe('ResponseStatus component', () => {
  it('renders default (empty) status if status is 0', () => {
    mockRouter(<ResponseStatus />);
    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.getByText('Size:')).toBeInTheDocument();
    expect(screen.getByText('Time:')).toBeInTheDocument();
  });

  it('renders status, size, and time when status > 0', () => {
    vi.mocked(useFetch).mockImplementation((store) =>
      store({
        status: 200,
        time: 123,
        size: '10',
      } as Response)
    );

    mockRouter(<ResponseStatus />);

    expect(screen.getByText('Status:')).toBeInTheDocument();
    expect(screen.getByText('200 "OK"')).toBeInTheDocument();

    expect(screen.getByText('Size:')).toBeInTheDocument();
    expect(screen.getByText('10 kb')).toBeInTheDocument();

    expect(screen.getByText('Time:')).toBeInTheDocument();
    expect(screen.getByText('123 ms')).toBeInTheDocument();
  });
});
