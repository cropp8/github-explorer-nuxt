export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:error', (err) => {
    const errorMsg = (err as Error)?.message || '';

    if (errorMsg.includes('Failed to fetch dynamically imported module')) {
      const toast = useToast();

      toast.error('Network connection lost. Please check your internet.');

      clearError();
    }
  });
});
