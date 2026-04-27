/**
 * Checks if the current component has a relative/absolute/fixed ancestor.
 * Logs a warning in development mode if missing.
 * * @param componentName - The name of the component for the console warning
 */
export function usePositionedAncestorCheck(componentName: string = 'Component') {
  onMounted(() => {
    if (import.meta.env.DEV && import.meta.client) {
      const el = getCurrentInstance()?.vnode.el as HTMLElement | undefined;

      if (el) {
        let currentParent = el.parentElement;
        let hasPositionedAncestor = false;

        while (currentParent && currentParent.tagName !== 'BODY') {
          const style = window.getComputedStyle(currentParent);

          if (style.position !== 'static') {
            hasPositionedAncestor = true;

            break;
          }

          currentParent = currentParent.parentElement;
        }

        if (!hasPositionedAncestor) {
          console.warn(
            `🚨 [${componentName}] Warning: No positioned ancestor found. This overlay/element will cover the entire page instead of its container.`,
          );
        }
      }
    }
  });
}
