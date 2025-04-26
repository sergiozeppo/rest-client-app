import { screen } from '@testing-library/react';
import CodeGenerator from './CodeGenerator';
import { mockRouter } from '@/tests/mockRouter';

vi.mock('@/Store/useUrlStore', () => ({
  useUrl: vi.fn(),
}));

vi.mock('@/Store/useHeadersBody', () => ({
  useHeadersBody: vi.fn(),
}));

vi.mock('@/components/Copy/Copy', () => ({
  default: vi.fn(() => <button>Copy</button>),
}));

const mockFetch = vi.fn();
global.fetch = mockFetch;
describe('CodeGenerator', () => {
  it('renders initial state correctly', async () => {
    vi.mocked(mockFetch).mockReturnValue({
      ok: true,
      json: async () => ({ code: 'generated code' }),
    });
    mockRouter(<CodeGenerator />);

    expect(
      await screen.findByRole('heading', { name: 'Generated Code' })
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Language:')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('JavaScript (Fetch)')).toBeInTheDocument();
  });
});
