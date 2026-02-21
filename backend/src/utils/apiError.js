/**
 * Custom API Error Class
 * ----------------------
 * Extends the native JavaScript Error class to create
 * structured HTTP errors across the application.
 *
 * @class ApiError
 * @extends Error
 *
 * @param {number} statusCode - HTTP status code (e.g., 400, 404, 500)
 * @param {string} [message="Something went wrong"] - Error message
 * @param {Array} [errors=[]] - Optional detailed error information
 * @param {string} [stack=""] - Optional custom stack trace
 *
 * @property {number} statusCode - HTTP status code
 * @property {boolean} success - Always false for errors
 * @property {Array} errors - Additional error details
 * @property {null} data - Always null in error responses
 * @property {string} stack - Stack trace for debugging
 */

class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);

    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.errors = errors;

    if (stack) {
        // Use provided stack trace if available
      this.stack = stack;
    } else {
        // Otherwise capture stack trace excluding constructor call
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;