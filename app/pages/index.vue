<script setup lang="ts">
const githubStore = useGitHubStore();

const quickSearch = (username: string) => {
  navigateTo({ name: 'user-username', params: { username } });
};
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 gap-4">
    <div
      class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-500/20 text-violet-500 mb-6"
    >
      <Icon
        name="lucide:search"
        size="40"
        aria-hidden="true"
      />
    </div>
    <h1
      class="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4"
    >
      <span class="text-violet-600">GitHub</span> Explorer
    </h1>
    <p class="text-lg text-gray-700 dark:text-gray-400 max-w-md mx-auto">
      Enter a GitHub username above to see their profile, repositories and stats.
    </p>

    <div
      v-if="githubStore.searchHistory.length > 0"
      class="w-full max-w-md pt-4"
    >
      <div class="flex items-center justify-center gap-2 mb-4 text-gray-600 dark:text-gray-400">
        <Icon
          name="lucide:history"
          size="16"
          aria-hidden="true"
        />

        <h2 class="text-sm font-semibold uppercase">
          Recent Searches
        </h2>
      </div>

      <div class="flex flex-wrap justify-center gap-2">
        <button
          v-for="name in githubStore.searchHistory"
          :key="name"
          class="px-4 py-2 bg-white dark:bg-gray-800 border-2 border-gray-400 dark:border-gray-700 rounded-full text-sm font-medium hover:border-violet-500 hover:text-violet-600 dark:hover-border-violet-400 dark:hover:text-violet-400 transition-all cursor-pointer outline-none focus-visible:border-amber-500"
          @click="quickSearch(name)"
        >
          @{{ name }}
        </button>
      </div>
    </div>
  </div>
</template>
