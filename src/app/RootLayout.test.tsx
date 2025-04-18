import { render, screen } from '@testing-library/react';
import RootLayout, { metadata } from './layout';

describe('RootLayout component', () => {
  it('renders children correctly', () => {
    render(
      <RootLayout>
        <div data-testid="child">Hello world</div>
      </RootLayout>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('exports correct metadata', () => {
    expect(metadata.title).toBe('NeverREST - App for testing REST APIs');
    expect(metadata.description).toContain('React, Typescript');
  });
});
