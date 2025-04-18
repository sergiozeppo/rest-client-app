import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Copy from './Copy';
import { mockRouter } from '@/tests/mockRouter';

describe('Copy component', () => {
  it('renders copy button with correct icon', () => {
    mockRouter(<Copy code="test code" />);
    const img = screen.getByAltText('Copy') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('/icons/copy_dark.svg');
  });
});
