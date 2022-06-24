const { User, Cart, CartItem, Client } = require('../../models');
const { USER_ROLE } = require('../../config/constants');

exports.getClientInfo = async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findOne({
        // attributes: {
        exclude: ['password'],
        where: { id: req.user.id, role: USER_ROLE.CLIENT },
        // },
      });
      if (!user) {
        createError('You are unauthorize', 404);
      }
      res.status(200).json({ user });
    }
  } catch (err) {
    next(err);
  }
};
