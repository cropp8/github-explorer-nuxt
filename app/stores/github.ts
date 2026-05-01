import type { FetchError } from 'ofetch';
import type { GitHubRepo, GitHubUser, GitHubErrorResponse } from '@/types/github';

export const useGitHubStore = defineStore('github', () => {
  const user = ref<GitHubUser | null>(null);
  const repos = ref<GitHubRepo[]>([]);
  const userLoading = ref<boolean>(false);
  const reposLoading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const searchHistory = ref<string[]>([]);

  const toast = useToast();
  const githubService = useGithubService();

  function initHistory() {
    if (import.meta.client) {
      try {
        const saved = localStorage.getItem('searchHistory');

        if (saved) {
          searchHistory.value = JSON.parse(saved);
        }
      } catch {
        searchHistory.value = [];
      }
    }
  }

  function addToHistory(username: string) {
    if (import.meta.client) {
      searchHistory.value.unshift(username);

      searchHistory.value = [...new Set(searchHistory.value)].slice(0, 5);

      localStorage.setItem(
        'searchHistory',
        JSON.stringify(searchHistory.value),
      );
    }
  }

  async function fetchUser(username: string) {
    userLoading.value = true;
    user.value = null;
    repos.value = [];

    try {
      const userData = await githubService.getUser(username);

      user.value = userData;

      await fetchRepos(username, 1);

      addToHistory(username);
    } catch (err) {
      handleApiError(err, 'Failed to load user profile.');

      user.value = null;
      repos.value = [];
    } finally {
      userLoading.value = false;
      reposLoading.value = false;
    }
  }

  async function fetchRepos(username: string, page: number = 1) {
    reposLoading.value = true;

    try {
      repos.value = await githubService.getRepos(username, page);
    } catch (err) {
      handleApiError(err, 'Failed to load repositories.');

      repos.value = [];
    } finally {
      reposLoading.value = false;
    }
  }

  function handleApiError(err: unknown, defaultMsg: string) {
    const fetchErr = err as FetchError<GitHubErrorResponse>;

    if (fetchErr?.response) {
      const status = fetchErr.response.status;
      const errorData = fetchErr.data;

      if (status === 404) {
        toast.error('GitHub user not found.');
      } else if (status === 403) {
        toast.error('API rate limit exceeded.');
      } else {
        toast.error(errorData?.message || defaultMsg);
      }

      error.value = errorData?.message || fetchErr.message;
    } else if (
      fetchErr?.message?.includes('Failed to fetch')
      || fetchErr?.message?.includes('<no response>')
      || fetchErr?.message?.includes('Network')
    ) {
      toast.error('Network error. Check your connection.');
      error.value = 'Network error';
    } else {
      toast.error(defaultMsg);
      error.value = defaultMsg;
    }
  }

  return {
    user,
    repos,
    userLoading,
    reposLoading,
    error,
    searchHistory,
    initHistory,
    addToHistory,
    fetchUser,
    fetchRepos,
  };
});
