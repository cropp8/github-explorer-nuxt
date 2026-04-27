import type { Toast } from '@/types/toast';

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    if (!import.meta.client) {
      return;
    }

    const id = Math.random().toString(36).slice(2, 9);

    toasts.value.push({ ...toast, id });

    setTimeout(() => {
      removeToast(id);
    }, toast.duration || 3000);
  };

  const removeToast = (id: string) => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  };

  return { toasts, addToast, removeToast };
});
