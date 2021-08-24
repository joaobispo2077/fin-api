class HttpError extends Error {
  constructor(status, message, name = "HttpError") {
    super(message);
    this.name = name;
    this.status = status;
  }
}

module.exports = { HttpError };