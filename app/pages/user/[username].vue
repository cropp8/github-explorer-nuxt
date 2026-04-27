<script setup lang="ts">
const route = useRoute();
const githubStore = useGitHubStore();

const resultsContainer = ref<HTMLElement | null>(null);

await useAsyncData(
  `init-user-${route.params.username}-${route.query.page}`,
  async () => {
    if (route.params.username) {
      await githubStore.fetchUser(route.params.username as string);
    }

    return true;
  }
);

if (import.meta.client) {
  watch(
    [() => route.params.username, () => route.query.page],
    async ([newUsername, newPage], [oldUsername, oldPage]) => {
      if (newUsername !== oldUsername) {
        if (newUsername) {
          githubStore.fetchUser(newUsername as string);

          await nextTick();

          resultsContainer.value?.focus();
        }

        return;
      }

      if (newPage !== oldPage) {
        githubStore.fetchRepos(newUsername as string, Number(newPage) || 1);
      }
    },
  );
}
</script>

<template>
  <div v-if="githubStore.user" ref="resultsContainer" :aria-busy="githubStore.userLoading" tabindex="-1"
    class="outline-none">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div class="col-span-1 md:col-span-4 lg:col-span-3">
        <UserCard :user="githubStore.user" />
      </div>

      <div
        class="col-span-1 md:col-span-8 lg:col-span-9 rounded-lg bg-white dark:bg-gray-950 p-4 md:min-h-full grid grid-cols-subgrid gap-y-4 content-start relative"
        :class="[{ 'min-h-50': githubStore.repos.length === 0 }, 'md:min-h-auto']"
        :aria-busy="githubStore.reposLoading && !githubStore.userLoading">
        <RepoList />

        <UiLoadingOverlay :is-visible="githubStore.reposLoading && !githubStore.userLoading" class="rounded-lg" />
      </div>
    </div>
  </div>

  <div v-else-if="githubStore.error"
    class="col-span-9 rounded-lg bg-white dark:bg-gray-950 p-4 min-h-60 flex flex-col gap-2 items-center justify-center text-center">
    <h2 class="text-2xl font-medium">
      {{ githubStore.error }}
    </h2>
    <p class="text-gray-500">Check the spelling or try another user.</p>
    <NuxtLink :to="{ name: 'index' }"
      class="rounded-lg mt-4 bg-violet-500 text-white flex gap-1 items-center py-1 px-2 cursor-pointer hover:bg-violet-600 transition-colors active:bg-violet-700 font-semibold outline-none focus-visible:ring-2 focus-visible:ring-amber-500">
      Go back home
    </NuxtLink>
  </div>

  <UiLoadingOverlay :is-visible="githubStore.userLoading" />
</template>
