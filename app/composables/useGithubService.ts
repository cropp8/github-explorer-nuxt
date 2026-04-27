import type { GitHubRepo, GitHubUser } from '@/types/github';

export function useGithubService() {
  const api = useGithubClient();

  const getUser = async (username: string): Promise<GitHubUser> => {
    return await api<GitHubUser>(`users/${username}`);
  };

  const getRepos = async (username: string, page: number = 1): Promise<GitHubRepo[]> => {
    return await api<GitHubRepo[]>(`users/${username}/repos`, {
      query: { 
        sort: 'updated', 
        per_page: GH_API_ITEMS_PER_PAGE, 
        page 
      },
    });
  };

  return {
    getUser,
    getRepos,
  };
};