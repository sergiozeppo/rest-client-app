/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Variable {
  id: string;
  name: string;
  value: string;
}

interface VariablesState {
  variables: Variable[];
  addVariable: (variable: Omit<Variable, 'id'>) => void;
  updateVariable: (id: string, variable: Omit<Variable, 'id'>) => void;
  deleteVariable: (id: string) => void;
}

export const useVariablesStore = create<VariablesState>()(
  persist(
    (set) => ({
      variables: [],
      addVariable: (variable) =>
        set((state) => ({
          variables: [
            ...state.variables,
            { ...variable, id: Date.now().toString() },
          ],
        })),
      updateVariable: (id, variable) =>
        set((state) => ({
          variables: state.variables.map((v) =>
            v.id === id ? { ...variable, id } : v
          ),
        })),
      deleteVariable: (id) =>
        set((state) => ({
          variables: state.variables.filter((v) => v.id !== id),
        })),
    }),
    {
      name: 'variables-storage',
    }
  )
);
