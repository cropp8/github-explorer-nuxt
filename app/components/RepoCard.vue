<script setup lang="ts">
import type { GitHubRepo } from '@/types/github';

defineProps<{
  repo: GitHubRepo;
}>();
</script>

<template>
  <li
    class="relative group overflow-hidden p-3 bg-white dark:bg-gray-900 rounded-md wrap-break-word hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-500/20 border-2 border-gray-100 hover:border-gray-200 transition-all dark:hover:shadow-none dark:border-gray-700 dark:hover:translate-0 dark:hover:border-gray-600">
    <div
      class="pointer-events-none absolute inset-0 bg-radial-[circle_at_center] from-violet-400/20 to-transparent from-10% opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden dark:block">
    </div>

    <div class="relative flex flex-col gap-2 h-full">
      <h3 class="font-semibold text-lg leading-5 pb-1">
        <NuxtLink :to="repo.html_url" target="_blank"
          class="font-semibold text-center text-indigo-500 hover:text-amber-600 dark:text-indigo-400 dark:hover:text-amber-300 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-amber-500">
          {{ repo.name }}
        </NuxtLink>
      </h3>

      <p class="text-xs line-clamp-3">{{ repo.description }}</p>

      <ul class="mt-auto">
        <UiStatListItem :label="`Stars`" :content="repo.stargazers_count">
          <template #icon>
            <Icon name="lucide:star" size="16" aria-hidden="true" />
          </template>
        </UiStatListItem>

        <UiStatListItem :label="`Forks`" :content="repo.forks_count">
          <template #icon>
            <Icon name="lucide:git-fork" size="16" aria-hidden="true" />
          </template>
        </UiStatListItem>

        <UiStatListItem v-if="repo.language" :label="`Language`">
          <template #icon>
            <Icon name="lucide:code" size="16" aria-hidden="true" />
          </template>

          <span :class="[
            'px-1 rounded-sm inline-block text-xs font-semibold',
            getLanguageBgColorClass(repo.language),
          ]">
            {{ repo.language }}</span>
        </UiStatListItem>

        <UiStatListItem :label="`Last updated`">
          <template #icon>
            <Icon name="lucide:history" size="16" aria-hidden="true" />
          </template>

          <span class="whitespace-nowrap">
            {{ formatIsoDate(repo.updated_at) }}
          </span>
        </UiStatListItem>
      </ul>
    </div>
  </li>
</template>
