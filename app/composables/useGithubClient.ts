export function useGithubClient() {
  const config = useRuntimeConfig();

  return $fetch.create({
    baseURL: config.public.githubApiBaseUrl,
    timeout: 5000,
    headers: config.public.githubToken 
      ? { Authorization: `token ${config.public.githubToken}` }
      : undefined,
  });
};