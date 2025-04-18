import * as Components from '@/components';

const expectedComponents: Record<string, unknown> = {
  Header: Components.Header,
  Footer: Components.Footer,
  LocaleSwitcher: Components.LocaleSwitcher,
  ThemeSwitcher: Components.ThemeSwitcher,
  Query: Components.Query,
  Response: Components.Response,
  SelectMethod: Components.SelectMethod,
  SearchInput: Components.SearchInput,
  NotFound404: Components.NotFound404,
  QueryParameters: Components.QueryParameters,
  QueryHistory: Components.QueryHistory,
  QueryBody: Components.QueryBody,
  ResponseViewer: Components.ResponseViewer,
  HeadersViewer: Components.HeadersViewer,
  Loader: Components.Loader,
  CodeGenerator: Components.CodeGenerator,
  Copy: Components.Copy,
  MainButtons: Components.MainButtons,
  Logo: Components.Logo,
  GitHubLogo: Components.GitHubLogo,
  ResponseStatus: Components.ResponseStatus,
};

describe('Component Exports', () => {
  Object.entries(expectedComponents).forEach(([name, component]) => {
    it(`should export ${name}`, () => {
      expect(component).toBeDefined();
    });
  });
});
