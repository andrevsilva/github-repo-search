import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from './Header';

describe('Header', () => {
  // Render test: ensures the banner image exists and has correct alt text
  test('renders banner image with alt text', () => {
    render(<Header />);
    const img = screen.getByAltText('GitHub Icon') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('banner.png');
  });
});
