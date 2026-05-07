/**
 * Utility function to format dates.
 * Uses date-fns to format ISO strings into readable dates.
 */
import { format, parseISO } from 'date-fns';

export function formatDate(dateString) {
  if (!dateString) return '';
  try {
    const date = parseISO(dateString);
    return format(date, 'MMM d, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}
