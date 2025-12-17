// Format a date input into a localized string
// - `input`: Date, ISO string, or null/undefined
// - `withSeconds`: include seconds when true
export function formatDate(
  input?: string | Date | null,
  withSeconds = false
): string {
  // Return placeholder for empty input
  if (!input) return '-';

  // Normalize string inputs to Date objects
  const date = typeof input === 'string' ? new Date(input) : input;
  // If invalid date, return the raw input as a string
  if (Number.isNaN(date.getTime())) return String(input);

  // Build Intl formatting options (month/day/year + time)
  const options: Intl.DateTimeFormatOptions = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  if (withSeconds) options.second = '2-digit';

  // Format using English locale
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export default formatDate;
