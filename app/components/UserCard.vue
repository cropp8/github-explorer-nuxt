<script setup lang="ts">
import type { GitHubUser } from '@/types/github';

defineProps<{
  user: GitHubUser;
}>();
</script>

<template>
  <div class="rounded-lg bg-gray-200 dark:bg-gray-800 p-4 flex flex-col gap-2">
    <div class="flex justify-center">
      <div class="rounded-full overflow-hidden w-25">
        <img :src="user.avatar_url" alt="" />
      </div>
    </div>

    <div class="text-center">
      <h1 class="text-xl font-bold text-center text-gray-800 dark:text-gray-200">
        <template v-if="user.name">
          {{ user.name }}
        </template>

        <NuxtLink
          v-else
          :to="user.html_url"
          target="_blank"
          class="font-semibold text-center text-indigo-500 hover:text-amber-600 dark:text-indigo-400 dark:hover:text-amber-300 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          {{ `@${user.login}` }}
        </NuxtLink>
      </h1>

      <NuxtLink
        v-if="user.name"
        :to="user.html_url"
        target="_blank"
        class="text-sm font-semibold text-center text-indigo-600 hover:text-amber-600 dark:text-indigo-400 dark:hover:text-amber-300 transition-[color] outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
      >
        {{ `@${user.login}` }}
      </NuxtLink>
    </div>

    <div>
      <p v-if="user.location" class="flex gap-1 text-gray-600 dark:text-gray-400">
        <Icon name="lucide:map-pin" size="16" stroke-width="3" aria-hidden="true" />

        <strong>{{ user.location }}</strong>
      </p>

      <hr class="border-gray-300 dark:border-gray-700 my-4" />

      <ul>
        <UiStatListItem :label="`Public repos`" :content="user.public_repos">
          <template #icon>
            <Icon name="lucide:book-marked" size="16" aria-hidden="true" />
          </template>
        </UiStatListItem>

        <UiStatListItem :label="`Followers`" :content="user.followers">
          <template #icon>
            <Icon name="lucide:user-check" size="16" aria-hidden="true" />
          </template>
        </UiStatListItem>

        <UiStatListItem :label="`Following`" :content="user.following">
          <template #icon>
            <Icon name="lucide:eye" size="16" aria-hidden="true" />
          </template>
        </UiStatListItem>
      </ul>
    </div>

    <template v-if="user.bio">
      <hr class="border-gray-300 dark:border-gray-700 my-2" />

      <div class="text-xs line-clamp-3">
        {{ user.bio }}
      </div>
    </template>
  </div>
</template>
