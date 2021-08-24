const { HttpError } = require("../errors/HttpError");

async function errorsMiddleware(error, request, response, next) {
  console.error("@Error:stack", error);
  console.error("@Error:name", error.name);
  console.error("@Error:message", error.message);

  const isHttpError = error instanceof HttpError;
  if (isHttpError) {

    const isClientError = error.status >= 400 && error.status <= 499;
    if (isClientError) {
      return response.status(error.status).json({
        message: error.message,
      });
    }
  }

  return response.status(500).json({ message: 'Something went wrong!' });
}

module.exports = { errorsMiddleware };