<script setup lang="ts">
const route = useRoute();
const githubStore = useGitHubStore();

const query = ref('');
const isDropdownVisible = ref(false);
const activeIndex = ref(-1);

const fadeTransition = {
  enterActiveClass: 'transition duration-200 ease-out',
  enterFromClass: 'translate-y-1 opacity-0',
  enterToClass: 'translate-y-0 opacity-100',
  leaveActiveClass: 'transition duration-150 ease-in',
  leaveFromClass: 'opacity-100',
  leaveToClass: 'opacity-0',
};

const resetActiveIndex = () => {
  activeIndex.value = -1;
};

const handleSearch = () => {
  isDropdownVisible.value = false;

  const sanitizedQuery = query.value.trim();

  if (!sanitizedQuery) {
    navigateTo({ name: 'index' });

    return;
  }

  navigateTo({
    name: 'user-username',
    params: {
      username: sanitizedQuery,
    },
  });
};

const handleRecentSearchItemSelect = (recentSearchQuery: string) => {
  query.value = recentSearchQuery;
  activeIndex.value = -1;

  handleSearch();
};

const handleFocus = () => {
  isDropdownVisible.value = true;
};

const handleBlur = () => {
  isDropdownVisible.value = false;
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (!isDropdownVisible.value || githubStore.searchHistory.length === 0) {
    return;
  }

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();

      if (activeIndex.value < githubStore.searchHistory.length - 1) {
        activeIndex.value++;
      }

      break;

    case 'ArrowUp':
      e.preventDefault();

      if (activeIndex.value > -1) {
        activeIndex.value--;
      }

      break;

    case 'Enter':
      if (activeIndex.value >= 0) {
        e.preventDefault();

        handleRecentSearchItemSelect(githubStore.searchHistory[activeIndex.value] ?? '');
      }

      break;

    case 'Escape':
      isDropdownVisible.value = false;

      break;
  }
};

watch(query, () => resetActiveIndex);

watch(
  () => route.params.username,
  (newUsername) => {
    query.value = (newUsername as string) ?? '';
  },
  { immediate: true },
);
</script>

<template>
  <form role="search" @submit.prevent="handleSearch" class="flex gap-2">
    <label for="github-search" class="sr-only"> Search GitHub username </label>

    <div class="relative grow flex">
      <input
        id="github-search"
        v-model="query"
        type="search"
        placeholder="GitHub username"
        class="rounded-lg bg-white dark:bg-gray-900 border-gray-300 hover:border-gray-400 dark:border-gray-600 border-2 px-2 py-1 focus:outline-0 focus:border-violet-500 cursor-pointer placeholder:text-gray-500 transition-colors grow"
        role="combobox"
        aria-autocomplete="list"
        :aria-expanded="isDropdownVisible"
        :aria-activedescendant="
          activeIndex >= 0 ? `recent-search-option-${activeIndex}` : undefined
        "
        aria-haspopup="listbox"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeyDown"
      />

      <Transition v-bind="fadeTransition">
        <div
          v-if="isDropdownVisible && githubStore.searchHistory.length > 0"
          class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-800 rounded-lg shadow-xl dark:shadow-violet-800/15 z-60 overflow-hidden"
        >
          <div
            class="p-2 text-xs uppercase text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800"
          >
            Recent Searches
          </div>

          <ul role="listbox">
            <li
              v-for="(item, index) in githubStore.searchHistory"
              :key="item"
              class="group"
              :id="`recent-search-option-${index}`"
            >
              <button
                class="w-full flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-left transition-colors text-gray-700 dark:text-gray-300 cursor-pointer"
                :class="{ 'bg-gray-100 dark:bg-gray-800': index === activeIndex }"
                @mousedown="handleRecentSearchItemSelect(item)"
              >
                <Icon name="lucide:history" size="16" class="text-gray-400" aria-hidden="true" />

                <span class="flex-1">{{ item }}</span>

                <span
                  class="text-xs text-gray-400 group-hover:text-violet-500"
                  :class="{ 'text-violet-500': index === activeIndex }"
                >
                  Quick Search
                </span>
              </button>
            </li>
          </ul>
        </div>
      </Transition>
    </div>

    <button
      type="submit"
      class="rounded-lg bg-violet-500 text-white flex gap-1 items-center py-1 px-4 md:px-2 cursor-pointer hover:bg-violet-600 transition-colors active:bg-violet-700 font-semibold outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
    >
      <Icon name="lucide:search" size="14" stroke-width="3.5" aria-hidden="true" />

      <span class="sr-only md:not-sr-only">search</span>
    </button>
  </form>
</template>
