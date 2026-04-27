<script setup lang="ts">
import type { VNode } from 'vue';

defineProps<{
  label?: string;
  content?: string | number;
}>();

defineSlots<{
  icon?: () => VNode[];
  default?: () => VNode[];
}>();
</script>

<template>
  <li class="flex gap-1">
    <span v-if="$slots.icon" class="text-amber-600 pt-0.5">
      <slot name="icon" />
    </span>

    <span>
      <strong v-if="label">{{ label }}: </strong>
      <slot>{{ content }}</slot>
    </span>
  </li>
</template>
