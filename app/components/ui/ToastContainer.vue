<script setup lang="ts">
const store = useToastStore();
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed bottom-5 right-5 z-100 flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      <TransitionGroup
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform translate-x-full opacity-0"
        enter-to-class="transform translate-x-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0 scale-95"
      >
        <UiToastItem
          v-for="toast in store.toasts"
          :key="toast.id"
          v-bind="toast"
          @close="store.removeToast(toast.id)"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>
