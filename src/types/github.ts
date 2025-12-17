export interface GithubRepo {
  id: number;
  name: string;
  owner: {
    avatar_url: string;
  };
  full_name: string;
  created_at: string;
  description: string;
  stargazers_count: number;
  language: string;
  clone_url: string;
  updated_at: string;
}
