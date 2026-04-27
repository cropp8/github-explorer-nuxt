<template>
  <footer class="bg-gray-700 dark:bg-gray-800 text-white transition-[bg-color] group">
    <LayoutContainer class="py-6">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-y-10">
        <div class="col-span-1 md:col-span-6">
          <nav aria-label="Footer links">
            <NuxtLink
              to="https://github.com/cropp8/github-explorer"
              target="_blank"
              class="font-semibold text-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-amber-500 inline-flex gap-2 text-violet-300 hover:text-amber-500 text-sm"
            >
              <Icon name="lucide:folder-git" size="16" aria-hidden="true" class="shrink-0" />

              Source Code

              <span class="sr-only">(opens in a new tab)</span>
            </NuxtLink>
          </nav>

          <div class="text-sm flex flex-col gap-1 text-gray-300 pt-3">
            <p class="font-medium">Contact me:</p>
            <ul>
              <li class="flex gap-2">
                <Icon name="lucide:mail" size="16" aria-hidden="true" class="shrink-0" />

                email:

                <NuxtLink
                  to="mailto:s.samoilenko96@gmail.com"
                  class="font-semibold text-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-amber-500 text-white hover:text-amber-500"
                >
                  s.samoilenko96@gmail.com
                </NuxtLink>
              </li>
              <li class="flex gap-2">
                <Icon name="lucide:send" size="16" aria-hidden="true" class="shrink-0" />

                telegram:
                
                <NuxtLink
                  to="https://t.me/cropp8"
                  target="_blank"
                  class="font-semibold text-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-amber-500 text-white hover:text-amber-500"
                >
                  @cropp8
                  <span class="sr-only">(opens in a new tab)</span>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-span-1 md:col-span-6 flex flex-col gap-2 md:items-end justify-between">
          <p class="text-sm cursor-default">
            Built with
            <span
              class="bg-emerald-500/40 group-hover:bg-emerald-500/60 px-1 rounded-sm inline-block font-semibold transition-colors duration-1000"
              >Vue 3</span
            >
            &
            <span
              class="bg-blue-500/40 group-hover:bg-blue-500/60 px-1 rounded-sm inline-block font-semibold transition-colors duration-1000"
              >TypeScript</span
            >
          </p>
          <p class="text-xs text-gray-300">Rate Limit: 60 requests/hr (Unauthenticated)</p>
        </div>
      </div>
    </LayoutContainer>
  </footer>
</template>
