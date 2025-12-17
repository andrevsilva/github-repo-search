import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RepoList } from './RepoList';
import { GithubRepo } from '../../types/github';

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

describe('RepoList', () => {
  // Test empty state: no list items when repos array is empty
  test('does not render items when there are no repositories', () => {
    const onSelect = jest.fn();
    render(<RepoList repos={[]} loading={false} onSelect={onSelect} />);
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  // Render and interaction: verify repos render and clicking a card calls onSelect
  test('renders repositories and calls onSelect when clicked', () => {
    const repos = [makeRepo(1), makeRepo(2)];
    const onSelect = jest.fn();
    render(
      <RepoList
        repos={repos}
        loading={false}
        onSelect={onSelect}
        pageSize={10}
      />
    );

    // Both repo names rendered (cards show repo.name)
    expect(screen.getByText('repo-1')).toBeInTheDocument();
    expect(screen.getByText('repo-2')).toBeInTheDocument();

    // Click the second card
    const items = screen.getAllByRole('listitem');
    fireEvent.click(items[1]);
    expect(onSelect).toHaveBeenCalledWith(repos[1]);
  });

  // Pagination: ensure only pageSize items show and navigation works
  test('pagination limits items per page', () => {
    const repos = [makeRepo(1), makeRepo(2), makeRepo(3)];
    const onSelect = jest.fn();
    render(
      <RepoList
        repos={repos}
        loading={false}
        onSelect={onSelect}
        pageSize={2}
      />
    );

    // page 1 should show repo-1 and repo-2 (names)
    expect(screen.getByText('repo-1')).toBeInTheDocument();
    expect(screen.getByText('repo-2')).toBeInTheDocument();
    expect(screen.queryByText('repo-3')).not.toBeInTheDocument();

    // go to page 2 (select the page button)
    fireEvent.click(screen.getByRole('button', { name: '2' }));
    expect(screen.getByText('repo-3')).toBeInTheDocument();
  });
});
