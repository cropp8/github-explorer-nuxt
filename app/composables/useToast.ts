import { useToastStore } from '@/stores/toast';

export function useToast() {
  const store = useToastStore();

  function error(message: string) {
    return store.addToast({ message, type: 'error' });
  }

  function success(message: string) {
    return store.addToast({ message, type: 'success' });
  }

  function info(message: string) {
    return store.addToast({ message, type: 'info' });
  }

  return {
    error,
    success,
    info,
  };
}
