const jwt = require('jsonwebtoken');

const { Admin } = require('../../models');

const createError = require('../error');
exports.adminAuthenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer')) {
      createError('You are unauthorized', 401);
    }
    const token = authorization.split(' ')[1];
    if (!token) {
      createError('You are unauthorized', 401);
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const admin = await Admin.findOne({
      attributes: { exclude: ['password'] },
      where: { id: payload.id },
    });
    if (!admin) {
      createError('You are unauthorized', 401);
    }
    req.admin = admin;
    next();
  } catch (err) {
    next(err);
  }
};
