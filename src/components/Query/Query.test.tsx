import { mockRouter } from '@/tests/mockRouter';
import { screen } from '@testing-library/react';
import Query from './Query';

vi.mock('@/components', () => ({
  SearchInput: () => <div>SearchInput</div>,
  SelectMethod: () => <div>SelectMethod</div>,
  QueryParameters: () => <div>QueryParameters</div>,
  QueryBody: () => <div>QueryBody</div>,
  CodeGenerator: () => <div>Code Generator</div>,
}));

describe('Query component', () => {
  it('renders Query', () => {
    mockRouter(<Query />);
    expect(screen.getByText('SearchInput')).toBeInTheDocument();
    expect(screen.getByText('SelectMethod')).toBeInTheDocument();
    expect(screen.getByText('Code Generator')).toBeInTheDocument();
  });
});
