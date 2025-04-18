import { render, screen } from '@testing-library/react';
import SelectMethod from './SelectMethod';
import { METHODS } from '@/lib/constants';

vi.mock('@/Store/useUrlStore', () => ({
  useUrl: vi.fn(() => ({
    method: 'GET',
    query: {},
    params: {},
  })),
}));

vi.mock('@/i18n/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

describe('SelectMethod Component', () => {
  it('should display all methods from the METHODS constant as options', () => {
    render(<SelectMethod />);

    METHODS.forEach((method) => {
      const optionElement = screen.getByRole('option', { name: method });
      expect(optionElement).toBeInTheDocument();
      expect(optionElement).toHaveValue(method);
    });

    const allOptions = screen.getAllByRole('option');
    expect(allOptions).toHaveLength(METHODS.length);
  });
});
