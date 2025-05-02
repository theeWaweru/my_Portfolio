// app/lib/utils/formatDate.js

/**
 * Format a date string or Date object into a readable format
 * @param {String|Date} date - Date to format
 * @param {Object} options - Formatting options
 * @returns {String} - Formatted date string
 */
export const formatDate = (date, options = {}) => {
  if (!date) return '';
  
  const {
    format = 'medium', // 'short', 'medium', 'long', 'full'
    includeTime = false,
    timeFormat = '24h', // '12h', '24h'
    locale = 'en-US'
  } = options;
  
  try {
    // Convert to Date object if string
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Check if valid date
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date');
    }
    
    // Date formatting options
    const dateFormatOptions = {
      short: { day: 'numeric', month: 'short', year: 'numeric' },
      medium: { day: 'numeric', month: 'long', year: 'numeric' },
      long: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
      full: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
    };
    
    // Time formatting options
    const timeFormatOptions = timeFormat === '12h'
      ? { hour: 'numeric', minute: 'numeric', hour12: true }
      : { hour: 'numeric', minute: 'numeric', hour12: false };
    
    // Combine options if time is included
    const formattingOptions = includeTime
      ? { ...dateFormatOptions[format], ...timeFormatOptions }
      : dateFormatOptions[format];
    
    // Format the date
    return new Intl.DateTimeFormat(locale, formattingOptions).format(dateObj);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Format a date relative to the current time
 * @param {String|Date} date - Date to format
 * @param {Object} options - Formatting options
 * @returns {String} - Relative time string
 */
export const formatRelativeTime = (date, options = {}) => {
  if (!date) return '';
  
  const {
    locale = 'en-US',
    fallbackFormat = 'medium',
    now = new Date()
  } = options;
  
  try {
    // Convert to Date object if string
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Check if valid date
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date');
    }
    
    // Calculate time difference in milliseconds
    const diffMs = dateObj.getTime() - now.getTime();
    const diffSeconds = Math.round(diffMs / 1000);
    const diffMinutes = Math.round(diffSeconds / 60);
    const diffHours = Math.round(diffMinutes / 60);
    const diffDays = Math.round(diffHours / 24);
    const diffWeeks = Math.round(diffDays / 7);
    const diffMonths = Math.round(diffDays / 30);
    const diffYears = Math.round(diffDays / 365);
    
    // Determine relative time unit and value
    let unit, value;
    
    if (Math.abs(diffSeconds) < 60) {
      unit = 'second';
      value = diffSeconds;
    } else if (Math.abs(diffMinutes) < 60) {
      unit = 'minute';
      value = diffMinutes;
    } else if (Math.abs(diffHours) < 24) {
      unit = 'hour';
      value = diffHours;
    } else if (Math.abs(diffDays) < 7) {
      unit = 'day';
      value = diffDays;
    } else if (Math.abs(diffWeeks) < 4) {
      unit = 'week';
      value = diffWeeks;
    } else if (Math.abs(diffMonths) < 12) {
      unit = 'month';
      value = diffMonths;
    } else {
      unit = 'year';
      value = diffYears;
    }
    
    // Use Intl.RelativeTimeFormat if available
    if (typeof Intl !== 'undefined' && Intl.RelativeTimeFormat) {
      const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
      return rtf.format(value, unit);
    } else {
      // Fallback to standard date format
      return formatDate(date, { format: fallbackFormat });
    }
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return '';
  }
};

/**
 * Format a read time in minutes
 * @param {Number} minutes - Read time in minutes
 * @returns {String} - Formatted read time
 */
export const formatReadTime = (minutes) => {
  if (!minutes || isNaN(minutes)) return '';
  
  const roundedMinutes = Math.max(1, Math.round(minutes));
  return `${roundedMinutes} min read`;
};

/**
 * Calculate estimated read time from text content
 * @param {String} content - Text content to calculate read time for
 * @param {Number} wordsPerMinute - Reading speed (default: 200)
 * @returns {Number} - Estimated read time in minutes
 */
export const calculateReadTime = (content, wordsPerMinute = 200) => {
  if (!content) return 0;
  
  // Count words in content
  const wordCount = content.trim().split(/\s+/).length;
  
  // Calculate read time
  const readTime = wordCount / wordsPerMinute;
  
  // Return rounded read time (minimum 1 minute)
  return Math.max(1, Math.round(readTime));
};

export default {
  formatDate,
  formatRelativeTime,
  formatReadTime,
  calculateReadTime
};