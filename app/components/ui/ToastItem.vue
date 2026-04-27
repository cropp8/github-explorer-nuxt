<script setup lang="ts">
import type { ToastType } from '@/types/toast';

const props = defineProps<{
  message: string;
  type: ToastType;
}>();

const emit = defineEmits(['close']);

const iconName = computed(() => {
  return `lucide:${props.type === 'error' ? 'circle-alert' : props.type === 'success' ? 'circle-check' : 'info'}`;
});
</script>

<template>
  <div
    :role="type === 'error' ? 'alert' : 'status'"
    class="flex items-center gap-3 p-4 rounded-lg shadow-lg border min-w-75 pointer-events-auto"
    :class="{
      'bg-pink-50 border-pink-200 text-pink-800 dark:text-pink-500 dark:bg-pink-950/50 dark:border-pink-900':
        type === 'error',
      'bg-teal-50 border-teal-200 text-teal-800 dark:text-teal-500 dark:bg-teal-950/50 dark:border-teal-900':
        type === 'success',
      'bg-gray-50 border-gray-200 text-gray-800 dark:text-gray-500 dark:bg-gray-950/50 dark:border-gray-900':
        type === 'info',
    }"
  >
    <Icon :name="iconName" size="20" aria-hidden="true" />

    <span class="flex-1 text-sm font-medium">{{ message }}</span>

    <button
      @click="emit('close')"
      class="hover:opacity-70"
      aria-label="Dismiss notification"
      :class="{
        'focus-visible:ring-pink-500': type === 'error',
        'focus-visible:ring-teal-500': type === 'success',
        'focus-visible:ring-gray-500': type === 'info',
      }"
    >
      <Icon name="lucide:x" size="16" aria-hidden="true" />
    </button>
  </div>
</template>
