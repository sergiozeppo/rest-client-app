import { screen, fireEvent } from '@testing-library/react';
import Response from './Response';
import { Response as ResponseType, useFetch } from '@/Store/useFetch';
import { mockRouter } from '@/tests/mockRouter';

vi.mock('@/Store/useFetch', () => ({
  useFetch: vi.fn(),
}));

vi.mock('@/components', () => ({
  ResponseViewer: () => <div>ResponseViewer Content</div>,
  HeadersViewer: () => <div>HeadersViewer Content</div>,
  ResponseStatus: () => <div>ResponseStatus Content</div>,
}));

describe('Response component', () => {
  it('renders ResponseStatus and ResponseViewer by default', () => {
    vi.mocked(useFetch).mockImplementation((state) =>
      state({ headersCount: 0 } as ResponseType)
    );

    mockRouter(<Response />);
    expect(screen.getByText('ResponseStatus Content')).toBeInTheDocument();
    expect(screen.getByText('Response')).toBeInTheDocument();
    expect(screen.getByText('Headers')).toBeInTheDocument();
    expect(screen.getByText('ResponseViewer Content')).toBeInTheDocument();
  });

  it('switches back to ResponseViewer when "Response" tab is clicked', () => {
    vi.mocked(useFetch).mockImplementation((state) =>
      state({ headersCount: 2 } as ResponseType)
    );

    mockRouter(<Response />);
    fireEvent.click(screen.getByText('Headers'));
    fireEvent.click(screen.getByText('Response'));

    expect(screen.getByText('ResponseViewer Content')).toBeInTheDocument();
  });
});
