import { useState } from 'react';
import { Header } from './components/Header/Header';
import { SearchInput } from './components/SearchInput/SearchInput';
import { RepoList } from './components/RepoList/RepoList';
import { RepoCard } from './components/RepoModalCard/RepoModalCard';
import { useGithubRepos } from './hooks/useGithubRepos';
import { GithubRepo } from './types/github';

export default function App() {
  const [search, setSearch] = useState('');
  const [selectedRepo, setSelectedRepo] = useState<GithubRepo | null>(null);
  const { repos, loading } = useGithubRepos(search);

  return (
    <>
      <Header />
      <SearchInput onSearch={setSearch} />
      <RepoList repos={repos} loading={loading} onSelect={setSelectedRepo} />
      <RepoCard repo={selectedRepo} onClose={() => setSelectedRepo(null)} />
    </>
  );
}
