module.exports = (err, req, res, next) => {
  console.log(err);

  if (err.name === 'TokenExpiredError') {
    err.statusCode = 401;
  }
  if (err.name === 'JsonWebTokenError') {
    err.statusCode = 401;
  }
  if (
    err.name === 'SequelizeValidationError' ||
    err.name === 'SequelizeUniqueConstraintError'
  ) {
    err.message = err.errors[0].message;
    err.statusCode = 400;
  }
  res.status(err.status || 500).json({ message: err.message });
};
