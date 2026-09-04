/** Send a readable response when no API route matches the requested URL. */
export const notFound = (request, response) => {
  response.status(404).json({ success: false, message: `Route not found: ${request.method} ${request.originalUrl}` });
};

/** Send a safe JSON error for unexpected Express or database errors. */
export const errorHandler = (error, _request, response, _next) => {
  console.error(error);
  response.status(error.statusCode || 500).json({ success: false, message: error.message || 'Internal server error.' });
};
