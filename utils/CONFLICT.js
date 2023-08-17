class CONFLICT extends Error {
  constructor(message) {
    super(message);
    this.name = 'Attempt to create an existing object';
    this.statusCode = 409;
  }
}

module.exports = CONFLICT;
