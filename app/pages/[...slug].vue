<script setup lang="ts">
definePageMeta({
  middleware: [
    async function () {
      if (import.meta.client && !navigator.onLine) {
        const toast = useToast();

        toast.error('You are offline. Please check your connection.');

        return false;
      }

      try {
        return await navigateTo('/');
      } catch (err) {
        handleNavigationError(err);

        return false;
      }
    },
  ],
});
</script>
