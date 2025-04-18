import { render, screen, fireEvent } from '@testing-library/react';
import Response from './Response';

let mockHeadersCount = 0;
vi.mock('@/Store/useFetch', () => ({
  useFetch: vi.fn((selector) => {
    if (selector.toString().includes('state.headersCount')) {
      return mockHeadersCount;
    }
    return undefined;
  }),
}));

vi.mock('@/components/ResponseViewer/ResponseViewer', () => ({
  default: vi.fn(() => (
    <div data-testid="response-viewer">Response View Content</div>
  )),
}));

vi.mock('@/components/HeadersViewer/HeadersViewer', () => ({
  default: vi.fn(() => (
    <div data-testid="headers-viewer">Headers View Content</div>
  )),
}));

vi.mock('../ResponseStatus/ResponseStatus', () => ({
  default: vi.fn(() => (
    <div data-testid="response-status">Response Status Bar</div>
  )),
}));

describe('Response Component', () => {
  beforeEach(() => {
    mockHeadersCount = 0;
  });

  it('should render tabs, initial view (Response), and status component', () => {
    render(<Response />);

    const responseTab = screen.getByText('Response');
    const headersTab = screen.getByText('Headers');
    expect(responseTab).toBeInTheDocument();
    expect(headersTab).toBeInTheDocument();

    expect(responseTab).toHaveClass(/active/i);
    expect(headersTab).not.toHaveClass(/active/i);
  });

  it('should display headers count when headersCount > 0', () => {
    mockHeadersCount = 5;
    render(<Response />);

    const headersTab = screen.getByText('Headers');
    const countSpan = screen.getByText('5');

    expect(countSpan).toBeInTheDocument();
    expect(countSpan.tagName).toBe('SPAN');
    expect(countSpan).toHaveClass(/count/i);
    expect(headersTab).toContainElement(countSpan);
  });

  it('should switch to Headers view when Headers tab is clicked', () => {
    render(<Response />);

    const responseTab = screen.getByText('Response');
    const headersTab = screen.getByText('Headers');

    expect(responseTab).toHaveClass(/active/i);
    expect(headersTab).not.toHaveClass(/active/i);

    fireEvent.click(headersTab);

    expect(responseTab).not.toHaveClass(/active/i);
    expect(headersTab).toHaveClass(/active/i);
  });

  it('should switch back to Response view when Response tab is clicked after switching', () => {
    render(<Response />);

    const responseTab = screen.getByText('Response');
    const headersTab = screen.getByText('Headers');

    fireEvent.click(headersTab);
    expect(headersTab).toHaveClass(/active/i);

    fireEvent.click(responseTab);

    expect(responseTab).toHaveClass(/active/i);
    expect(headersTab).not.toHaveClass(/active/i);
  });
});
