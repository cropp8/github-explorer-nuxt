<script setup lang="ts">
const props = defineProps<{
  totalPages: number;
  currentPage: number;
}>();

const emit = defineEmits<{
  (e: 'changePage', page: number): void;
}>();

const visiblePages = computed(() => {
  const { currentPage, totalPages } = props;

  if (totalPages < 7) {
    return Array.from({ length: totalPages }, (item, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, '...', totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
});
</script>

<template>
  <nav v-if="totalPages > 1" class="flex justify-center gap-2" aria-label="Pagination Navigation">
    <button
      :disabled="currentPage === 1"
      class="rounded px-2 py-1 bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900 disabled:opacity-50 hover:bg-gray-300 transition-colors cursor-pointer disabled:cursor-default disabled:pointer-events-none outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
      aria-label="Go to previous page"
      @click="emit('changePage', currentPage - 1)"
    >
      <span aria-hidden="true">&lt;</span>
    </button>

    <template v-for="(item, index) in visiblePages" :key="`page-${index}`">
      <span v-if="item === '...'" class="px-2 text-gray-500">
        <span aria-hidden="true">...</span>
        <span class="sr-only">Skipped pages</span>
      </span>

      <button
        v-else-if="typeof item === 'number'"
        :class="
          item === currentPage
            ? 'bg-violet-600 dark:bg-violet-700 hover:bg-violet-700 dark:hover:bg-violet-800 text-white'
            : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-900'
        "
        class="rounded px-2 py-1 disabled:opacity-50 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        :aria-label="`Go to page ${item}`"
        :aria-current="item === currentPage ? 'page' : undefined"
        @click="emit('changePage', item)"
      >
        {{ item }}
      </button>
    </template>

    <button
      :disabled="currentPage === totalPages"
      class="rounded px-2 py-1 bg-gray-200 disabled:opacity-50 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-900 transition-colors cursor-pointer disabled:cursor-default disabled:pointer-events-none outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
      aria-label="Go to next page"
      @click="emit('changePage', currentPage + 1)"
    >
      <span aria-hidden="true">&gt;</span>
    </button>
  </nav>
</template>
