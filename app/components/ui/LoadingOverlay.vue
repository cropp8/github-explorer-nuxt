<script setup lang="ts">
const { isVisible = false } = defineProps<{
  isVisible?: boolean;
}>();

const fadeTransition = {
  enterActiveClass: 'transition-opacity duration-300 ease-out',
  enterFromClass: 'opacity-0',
  enterToClass: 'opacity-100',
  leaveActiveClass: 'transition-opacity duration-200 ease-in',
  leaveFromClass: 'opacity-100',
  leaveToClass: 'opacity-0',
};

usePositionedAncestorCheck('BaseLoadingOverlay');
</script>

<template>
  <Transition v-bind="fadeTransition">
    <div
      v-if="isVisible"
      class="absolute inset-0 z-50 bg-white/30 dark:bg-gray-950/70 backdrop-blur-sm flex items-center justify-center text-gray-500"
      role="status"
      aria-live="polite"
    >
      <Icon name="lucide:loader-circle" size="48" aria-hidden="true" class="animate-spin" />

      <span class="sr-only">Loading, please wait...</span>
    </div>
  </Transition>
</template>
