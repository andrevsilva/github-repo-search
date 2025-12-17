import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  // Render: input should appear with the expected placeholder
  test('renders the input with the correct placeholder', () => {
    const onSearch = jest.fn();
    render(<SearchInput onSearch={onSearch} />);
    const input = screen.getByPlaceholderText('Type the repository name...');
    expect(input).toBeInTheDocument();
  });

  // Interaction: typing changes should call the onSearch callback once
  test('calls onSearch when the input value changes', () => {
    const onSearch = jest.fn();
    render(<SearchInput onSearch={onSearch} />);
    const input = screen.getByPlaceholderText(
      'Type the repository name...'
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'react' } });
    expect(onSearch).toHaveBeenCalledWith('react');
  });

  // Interaction: every change/keystroke should invoke onSearch accordingly
  test('calls onSearch for each change (each keystroke)', () => {
    const onSearch = jest.fn();
    render(<SearchInput onSearch={onSearch} />);
    const input = screen.getByPlaceholderText(
      'Type the repository name...'
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'r' } });
    fireEvent.change(input, { target: { value: 're' } });
    fireEvent.change(input, { target: { value: 'rea' } });

    expect(onSearch).toHaveBeenCalledTimes(3);
    expect(onSearch).toHaveBeenLastCalledWith('rea');
  });
});
