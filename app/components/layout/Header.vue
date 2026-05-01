<script setup lang="ts">
const colorMode = useColorMode();

const isDarkTheme = computed({
  get: () => colorMode.value === 'dark',

  set: (newValue: boolean) => {
    colorMode.preference = newValue ? 'dark' : 'light';
  },
});
</script>

<template>
  <header class="bg-violet-300 dark:bg-gray-800 transition-[bg-color] fixed top-0 z-100 w-full">
    <LayoutContainer class="py-2">
      <div class="grid grid-cols-12 items-center gap-3">
        <div class="col-span-2 md:col-span-3">
          <NuxtLink
            :to="{ name: 'index' }"
            class="flex md:p-2 hover:opacity-80 transition-opacity outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="GitHub Explorer Home"
          >
            <LayoutLogoIcon class="w-full md:w-auto" />
          </NuxtLink>
        </div>

        <div class="col-span-10 md:col-span-6">
          <SearchBar />
        </div>

        <div class="col-span-3 flex justify-end absolute md:static top-full right-0 p-2 md:p-0 md:z-40">
          <div class="flex gap-2 items-center">
            <ClientOnly>
              <Icon
                name="lucide:sun"
                size="20"
                aria-hidden="true"
              />

              <UiToggleSwitch
                v-model="isDarkTheme"
                aria-label="Toggle dark mode"
              />

              <Icon
                name="lucide:moon-star"
                size="20"
                aria-hidden="true"
              />
            </ClientOnly>
          </div>
        </div>
      </div>
    </LayoutContainer>
  </header>
</template>
