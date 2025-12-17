import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RepoCard } from './RepoCard';
import { GithubRepo } from '../../../types/github';

const makeRepo = (id: number): GithubRepo => ({
  id,
  owner: { avatar_url: `https://a/${id}.png` },
  name: `repo-${id}`,
  full_name: `owner/repo-${id}`,
  created_at: new Date().toISOString(),
  description: `desc-${id}`,
  stargazers_count: id * 10,
  language: 'TypeScript',
  clone_url: `https://git/${id}`,
  updated_at: new Date().toISOString(),
});

describe('RepoCard', () => {
  test('renders repository details', () => {
    const repo = makeRepo(1);
    render(<RepoCard repo={repo} onClick={() => {}} />);

    // basic content
    expect(screen.getByText('repo-1')).toBeInTheDocument();
    expect(screen.getByText('desc-1')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('#1')).toBeInTheDocument();

    // star count is shown (format may include locale separators)
    expect(screen.getByText(/⭐\s*10/)).toBeInTheDocument();
  });

  test('calls onClick when the card is clicked', () => {
    const repo = makeRepo(2);
    const onClick = jest.fn();
    render(<RepoCard repo={repo} onClick={onClick} />);

    const item = screen.getByRole('listitem');
    fireEvent.click(item);
    expect(onClick).toHaveBeenCalled();
  });
});
