/**
 * Define cusom errors
 */
const ErrorMessages = Object.freeze({
  UNKNOWN: { status: 500, message: "Unknown server error" },
  UNKNOWN_DB: { status: 500, message: "Unknown DB error" },
  INVALID_BODY: { status: 400, message: "Invalid JSON body" },
  INVALID_QUERY: { status: 400, message: "Invalid query string" },
});

export default ErrorMessages;
