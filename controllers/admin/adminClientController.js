const { Client, User } = require('../../models/index');

const { USER_ROLE } = require('../../config/constants');
const createError = require('../../utils/createError');

exports.getAllClient = async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: { role: USER_ROLE.CLIENT },
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Client,
        },
      ],
    });
    res.status(200).json({
      message: 'Get all client successfully',
      users,
    });
  } catch (error) {
    next(error);
  }
};
