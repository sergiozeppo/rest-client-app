import { fireEvent, render, screen, within } from '@testing-library/react';
import VariablesTable from './VariablesTable';
import { useVariablesStore } from '@/Store/variablesStore';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

const mockAddVariable = vi.fn();
const mockUpdateVariable = vi.fn();
const mockDeleteVariable = vi.fn();
const mockVariables = vi.hoisted(() => [
  { id: '1', name: 'Var1', value: 'Value1' },
  { id: '2', name: 'Var2', value: 'Value2' },
]);

vi.mock('@/Store/variablesStore', () => ({
  useVariablesStore: vi.fn((selector) => {
    const state = {
      variables: mockVariables,
      addVariable: mockAddVariable,
      updateVariable: mockUpdateVariable,
      deleteVariable: mockDeleteVariable,
    };
    return selector ? selector(state) : state;
  }),
}));

beforeEach(() => {
  vi.clearAllMocks();
  // Reset variables state if needed, ensuring clean state for each test
  mockVariables.splice(
    0,
    mockVariables.length, // Clear and replace
    { id: '1', name: 'Var1', value: 'Value1' },
    { id: '2', name: 'Var2', value: 'Value2' }
  );
  // Re-attach the mock implementation for the store hook
  // This ensures the mock uses the potentially reset variables array
  vi.mocked(useVariablesStore).mockImplementation((selector) => {
    const state = {
      variables: mockVariables,
      addVariable: mockAddVariable,
      updateVariable: mockUpdateVariable,
      deleteVariable: mockDeleteVariable,
    };
    return selector ? selector(state) : state;
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('VariablesTable Component', () => {
  it('renders the table with initial variables', () => {
    render(<VariablesTable />);

    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('value')).toBeInTheDocument();
    expect(screen.getByText('actions')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'add' })).toBeInTheDocument();

    expect(screen.getByText('Var1')).toBeInTheDocument();
    expect(screen.getByText('Value1')).toBeInTheDocument();
    expect(screen.getByText('Var2')).toBeInTheDocument();
    expect(screen.getByText('Value2')).toBeInTheDocument();

    const rows = screen.getAllByRole('row');
    const firstDataRow = rows[1];
    expect(within(firstDataRow).getByText('Var1')).toBeInTheDocument();
    expect(within(firstDataRow).getByText('Value1')).toBeInTheDocument();
    expect(
      within(firstDataRow).getByRole('button', { name: 'edit' })
    ).toBeInTheDocument();
    expect(
      within(firstDataRow).getByRole('button', { name: 'delete' })
    ).toBeInTheDocument();
  });

  it('opens the "Add Variable" modal when Add button is clicked', () => {
    render(<VariablesTable />);

    const addButton = screen.getByRole('button', { name: 'add' });
    fireEvent.click(addButton);

    expect(
      screen.getByRole('heading', { name: 'edit-add' })
    ).toBeInTheDocument();
    expect(screen.getByLabelText('var-name')).toBeInTheDocument();
    expect(screen.getByLabelText('var-val')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'save' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'cancel' })).toBeInTheDocument();
  });

  it('calls addVariable when saving a new variable from the modal', () => {
    render(<VariablesTable />);

    fireEvent.click(screen.getByRole('button', { name: 'add' }));

    const nameInput = screen.getByLabelText('var-name');
    const valueInput = screen.getByLabelText('var-val');
    fireEvent.change(nameInput, { target: { value: 'NewVar' } });
    fireEvent.change(valueInput, { target: { value: 'NewValue' } });

    const saveButton = screen.getByRole('button', { name: 'save' });
    fireEvent.click(saveButton);

    expect(mockAddVariable).toHaveBeenCalledTimes(1);
    expect(mockAddVariable).toHaveBeenCalledWith({
      name: 'NewVar',
      value: 'NewValue',
    });
    expect(
      screen.queryByRole('heading', { name: 'add' })
    ).not.toBeInTheDocument();
  });

  it('opens the "Edit Variable" modal with pre-filled data when Edit button is clicked', () => {
    render(<VariablesTable />);

    const rows = screen.getAllByRole('row');
    const firstDataRow = rows[1];
    const editButton = within(firstDataRow).getByRole('button', {
      name: 'edit',
    });

    fireEvent.click(editButton);

    expect(
      screen.getByRole('heading', { name: 'edit-var' })
    ).toBeInTheDocument();
    expect(screen.getByLabelText('var-name')).toHaveValue('Var1');
    expect(screen.getByLabelText('var-val')).toHaveValue('Value1');
  });

  it('calls updateVariable when saving an edited variable', () => {
    render(<VariablesTable />);

    const rows = screen.getAllByRole('row');
    const firstDataRow = rows[1];
    const editButton = within(firstDataRow).getByRole('button', {
      name: 'edit',
    });
    fireEvent.click(editButton);

    const valueInput = screen.getByLabelText('var-val');
    fireEvent.change(valueInput, { target: { value: 'UpdatedValue' } });

    const saveButton = screen.getByRole('button', { name: 'save' });
    fireEvent.click(saveButton);

    expect(mockUpdateVariable).toHaveBeenCalledTimes(1);
    expect(mockUpdateVariable).toHaveBeenCalledWith('1', {
      name: 'Var1',
      value: 'UpdatedValue',
    });
    expect(
      screen.queryByRole('heading', { name: 'edit-var' })
    ).not.toBeInTheDocument();
  });

  it('calls deleteVariable when Delete button is clicked', () => {
    render(<VariablesTable />);

    const rows = screen.getAllByRole('row');
    const secondDataRow = rows[2];
    const deleteButton = within(secondDataRow).getByRole('button', {
      name: 'delete',
    });

    fireEvent.click(deleteButton);

    expect(mockDeleteVariable).toHaveBeenCalledTimes(1);
    expect(mockDeleteVariable).toHaveBeenCalledWith('2');
  });

  it('closes the modal when Cancel button is clicked', () => {
    render(<VariablesTable />);

    fireEvent.click(screen.getByRole('button', { name: 'add' }));
    expect(
      screen.getByRole('heading', { name: 'edit-add' })
    ).toBeInTheDocument();

    const cancelButton = screen.getByRole('button', { name: 'cancel' });
    fireEvent.click(cancelButton);

    expect(
      screen.queryByRole('heading', { name: 'add' })
    ).not.toBeInTheDocument();
    expect(mockAddVariable).not.toHaveBeenCalled();
    expect(mockUpdateVariable).not.toHaveBeenCalled();
  });
});
