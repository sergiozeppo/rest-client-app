import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CodeGenerator from './CodeGenerator';
import { useUrl } from '@/Store/useUrlStore';
import { useHeadersBody } from '@/Store/useHeadersBody';
import { languages } from '@/lib/LanguagesGeneratorCode';

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

const mockUrlStore = {
  method: 'GET',
  locale: 'en',
  urlBase: '/api',
  queryBase: '',
  valueBase: 'https://example.com/api',
  value: 'https://example.com/api',
  params: { locale: 'en', method: 'GET', url: 'api' },
  query: {},
  QueryItems: [],
  setValueBase: vi.fn(),
  setParams: vi.fn(),
  setQuery: vi.fn(),
  setChecked: vi.fn(),
  setValue: vi.fn(),
  setKey: vi.fn(),
  delValue: vi.fn(),
  addItem: vi.fn(),
};

const mockHeadersBodyStore = {
  header: 'application/json' as const,
  body: '{}',
  setHeaders: vi.fn(),
  setBody: vi.fn(),
};

describe('CodeGenerator', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useUrl).mockImplementation((selector) => selector(mockUrlStore));
    vi.mocked(useHeadersBody).mockImplementation((selector) =>
      selector(mockHeadersBodyStore)
    );

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ code: '// Generated code' }),
    });
  });

  it('renders initial state correctly', () => {
    render(<CodeGenerator />);

    expect(
      screen.getByRole('heading', { name: 'Generated Code' })
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Language:')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays language options from languages constant', () => {
    render(<CodeGenerator />);

    languages.forEach((lang) => {
      expect(
        screen.getByRole('option', { name: lang.label })
      ).toBeInTheDocument();
    });
  });

  it('generates code when language is changed', async () => {
    render(<CodeGenerator />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: languages[1].label } });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/generateCode',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.stringContaining(languages[1].client),
        })
      );
    });
  });

  it('displays error message when code generation fails', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));

    render(<CodeGenerator />);

    await waitFor(() => {
      expect(screen.getByText('Error generating code.')).toBeInTheDocument();
    });
  });
});
