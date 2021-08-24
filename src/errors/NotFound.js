const { HttpError } = require("./HttpError");

class NotFound extends HttpError {
  constructor(message = "NotFound") {
    super(404, message, 'NotFound');
  }
}

module.exports = { NotFound };