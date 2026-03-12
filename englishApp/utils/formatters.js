/**
 * Formats a date string into a consistent format used across the app.
 * @param {string} dateString - The ISO date string to format.
 * @returns {string} - Formatted date string (e.g., "Mar 12, 2026") or "N/A" if invalid.
 */
export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";
  
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
