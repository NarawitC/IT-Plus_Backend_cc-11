const { User } = require('../../models');
const { USER_ROLE } = require('../../config/constants');

exports.getClientInfo = async (req, res, next) => {
  try {
    const user = await User.findOne({
      attributes: {
        exclude: ['password'],
        where: { id: req.client.id, role: USER_ROLE.CLIENT },
      },
    });
    if (!user) {
      createError('You are unauthorize', 404);
    }
    res.status(200).json({
      message: 'Get client info successfully',
      user,
    });
  } catch (err) {
    next(err);
  }
};
