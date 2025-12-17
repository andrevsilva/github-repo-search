import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RepoCard } from './RepoModalCard';
import { GithubRepo } from '../../types/github';

// Mock formatDate to keep assertions stable
jest.mock('../../utils/formatDate', () => ({
  formatDate: (d: any) => `FMT:${d}`,
}));

const makeRepo = (): GithubRepo => ({
  id: 123,
  name: 'repo',
  owner: { avatar_url: 'https://avatar/123.png' },
  full_name: 'owner/repo',
  created_at: '2020-01-01T00:00:00Z',
  description: 'A repository',
  stargazers_count: 42,
  language: 'JavaScript',
  clone_url: 'https://clone/url',
  updated_at: '2020-01-02T00:00:00Z',
});

describe('RepoCard', () => {
  test('does not render when repo is null', () => {
    const onClose = jest.fn();
    const { container } = render(<RepoCard repo={null} onClose={onClose} />);
    expect(container.firstChild).toBeNull();
  });

  test('renders details and responds to interactions', () => {
    const repo = makeRepo();
    const onClose = jest.fn();
    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);

    render(<RepoCard repo={repo} onClose={onClose} />);

    // title and image
    expect(screen.getByText('owner/repo')).toBeInTheDocument();
    const img = screen.getByAltText('author avatar') as HTMLImageElement;
    expect(img.src).toContain('https://avatar/123.png');

    // stargazers and formatted dates
    expect(screen.getByText(/⭐ 42/)).toBeInTheDocument();
    expect(
      screen.getByText('Created: FMT:2020-01-01T00:00:00Z')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Last updated: FMT:2020-01-02T00:00:00Z')
    ).toBeInTheDocument();

    // clicking the repo button should call window.open
    fireEvent.click(screen.getByText('Open repository'));
    expect(openSpy).toHaveBeenCalledWith(repo.clone_url, '_blank');

    // clicking overlay should close
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalled();

    openSpy.mockRestore();
  });

  test('pressing Escape calls onClose', () => {
    const repo = makeRepo();
    const onClose = jest.fn();
    render(<RepoCard repo={repo} onClose={onClose} />);
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });
});
