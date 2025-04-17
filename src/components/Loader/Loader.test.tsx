import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';
import Loader from './Loader';

describe('Loader', () => {
  it('renders container with the right class', () => {
    const { container } = render(<Loader />);
    const loadingCont = container.querySelector('._loading-container_d51639');
    expect(loadingCont).toBeInTheDocument();
  });
});
