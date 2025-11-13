/**
 * Input sanitization utilities to prevent injection attacks
 */

/**
 * Sanitize MongoDB query to prevent NoSQL injection
 * Removes dangerous operators like $where, $regex with user input
 */
exports.sanitizeQuery = (query) => {
  if (typeof query !== 'object' || query === null) {
    return query;
  }
  
  const sanitized = {};
  
  for (const key in query) {
    // Skip prototype pollution
    if (!Object.prototype.hasOwnProperty.call(query, key)) {
      continue;
    }
    
    // Remove keys starting with $ (MongoDB operators)
    if (key.startsWith('$')) {
      continue;
    }
    
    const value = query[key];
    
    // Recursively sanitize nested objects
    if (typeof value === 'object' && value !== null) {
      sanitized[key] = exports.sanitizeQuery(value);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
};

/**
 * Escape special characters in regex to prevent regex injection
 */
exports.escapeRegex = (str) => {
  if (typeof str !== 'string') {
    return str;
  }
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * Validate email format
 */
exports.isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Sanitize user input to prevent XSS
 */
exports.sanitizeString = (str) => {
  if (typeof str !== 'string') {
    return str;
  }
  
  return str
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .trim();
};
