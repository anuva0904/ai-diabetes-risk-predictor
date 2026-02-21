/**
 * Standard API Response Class
 * ---------------------------
 * Used to send consistent success responses
 * from controllers to clients.
 * @class ApiResponse
 *
 * @param {number} statusCode - HTTP status code (e.g., 200, 201)
 * @param {string} [message="Success"] - Success message
 * @param {*} [data=null] - Response payload
 *
 * @property {number} statusCode - HTTP status code
 * @property {string} message - Response message
 * @property {*} data - Response payload
 * @property {boolean} success - True if statusCode < 400
 */



class ApiResponse {
  constructor(statusCode, message = "Success", data = null) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    // Automatically determine success based on HTTP status code
    this.success = statusCode < 400; // true for 2xx & 3xx
  }
}

export default ApiResponse;