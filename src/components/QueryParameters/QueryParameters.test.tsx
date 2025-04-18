import { render, screen, fireEvent } from '@testing-library/react';

import QueryParameters from './QueryParameters';
import { useUrl } from '@/Store/useUrlStore';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

const mockSetChecked = vi.fn();
const mockSetValue = vi.fn();
const mockSetKey = vi.fn();
const mockSetQuery = vi.fn();
const mockDelValue = vi.fn();
const mockAddItem = vi.fn();

vi.mock('@/Store/useUrlStore');

type QueryItem = { checked: boolean; id: string; key: string; value: string };
const setupMockStore = (initialItems: QueryItem[]) => {
  vi.mocked(useUrl).mockReturnValue({
    QueryItems: initialItems,
    setChecked: mockSetChecked,
    setValue: mockSetValue,
    setKey: mockSetKey,
    setQuery: mockSetQuery,
    delValue: mockDelValue,
    addItem: mockAddItem,
  });
};

describe('QueryParameters Component', () => {
  beforeEach(() => {
    setupMockStore([]);
  });

  it('should render title and Add button correctly', () => {
    render(<QueryParameters />);
    expect(
      screen.getByRole('heading', { name: 'title', level: 3 })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'add' })).toBeInTheDocument();
  });

  it('should render items based on QueryItems state', () => {
    const items = [
      { id: '1', key: 'param1', value: 'value1', checked: true },
      { id: '2', key: 'param2', value: 'value2', checked: false },
    ];
    setupMockStore(items);
    render(<QueryParameters />);

    const keyInputs = screen.getAllByPlaceholderText('key');
    const valueInputs = screen.getAllByPlaceholderText('value');
    const checkboxes = screen.getAllByRole('checkbox');
    const deleteButtons = screen.getAllByRole('button', { name: 'delete' });

    expect(keyInputs).toHaveLength(2);
    expect(valueInputs).toHaveLength(2);
    expect(checkboxes).toHaveLength(2);
    expect(deleteButtons).toHaveLength(2);

    // Verify values for the first item
    expect(keyInputs[0]).toHaveValue('param1');
    expect(valueInputs[0]).toHaveValue('value1');
    expect(checkboxes[0]).toBeChecked();

    // Verify values for the second item
    expect(keyInputs[1]).toHaveValue('param2');
    expect(valueInputs[1]).toHaveValue('value2');
    expect(checkboxes[1]).not.toBeChecked();
  });

  it('should call addItem when Add button is clicked', () => {
    render(<QueryParameters />);
    const addButton = screen.getByRole('button', { name: 'add' });
    fireEvent.click(addButton);
    expect(mockAddItem).toHaveBeenCalledTimes(2);
  });

  it('should call delValue with correct id when Delete button is clicked', () => {
    const items = [
      { id: 'item-to-delete', key: 'k', value: 'v', checked: true },
    ];
    setupMockStore(items);
    render(<QueryParameters />);

    const deleteButton = screen.getByRole('button', { name: 'delete' });
    fireEvent.click(deleteButton);
    expect(mockDelValue).toHaveBeenCalledTimes(1);
    expect(mockDelValue).toHaveBeenCalledWith('item-to-delete');
  });

  it('should call setChecked with correct id when checkbox is changed', () => {
    const items = [{ id: 'check-me', key: 'k', value: 'v', checked: false }];
    setupMockStore(items);
    render(<QueryParameters />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockSetChecked).toHaveBeenCalledTimes(1);
    expect(mockSetChecked).toHaveBeenCalledWith('check-me');
  });

  it('should call setKey with correct value and id when key input is changed', () => {
    const items = [
      { id: 'key-change', key: 'oldKey', value: 'v', checked: true },
    ];
    setupMockStore(items);
    render(<QueryParameters />);

    const keyInput = screen.getByPlaceholderText('key');
    fireEvent.change(keyInput, { target: { value: 'newKey' } });
    expect(mockSetKey).toHaveBeenCalledTimes(1);
    expect(mockSetKey).toHaveBeenCalledWith('newKey', 'key-change');
  });

  it('should call setValue with correct value and id when value input is changed', () => {
    const items = [
      { id: 'value-change', key: 'k', value: 'oldValue', checked: true },
    ];
    setupMockStore(items);
    render(<QueryParameters />);

    const valueInput = screen.getByPlaceholderText('value');
    fireEvent.change(valueInput, { target: { value: 'newValue' } });
    expect(mockSetValue).toHaveBeenCalledTimes(1);
    expect(mockSetValue).toHaveBeenCalledWith('newValue', 'value-change');
  });
});
