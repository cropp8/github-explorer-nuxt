<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - GitHub Explorer` : 'GitHub Explorer';
  },
  meta: [
    { name: 'description', content: 'Explore GitHub profiles instantly.' },
  ],
  htmlAttrs: {
    lang: 'en',
  },
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
