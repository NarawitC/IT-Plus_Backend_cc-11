module.exports = (message, statusCode) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  throw err;
};
