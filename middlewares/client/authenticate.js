const jwt = require('jsonwebtoken');

const { User, Client } = require('../../models');

const createError = require('../error');

exports.clientAuthenticate = async (req, res, next) => {
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
    const user = await User.findOne({
      attributes: { exclude: ['password'] },
      where: { id: payload.userId, role: payload.role },
      include: [
        {
          model: Client,
        },
      ],
    });
    if (!user) {
      createError('You are unauthorized', 401);
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
