import { useEffect, useState } from 'react';
import { fetchRepos } from '../service/api';
import { GithubRepo } from '../types/github';

// Custom hook to fetch GitHub repositories for a given search term
export function useGithubRepos(search: string) {
  // Stored repositories returned by the API
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  // Loading flag while fetching data
  const [loading, setLoading] = useState(false);

  // Effect: whenever `search` changes, trigger a new fetch
  useEffect(() => {
    // If search is empty, clear existing repos and skip fetching
    if (!search) {
      setRepos([]);
      setLoading(false);
      return;
    }

    // Track whether this effect is still active to avoid setting state
    // from stale async requests (e.g. previous fetch finishing later).
    let cancelled = false;

    // Load repositories from the API and update state
    async function loadRepos() {
      setLoading(true);
      const data = await fetchRepos(search);
      if (cancelled) return; // ignore results from stale requests
      setRepos(data);
      setLoading(false);
    }

    loadRepos();

    return () => {
      cancelled = true;
    };
  }, [search]);

  // Return repos and loading status for consumers
  return { repos, loading };
}
