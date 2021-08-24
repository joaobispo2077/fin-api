const { HttpError } = require("./HttpError");

class Conflict extends HttpError {
  constructor(message = "Conflict") {
    super(409, message, 'Conflict');
  }
}

module.exports = Conflict;