/**
 * Converts na ISO 8601 date string to human-readable.
 *
 * Example: '2026-04-21T02:04:49Z' -> '21 April 2026'
 */

export function formatIsoDate(isoString: string | null | undefined): string {
  if (!isoString) {
    return 'Unknown date';
  }

  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
