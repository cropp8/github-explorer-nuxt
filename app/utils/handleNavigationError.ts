export const handleNavigationError = (err: unknown) => {
  const toast = useToast();

  const errorMsg = (err as Error)?.message || '';

  if (errorMsg.includes('Failed to fetch dynamically imported module')) {
    toast.error('Network error. Failed to load the page.');
  } else {
    toast.error('An error occurred during navigation.');
  }
};
