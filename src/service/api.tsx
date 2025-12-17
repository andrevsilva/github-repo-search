import { GithubRepo } from '../types/github';

// Read GitHub token from Vite environment variables
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

// Fetch public repositories from GitHub using the search API
export async function fetchRepos(query: string): Promise<GithubRepo[]> {
  // Call the GitHub search API with the provided query
  const response = await fetch(
    `https://api.github.com/search/repositories?q=${query}`,
    {
      headers: {
        // Use bearer token if available and request JSON response
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
    }
  );

  // Throw a descriptive error when request fails
  if (!response.ok) {
    throw new Error('Failed to fetch repositories');
  }

  // Parse and return the items array from search results
  const data = await response.json();
  return data.items;
}
