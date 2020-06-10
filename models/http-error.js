class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); // call from Error
    this.code = errorCode;
  }
}

module.exports = HttpError;
