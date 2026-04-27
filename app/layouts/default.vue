<script setup lang="ts">
const store = useGitHubStore();

onMounted(() => {
  store.initHistory();
});
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-gray-300 dark:bg-gray-900 text-gray-700 dark:text-gray-200 transition-[bg-color]"
  >
    <LayoutHeader />

    <main class="grow pt-21 pb-10 text-base relative">
      <layout-container>
        <slot />
      </layout-container>
    </main>

    <LayoutFooter />
  </div>

  <UiToastContainer />
</template>