export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client && !navigator.onLine && to.path !== from.path) {
    const toast = useToast();

    toast.error('You are offline. Please check your internet connection.');

    return abortNavigation();
  }
});
