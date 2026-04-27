<script setup lang="ts">
const route = useRoute();
const githubStore = useGitHubStore();

const currentPage = computed(() => Number(route.query.page) || 1);

const totalPages = computed(() => {
  if (!githubStore.user) {
    return 0;
  }

  return Math.ceil(githubStore.user.public_repos / GH_API_ITEMS_PER_PAGE);
});

const changePage = (page: number): void => {
  if (page < 1 || page > totalPages.value) {
    return;
  }

  navigateTo({
    query: { ...route.query, page: page.toString() },
  });
};
</script>

<template>
  <template v-if="githubStore.user && githubStore.repos.length > 0">
    <h2 class="col-span-1 md:col-span-8 lg:col-span-9 text-2xl font-semibold py-2">
      Public repositories of user
      <span class="inline-block px-1 rounded-sm bg-gray-200 dark:bg-gray-900 dark:text-gray-400"
        >@{{ githubStore.user.login }}</span
      >
    </h2>

    <ul class="grid grid-cols-subgrid col-span-1 md:col-span-8 lg:col-span-9 gap-y-4">
      <RepoCard
        v-for="repo in githubStore.repos"
        :key="repo.id"
        :repo="repo"
        class="col-span-1 md:col-span-4 lg:col-span-3"
      />
    </ul>

    <div v-if="totalPages > 1" class="col-span-1 md:col-span-8 lg:col-span-9 mt-6">
      <UiPagination
        :total-pages="totalPages"
        :current-page="currentPage"
        @change-page="changePage"
        class="col-span-9"
      />
    </div>
  </template>

  <div v-else class="absolute inset-0 flex items-center justify-center">
    <div class="text-xl text-center dark:text-gray-400">This user has no public repositories.</div>
  </div>
</template>
