export default class HttpApiCallError extends Error {
  constructor(message, status, data) {
    super(message);

    this.message = message;
    this.status = status;
    this.data = data;

    this.stack = new Error(message).stack;
    this.name = 'HttpApiCallError';
  }
}
