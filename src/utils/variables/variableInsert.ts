import { useVariablesStore } from '@/Store/variablesStore';

export const replaceVariables = (inputString: string): string => {
  const variables = useVariablesStore.getState().variables;

  return inputString.replace(
    /\{\{\s*([^}]+)\s*\}\}/g,
    (match, variableName) => {
      const variable = variables.find((v) => v.name === variableName.trim());
      return variable ? variable.value : match;
    }
  );
};
